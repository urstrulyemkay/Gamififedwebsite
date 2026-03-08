/* ============================================
   PAGE.JS — Section detail page engine
   Powers individual section pages with:
   - Dynamic content from cms/content.js
   - Mascot with contextual tips
   - Voice chat (Web Speech API + placeholder for ElevenLabs)
   - Section navigation (prev/next)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
    const C = window.CONTENT;
    if (!C) { console.error("content.js not loaded"); return; }

    // Determine which section we're on from URL
    const params = new URLSearchParams(window.location.search);
    const sectionId = params.get("s") || "about";

    // Section registry — maps IDs to page config
    const sections = [
        { id: "about",        tag: "ORIGIN",          title: "The Origin Story.",       subtitle: "Where it all began." },
        { id: "quest-log",    tag: "QUEST LOG",       title: "Missions Completed.",     subtitle: "9.5 years of product battles, from enterprise to AI." },
        { id: "academic",     tag: "TRAINING GROUNDS", title: "Knowledge Acquired.",    subtitle: "The forges where skills were sharpened." },
        { id: "ventures",     tag: "SIDE QUESTS",     title: "Ventures Founded.",       subtitle: "From zero to funded — twice." },
        { id: "boss-battles", tag: "BOSS ARENA",      title: "Enemies Vanquished.",     subtitle: "The toughest challenges, defeated." },
        { id: "skill-tree",   tag: "SKILL TREE",      title: "Abilities Unlocked.",     subtitle: "Mastery earned through experience." },
        { id: "stats",        tag: "CHARACTER SHEET",  title: "Base Stats.",             subtitle: "The radar behind the warrior." },
        { id: "genai",        tag: "SPELL BOOK",      title: "AI Creations.",           subtitle: "Spells cast with code and models." },
        { id: "portfolio",    tag: "WAR JOURNAL",     title: "Battle Reports.",         subtitle: "Case studies and strategy decks." },
        { id: "inventory",    tag: "INVENTORY",       title: "Equipment Loadout.",      subtitle: "The tools in the armory." },
        { id: "achievements", tag: "TROPHY WALL",     title: "Trophies Collected.",     subtitle: "Every achievement, earned." },
        { id: "contact",      tag: "FINAL QUEST",     title: "The Final Quest.",        subtitle: "Ready to team up?" },
    ];

    const currentIndex = sections.findIndex(s => s.id === sectionId);
    const current = sections[currentIndex] || sections[0];

    // Populate page header
    document.title = `${current.title} | Mani Kumar Jami`;
    const tagEl = document.getElementById("page-tag");
    const titleEl = document.getElementById("page-title");
    const subtitleEl = document.getElementById("page-subtitle");
    const sectionTag = document.getElementById("page-section-tag");

    if (tagEl) tagEl.textContent = current.tag;
    if (titleEl) titleEl.textContent = current.title;
    if (subtitleEl) subtitleEl.textContent = current.subtitle;
    if (sectionTag) sectionTag.textContent = current.tag;

    // Build nav links
    buildPageNav(sections, sectionId);

    // Build prev/next navigation
    buildSectionNav(sections, currentIndex);

    // Build page content
    buildPageContent(sectionId, C);

    // Init mascot
    initMascot(sectionId, C);

    // Init voice chat
    initVoiceChat(C);

    // Init page hamburger
    initPageHamburger();

    // Weather system is in weather.js (self-initializing)
});

/* ============================================
   BUILD NAV LINKS
   ============================================ */
function buildPageNav(sections, activeId) {
    const desktop = document.getElementById("page-nav-links");
    const mobile = document.getElementById("page-mobile-menu");
    if (!desktop) return;

    sections.forEach(s => {
        if (s.id === "contact" || s.id === "stats") return; // Skip some for brevity

        const a = document.createElement("a");
        a.className = "nav-link" + (s.id === activeId ? " active" : "");
        a.href = `template.html?s=${s.id}`;
        a.textContent = s.tag.split(" ").pop(); // Short label
        desktop.appendChild(a);

        if (mobile) {
            const m = a.cloneNode(true);
            m.className = "mobile-link" + (s.id === activeId ? " active" : "");
            mobile.appendChild(m);
        }
    });
}

