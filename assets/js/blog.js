/* ============================================
   BLOG ENGINE — Field Notes
   Fetches from Strapi CMS API, falls back to
   local cms/blog.js if Strapi is unavailable.
   ============================================ */

// Strapi config — update STRAPI_URL when deployed to Strapi Cloud
const STRAPI_URL = window.STRAPI_URL || "http://localhost:1337";

document.addEventListener("DOMContentLoaded", async () => {
    const isPost = document.body.classList.contains("blog-post-page");
    let posts;

    try {
        posts = await fetchStrapiPosts();
    } catch (err) {
        console.warn("Strapi unavailable, using local content:", err.message);
        posts = mapLocalPosts(window.BLOG_POSTS || []);
    }

    if (!posts || posts.length === 0) {
        posts = mapLocalPosts(window.BLOG_POSTS || []);
    }

    if (isPost) {
        renderPost(posts);
    } else {
        renderListing(posts);
    }
});

/* ── STRAPI FETCH ────────────────────────── */
async function fetchStrapiPosts() {
    const url = `${STRAPI_URL}/api/articles?populate=*&sort=publishedAt:desc&pagination[pageSize]=100&status=published`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`Strapi responded ${res.status}`);
    const json = await res.json();
    return (json.data || []).map(mapStrapiArticle);
}

function mapStrapiArticle(article) {
    const cover = article.cover?.url
        ? (article.cover.url.startsWith("http") ? article.cover.url : STRAPI_URL + article.cover.url)
        : null;
    return {
        id: article.id,
        slug: article.slug,
        title: article.title,
        date: article.publishedAt || article.createdAt,
        category: article.category?.name || "Uncategorized",
        categoryColor: article.category?.color || "#A78BFA",
        tags: article.tags || [],
        readTime: (article.readTime || 5) + " min",
        excerpt: article.excerpt || "",
        body: article.content || "",
        coverImage: cover,
        coverEmoji: null,
        featured: article.featured || false,
        source: "strapi",
    };
}

/* ── LOCAL FALLBACK MAPPER ───────────────── */
function mapLocalPosts(posts) {
    return posts.map(p => ({
        ...p,
        coverImage: null,
        categoryColor: "#E4FF1A",
        featured: false,
        source: "local",
    }));
}

/* ── BLOG LISTING ─────────────────────────── */
function renderListing(posts) {
    const grid = document.getElementById("blog-grid");
    const filters = document.getElementById("blog-filters");
    if (!grid) return;

    const categories = [...new Set(posts.map(p => p.category))];

    if (filters) {
        filters.innerHTML = `
            <button class="blog-filter active" data-cat="all">All</button>
            ${categories.map(c => `<button class="blog-filter" data-cat="${c}">${c}</button>`).join("")}
        `;

        filters.querySelectorAll(".blog-filter").forEach(btn => {
            btn.addEventListener("click", () => {
                filters.querySelectorAll(".blog-filter").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderCards(posts, btn.dataset.cat);
            });
        });
    }

    function renderCards(posts, cat) {
        const filtered = cat === "all" ? posts : posts.filter(p => p.category === cat);

        grid.innerHTML = filtered.map(p => `
            <a href="post.html?slug=${p.slug}" class="blog-card${p.featured ? ' featured' : ''}">
                ${p.coverImage
                    ? `<div class="blog-card-cover"><img src="${p.coverImage}" alt="${escapeHtml(p.title)}" loading="lazy"></div>`
                    : p.coverEmoji
                        ? `<div class="blog-card-emoji">${p.coverEmoji}</div>`
                        : ''
                }
                <div class="blog-card-cat">${escapeHtml(p.category)}</div>
                <h2 class="blog-card-title">${escapeHtml(p.title)}</h2>
                <p class="blog-card-excerpt">${escapeHtml(p.excerpt)}</p>
                <div class="blog-card-meta">
                    <span>${formatDate(p.date)}</span>
                    <span>&middot;</span>
                    <span>${p.readTime}</span>
                </div>
            </a>
        `).join("");
    }

    renderCards(posts, "all");
}

