/* ============================================
   CARD ARENA — Trading Card Game
   Card selection, PM archetype reveal,
   particles, 3D tilt, holographic, random draw
   ============================================ */
function initCardArena(C) {
    const arena = document.getElementById("card-arena");
    const arenaScroll = document.getElementById("arena-scroll");
    const handEl = document.getElementById("arena-hand");
    const drawOverlay = document.getElementById("arena-draw-overlay");
    const identityEl = document.getElementById("arena-identity");
    const heroCard = document.getElementById("hero-card");
    const heroWrapper = document.getElementById("hero-card-wrapper");
    if (!arena || !arenaScroll || !heroCard || !C.cardArena) {
        console.warn("[CardArena] Missing:", { arena: !!arena, arenaScroll: !!arenaScroll, heroCard: !!heroCard, cardArena: !!C.cardArena });
        return;
    }
    console.log("[CardArena] Initialized — tap hero card to open");

    const MAX_HAND = 5;
    const MIN_FOR_REVEAL = 3;
    let hand = [];
    let particleRAF = null;

    const suits = [
        { key: "product",    label: "Product",    icon: "\u{1F3AF}", color: "#E4FF1A" },
        { key: "technology", label: "Technology",  icon: "\u{1F916}", color: "#22D3EE" },
        { key: "process",    label: "Process",     icon: "\u26A1",    color: "#4ADE80" },
        { key: "psychology", label: "Psychology",  icon: "\u{1F49C}", color: "#A78BFA" },
    ];

    // ── 12 PM ARCHETYPES ────────────────────────
    const archetypes = [
        // Single-suit dominant (3+ of same suit)
        { id: "strategist",  name: "The Strategist",   icon: "\u{1F9ED}", subtitle: "Pure Product Mastermind", color: "#E4FF1A",
          single: "product",
          desc: "You value strategic product thinking above all else \u2014 vision, growth, and revenue drive your decisions. The skills you picked show you want a PM who sees the whole board and architects businesses, not just features." },
        { id: "technomancer", name: "The Technomancer", icon: "\u{1F52E}", subtitle: "Deep-Tech Product Wizard", color: "#22D3EE",
          single: "technology",
          desc: "You value technical depth in a product leader. AI, systems architecture, data pipelines \u2014 the skills you chose show you want a PM who speaks engineering fluently and earns respect in the codebase." },
        { id: "commander",   name: "The Commander",    icon: "\u{1F396}\uFE0F", subtitle: "Execution Powerhouse", color: "#4ADE80",
          single: "process",
          desc: "You value execution above all. The skills you selected \u2014 shipping speed, operational rigor, structured chaos \u2014 show you want a PM who turns ambiguity into shipped products, every single time." },
        { id: "empath",      name: "The Empath",       icon: "\u{1F9E0}", subtitle: "People-First Visionary", color: "#A78BFA",
          single: "psychology",
          desc: "You value the human side of product leadership. User motivation, team dynamics, stakeholder alignment \u2014 the skills you picked show you believe the best products are built by PMs who truly understand people." },
        // Two-suit combinations (6 pairs)
        { id: "architect",  name: "The Architect",  icon: "\u{1F3D7}\uFE0F", subtitle: "Technical Product Strategist", color: "#22D3EE",
          primary: "technology", secondary: "product",
          desc: "You value the intersection of technical depth and product strategy. Your picks show you want a PM who doesn\u2019t just define what to build, but understands how to build it at scale." },
        { id: "visionary",  name: "The Visionary",  icon: "\u{1F52D}", subtitle: "User-Centric Growth Leader", color: "#E4FF1A",
          primary: "product", secondary: "psychology",
          desc: "You value the rare combination of user empathy and business growth. Your selections show you want a PM who balances heart with metrics \u2014 building products users love that also drive results." },
        { id: "engineer",   name: "The Engineer",   icon: "\u2699\uFE0F", subtitle: "Systems-Thinking Builder", color: "#38BDF8",
          primary: "technology", secondary: "process",
          desc: "You value robust systems and clean execution. The skills you chose show you want a PM who brings technical rigor to process \u2014 building things that are reliable, scalable, and shipped with confidence." },
        { id: "operator",   name: "The Operator",   icon: "\u{1F3AF}", subtitle: "People-First Execution Leader", color: "#4ADE80",
          primary: "process", secondary: "psychology",
          desc: "You value execution powered by empathy. Your picks show you want a PM who ships through people \u2014 someone who knows the best process empowers teams rather than constraining them." },
        { id: "scaler",     name: "The Scaler",     icon: "\u{1F4C8}", subtitle: "Growth Operations Master", color: "#F59E0B",
          primary: "product", secondary: "process",
          desc: "You value the ability to take 1 and make it 100. Your selections reveal you want a PM who\u2019s done the scaling journey \u2014 from product-market fit through operational excellence to market leadership." },
        { id: "innovator",  name: "The Innovator",  icon: "\u{1F9EA}", subtitle: "AI-First Experience Designer", color: "#A78BFA",
          primary: "technology", secondary: "psychology",
          desc: "You value innovation at the edge of tech and human behavior. Your choices show you want a PM who uses cutting-edge technology not as an end, but as a medium for creating experiences that feel like magic." },
        // Special
        { id: "polymath",   name: "The Polymath",   icon: "\u{1F30D}", subtitle: "Full-Stack Product Leader", color: "#F472B6",
          balanced: true,
          desc: "You value balance. No single dimension matters more than the rest \u2014 you picked evenly across product, tech, process, and people. You want the rare PM who adapts to any challenge with equal mastery." },
        { id: "legend",     name: "The Story",       icon: "\u{1F451}", subtitle: "Elite Product Leader", color: "#FFD700",
          allLegendary: true,
          desc: "You went straight for the top. Every card you picked is legendary \u2014 the highest-impact skills in the deck. You value elite, proven excellence and won\u2019t settle for anything less in a product leader." },
    ];

    // Flatten all cards
    const allCards = [];
    suits.forEach(s => {
        (C.cardArena[s.key] || []).forEach((card, ci) => {
            allCards.push({ ...card, suit: s.key, suitLabel: s.label, suitColor: s.color, uid: s.key + "_" + ci });
        });
    });

    const totalPower = allCards.reduce((sum, c) => sum + c.power, 0);
    const legendaryCount = allCards.filter(c => c.rarity === "legendary").length;

    // ── PARTICLE SYSTEM ─────────────────────────
    function initParticles() {
        let canvas = arena.querySelector(".arena-particles");
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.className = "arena-particles";
            arena.insertBefore(canvas, arena.firstChild);
        }
        const ctx = canvas.getContext("2d");
        const particles = [];
        const PARTICLE_COUNT = 50;

        function resize() { canvas.width = arena.offsetWidth; canvas.height = arena.offsetHeight; }
        resize();
        window.addEventListener("resize", resize);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3 - 0.15,
                r: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.4 + 0.1,
                color: [
                    "rgba(99,70,220,", "rgba(167,139,250,", "rgba(34,211,238,", "rgba(228,255,26,"
                ][Math.floor(Math.random() * 4)]
            });
        }

        function drawParticles() {
            if (!arena.classList.contains("active")) { particleRAF = null; return; }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                p.alpha += (Math.random() - 0.5) * 0.02;
                p.alpha = Math.max(0.05, Math.min(0.5, p.alpha));
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color + p.alpha + ")";
                ctx.fill();
            });
            particleRAF = requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    // ── CURSOR GLOW ─────────────────────────────
    function initCursorGlow() {
        let glow = arena.querySelector(".arena-cursor-glow");
        if (!glow) {
            glow = document.createElement("div");
            glow.className = "arena-cursor-glow";
            arena.appendChild(glow);
        }
        arena.addEventListener("mousemove", (e) => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        });
    }

    // ── COUNT-UP ANIMATION ──────────────────────
    function countUp(el, target, duration) {
        const start = performance.now();
        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // ── BUILD ARENA HTML ────────────────────────
    arenaScroll.innerHTML = `
        <div class="arena-topbar">
            <div class="arena-topbar-left">
                <button class="arena-exit" id="arena-exit">\u2190 EXIT ARENA</button>
                <span class="arena-title-badge">SKILL DECK</span>
            </div>
            <div class="arena-topbar-right">
                <button class="arena-draw-btn" id="arena-draw-btn">\u{1F0CF} Draw Random</button>
                <span class="arena-card-count">${allCards.length} CARDS</span>
            </div>
        </div>

        <div class="arena-hero">
            <div class="arena-hero-content">
                <div class="arena-hero-icon"><span>\u{1F0CF}</span></div>
                <div class="arena-hero-label">Mani Kumar Jami \u2014 Skill Deck</div>
                <h1 class="arena-hero-heading">What Do You Value in a PM?</h1>
                <p class="arena-hero-sub">Every card below is a real skill I\u2019ve earned \u2014 backed by numbers, products, and outcomes. Pick ${MIN_FOR_REVEAL}\u2013${MAX_HAND} that matter most to you. Your combination reveals what kind of PM leadership you value.</p>
                <div class="arena-scroll-cue">\u2193 BROWSE MY DECK</div>
            </div>
        </div>

        <div class="arena-how-it-works">
            <div class="arena-hiw-step">
                <div class="arena-hiw-num">01</div>
                <div class="arena-hiw-text"><strong>Browse</strong> \u2014 Each card is a skill I\u2019ve proven in my career</div>
            </div>
            <div class="arena-hiw-step">
                <div class="arena-hiw-num">02</div>
                <div class="arena-hiw-text"><strong>Pick ${MIN_FOR_REVEAL}\u2013${MAX_HAND}</strong> \u2014 Tap cards that resonate with your PM values</div>
            </div>
            <div class="arena-hiw-step">
                <div class="arena-hiw-num">03</div>
                <div class="arena-hiw-text"><strong>Reveal</strong> \u2014 Your combination reveals your PM archetype</div>
            </div>
        </div>

        <div class="arena-deck-stats" id="arena-deck-stats">
            <div class="arena-stat">
                <div class="arena-stat-value" data-count="${totalPower}">0</div>
                <div class="arena-stat-label">Total Power</div>
            </div>
            <div class="arena-stat">
                <div class="arena-stat-value" data-count="${allCards.length}">0</div>
                <div class="arena-stat-label">Cards</div>
            </div>
            <div class="arena-stat">
                <div class="arena-stat-value" data-count="${legendaryCount}">0</div>
                <div class="arena-stat-label">Legendary</div>
            </div>
            <div class="arena-stat">
                <div class="arena-stat-value" data-count="${suits.length}">0</div>
                <div class="arena-stat-label">Suits</div>
            </div>
        </div>

        <div class="arena-suits" id="arena-suits">
            <button class="arena-suit-tab active" data-suit="all">
                <span class="suit-icon">\u2728</span>
                <span>All</span>
                <span class="suit-count">${allCards.length}</span>
            </button>
            ${suits.map(s => `
                <button class="arena-suit-tab" data-suit="${s.key}">
                    <span class="suit-icon">${s.icon}</span>
                    <span>${s.label}</span>
                    <span class="suit-count">${(C.cardArena[s.key] || []).length}</span>
                </button>
            `).join("")}
        </div>

        <div class="arena-grid" id="arena-grid"></div>

        <div class="arena-footer">
            <p class="arena-footer-text">The skills you picked say a lot about your PM instincts.</p>
            <button class="arena-return" id="arena-return">\u2190 RETURN TO GAME</button>
        </div>
    `;

    const grid = document.getElementById("arena-grid");
    const suitTabs = document.getElementById("arena-suits");

    // ── CARD HTML ───────────────────────────────
    function cardHTML(c, i) {
        const isSelected = hand.some(h => h.uid === c.uid);
        return `
            <div class="arena-card ${isSelected ? "selected" : ""}" data-suit="${c.suit}" data-rarity="${c.rarity}" data-uid="${c.uid}" style="--idle-delay: ${(i * 0.4) % 3}s">
                <div class="arena-card-inner">
                    <div class="arena-card-front">
                        <div class="ac-header">
                            <div class="ac-header-bg"></div>
                            <div class="ac-cost">${c.cost}</div>
                            <div class="ac-rarity-badge ${c.rarity}">${c.rarity}</div>
                            <div class="ac-icon">${c.icon}</div>
                        </div>
                        <div class="ac-body">
                            <div class="ac-suit-label ${c.suit}">${c.suitLabel}</div>
                            <div class="ac-name">${c.name}</div>
                            <p class="ac-desc">${c.desc}</p>
                        </div>
                        <div class="ac-footer">
                            <div class="ac-power-wrap">
                                <div class="ac-power-label">POWER</div>
                                <div class="ac-power-bar">
                                    <div class="ac-power-fill" style="width:0;" data-power="${c.power}"></div>
                                </div>
                            </div>
                            <div class="ac-power-num">${c.power}</div>
                        </div>
                    </div>
                    <div class="arena-card-back">
                        <div class="acb-header">
                            <div class="acb-icon">${c.icon}</div>
                            <div class="acb-info">
                                <div class="acb-name">${c.name}</div>
                                <div class="acb-suit" style="color:${c.suitColor}">${c.suitLabel}</div>
                            </div>
                        </div>
                        <p class="acb-desc">${c.desc}</p>
                        <div class="acb-tags">${c.tags.map(t => `<span class="acb-tag">${t}</span>`).join("")}</div>
                        <div class="acb-stats">
                            <div><div class="acb-stat-value">${c.power}</div><div class="acb-stat-label">Power</div></div>
                            <div><div class="acb-stat-value">${c.cost}</div><div class="acb-stat-label">Cost</div></div>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    // ── RENDER CARDS ────────────────────────────
    function renderCards(filter) {
        const filtered = filter === "all" ? allCards : allCards.filter(c => c.suit === filter);
        grid.innerHTML = filtered.map((c, i) => cardHTML(c, i)).join("");

        const cards = grid.querySelectorAll(".arena-card");
        cards.forEach((cardEl, i) => {
            // Stagger deal-in
            setTimeout(() => {
                cardEl.classList.add("revealed");
                const fill = cardEl.querySelector(".ac-power-fill");
                if (fill) setTimeout(() => { fill.style.width = fill.dataset.power + "%"; }, 200);
            }, i * 80);

            // Click to select/deselect
            cardEl.addEventListener("click", () => {
                const uid = cardEl.dataset.uid;
                const card = allCards.find(c => c.uid === uid);
                if (!card) return;
                const idx = hand.findIndex(h => h.uid === uid);
                if (idx >= 0) {
                    hand.splice(idx, 1);
                    cardEl.classList.remove("selected");
                } else if (hand.length < MAX_HAND) {
                    hand.push(card);
                    cardEl.classList.add("selected");
                } else {
                    // Hand full — shake feedback
                    cardEl.style.animation = "none";
                    cardEl.offsetHeight; // reflow
                    cardEl.style.animation = "";
                    return;
                }
                try { playSound("cardReveal"); } catch(e2) {}
                updateHand();
            });

            // 3D tilt on mousemove
            cardEl.addEventListener("mousemove", (e) => {
                const inner = cardEl.querySelector(".arena-card-inner");
                const rect = cardEl.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                inner.style.transform = `rotateX(${(y - 0.5) * -12}deg) rotateY(${(x - 0.5) * 12}deg)`;
            });
            cardEl.addEventListener("mouseleave", () => {
                cardEl.querySelector(".arena-card-inner").style.transform = "";
            });
        });
    }

    // ── HAND MANAGEMENT ─────────────────────────
    function updateHand() {
        if (hand.length === 0) { handEl.classList.remove("visible"); return; }
        handEl.classList.add("visible");
        handEl.innerHTML = `
            <div class="arena-hand-inner">
                <div class="arena-hand-header">
                    <span class="arena-hand-title">Skills You Value</span>
                    <span class="arena-hand-count">${hand.length} / ${MAX_HAND}</span>
                </div>
                <div class="arena-hand-cards">
                    ${hand.map((c, i) => `
                        <div class="arena-hand-card" data-uid="${c.uid}" style="animation-delay:${i * 0.06}s">
                            <span class="hand-remove">\u00D7</span>
                            <div class="arena-hand-card-icon">${c.icon}</div>
                            <div class="arena-hand-card-name">${c.name}</div>
                        </div>
                    `).join("")}
                </div>
                <button class="arena-hand-reveal" id="arena-reveal-btn" ${hand.length < MIN_FOR_REVEAL ? "disabled" : ""}>
                    ${hand.length < MIN_FOR_REVEAL
                        ? `Select ${MIN_FOR_REVEAL - hand.length} more card${MIN_FOR_REVEAL - hand.length > 1 ? "s" : ""}`
                        : "\u2728 Reveal My PM Archetype"}
                </button>
            </div>
        `;
        handEl.querySelectorAll(".arena-hand-card").forEach(chip => {
            chip.addEventListener("click", () => {
                const uid = chip.dataset.uid;
                hand = hand.filter(c => c.uid !== uid);
                const gridCard = grid.querySelector(`.arena-card[data-uid="${uid}"]`);
                if (gridCard) gridCard.classList.remove("selected");
                updateHand();
            });
        });
        const revealBtn = document.getElementById("arena-reveal-btn");
        if (revealBtn && hand.length >= MIN_FOR_REVEAL) {
            revealBtn.addEventListener("click", revealIdentity);
        }
    }

    // ── ARCHETYPE CALCULATION (weighted scoring) ─
    function calculateArchetype() {
        const suitCounts = { product: 0, technology: 0, process: 0, psychology: 0 };
        hand.forEach(c => { suitCounts[c.suit]++; });

        // Special: all legendary cards
        if (hand.length >= MIN_FOR_REVEAL && hand.every(c => c.rarity === "legendary")) {
            return archetypes.find(a => a.id === "legend");
        }

        const entries = Object.entries(suitCounts).sort((a, b) => b[1] - a[1]);
        const topCount = entries[0][1];
        const topSuit = entries[0][0];
        const secondCount = entries[1] ? entries[1][1] : 0;
        const secondSuit = entries[1] ? entries[1][0] : null;
        const activeSuits = entries.filter(e => e[1] > 0).length;

        // Single-suit dominant: top suit has 60%+ of cards (3/5, 3/4, 2/3, 4/5, etc.)
        if (topCount >= Math.ceil(hand.length * 0.6)) {
            const match = archetypes.find(a => a.single === topSuit);
            if (match) return match;
        }

        // Balanced: 3+ suits active, max diff <= 1
        if (activeSuits >= 3 && topCount - Math.min(...entries.filter(e => e[1] > 0).map(e => e[1])) <= 1) {
            return archetypes.find(a => a.id === "polymath");
        }

        // Two-suit combo: match primary/secondary pair (order-independent)
        if (secondCount > 0) {
            const match = archetypes.find(a =>
                !a.balanced && !a.allLegendary && !a.single &&
                ((a.primary === topSuit && a.secondary === secondSuit) ||
                 (a.primary === secondSuit && a.secondary === topSuit))
            );
            if (match) return match;
        }

        // Fallback: pick by dominant suit if only 1 suit
        const singleMatch = archetypes.find(a => a.single === topSuit);
        if (singleMatch) return singleMatch;

        return archetypes.find(a => a.id === "polymath");
    }

    // ── IDENTITY REVEAL ─────────────────────────
    function revealIdentity() {
        const archetype = calculateArchetype();
        const handPower = hand.reduce((sum, c) => sum + c.power, 0);
        const suitCounts = {};
        hand.forEach(c => { suitCounts[c.suit] = (suitCounts[c.suit] || 0) + 1; });

        // Build a narrative based on the cards chosen
        const topSuits = Object.entries(suitCounts).sort((a, b) => b[1] - a[1]);
        const narrative = topSuits.length === 1
            ? `You went all-in on ${suits.find(s => s.key === topSuits[0][0])?.label}. Bold move.`
            : `Your strongest signals: ${topSuits.filter(s => s[1] > 0).map(s => suits.find(su => su.key === s[0])?.label).join(" + ")}.`;

        identityEl.innerHTML = `
            <div class="identity-bg-glow" style="background:${archetype.color};"></div>
            <div class="arena-identity-inner">
                <div class="identity-reveal-anim">
                    <div class="identity-icon">${archetype.icon}</div>
                    <div class="identity-label" style="color:${archetype.color};">BASED ON WHAT YOU VALUE, YOU ARE</div>
                    <h1 class="identity-name" style="background:linear-gradient(135deg,${archetype.color},#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${archetype.name}</h1>
                    <div class="identity-subtitle">${archetype.subtitle}</div>
                    <p class="identity-desc">${archetype.desc}</p>

                    <div class="identity-cards-used">
                        ${hand.map(c => `
                            <div class="identity-card-chip">
                                <span class="identity-card-chip-icon">${c.icon}</span>
                                ${c.name}
                            </div>
                        `).join("")}
                    </div>

                    <p style="font-size:13px;color:rgba(255,255,255,0.25);margin-bottom:24px;font-style:italic;">${narrative}</p>

                    <div class="identity-suit-breakdown">
                        ${suits.filter(s => suitCounts[s.key]).map(s => `
                            <div class="identity-suit-bar">
                                <div class="identity-suit-dot" style="background:${s.color};"></div>
                                <span class="identity-suit-name">${s.label}</span>
                                <span class="identity-suit-count" style="color:${s.color};">${suitCounts[s.key]}</span>
                            </div>
                        `).join("")}
                        <div class="identity-suit-bar">
                            <div class="identity-suit-dot" style="background:#a78bfa;"></div>
                            <span class="identity-suit-name">Hand Power</span>
                            <span class="identity-suit-count" style="color:#a78bfa;">${handPower}</span>
                        </div>
                    </div>

                    <div class="identity-actions">
                        <button class="identity-action primary" id="identity-retry">\u{1F3B4} Try Different Cards</button>
                        <button class="identity-action secondary" id="identity-close">\u2190 Back to Arena</button>
                    </div>
                </div>
            </div>
        `;

        identityEl.classList.add("active");
        try { playSound("cardReveal"); } catch(e2) {}

        document.getElementById("identity-retry")?.addEventListener("click", () => {
            identityEl.classList.remove("active");
            hand = [];
            updateHand();
            renderCards("all");
            suitTabs.querySelectorAll(".arena-suit-tab").forEach(t => t.classList.remove("active"));
            suitTabs.querySelector('[data-suit="all"]')?.classList.add("active");
        });
        document.getElementById("identity-close")?.addEventListener("click", () => {
            identityEl.classList.remove("active");
        });
    }

    // ── RANDOM DRAW ─────────────────────────────
    function randomDraw() {
        const card = allCards[Math.floor(Math.random() * allCards.length)];
        const alreadyInHand = hand.some(h => h.uid === card.uid);

        drawOverlay.innerHTML = `
            <button class="arena-draw-close" id="draw-close">\u00D7 Close</button>
            <div class="arena-draw-card">
                <div class="arena-card-inner" style="width:100%;height:100%;position:relative;transform-style:preserve-3d;">
                    <div class="arena-card-front" style="position:absolute;inset:0;border-radius:16px;backface-visibility:hidden;display:flex;flex-direction:column;background:linear-gradient(180deg,rgba(20,18,40,0.95),rgba(12,10,30,0.98));border:1px solid rgba(99,70,220,0.15);">
                        <div class="ac-header" style="position:relative;height:160px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
                            <div style="position:absolute;inset:0;opacity:0.12;background:linear-gradient(135deg,${card.suitColor}44,transparent);"></div>
                            <div style="position:absolute;top:12px;left:12px;width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#fff;background:rgba(99,70,220,0.4);">${card.cost}</div>
                            <div class="ac-rarity-badge ${card.rarity}" style="position:absolute;top:12px;right:12px;">${card.rarity}</div>
                            <div style="font-size:56px;position:relative;z-index:1;">${card.icon}</div>
                        </div>
                        <div style="flex:1;padding:20px;display:flex;flex-direction:column;">
                            <div class="ac-suit-label ${card.suit}">${card.suitLabel}</div>
                            <div style="font-size:22px;font-weight:700;color:#e2e8f0;margin-bottom:12px;">${card.name}</div>
                            <p style="font-size:14px;color:rgba(255,255,255,0.4);line-height:1.7;flex:1;">${card.desc}</p>
                        </div>
                        <div style="padding:14px 20px;border-top:1px solid rgba(99,70,220,0.08);display:flex;align-items:center;justify-content:space-between;">
                            <div style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.2);letter-spacing:0.08em;">POWER</div>
                            <div style="font-size:28px;font-weight:800;color:rgba(255,255,255,0.6);">${card.power}</div>
                        </div>
                    </div>
                </div>
            </div>
            ${!alreadyInHand && hand.length < MAX_HAND ? `<button class="arena-draw-select" id="draw-select">+ Add to Hand</button>` : ""}
            <div class="arena-draw-label">You drew a ${card.rarity} card!</div>
        `;

        drawOverlay.classList.add("active");
        try { playSound("cardReveal"); } catch(e2) {}

        document.getElementById("draw-close")?.addEventListener("click", () => { drawOverlay.classList.remove("active"); });
        document.getElementById("draw-select")?.addEventListener("click", () => {
            if (!hand.some(h => h.uid === card.uid) && hand.length < MAX_HAND) {
                hand.push(card);
                updateHand();
                const gridCard = grid.querySelector(`.arena-card[data-uid="${card.uid}"]`);
                if (gridCard) gridCard.classList.add("selected");
            }
            drawOverlay.classList.remove("active");
        });
    }

    // ── STATS SCROLL REVEAL + COUNT-UP ──────────
    function initStatsReveal() {
        const statsContainer = document.getElementById("arena-deck-stats");
        if (!statsContainer) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const stats = statsContainer.querySelectorAll(".arena-stat");
                stats.forEach((stat, i) => {
                    setTimeout(() => {
                        stat.classList.add("visible");
                        const valEl = stat.querySelector(".arena-stat-value");
                        if (valEl && valEl.dataset.count) {
                            countUp(valEl, parseInt(valEl.dataset.count), 1200);
                        }
                    }, i * 120);
                });
                observer.disconnect();
            });
        }, { root: arenaScroll, threshold: 0.3 });
        observer.observe(statsContainer);
    }

    // ── SUIT TAB FILTERING ──────────────────────
    if (!suitTabs) { console.warn("Card Arena: arena-suits element not found"); }
    suitTabs?.addEventListener("click", (e) => {
        const tab = e.target.closest(".arena-suit-tab");
        if (!tab) return;
        suitTabs.querySelectorAll(".arena-suit-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        renderCards(tab.dataset.suit);
    });

    // ── OPEN / CLOSE ARENA ──────────────────────
    const emojiCursor = document.getElementById("emoji-cursor");

    function openArena(e) {
        if (e && e.target.closest("a")) return;
        arena.classList.add("active");
        arenaScroll.scrollTop = 0;
        hand = [];
        updateHand();
        renderCards("all");
        suitTabs?.querySelectorAll(".arena-suit-tab").forEach(t => t.classList.remove("active"));
        suitTabs?.querySelector('[data-suit="all"]')?.classList.add("active");
        if (emojiCursor) emojiCursor.style.display = "none";
        initParticles();
        initCursorGlow();
        initStatsReveal();
        try { playSound("cardReveal"); } catch(e2) {}
    }

    function closeArena() {
        arena.classList.remove("active");
        handEl.classList.remove("visible");
        drawOverlay.classList.remove("active");
        identityEl.classList.remove("active");
        if (particleRAF) { cancelAnimationFrame(particleRAF); particleRAF = null; }
        if (emojiCursor) emojiCursor.style.display = "";
    }

    // Wire hero card — tap only, not scroll
    let _heroTouchStartY = 0;
    let _heroTouchStartX = 0;
    heroCard.addEventListener("click", (e) => { if (!e.target.closest("a")) openArena(e); });
    if (heroWrapper) heroWrapper.addEventListener("click", (e) => { if (!e.target.closest("a")) openArena(e); });
    heroCard.addEventListener("touchstart", (e) => {
        _heroTouchStartY = e.touches[0].clientY;
        _heroTouchStartX = e.touches[0].clientX;
    }, { passive: true });
    heroCard.addEventListener("touchend", (e) => {
        if (e.target.closest("a")) return;
        const dy = Math.abs(e.changedTouches[0].clientY - _heroTouchStartY);
        const dx = Math.abs(e.changedTouches[0].clientX - _heroTouchStartX);
        // Only open if finger moved less than 10px (true tap, not scroll)
        if (dy < 10 && dx < 10) {
            e.preventDefault(); openArena(e);
        }
    });

    // Close handlers
    document.getElementById("arena-exit")?.addEventListener("click", closeArena);
    document.getElementById("arena-return")?.addEventListener("click", closeArena);
    document.getElementById("arena-draw-btn")?.addEventListener("click", randomDraw);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (identityEl.classList.contains("active")) { identityEl.classList.remove("active"); return; }
            if (drawOverlay.classList.contains("active")) { drawOverlay.classList.remove("active"); return; }
            if (arena.classList.contains("active")) closeArena();
        }
    });

    window._openCardArena = openArena;
}

/* Weather system moved to weather.js */