/* ============================================
   SECTION NAVIGATION (prev/next)
   ============================================ */
function buildSectionNav(sections, currentIndex) {
    const prevBtn = document.getElementById("nav-prev");
    const nextBtn = document.getElementById("nav-next");
    const prevName = document.getElementById("nav-prev-name");
    const nextName = document.getElementById("nav-next-name");

    if (currentIndex > 0) {
        const prev = sections[currentIndex - 1];
        prevBtn.href = `template.html?s=${prev.id}`;
        prevName.textContent = prev.title;
    } else {
        prevBtn.style.visibility = "hidden";
    }

    if (currentIndex < sections.length - 1) {
        const next = sections[currentIndex + 1];
        nextBtn.href = `template.html?s=${next.id}`;
        nextName.textContent = next.title;
    } else {
        nextBtn.href = "../index.html";
        nextName.textContent = "Back to Main";
    }
}

/* ============================================
   BUILD PAGE CONTENT — renders section-specific
   detailed view from CMS data
   ============================================ */
function buildPageContent(sectionId, C) {
    const container = document.getElementById("page-content");
    if (!container) return;

    switch (sectionId) {
        case "quest-log":
            container.innerHTML = buildDetailedTimeline(C.professional, "professional");
            break;
        case "academic":
            container.innerHTML = buildDetailedTimeline(C.academic, "academic");
            break;
        case "ventures":
            container.innerHTML = buildDetailedTimeline(C.entrepreneurship, "ventures");
            break;
        case "boss-battles":
            container.innerHTML = buildBossDetails(C.bosses);
            break;
        case "skill-tree":
            container.innerHTML = buildSkillDetails(C.skills);
            break;
        case "genai":
            container.innerHTML = buildGenAIDetails(C.genaiPortfolio);
            break;
        case "inventory":
            container.innerHTML = buildInventoryDetails(C.inventory);
            break;
        case "achievements":
            container.innerHTML = buildAchievementDetails(C.achievements);
            break;
        case "about":
            container.innerHTML = buildAboutDetails(C);
            break;
        default:
            container.innerHTML = `<div class="page-placeholder"><p>This section page is under construction. Return to <a href="../index.html">main quest</a>.</p></div>`;
    }
}

function buildDetailedTimeline(items, type) {
    if (!items) return "";
    return `<div class="detail-timeline">${items.map((item, i) => `
        <div class="detail-card reveal" style="animation-delay:${i * 0.1}s">
            <div class="detail-card-header">
                <span class="detail-year">${item.year}</span>
                <span class="detail-xp">+${item.xp} XP</span>
            </div>
            <h2 class="detail-title">${item.url ? `<a href="${item.url}" target="_blank" rel="noopener">${item.title}</a>` : item.title}</h2>
            <p class="detail-desc">${item.desc}</p>
            <div class="detail-badges">${(item.badges || []).map(b =>
                `<span class="badge badge-${b.rank}">${b.text}</span>`
            ).join("")}</div>
        </div>
    `).join("")}</div>`;
}

function buildBossDetails(bosses) {
    if (!bosses) return "";
    return `<div class="detail-boss-grid">${bosses.map((b, i) => `
        <div class="detail-boss-card reveal" style="animation-delay:${i * 0.1}s">
            <div class="detail-boss-header">
                <h2>${b.name}</h2>
                <span class="boss-year">${b.year}</span>
            </div>
            <p class="detail-desc">${b.desc}</p>
            <div class="detail-boss-stats">
                <div class="dbs"><span class="dbs-label">HP</span><div class="boss-hp-track"><div class="boss-hp-fill depleted" style="width:100%"></div></div></div>
                <div class="dbs"><span class="dbs-label">REWARD</span><span class="boss-reward">${b.reward}</span></div>
                <div class="dbs"><span class="dbs-label">STATUS</span><span class="boss-defeated">DEFEATED</span></div>
            </div>
        </div>
    `).join("")}</div>`;
}