/* ── INDIVIDUAL POST ──────────────────────── */
function renderPost(posts) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    const post = posts.find(p => p.slug === slug);

    if (!post) {
        document.getElementById("post-body").innerHTML = `
            <div style="text-align:center;padding:80px 20px;">
                <h2>Post not found</h2>
                <p style="color:var(--text-muted);margin-top:12px;">
                    <a href="index.html" style="color:var(--accent);">&larr; Back to Field Notes</a>
                </p>
            </div>
        `;
        return;
    }

    // Update page meta
    document.title = post.title + " | Mani Kumar Jami";
    const metaDesc = document.getElementById("post-meta-desc");
    if (metaDesc) metaDesc.content = post.excerpt;

    // Fill hero
    const heading = document.getElementById("post-heading");
    const catHero = document.getElementById("post-cat-hero");
    const category = document.getElementById("post-category");
    const date = document.getElementById("post-date");
    const readTime = document.getElementById("post-read");
    const tags = document.getElementById("post-tags");
    const body = document.getElementById("post-body");

    if (heading) heading.textContent = post.title;
    if (catHero) catHero.textContent = post.category;
    if (category) category.textContent = post.category;
    if (date) date.textContent = formatDate(post.date);
    if (readTime) readTime.textContent = post.readTime;
    if (tags) {
        const tagList = Array.isArray(post.tags) ? post.tags : [];
        tags.innerHTML = tagList.map(t => `<span class="post-tag">${escapeHtml(t)}</span>`).join("");
    }

    // Render body — Strapi returns rich text (markdown), local has markdown too
    if (body) body.innerHTML = simpleMarkdown(post.body);

    // Post navigation (prev/next)
    const nav = document.getElementById("post-nav");
    if (nav) {
        const idx = posts.findIndex(p => p.slug === slug);
        const prev = idx > 0 ? posts[idx - 1] : null;
        const next = idx < posts.length - 1 ? posts[idx + 1] : null;

        nav.innerHTML = `
            ${prev ? `<a class="post-nav-btn prev" href="post.html?slug=${prev.slug}">
                <span class="pnb-arrow">&larr;</span>
                <span class="pnb-label">PREVIOUS</span>
                <span class="pnb-title">${escapeHtml(prev.title)}</span>
            </a>` : '<div></div>'}
            ${next ? `<a class="post-nav-btn next" href="post.html?slug=${next.slug}">
                <span class="pnb-arrow">&rarr;</span>
                <span class="pnb-label">NEXT</span>
                <span class="pnb-title">${escapeHtml(next.title)}</span>
            </a>` : '<div></div>'}
        `;
    }
}

/* ── SIMPLE MARKDOWN PARSER ───────────────── */
function simpleMarkdown(text) {
    if (!text) return "";
    return text
        .trim()
        .split("\n\n")
        .map(block => {
            block = block.trim();
            if (!block) return "";

            if (block.startsWith("### ")) return `<h3>${inlineFormat(block.slice(4))}</h3>`;
            if (block.startsWith("## ")) return `<h2>${inlineFormat(block.slice(3))}</h2>`;
            if (block.startsWith("# ")) return `<h1>${inlineFormat(block.slice(2))}</h1>`;

            if (block.match(/^[-*]\s/m)) {
                const items = block.split("\n").filter(l => l.trim());
                return `<ul>${items.map(li => {
                    const content = li.replace(/^[-*]\s+/, "").trim();
                    if (content.match(/^\d+\.\s/)) {
                        return `<li>${inlineFormat(content.replace(/^\d+\.\s/, ""))}</li>`;
                    }
                    return `<li>${inlineFormat(content)}</li>`;
                }).join("")}</ul>`;
            }

            if (block.match(/^\d+\.\s/m)) {
                const items = block.split("\n").filter(l => l.trim());
                return `<ol>${items.map(li =>
                    `<li>${inlineFormat(li.replace(/^\d+\.\s*/, "").trim())}</li>`
                ).join("")}</ol>`;
            }

            return `<p>${inlineFormat(block)}</p>`;
        })
        .join("\n");
}

function inlineFormat(text) {
    return text
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, "<code>$1</code>")
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

/* ── HELPERS ──────────────────────────────── */
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function escapeHtml(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}