function buildSkillDetails(skills) {
    if (!skills) return "";
    return `<div class="detail-skills">${skills.map((s, i) => {
        let rank, rankColor;
        if (s.level >= 95) { rank = "LEGENDARY"; rankColor = "var(--legendary)"; }
        else if (s.level >= 88) { rank = "EPIC"; rankColor = "var(--epic)"; }
        else if (s.level >= 80) { rank = "RARE"; rankColor = "var(--rare)"; }
        else { rank = "COMMON"; rankColor = "var(--text-muted)"; }
        return `
        <div class="detail-skill reveal" style="animation-delay:${i * 0.06}s">
            <div class="detail-skill-icon">${s.icon}</div>
            <div class="detail-skill-info">
                <div class="detail-skill-meta">
                    <span class="detail-skill-name">${s.name}</span>
                    <span class="detail-skill-rank" style="color:${rankColor}">${rank}</span>
                </div>
                <div class="skill-bar-track"><div class="skill-bar-fill" style="--bar-color:${rankColor}; width:${s.level}%"></div></div>
                <span class="detail-skill-level">${s.level}/100</span>
            </div>
        </div>`;
    }).join("")}</div>`;
}

function buildGenAIDetails(items) {
    if (!items) return "";
    return `<div class="detail-genai">${items.map((item, i) => `
        <div class="detail-genai-card reveal" style="animation-delay:${i * 0.1}s">
            <div class="detail-genai-icon">${item.icon}</div>
            <div>
                <h2>${item.url ? `<a href="${item.url}" target="_blank" rel="noopener">${item.name}</a>` : item.name}</h2>
                <p>${item.desc}</p>
            </div>
        </div>
    `).join("")}</div>`;
}

function buildInventoryDetails(items) {
    if (!items) return "";
    return `<div class="detail-inventory">${items.map((item, i) => `
        <div class="detail-inv-card reveal" style="animation-delay:${i * 0.06}s">
            <span class="detail-inv-icon">${item.icon}</span>
            <div>
                <strong>${item.name}</strong>
                <span class="inv-rarity-tag rarity-${item.rarity}">${item.rarity.toUpperCase()}</span>
                <p>${item.desc}</p>
            </div>
        </div>
    `).join("")}</div>`;
}

function buildAchievementDetails(achievements) {
    if (!achievements) return "";
    return `<div class="detail-achievements">${achievements.map((a, i) => `
        <div class="detail-ach-card reveal" style="animation-delay:${i * 0.08}s; --card-color:${a.color}">
            <div class="detail-ach-icon" style="background:${a.color}15; border-color:${a.color}30">${a.icon}</div>
            <h3>${a.title}</h3>
            <p>${a.subtitle}</p>
        </div>
    `).join("")}</div>`;
}

function buildAboutDetails(C) {
    const p = C.profile;
    const h = C.heroCard;
    return `
        <div class="about-detail">
            <div class="about-stats-grid">
                ${h.highlights.map(hl => `
                    <div class="about-stat-card reveal">
                        <span class="about-stat-value">${hl.value}</span>
                        <span class="about-stat-label">${hl.label}</span>
                    </div>
                `).join("")}
            </div>
            <div class="about-summary reveal">
                ${h.summaryLines.map(l => `<p>${l}</p>`).join("")}
            </div>
            <div class="about-tags reveal">
                ${h.tags.map(t => `<span class="hcard-tag">${t}</span>`).join("")}
            </div>
            <div class="about-links reveal">
                <a href="${p.linkedIn}" target="_blank" rel="noopener" class="about-link">LinkedIn</a>
                <a href="${p.medium}" target="_blank" rel="noopener" class="about-link">Medium</a>
                <a href="mailto:${p.email}" class="about-link">Email</a>
            </div>
        </div>
    `;
}

/* ============================================
   MASCOT — contextual floating assistant
   ============================================ */
function initMascot(sectionId, C) {
    const mascot = document.getElementById("mascot");
    const bubbleText = document.getElementById("mascot-bubble-text");
    const body = document.getElementById("mascot-body");
    if (!mascot || !bubbleText) return;

    const tips = {
        "about": ["This is where Mani's story begins!", "Try clicking around for hidden details.", "Scroll down to explore more."],
        "quest-log": ["9.5 years of product battles!", "Each role earned massive XP.", "DriveX is the current quest."],
        "academic": ["MBA + Law + Psychology = triple threat.", "HSBC IB PPO from Xavier!", "5 languages spoken!"],
        "ventures": ["2X Founder energy!", "GoI funded Greengears.", "20M+ revenue at Ro-One."],
        "boss-battles": ["Click boss cards to battle them!", "Every boss was defeated.", "Voice AI passed the Turing test!"],
        "skill-tree": ["97/100 in Product Strategy!", "12 skills in the arsenal.", "Total XP: 74,500+"],
        "genai": ["AI spell caster at work.", "Check out Finpist!", "Voice AI fraud detection is live."],
        "inventory": ["Hover over items for details.", "Legendary items glow!", "11Labs + Cursor = 10x multiplier."],
        "achievements": ["$250M+ ARR portfolio!", "India's Firsts x3.", "Confetti incoming!"],
    };

    const sectionTips = tips[sectionId] || ["Welcome, explorer!", "Click around to discover more."];
    let tipIndex = 0;

    // Show first tip after delay
    setTimeout(() => {
        bubbleText.textContent = sectionTips[0];
    }, 1000);

    // Cycle tips on click
    body.addEventListener("click", () => {
        tipIndex = (tipIndex + 1) % sectionTips.length;
        bubbleText.textContent = sectionTips[tipIndex];

        // Bounce animation
        body.style.transform = "scale(1.2)";
        setTimeout(() => body.style.transform = "", 200);
    });

    // Eyes follow cursor
    document.addEventListener("mousemove", (e) => {
        const eyes = mascot.querySelectorAll(".mascot-eye");
        const rect = body.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        const dist = 2;
        eyes.forEach(eye => {
            eye.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
        });
    });
}

/* ============================================
   VOICE CHAT — Web Speech API input
   Placeholder for ElevenLabs TTS output
   ============================================ */
function initVoiceChat(C) {
    const voiceBtn = document.getElementById("voice-btn");
    const voiceInput = document.getElementById("voice-input");
    const voiceSend = document.getElementById("voice-send");
    const voiceStatus = document.getElementById("voice-status");
    const voiceIcon = document.getElementById("voice-icon");
    const responseEl = document.getElementById("voice-response");
    if (!voiceBtn || !voiceInput) return;

    let isListening = false;
    let recognition = null;

    // Setup Web Speech API if available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            voiceInput.value = transcript;
            stopListening();
            handleQuestion(transcript, C, responseEl);
        };

        recognition.onerror = () => stopListening();
        recognition.onend = () => stopListening();
    }

    function startListening() {
        if (!recognition) return;
        isListening = true;
        voiceBtn.classList.add("listening");
        voiceStatus.textContent = "Listening...";
        voiceIcon.textContent = "\u{1F534}";
        recognition.start();
    }

    function stopListening() {
        isListening = false;
        voiceBtn.classList.remove("listening");
        voiceStatus.textContent = "Ask me anything";
        voiceIcon.textContent = "\u{1F3A4}";
        if (recognition) try { recognition.stop(); } catch(e) {}
    }

    voiceBtn.addEventListener("click", () => {
        if (isListening) stopListening();
        else startListening();
    });

    voiceSend.addEventListener("click", () => {
        const q = voiceInput.value.trim();
        if (q) handleQuestion(q, C, responseEl);
    });

    voiceInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const q = voiceInput.value.trim();
            if (q) handleQuestion(q, C, responseEl);
        }
    });
}

/* ============================================
   QUESTION HANDLER — local KB lookup
   (Replace with Claude API call for production)
   ============================================ */
function handleQuestion(question, C, responseEl) {
    const q = question.toLowerCase();
    let answer = "";

    // Local KB — pattern matching on CMS content
    if (q.includes("experience") || q.includes("career") || q.includes("work")) {
        answer = `Mani has ${C.professional.length} major roles over 9.5 years. Currently AVP at DriveX (TVS Group) managing a $50M+ ARR portfolio. Previously at SquadStack, Ola, Simplilearn, and Virtusa.`;
    } else if (q.includes("education") || q.includes("study") || q.includes("degree")) {
        answer = `MBA from Xavier Institute (XIMB), B.Tech from SRM, Master of Business Laws from NLSIU, and MA Psychology from IGNOU. Also CFA L2 Candidate and Bloomberg certified.`;
    } else if (q.includes("skill") || q.includes("good at") || q.includes("expertise")) {
        answer = `Top skills: Product Strategy (97/100), AI/ML (95), P&L Ownership (93), Marketplace & Growth (92), PLG & GTM (90). 12 skills total in the arsenal.`;
    } else if (q.includes("startup") || q.includes("founder") || q.includes("venture")) {
        answer = `2X Founder: Ro-One ITDS (INR 20M+ revenue, 25-member team) and Greengears Agrotech (GoI funded, NITI Aayog Top 30, 7 products).`;
    } else if (q.includes("ai") || q.includes("genai") || q.includes("artificial")) {
        answer = `Built India's 1st Hinglish ASR model that passed the Turing test. Created Finpist (debt optimizer), Voice AI fraud detection, and AI telecalling systems. Currently building shared AI platform at DriveX.`;
    } else if (q.includes("contact") || q.includes("reach") || q.includes("email")) {
        answer = `Email: ${C.profile.email} | LinkedIn: linkedin.com/in/manikumarjami | Location: ${C.profile.location}`;
    } else if (q.includes("achievement") || q.includes("award")) {
        answer = `Key achievements: $250M+ ARR portfolio, India's Firsts x3, 200M+ users, TVS Future Leaders, HSBC IB PPO, 2X Founder, NITI Aayog Top 30.`;
    } else if (q.includes("boss") || q.includes("challenge") || q.includes("hardest")) {
        answer = `Toughest battles: 250% revenue growth at DriveX, India's 1st WhatsApp Auction, Voice AI Turing Test, Ola OS 2.0 War Room (20,000 issues in 1 week).`;
    } else {
        answer = `That's a great question! For detailed info, reach out to Mani at ${C.profile.email}. I'm a local knowledge base — for deeper conversations, the full AI agent with voice response is coming soon!`;
    }

    // Display response
    responseEl.innerHTML = `<p>${answer}</p>`;
    responseEl.classList.add("active");

    // TODO: Replace with ElevenLabs TTS call
    // speakWithElevenLabs(answer);

    // Use browser TTS as fallback
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(answer);
        utterance.rate = 1.1;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    }
}

/* ============================================
   PAGE HAMBURGER
   ============================================ */
function initPageHamburger() {
    const h = document.getElementById("page-hamburger");
    const m = document.getElementById("page-mobile-menu");
    if (!h || !m) return;
    h.addEventListener("click", () => {
        h.classList.toggle("open");
        m.classList.toggle("open");
    });
    m.querySelectorAll(".mobile-link").forEach(l => l.addEventListener("click", () => {
        h.classList.remove("open");
        m.classList.remove("open");
    }));
}

/* Weather system moved to weather.js */
