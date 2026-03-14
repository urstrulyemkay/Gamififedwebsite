/* ============================================
   MAIN.JS — Full RPG Gamification Engine
   13 systems: cursor, minimap, combo, sound,
   levelup, toasts, fog, dialogue, bosses,
   radar, inventory, easter eggs, save game
   ============================================ */

/* ============================================
   ACCENT COLOR ENGINE — Apply & persist theme
   ============================================ */
function buildAccentOverrides(rgb) {
    let css = "";
    css += `:root { --accent: var(--user-accent) !important; --legendary: var(--user-accent) !important; }\n`;
    css += `.xp-bar-fill { background: linear-gradient(90deg, rgba(${rgb},0.6), var(--user-accent)) !important; box-shadow: 0 0 12px rgba(${rgb},0.4) !important; }\n`;
    css += `.xp-bar-marker { background: var(--user-accent) !important; box-shadow: 0 0 8px rgba(${rgb},0.5) !important; }\n`;
    css += `.sound-toggle:hover { border-color: var(--user-accent) !important; background: rgba(${rgb},0.05) !important; }\n`;
    css += `.nav-name:hover { color: var(--user-accent) !important; text-shadow: 0 0 20px rgba(${rgb},0.4) !important; }\n`;
    css += `.scroll-glow { background: linear-gradient(180deg, rgba(${rgb},0.06) 0%, transparent 100%) !important; }\n`;
    css += `.hero-card { border-color: rgba(${rgb},0.15) !important; }\n`;
    css += `.hero-card:hover { border-color: rgba(${rgb},0.3) !important; box-shadow: 0 0 40px rgba(${rgb},0.08) !important; }\n`;
    css += `.quest-card, .venture-card, .boss-card, .genai-card, .achievement-card, .stat-card { border-color: rgba(${rgb},0.08) !important; }\n`;
    css += `.shimmer-border::before { background: conic-gradient(from var(--shimmer-angle), transparent 0%, rgba(${rgb},0.3) 10%, transparent 20%) !important; }\n`;
    css += `.section-tag { color: var(--user-accent) !important; }\n`;
    css += `.badge-legendary { background: rgba(${rgb},0.15) !important; color: var(--user-accent) !important; border-color: rgba(${rgb},0.3) !important; }\n`;
    css += `.territory-name { color: var(--user-accent) !important; }\n`;
    css += `.resource-value { color: var(--user-accent) !important; }\n`;
    css += `.skill-bar-fill { background: linear-gradient(90deg, rgba(${rgb},0.7), var(--user-accent)) !important; box-shadow: 0 0 10px rgba(${rgb},0.4) !important; }\n`;
    css += `.combo-number { color: var(--user-accent) !important; }\n`;
    css += `.damage-float { color: var(--user-accent) !important; text-shadow: 0 0 10px rgba(${rgb},0.6) !important; }\n`;
    css += `.streak-counter.fire .streak-num { color: var(--user-accent) !important; }\n`;
    css += `.hcard-class { background: var(--user-accent) !important; color: #0A0A0A !important; }\n`;
    css += `.hp-fill { background: linear-gradient(90deg, #FF4444, var(--user-accent)) !important; }\n`;
    css += `.mana-fill { background: linear-gradient(90deg, #22D3EE, var(--user-accent)) !important; }\n`;
    css += `.hcard-tap-hint { color: rgba(${rgb},0.5) !important; }\n`;
    css += `.balloon-orb { box-shadow: 0 0 20px rgba(${rgb},0.15), inset 0 -8px 15px rgba(0,0,0,0.15) !important; }\n`;
    css += `.footer-link:hover { color: var(--user-accent) !important; }\n`;
    css += `.back-to-top { border-color: rgba(${rgb},0.2) !important; color: var(--user-accent) !important; }\n`;
    css += `.minimap-dot.active { background: var(--user-accent) !important; box-shadow: 0 0 8px rgba(${rgb},0.5) !important; }\n`;
    css += `.fog-section { border-bottom-color: rgba(${rgb},0.06) !important; }\n`;
    css += `.section-glow { background: radial-gradient(ellipse at center, rgba(${rgb},0.08) 0%, transparent 70%) !important; }\n`;
    css += `.boot-progress-fill { background: var(--user-accent) !important; box-shadow: 0 0 15px rgba(${rgb},0.5) !important; }\n`;
    css += `.boot-start-btn { border-color: var(--user-accent) !important; color: var(--user-accent) !important; }\n`;
    css += `.boot-start-btn:hover { background: var(--user-accent) !important; color: #0A0A0A !important; box-shadow: 0 0 30px rgba(${rgb},0.3) !important; }\n`;
    css += `.boot-emblem { text-shadow: 0 0 30px rgba(${rgb},0.3) !important; }\n`;
    css += `.mission-tag { color: var(--user-accent) !important; }\n`;
    css += `.subscribe-btn { background: var(--user-accent) !important; }\n`;
    // Phase 5: Additional overrides for full element coverage
    css += `.hero-glow { background: radial-gradient(circle at 30% 50%, rgba(${rgb},0.04) 0%, transparent 50%) !important; }\n`;
    css += `.hero-glow-secondary { background: radial-gradient(circle at 70% 50%, rgba(${rgb},0.03) 0%, transparent 50%) !important; }\n`;
    css += `.quest-node { box-shadow: 0 0 16px rgba(${rgb},0.3) !important; background: var(--user-accent) !important; }\n`;
    css += `.quest-line { background: linear-gradient(to bottom, rgba(${rgb},0.3), rgba(${rgb},0.05)) !important; }\n`;
    css += `.minimap-dot.visited { background: rgba(${rgb},0.25) !important; }\n`;
    css += `.nav-link:hover { color: var(--user-accent) !important; }\n`;
    css += `.nav-link.active { color: var(--user-accent) !important; }\n`;
    css += `.xp-badge { border-color: rgba(${rgb},0.3) !important; }\n`;
    css += `.xp-badge.pulse { box-shadow: 0 0 20px rgba(${rgb},0.4) !important; }\n`;
    css += `.boss-hp-fill { background: linear-gradient(90deg, #FF4444, var(--user-accent)) !important; }\n`;
    css += `.card-flip-back { border-color: rgba(${rgb},0.2) !important; }\n`;
    css += `.confetti { background: var(--user-accent) !important; }\n`;
    css += `.explosion-particle { background: var(--user-accent) !important; box-shadow: 0 0 6px rgba(${rgb},0.8) !important; }\n`;
    css += `.explosion-ring { border-color: rgba(${rgb},0.4) !important; }\n`;
    css += `.footer-spark { background: var(--user-accent) !important; box-shadow: 0 0 4px rgba(${rgb},0.8) !important; }\n`;
    css += `.mascot-bubble { border-color: rgba(${rgb},0.15) !important; }\n`;
    css += `.loot-drop-toast { border-color: rgba(${rgb},0.2) !important; }\n`;
    css += `.element-reselect:hover { border-color: var(--user-accent) !important; box-shadow: 0 0 16px rgba(${rgb},0.2) !important; }\n`;
    css += `.boot-progress-bar { border-color: rgba(${rgb},0.15) !important; }\n`;
    // Additional missing selectors for full element coverage
    css += `.skill-row:hover { border-color: rgba(${rgb},0.15) !important; }\n`;
    css += `.skill-detail-tip { background: rgba(${rgb},0.08) !important; border-color: rgba(${rgb},0.15) !important; }\n`;
    css += `.skill-detail-tip .tip-rank { color: var(--user-accent) !important; }\n`;
    css += `.inventory-slot:hover { border-color: rgba(${rgb},0.3) !important; box-shadow: 0 0 12px rgba(${rgb},0.15) !important; }\n`;
    css += `.dialogue-option:hover { border-color: rgba(${rgb},0.3) !important; color: var(--user-accent) !important; }\n`;
    css += `.dialogue-option .option-key { background: rgba(${rgb},0.15) !important; color: var(--user-accent) !important; }\n`;
    css += `.achievement-card:hover { border-color: rgba(${rgb},0.2) !important; }\n`;
    css += `.genai-card:hover { border-color: rgba(${rgb},0.2) !important; }\n`;
    css += `.venture-card:hover { border-color: rgba(${rgb},0.2) !important; }\n`;
    css += `.quest-card:hover { border-color: rgba(${rgb},0.15) !important; }\n`;
    css += `.stat-card { border-color: rgba(${rgb},0.1) !important; }\n`;
    css += `.stat-card:hover { border-color: rgba(${rgb},0.2) !important; }\n`;
    css += `.levelup-toast { border-color: rgba(${rgb},0.3) !important; }\n`;
    css += `.achievement-toast { border-color: rgba(${rgb},0.3) !important; }\n`;
    css += `.save-banner { border-color: rgba(${rgb},0.2) !important; }\n`;
    css += `.save-banner .save-icon { color: var(--user-accent) !important; }\n`;
    css += `.boss-card:hover { border-color: rgba(${rgb},0.2) !important; }\n`;
    css += `.minimap-tooltip { background: rgba(${rgb},0.1) !important; border-color: rgba(${rgb},0.2) !important; }\n`;
    css += `.xp-tooltip { border-color: rgba(${rgb},0.2) !important; }\n`;
    css += `.mobile-menu a.active { color: var(--user-accent) !important; }\n`;
    css += `.hamburger-open span { background: var(--user-accent) !important; }\n`;
    return css;
}

let _accentSheet = null;
function applyAccentColor(hex, rgb, save) {
    document.documentElement.style.setProperty("--user-accent", hex);
    document.documentElement.style.setProperty("--accent", hex);
    document.documentElement.style.setProperty("--legendary", hex);
    document.documentElement.style.setProperty("--element-rgb", rgb);
    if (!_accentSheet) {
        _accentSheet = document.createElement("style");
        _accentSheet.id = "accent-override-sheet";
        document.head.appendChild(_accentSheet);
    }
    _accentSheet.textContent = buildAccentOverrides(rgb);
    if (save !== false) {
        localStorage.setItem("mkj_accent_hex", hex);
        localStorage.setItem("mkj_accent_rgb", rgb);
    }
}

/* Apply body class for element visual personality (elements.css) */
function applyElementPersonality(elementId) {
    const elements = ["fire", "water", "earth", "air", "ether"];
    elements.forEach(e => document.body.classList.remove("element-" + e));
    if (elementId && elements.includes(elementId)) {
        document.body.classList.add("element-" + elementId);
    }
}

/* ============================================
   CENTRALIZED SCROLL MANAGER — One listener, many subscribers
   Throttles at ~60fps via rAF, avoids 12+ individual scroll listeners
   ============================================ */
const ScrollManager = (function() {
    const subscribers = [];
    let ticking = false;
    let scrollY = 0;
    let scrollPct = 0;
    let docHeight = 1;

    function update() {
        scrollY = window.scrollY;
        docHeight = document.documentElement.scrollHeight - window.innerHeight || 1;
        scrollPct = scrollY / docHeight;
        for (let i = 0; i < subscribers.length; i++) subscribers[i](scrollY, scrollPct);
        ticking = false;
    }

    window.addEventListener("scroll", function() {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });

    return {
        on: function(fn) { subscribers.push(fn); },
        off: function(fn) { const i = subscribers.indexOf(fn); if (i > -1) subscribers.splice(i, 1); },
        getScrollY: function() { return scrollY; },
        getScrollPct: function() { return scrollPct; },
        fire: function() { update(); }
    };
})();

/* Shared DOM cache — queried once, reused everywhere */
const DOMCache = {
    _sectionCount: 0,
    _discoveredCount: 0,
    getSectionCount: function() {
        if (!this._sectionCount) this._sectionCount = document.querySelectorAll(".section").length || 12;
        return this._sectionCount;
    },
    getDiscoveredCount: function() {
        return this._discoveredCount;
    },
    updateDiscovered: function(n) { this._discoveredCount = n; }
};

document.addEventListener("DOMContentLoaded", () => {
    const C = window.CONTENT;
    if (!C) { console.error("content.js not loaded"); return; }

    // Migrate old test panel keys
    if (localStorage.getItem("mkj_test_accent")) {
        if (!localStorage.getItem("mkj_accent_hex")) {
            localStorage.setItem("mkj_accent_hex", localStorage.getItem("mkj_test_accent"));
            localStorage.setItem("mkj_accent_rgb", localStorage.getItem("mkj_test_accent_rgb"));
        }
        localStorage.removeItem("mkj_test_accent");
        localStorage.removeItem("mkj_test_accent_rgb");
    }

    // Restore saved element + accent color before anything renders
    window._currentElement = localStorage.getItem("mkj_element") || "water";
    applyElementPersonality(window._currentElement);
    const savedHex = localStorage.getItem("mkj_accent_hex");
    const savedRgb = localStorage.getItem("mkj_accent_rgb");
    if (savedHex && savedRgb) {
        applyAccentColor(savedHex, savedRgb, false);
    }

    // Lock scroll during boot
    document.body.style.overflow = "hidden";

    buildFromContent(C);

    // Main site startup — called after element is chosen (or immediately for returning visitors)
    function startMainSite() {
        console.log("[Main] startMainSite() called");
        document.body.style.overflow = "";
        document.body.classList.add("game-active");

        // Safe init helper — prevents one failed system from breaking the rest
        function safeInit(name, fn) {
            try { fn(); } catch(e) { console.error("[Init] " + name + " failed:", e); }
        }

        safeInit("Particles", () => initParticles());
        safeInit("Terminal", () => initTerminal(C));
        safeInit("XPBar", () => initXPBar());
        safeInit("SkillBars", () => initSkillBars());
        safeInit("XPCounter", () => initXPCounter());
        safeInit("Hamburger", () => initHamburger());
        safeInit("NavHighlight", () => initNavHighlight());
        safeInit("ScrollHintFade", () => initScrollHintFade());
        safeInit("TiltCards", () => initTiltCards());
        safeInit("AchievementBadgeReveal", () => initAchievementBadgeReveal());
        safeInit("EmojiCursor", () => initEmojiCursor(C));
        safeInit("Minimap", () => initMinimap());
        safeInit("ComboCounter", () => initComboCounter());
        safeInit("SoundSystem", () => initSoundSystem());
        safeInit("LevelUpToasts", () => initLevelUpToasts());
        safeInit("AchievementToasts", () => initAchievementToasts(C));
        safeInit("FogOfWar", () => initFogOfWar());
        safeInit("DialogueBox", () => initDialogueBox(C));
        safeInit("BossBattles", () => initBossBattles(C));
        safeInit("RadarChart", () => initRadarChart(C));
        safeInit("Inventory", () => initInventory(C));
        safeInit("EasterEggs", () => initEasterEggs(C));
        safeInit("SaveGame", () => initSaveGame());
        safeInit("TerritoryHUD", () => initTerritoryHUD(C));
        safeInit("ResourceHUD", () => initResourceHUD());
        safeInit("QuestSounds", () => initQuestSounds());
        safeInit("HoverSounds", () => initHoverSounds());
        safeInit("SectionSounds", () => initSectionSounds());
        safeInit("BackToTop", () => initBackToTop());
        safeInit("ScrollGlow", () => initScrollGlow());
        safeInit("GenAICardLinks", () => initGenAICardLinks());
        safeInit("ParallaxHero", () => initParallaxHero());
        safeInit("SectionInView", () => initSectionInView());
        safeInit("IdleNudges", () => initIdleNudges());
        safeInit("InteractiveXPBar", () => initInteractiveXPBar());
        safeInit("DamageNumbers", () => initDamageNumbers());
        safeInit("ScrollStreak", () => initScrollStreak());
        safeInit("MainMascot", () => initMainMascot(C));
        safeInit("BossClickBattle", () => initBossClickBattle());
        safeInit("CardFlip", () => initCardFlip());
        safeInit("ConfettiBurst", () => initConfettiBurst());
        safeInit("HeaderTypewriter", () => initHeaderTypewriter());
        safeInit("MagneticHover", () => initMagneticHover());
        safeInit("SkillHoverDetails", () => initSkillHoverDetails());
        safeInit("GenAISpellEffect", () => initGenAISpellEffect());
        safeInit("VentureRocket", () => initVentureRocket());
        safeInit("AchievementShake", () => initAchievementShake());
        safeInit("DialogueTyping", () => initDialogueTyping());
        safeInit("FooterSparkle", () => initFooterSparkle());
        safeInit("CommandPalette", () => initCommandPalette(C));
        safeInit("StoryBar", () => initStoryBar(C));
        safeInit("DynamicDifficulty", () => initDynamicDifficulty());
        safeInit("RoleSelection", () => initRoleSelection(C));
        safeInit("PersistentAchievements", () => initPersistentAchievements());
        safeInit("MobileSwipe", () => initMobileSwipe());
        safeInit("SideCallouts", () => initSideCallouts());
        safeInit("LoreNotes", () => initLoreNotes());
        safeInit("StoryOverlay", () => initStoryOverlay(C));
        safeInit("CardArena", () => {
            if (typeof initCardArena === "function") {
                initCardArena(C);
            } else {
                console.error("[Main] initCardArena not found! card-arena.js may not be loaded.");
            }
        });
        safeInit("LootDrops", () => { if (typeof initLootDrops === "function") initLootDrops(C); });
        safeInit("ParallaxStarField", () => initParallaxStarField());
        safeInit("CursorEvolution", () => initCursorEvolution());
        safeInit("PatternGate", () => initPatternGate());
        safeInit("BalloonSounds", () => initBalloonSounds());
        safeInit("Subscribe", () => initSubscribe(C));
        // Setup element reselect button (small icon in nav)
        safeInit("ElementReselectButton", () => initElementReselectButton(C));
        safeInit("FogGates", () => initFogGates());
        // Weather system is in weather.js (self-initializing)
        // Must run LAST — after all dynamic content is built
        initScrollReveal();
    }

    initBootScreen(C, () => {
        // Always show element arena after boot — every visit
        try {
            showElementArena(C, () => {
                try { startMainSite(); } catch(e) { console.error("startMainSite error:", e); }
            });
        } catch(e) {
            console.error("showElementArena error:", e);
            // Fallback: skip arena, go straight to main site
            startMainSite();
        }
    });
});

/* ============================================
   GAME BOOT SCREEN
   Age of Empires / GTA mission briefing style
   ============================================ */
function initBootScreen(C, onComplete) {
    const boot = document.getElementById("game-boot");
    const canvas = document.getElementById("boot-canvas");
    const progress = document.getElementById("boot-progress");
    const progressText = document.getElementById("boot-progress-text");
    const startBtn = document.getElementById("boot-start-btn");
    const titleEl = document.getElementById("mission-title");

    if (!boot) { onComplete(); return; }

    // 5-element particle system on canvas
    if (canvas) {
        const ctx = canvas.getContext("2d");
        const W = canvas.width = window.innerWidth;
        const H = canvas.height = window.innerHeight;
        const cx = W / 2, cy = H / 2;

        // Element color palette — bias toward selected element
        const elColors = [
            { r: 255, g: 107, b: 53 },  // Fire
            { r: 34,  g: 211, b: 238 },  // Water
            { r: 74,  g: 222, b: 128 },  // Earth
            { r: 224, g: 231, b: 255 },  // Air
            { r: 167, g: 139, b: 250 },  // Ether
        ];
        // Add extra copies of the selected element's color for bias
        const selEl = window._currentElement || "water";
        const elMap = { fire: 0, water: 1, earth: 2, air: 3, ether: 4 };
        const selIdx = elMap[selEl] !== undefined ? elMap[selEl] : 1;
        for (let b = 0; b < 3; b++) elColors.push(elColors[selIdx]);

        const particles = [];
        for (let i = 0; i < 200; i++) {
            const c = elColors[Math.floor(Math.random() * elColors.length)];
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * Math.max(W, H) * 0.7;
            particles.push({
                x: cx + Math.cos(angle) * dist,
                y: cy + Math.sin(angle) * dist,
                r: Math.random() * 2 + 0.3,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                c, o: Math.random() * 0.4 + 0.1,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005,
            });
        }

        // Connecting lines for nearby particles
        let animId;
        function draw() {
            ctx.clearRect(0, 0, W, H);

            // Central glow — uses selected element color
            const selC = elColors[selIdx];
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 300);
            grad.addColorStop(0, `rgba(${selC.r},${selC.g},${selC.b},0.04)`);
            grad.addColorStop(0.5, `rgba(${selC.r},${selC.g},${selC.b},0.02)`);
            grad.addColorStop(1, "transparent");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, W, H);

            // Draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx; p.y += p.vy;
                p.pulse += p.pulseSpeed;
                const osc = Math.sin(p.pulse) * 0.15 + 0.85;

                // Wrap around
                if (p.x < -10) p.x = W + 10;
                if (p.x > W + 10) p.x = -10;
                if (p.y < -10) p.y = H + 10;
                if (p.y > H + 10) p.y = -10;

                const alpha = p.o * osc;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.c.r},${p.c.g},${p.c.b},${alpha})`;
                ctx.fill();

                // Glow for larger particles
                if (p.r > 1.5) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${p.c.r},${p.c.g},${p.c.b},${alpha * 0.15})`;
                    ctx.fill();
                }

                // Connect nearby particles (sparse, for performance)
                if (i % 3 === 0) {
                    for (let j = i + 1; j < particles.length; j += 3) {
                        const q = particles[j];
                        const dx = p.x - q.x, dy = p.y - q.y;
                        const dist = dx * dx + dy * dy;
                        if (dist < 12000) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
                            ctx.strokeStyle = `rgba(${selC.r},${selC.g},${selC.b},${0.03 * (1 - dist / 12000)})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
            }
            animId = requestAnimationFrame(draw);
        }
        draw();
        boot.addEventListener("transitionend", () => { cancelAnimationFrame(animId); }, { once: true });
    }

    // Type the mission title — min-height on CSS prevents layout shift
    const titleText = "The Voyage of " + C.profile.name;
    const cursorSpan = document.createElement("span");
    cursorSpan.className = "typing-cursor";
    titleEl.textContent = "";
    titleEl.appendChild(cursorSpan);

    let charIdx = 0;
    function typeTitle() {
        if (charIdx < titleText.length) {
            titleEl.textContent = titleText.slice(0, charIdx + 1);
            titleEl.appendChild(cursorSpan);
            charIdx++;
            setTimeout(typeTitle, 45);
        } else {
            setTimeout(() => cursorSpan.remove(), 2000);
        }
    }
    setTimeout(typeTitle, 1500);

    // Fake loading progress with element-themed steps
    const loadSteps = [
        { pct: 12, text: "IGNITING FIRE ELEMENT..." },
        { pct: 25, text: "CHANNELING WATER FLOW..." },
        { pct: 40, text: "GROUNDING EARTH CORE..." },
        { pct: 55, text: "SUMMONING AIR CURRENTS..." },
        { pct: 70, text: "AWAKENING ETHER VISION..." },
        { pct: 85, text: "COMPILING QUEST LOG..." },
        { pct: 95, text: "MAPPING ALL TERRITORIES..." },
        { pct: 100, text: "WORLD READY" },
    ];
    let stepIdx = 0;
    function advanceProgress() {
        if (stepIdx >= loadSteps.length) {
            startBtn.classList.add("ready");
            return;
        }
        const step = loadSteps[stepIdx];
        progress.style.width = step.pct + "%";
        progressText.textContent = step.text;
        stepIdx++;
        setTimeout(advanceProgress, 350 + Math.random() * 300);
    }
    setTimeout(advanceProgress, 2000);

    // Dismiss boot
    function dismiss() {
        try { playSound("bootDismiss"); } catch(e) {}
        boot.classList.add("dismissed");
        setTimeout(() => {
            boot.style.display = "none";
            try { onComplete(); } catch(e) { console.error("Boot onComplete error:", e); }
        }, 1200);
    }

    startBtn.addEventListener("click", dismiss);
    document.addEventListener("keydown", function handler(e) {
        if (e.key === "Enter" && startBtn.classList.contains("ready")) {
            document.removeEventListener("keydown", handler);
            dismiss();
        }
    });
}

/* ============================================
   TERRITORY HUD
   Age of Empires "Entering territory" banner
   ============================================ */
function initTerritoryHUD(C) {
    const banner = document.getElementById("territory-banner");
    const iconEl = document.getElementById("territory-icon");
    const tagEl = document.getElementById("territory-tag");
    const nameEl = document.getElementById("territory-name");
    if (!banner) return;

    const territories = C.territories || {};

    let currentTerritory = null;
    let hideTimer = null;

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const t = territories[id];
                if (t && id !== currentTerritory) {
                    currentTerritory = id;
                    iconEl.textContent = t.icon;
                    tagEl.textContent = t.tag;
                    nameEl.textContent = t.name;

                    banner.classList.remove("show");
                    void banner.offsetWidth;
                    banner.classList.add("show");
                    playSound("territory-" + id);

                    clearTimeout(hideTimer);
                    hideTimer = setTimeout(() => banner.classList.remove("show"), 3000);
                }
            }
        });
    }, { threshold: 0.35, rootMargin: "-72px 0px -40% 0px" });

    sections.forEach(s => observer.observe(s));
}

/* ============================================
   RESOURCE HUD (strategy game resources)
   ============================================ */
function initResourceHUD() {
    const hud = document.getElementById("resource-hud");
    const intelEl = document.getElementById("res-intel");
    const xpEl = document.getElementById("res-xp");
    const terrEl = document.getElementById("res-territories");
    if (!hud) return;

    let intel = 0;
    let territories = new Set();
    const totalSections = document.querySelectorAll("section[id]").length;

    // Show HUD after a short delay
    setTimeout(() => hud.classList.add("visible"), 500);

    // Intel increases as user reads (scroll time)
    let scrollTimer;
    let scrolling = false;
    ScrollManager.on(function() {
        if (!scrolling) { scrolling = true; }
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function() { scrolling = false; }, 200);
    });

    setInterval(() => {
        if (scrolling || document.hasFocus()) {
            intel += 1;
            intelEl.textContent = intel;
        }
        // XP from scroll
        const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const xp = Math.round(progress * 74500);
        xpEl.textContent = xp.toLocaleString();
    }, 1000);

    // Territory tracking
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                if (!territories.has(id)) {
                    territories.add(id);
                    terrEl.textContent = territories.size + "/" + totalSections;
                    playSound("resource-" + id);
                    const item = terrEl.closest(".resource-item");
                    item.classList.remove("flash");
                    void item.offsetWidth;
                    item.classList.add("flash");
                }
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(s => observer.observe(s));
}

/* ============================================
   BUILD FROM CONTENT
   ============================================ */
function buildFromContent(C) {
    // ── Build boot screen from CMS ──
    buildBootContent(C);

    // ── Build nav links from CMS ──
    buildNavLinks(C);

    // ── Build section headers from CMS ──
    buildSectionHeaders(C);

    // ── SEO: update document title ──
    if (C.seo) document.title = C.seo.title;

    const navName = document.getElementById("nav-name");
    if (navName) navName.textContent = C.profile.shortName;

    const footerName = document.getElementById("footer-name");
    if (footerName) footerName.textContent = C.profile.name;

    const footerLinks = document.getElementById("footer-links");
    if (footerLinks) {
        [
            { label: "LinkedIn", url: C.profile.linkedIn },
            { label: "Medium", url: C.profile.medium },
            { label: "Substack", url: C.profile.substack },
            { label: "X / Twitter", url: C.profile.twitter },
            { label: "Topmate", url: C.profile.topmate },
            { label: "Meetbytravel", url: C.profile.meetbytravel },
        ].forEach(l => { const a = document.createElement("a"); a.href = l.url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = l.label; footerLinks.appendChild(a); });
    }

    buildTimeline("professional-timeline", C.professional);
    if (C.entrepreneurship) buildVentures(C.entrepreneurship);
    buildAcademicCards(C.academic);
    buildSkills(C.skills);
    buildAchievements(C.achievements);
    if (C.genaiPortfolio) buildGenAI(C.genaiPortfolio);
    if (C.portfolio) buildPortfolio(C.portfolio);
    buildInventoryGrid(C);
}

function buildInventoryGrid(C) {
    const grid = document.getElementById("inventory-grid");
    if (!grid || !C.inventory) return;
    const rarityColors = { legendary: "#E4FF1A", epic: "#A8FF00", rare: "#4ADE80" };
    const lanes = { legendary: [], epic: [], rare: [] };
    C.inventory.forEach(item => { (lanes[item.rarity] || lanes.rare).push(item); });

    const laneOrder = ["legendary", "epic", "rare"];
    const laneMeta = {
        legendary: { label: "LEGENDARY", vehicle: "\u{1F3CE}\uFE0F", vClass: "supercar", speed: 35 },
        epic:      { label: "EPIC",      vehicle: "\u{1F69B}",       vClass: "suv",      speed: 28 },
        rare:      { label: "RARE",      vehicle: "\u{1F3CD}\uFE0F", vClass: "bike",     speed: 22 },
    };

    laneOrder.forEach((rarity, i) => {
        const items = lanes[rarity];
        if (!items.length) return;
        const color = rarityColors[rarity];
        const meta = laneMeta[rarity];
        const dir = i % 2 === 0 ? "left" : "right";
        const dirArrow = dir === "left" ? "\u25B6" : "\u25C0";

        const cards = items.map(item => `
            <div class="inv-vehicle inv-${meta.vClass}" style="--card-color:${color}">
                <span class="inv-vtype">${meta.vehicle}</span>
                <span class="inv-icon">${item.icon}</span>
                <span class="inv-name">${item.name}</span>
                <span class="inv-headlight"></span>
                <div class="inv-tooltip">${item.desc}</div>
            </div>`).join("");

        grid.insertAdjacentHTML("beforeend", `
            <div class="inv-lane reveal" data-direction="${dir}" data-rarity="${rarity}">
                <div class="inv-lane-label" style="color:${color}; border-color:${color}40">
                    <span class="inv-lane-icon">${meta.vehicle}</span> ${meta.label}
                    <span class="inv-lane-arrow">${dirArrow}</span>
                </div>
                <div class="inv-lane-track">
                    <div class="inv-lane-scroll" style="--lane-speed:${meta.speed}s">${cards}${cards}</div>
                </div>
            </div>`);
    });

    /* Pause lane on hover */
    grid.querySelectorAll(".inv-vehicle").forEach(v => {
        v.addEventListener("mouseenter", () => { v.closest(".inv-lane-scroll").style.animationPlayState = "paused"; });
        v.addEventListener("mouseleave", () => { v.closest(".inv-lane-scroll").style.animationPlayState = "running"; });
    });
}

/* Build boot screen entirely from CMS data */
function buildBootContent(C) {
    const container = document.getElementById("boot-content");
    if (!container || !C.boot) return;
    const b = C.boot;
    const els = (b.elements || []).map(e => `
        <div class="element-orb" data-element="${e.id}" title="${e.title}">
            <div class="orb-inner">
                <span class="orb-icon">${e.icon}</span>
                <span class="orb-label">${e.label}</span>
            </div>
        </div>`).join("");
    const ebarItems = (b.elements || []).map(e => `
        <div class="ebar-item" data-el="${e.id}">
            <span class="ebar-dot" style="background:${e.color}"></span>
            <span class="ebar-name">${e.stat}</span>
            <span class="ebar-val">${e.value}</span>
        </div>`).join("");
    const mstats = (b.stats || []).map(s => `
        <div class="mission-stat">
            <span class="stat-key">${s.key}</span>
            <span class="stat-value">${s.value}</span>
        </div>`).join("");
    container.innerHTML = `
        <div class="boot-logo" id="boot-logo">
            <div class="element-orbit" id="element-orbit">${els}</div>
            <div class="boot-emblem-wrap">
                <div class="emblem-ring"></div>
                <div class="emblem-ring emblem-ring--inner"></div>
                <div class="boot-emblem">${b.emblem || C.profile.shortName}</div>
            </div>
            <div class="boot-studio">${b.studioName}</div>
        </div>
        <div class="boot-mission" id="boot-mission">
            <div class="mission-header">
                <span class="mission-tag">${b.missionTag}</span>
                <span class="mission-chapter">${b.chapter}</span>
            </div>
            <h1 class="mission-title" id="mission-title"></h1>
            <p class="mission-brief">${b.brief}</p>
            <div class="element-bar" id="element-bar">${ebarItems}</div>
            <div class="mission-stats">${mstats}</div>
            <div class="boot-progress-wrap" id="boot-progress-wrap">
                <div class="boot-progress-track">
                    <div class="boot-progress-fill" id="boot-progress"></div>
                </div>
                <span class="boot-progress-text" id="boot-progress-text">LOADING WORLD...</span>
            </div>
            <button class="boot-start-btn" id="boot-start-btn">
                <span class="btn-text">${b.startBtn || "BEGIN EXPEDITION"}</span>
                <span class="btn-hint">${b.startHint || "PRESS ENTER OR CLICK"}</span>
            </button>
        </div>`;
}

/* Build nav links from CMS */
function buildNavLinks(C) {
    const desktop = document.getElementById("nav-links-desktop");
    const mobile = document.getElementById("mobile-menu");
    if (!desktop || !C.nav) return;
    C.nav.forEach(n => {
        desktop.insertAdjacentHTML("beforeend",
            `<a href="#${n.id}" class="nav-link" data-section="${n.id}">${n.label}</a>`);
        if (mobile) mobile.insertAdjacentHTML("beforeend",
            `<a href="#${n.id}" class="mobile-link">${n.label}</a>`);
    });
}

/* Build section headers from CMS */
function buildSectionHeaders(C) {
    if (!C.sectionHeaders) return;
    document.querySelectorAll("[data-section-key]").forEach(el => {
        const key = el.getAttribute("data-section-key");
        const h = C.sectionHeaders[key];
        if (h) {
            el.innerHTML = `<p class="section-tag reveal">${h.tag}</p><h2 class="section-title reveal">${h.title}</h2>`;
        }
    });
}

function buildTimeline(id, quests) {
    const el = document.getElementById(id);
    if (!el) return;
    quests.forEach((q, i) => {
        const last = i === quests.length - 1;
        el.insertAdjacentHTML("beforeend", `
            <div class="quest reveal" data-xp="${q.xp}">
                <div class="quest-node ${q.current ? 'pulse-node' : ''}"></div>
                ${!last ? '<div class="quest-line"></div>' : ''}
                <div class="quest-content tilt-card">
                    <div class="quest-header">
                        <span class="quest-year">${q.year}</span>
                        <span class="quest-xp">+${q.xp.toLocaleString()} XP</span>
                    </div>
                    <h3 class="quest-title">${q.url ? `<a href="${q.url}" target="_blank" rel="noopener noreferrer" class="quest-link">${q.title}</a>` : q.title}</h3>
                    <p class="quest-desc">${q.desc}</p>
                    <div class="quest-badges">${q.badges.map(b => `<span class="badge badge-${b.rank}">${b.text}</span>`).join("")}</div>
                </div>
            </div>`);
    });
}

function buildAcademicCards(items) {
    const el = document.getElementById("academic-tree");
    if (!el) return;

    // Reverse so oldest (B.Tech) is at bottom, newest at top — like a skill tree ascending
    const sorted = [...items].reverse();
    const treeIcons = ["\u{1F4DA}", "\u{1F393}", "\u{1F3DB}\uFE0F", "\u{1F9E0}"];

    sorted.forEach((q, i) => {
        const ongoing = q.year.includes("Ongoing");
        const isLast = i === sorted.length - 1;
        // Alternate left/right for branch effect
        const side = i % 2 === 0 ? "left" : "right";

        el.insertAdjacentHTML("beforeend", `
            <div class="tree-node reveal ${side} ${ongoing ? 'tree-ongoing' : ''}" data-index="${i}">
                <div class="tree-connector">
                    <div class="tree-dot ${ongoing ? 'tree-dot-active' : ''}"></div>
                    ${!isLast ? '<div class="tree-trunk"></div>' : ''}
                </div>
                <div class="tree-branch">
                    <div class="tree-content tilt-card">
                        ${ongoing ? '<div class="tree-status">ACTIVE</div>' : ''}
                        <div class="tree-header">
                            <span class="tree-icon">${treeIcons[i % treeIcons.length]}</span>
                            <span class="tree-year">${q.year}</span>
                        </div>
                        <h3 class="tree-title">${q.url ? `<a href="${q.url}" target="_blank" rel="noopener">${q.title}</a>` : q.title}</h3>
                        <p class="tree-desc">${q.desc}</p>
                        <div class="tree-footer">
                            <span class="tree-xp">+${q.xp.toLocaleString()} XP</span>
                            <div class="tree-badges">${q.badges.map(b => `<span class="badge badge-${b.rank}">${b.text}</span>`).join("")}</div>
                        </div>
                    </div>
                </div>
            </div>`);
    });
}

function buildSkills(skills) {
    const el = document.getElementById("skills-list");
    const totalEl = document.getElementById("xp-total");
    if (!el) return;
    const total = skills.reduce((a, s) => a + s.level * 100, 0);
    if (totalEl) { totalEl.setAttribute("data-target", total.toString()); totalEl.textContent = "0"; }
    const rc = l => l >= 90 ? "#E4FF1A" : l >= 80 ? "#A8FF00" : l >= 70 ? "#4ADE80" : "#22D3EE";
    const rn = l => l >= 90 ? "legendary" : l >= 80 ? "epic" : l >= 70 ? "rare" : "common";
    skills.forEach(s => {
        el.insertAdjacentHTML("beforeend", `
            <div class="skill-row reveal" data-level="${s.level}">
                <div class="skill-icon">${s.icon}</div>
                <div class="skill-info">
                    <div class="skill-meta">
                        <span class="skill-name">${s.name}</span>
                        <div class="skill-rank-group">
                            <span class="skill-rank rank-${rn(s.level)}">${rn(s.level).toUpperCase()}</span>
                            <span class="skill-level" style="color:${rc(s.level)}">${s.level}</span>
                        </div>
                    </div>
                    <div class="skill-bar-track"><div class="skill-bar-fill" data-width="${s.level}" style="--bar-color:${rc(s.level)}"></div></div>
                </div>
            </div>`);
    });
}

function buildAchievements(achievements) {
    const el = document.getElementById("achievement-grid");
    if (!el) return;
    achievements.forEach(a => {
        const sc = a.size === "large" ? "card-large" : a.size === "small" ? "card-small" : "";
        el.insertAdjacentHTML("beforeend", `
            <div class="achievement-card ${sc} reveal tilt-card" style="--card-color:${a.color}">
                <div class="card-glow"></div>
                <div class="card-icon" style="--card-color:${a.color}">${a.icon}</div>
                <div class="card-text"><h3>${a.title}</h3><p>${a.subtitle}</p></div>
                <span class="card-badge" style="--card-color:${a.color}">UNLOCKED</span>
            </div>`);
    });
}

function buildVentures(ventures) {
    const el = document.getElementById("venture-grid");
    if (!el) return;
    ventures.forEach(v => {
        const productsHTML = v.products ? `<div class="venture-products">${v.products.map(p =>
            `<div class="venture-product" data-sound="${p.sound}"><span class="venture-product-icon">${p.icon}</span><span class="venture-product-name">${p.name}</span></div>`
        ).join("")}</div>` : "";
        el.insertAdjacentHTML("beforeend", `
            <div class="venture-card reveal tilt-card">
                <div class="venture-header">
                    <span class="venture-year">${v.year}</span>
                    <span class="quest-xp">+${v.xp.toLocaleString()} XP</span>
                </div>
                <h3 class="venture-title">${v.url ? `<a href="${v.url}" target="_blank" rel="noopener noreferrer" class="quest-link">${v.title}</a>` : v.title}</h3>
                <p class="venture-desc">${v.desc}</p>
                ${productsHTML}
                <div class="quest-badges">${v.badges.map(b => `<span class="badge badge-${b.rank}">${b.text}</span>`).join("")}</div>
            </div>`);
    });
}

function buildPortfolio(items) {
    const el = document.getElementById("portfolio-grid");
    if (!el) return;
    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "portfolio-card reveal";
        card.innerHTML = `
            <div class="portfolio-card-header">
                <span class="portfolio-icon">${item.icon}</span>
                <div>
                    <h3 class="portfolio-title">${item.title}</h3>
                    <p class="portfolio-desc">${item.desc}</p>
                </div>
            </div>
            <div class="portfolio-embed-wrap">
                <iframe
                    loading="lazy"
                    src="${item.embedUrl}"
                    allowfullscreen="allowfullscreen"
                    allow="fullscreen"
                    style="width:100%;height:100%;border:none;border-radius:12px;"
                ></iframe>
            </div>`;
        el.appendChild(card);
    });
}

function buildGenAI(items) {
    const el = document.getElementById("genai-grid");
    if (!el) return;
    items.forEach(item => {
        el.insertAdjacentHTML("beforeend", `
            <div class="genai-card reveal tilt-card"${item.url ? ` data-url="${item.url}"` : ''}>
                <div class="genai-icon">${item.icon}</div>
                <div class="genai-info">
                    <h3 class="genai-name">${item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="quest-link">${item.name}</a>` : item.name}</h3>
                    <p class="genai-desc">${item.desc}</p>
                </div>
            </div>`);
    });
}

/* ============================================
   1. EMOJI AVATAR CURSOR
   ============================================ */
function initEmojiCursor(C) {
    const cursor = document.getElementById("emoji-cursor");
    if (!cursor || window.innerWidth < 768) return;
    const emojiEl = cursor.querySelector(".cursor-emoji");
    const labelEl = cursor.querySelector(".cursor-label");
    let currentSection = "default";

    const cfg = C.cursor;
    emojiEl.textContent = cfg.default.emoji;
    labelEl.textContent = cfg.default.label;

    document.addEventListener("mousemove", e => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    // Detect section under cursor
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                const id = entry.target.id;
                if (id !== currentSection && cfg[id]) {
                    currentSection = id;
                    cursor.classList.add("transition");
                    emojiEl.textContent = cfg[id].emoji;
                    labelEl.textContent = cfg[id].label;
                    playSound("whoosh-" + id);
                    setTimeout(() => cursor.classList.remove("transition"), 400);
                }
            }
        });
    }, { threshold: 0.3, rootMargin: "-72px 0px -40% 0px" });

    sections.forEach(s => observer.observe(s));
}

/* ============================================
   2. MINIMAP
   ============================================ */
function initMinimap() {
    const container = document.getElementById("minimap-dots");
    if (!container || window.innerWidth < 768) return;
    const sections = document.querySelectorAll("section[id]");
    const sectionIds = [];

    const labelMap = {
        "about": "Origin", "quest-log": "Career", "academic": "Academy",
        "ventures": "Ventures", "boss-battles": "Bosses", "skill-tree": "Skills",
        "stats": "Stats", "genai": "GenAI", "portfolio": "Portfolio",
        "inventory": "Armory", "achievements": "Trophies", "contact": "Quest"
    };
    sections.forEach(s => {
        sectionIds.push(s.id);
        const dot = document.createElement("div");
        dot.className = "minimap-dot";
        dot.setAttribute("data-label", labelMap[s.id] || s.id);
        dot.addEventListener("click", () => { playSound("mapPing"); s.scrollIntoView({ behavior: "smooth" }); });
        container.appendChild(dot);
    });

    const dots = container.querySelectorAll(".minimap-dot");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx === -1) return;
            if (entry.isIntersecting) {
                dots.forEach(d => d.classList.remove("active"));
                dots[idx].classList.add("active");
                dots[idx].classList.add("visited");
            }
        });
    }, { threshold: 0.3, rootMargin: "-72px 0px -50% 0px" });

    sections.forEach(s => observer.observe(s));
}

/* ============================================
   3. COMBO COUNTER
   ============================================ */
function initComboCounter() {
    const counter = document.getElementById("combo-counter");
    const numEl = document.getElementById("combo-number");
    if (!counter || window.innerWidth < 768) return;

    let combo = 0;
    let lastSection = null;
    let comboTimer = null;
    const visited = new Set();

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                if (id !== lastSection) {
                    lastSection = id;
                    if (!visited.has(id)) {
                        visited.add(id);
                        combo++;
                        numEl.textContent = combo;
                        counter.classList.add("visible");
                        counter.classList.remove("pulse");
                        void counter.offsetWidth;
                        counter.classList.add("pulse");
                        playSound("combo");

                        clearTimeout(comboTimer);
                        comboTimer = setTimeout(() => {
                            counter.classList.remove("visible");
                        }, 5000);
                    }
                }
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));
}


/* ============================================
   5. LEVEL-UP NOTIFICATIONS
   ============================================ */
function initLevelUpToasts() {
    const toast = document.getElementById("levelup-toast");
    const desc = document.getElementById("levelup-desc");
    if (!toast) return;

    const thresholds = [25, 50, 75, 100];
    const fired = new Set();

    ScrollManager.on(function(scrollY, scrollPct) {
        const progress = Math.round(scrollPct * 100);
        const level = Math.floor(scrollPct * 9) + 1;
        thresholds.forEach(t => {
            if (progress >= t && !fired.has(t)) {
                fired.add(t);
                desc.textContent = "You reached LVL " + level + "!";
                toast.classList.add("show");
                playSound("levelup");
                setTimeout(() => toast.classList.remove("show"), 3000);
            }
        });
    });
}

/* ============================================
   6. ACHIEVEMENT TOASTS
   ============================================ */
function initAchievementToasts(C) {
    const toast = document.getElementById("achievement-toast");
    const titleEl = document.getElementById("ach-toast-title");
    const descEl = document.getElementById("ach-toast-desc");
    const iconEl = document.getElementById("ach-toast-icon");
    if (!toast) return;

    const fired = new Set();
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const t = C.toasts[id];
                if (t && !fired.has(id)) {
                    fired.add(id);
                    titleEl.textContent = t.title;
                    descEl.textContent = t.desc;
                    iconEl.textContent = "\u{1F3C6}";
                    toast.classList.add("show");
                    playSound("toast-" + id);
                    setTimeout(() => toast.classList.remove("show"), 3500);
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(s => observer.observe(s));
}

/* ============================================
   7. FOG OF WAR
   ============================================ */
function initFogOfWar() {
    const sections = document.querySelectorAll(".fog-section");
    sections.forEach((s, i) => {
        if (i === 0) return; // Don't fog the hero
        const fog = document.createElement("div");
        fog.className = "fog-overlay";
        fog.innerHTML = '<div class="fog-lock">&#x1F512;</div><div class="fog-text">Scroll to unlock</div>';
        s.appendChild(fog);
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fog = entry.target.querySelector(".fog-overlay");
                if (fog && !fog.classList.contains("cleared")) {
                    fog.classList.add("cleared");
                    entry.target.classList.add("fog-revealed");
                    playSound("fog-" + entry.target.id);
                    setTimeout(() => fog.remove(), 800);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0, rootMargin: "100px 0px" });

    sections.forEach(s => observer.observe(s));
}

/* ============================================
   8. DIALOGUE BOX CTA
   ============================================ */
function initDialogueBox(C) {
    const nameEl = document.getElementById("dialogue-npc-name");
    const textEl = document.getElementById("dialogue-text");
    const optionsEl = document.getElementById("dialogue-options");
    if (!nameEl || !C.dialogue) return;

    nameEl.textContent = C.dialogue.npcName;
    textEl.textContent = C.dialogue.greeting;

    C.dialogue.options.forEach((opt, i) => {
        const a = document.createElement("a");
        a.className = "dialogue-option";
        a.href = opt.action;
        a.innerHTML = `<span class="dialogue-choice-num">${i + 1}</span> ${opt.text}`;
        if (opt.action.startsWith("http")) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
        a.addEventListener("click", () => playSound("click"));
        optionsEl.appendChild(a);
    });

    // Keyboard shortcuts for dialogue options (1-4)
    document.addEventListener("keydown", (e) => {
        const num = parseInt(e.key);
        if (num >= 1 && num <= C.dialogue.options.length) {
            const option = optionsEl.querySelectorAll(".dialogue-option")[num - 1];
            if (option) { playSound("click"); option.click(); }
        }
    });

    // Play dialogue sound when contact section enters view
    const contactSection = document.getElementById("contact");
    if (contactSection) {
        const dObs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { playSound("dialogueOpen"); dObs.unobserve(e.target); } });
        }, { threshold: 0.3 });
        dObs.observe(contactSection);
    }
}

/* ============================================
   9. BOSS BATTLES
   ============================================ */
function initBossBattles(C) {
    const grid = document.getElementById("boss-grid");
    if (!grid || !C.bosses) return;
    // Guard against double-init
    if (grid.children.length > 0) return;

    C.bosses.forEach(b => {
        grid.insertAdjacentHTML("beforeend", `
            <div class="boss-card reveal tilt-card">
                <div class="boss-card-header">
                    <span class="boss-name">${b.name}</span>
                    <span class="boss-year">${b.year}</span>
                </div>
                <p class="boss-story">${b.story || b.desc || ""}</p>
                ${b.learning ? `<div class="boss-learning"><span class="boss-section-tag">LEARNING</span><p>${b.learning}</p></div>` : ""}
                ${b.scar ? `<div class="boss-scar"><span class="boss-section-tag">SCAR</span><p>${b.scar}</p></div>` : ""}
                <div class="boss-hp-bar">
                    <div class="boss-hp-label">HP</div>
                    <div class="boss-hp-track"><div class="boss-hp-fill" data-defeated="${b.defeated}"></div></div>
                </div>
                <div class="boss-card-footer">
                    <div class="boss-reward">${b.reward}</div>
                    ${b.defeated ? '<span class="boss-status boss-defeated">DEFEATED</span>' : ''}
                </div>
            </div>`);
    });

    // Animate HP bars on scroll
    const bars = grid.querySelectorAll(".boss-hp-fill");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                if (bar.dataset.defeated === "true") {
                    bar.style.width = "100%";
                    setTimeout(() => bar.classList.add("depleted"), 800);
                    playSound("boss");
                }
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach(b => observer.observe(b));

    // Battle Scars — news bulletin ticker
    const scarsEl = document.getElementById("battle-scars");
    if (scarsEl && C.battleScars) {
        const items = C.battleScars.map(s => `<span class="ticker-item"><span class="ticker-dot">\u2694\uFE0F</span> ${s}</span>`).join("");
        scarsEl.innerHTML = `
            <div class="battle-scars-header">
                <span class="ticker-badge">BATTLE SCARS</span>
                <span class="ticker-label">What the bosses taught me</span>
            </div>
            <div class="ticker-track">
                <div class="ticker-scroll">${items}${items}</div>
            </div>`;
    }
}

/* ============================================
   10. RADAR CHART (Character Stats)
   ============================================ */
function initRadarChart(C) {
    const canvas = document.getElementById("radar-chart");
    const legendEl = document.getElementById("stats-legend");
    if (!canvas || !C.stats) return;

    const ctx = canvas.getContext("2d");
    const stats = C.stats;
    const n = stats.values.length;

    // Build legend
    stats.labels.forEach((label, i) => {
        legendEl.insertAdjacentHTML("beforeend", `
            <div class="stat-row">
                <span class="stat-abbr">${label}</span>
                <span class="stat-full">${stats.fullLabels[i]}</span>
                <span class="stat-desc">${stats.descriptions[i]}</span>
                <span class="stat-val">${stats.values[i]}</span>
            </div>`);
    });

    // Draw on scroll
    let drawn = false;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !drawn) {
                drawn = true;
                drawRadar(ctx, canvas, stats, n);
                observer.unobserve(canvas);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(canvas);
}

function drawRadar(ctx, canvas, stats, n) {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const maxR = Math.min(cx, cy) - 40;

    ctx.clearRect(0, 0, w, h);

    // Draw grid rings
    for (let r = 1; r <= 5; r++) {
        const radius = (r / 5) * maxR;
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
            const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Draw axis lines + labels
    for (let i = 0; i < n; i++) {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        const x = cx + Math.cos(angle) * maxR;
        const y = cy + Math.sin(angle) * maxR;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgba(255,255,255,0.04)";
        ctx.stroke();

        // Label — use element accent color
        const accentRgb = localStorage.getItem("mkj_accent_rgb") || "228,255,26";
        const accentHex = localStorage.getItem("mkj_accent_hex") || "#E4FF1A";
        const lx = cx + Math.cos(angle) * (maxR + 20);
        const ly = cy + Math.sin(angle) * (maxR + 20);
        ctx.fillStyle = `rgba(${accentRgb},0.7)`;
        ctx.font = "bold 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(stats.labels[i], lx, ly);
    }

    // Animate data polygon
    let progress = 0;
    function animate() {
        progress = Math.min(progress + 0.03, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const aRgb = localStorage.getItem("mkj_accent_rgb") || "228,255,26";
        const aHex = localStorage.getItem("mkj_accent_hex") || "#E4FF1A";

        // Clear and redraw grid
        ctx.clearRect(0, 0, w, h);
        for (let r = 1; r <= 5; r++) {
            const radius = (r / 5) * maxR;
            ctx.beginPath();
            for (let i = 0; i <= n; i++) {
                const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
                const x2 = cx + Math.cos(angle) * radius;
                const y2 = cy + Math.sin(angle) * radius;
                i === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
            }
            ctx.strokeStyle = "rgba(255,255,255,0.06)";
            ctx.stroke();
        }

        for (let i = 0; i < n; i++) {
            const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
            ctx.beginPath(); ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
            ctx.strokeStyle = "rgba(255,255,255,0.04)"; ctx.stroke();
            const lx = cx + Math.cos(angle) * (maxR + 20);
            const ly = cy + Math.sin(angle) * (maxR + 20);
            ctx.fillStyle = `rgba(${aRgb},0.7)`;
            ctx.font = "bold 11px Inter, sans-serif";
            ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText(stats.labels[i], lx, ly);
        }

        // Data polygon
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
            const idx = i % n;
            const angle = (Math.PI * 2 / n) * idx - Math.PI / 2;
            const val = (stats.values[idx] / 100) * maxR * eased;
            const x = cx + Math.cos(angle) * val;
            const y = cy + Math.sin(angle) * val;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.fillStyle = `rgba(${aRgb},0.12)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${aRgb},0.6)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Data points
        for (let i = 0; i < n; i++) {
            const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
            const val = (stats.values[i] / 100) * maxR * eased;
            const x = cx + Math.cos(angle) * val;
            const y = cy + Math.sin(angle) * val;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = aHex;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${aRgb},0.15)`;
            ctx.fill();
        }

        if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

/* ============================================
   11. INVENTORY GRID
   ============================================ */
function initInventory(C) {
    // Play sound when inventory section scrolls into view
    const invSection = document.getElementById("inventory");
    if (invSection) {
        const iObs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { playSound("inventoryOpen"); iObs.unobserve(e.target); } });
        }, { threshold: 0.2 });
        iObs.observe(invSection);
    }
}

/* ============================================
   12. EASTER EGGS
   ============================================ */
function initEasterEggs(C) {
    // Konami code
    const konami = [38,38,40,40,37,39,37,39,66,65];
    let konamiIdx = 0;
    document.addEventListener("keydown", e => {
        if (e.keyCode === konami[konamiIdx]) {
            konamiIdx++;
            if (konamiIdx === konami.length) {
                konamiIdx = 0;
                showEasterEgg(C.easterEggs.konamiReward);
            }
        } else {
            konamiIdx = 0;
        }
    });

    // MKJ Logo — cool tap interaction
    let mkjClicks = 0;
    let mkjClickTimer = null;
    const navName = document.getElementById("nav-name");
    if (navName) {
        navName.style.cursor = "pointer";
        navName.style.userSelect = "none";
        navName.style.position = "relative";

        const mkjFacts = [
            "Built products for 200M+ users",
            "$250M+ ARR portfolio owner",
            "India's 1st Hinglish AI that passed Turing test",
            "2X Founder \u2014 GoI funded",
            "CFA L2 Candidate + HSBC IB PPO",
            "Top 30 NITI Aayog Social Innovator",
            "MBA from Xavier \u2014 10+ national case wins",
            "TVS Future Leaders Program inductee",
            "Loves Japanese \u{1F1EF}\u{1F1F5} \u2014 5 languages spoken",
            "Master of Business Laws \u2014 NLSIU",
        ];
        let factIndex = 0;

        navName.addEventListener("click", (e) => {
            // Return to boot/entry screen
            const boot = document.getElementById("game-boot");
            if (boot) {
                window.scrollTo({ top: 0 });
                boot.style.display = "";
                boot.classList.remove("dismissed");
                document.body.style.overflow = "hidden";

                // Re-enable the start button to dismiss again
                const startBtn = document.getElementById("boot-start-btn");
                if (startBtn) {
                    startBtn.classList.add("ready");
                    const dismissAgain = () => {
                        playSound("bootDismiss");
                        boot.classList.add("dismissed");
                        document.body.style.overflow = "";
                        setTimeout(() => boot.style.display = "none", 1200);
                        startBtn.removeEventListener("click", dismissAgain);
                        document.removeEventListener("keydown", keyHandler);
                    };
                    const keyHandler = (ev) => {
                        if (ev.key === "Enter") dismissAgain();
                    };
                    startBtn.addEventListener("click", dismissAgain);
                    document.addEventListener("keydown", keyHandler);
                }
            }

            mkjClicks++;
            clearTimeout(mkjClickTimer);

            // Burst particles from MKJ logo
            const rect = navName.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            for (let i = 0; i < 12; i++) {
                const p = document.createElement("div");
                p.className = "mkj-particle";
                const angle = (Math.PI * 2 * i) / 12;
                const dist = 40 + Math.random() * 60;
                const hue = Math.round(Math.random() * 60 + 60); // lime-green range
                p.style.cssText = `
                    position:fixed; left:${cx}px; top:${cy}px; width:${4 + Math.random()*4}px;
                    height:${4 + Math.random()*4}px; border-radius:50%; pointer-events:none;
                    background:hsl(${hue},100%,60%); z-index:99999;
                    box-shadow: 0 0 6px hsl(${hue},100%,60%);
                    transition: all 0.6s cubic-bezier(0.16,1,0.3,1);
                `;
                document.body.appendChild(p);
                requestAnimationFrame(() => {
                    p.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0)`;
                    p.style.opacity = "0";
                });
                setTimeout(() => p.remove(), 700);
            }

            // Glitch effect on logo
            navName.classList.add("mkj-glitch");
            setTimeout(() => navName.classList.remove("mkj-glitch"), 300);

            // Play unique tap sound (pitch rises with combo)
            playSound("mkjTap-" + Math.min(mkjClicks, 5));

            // Show random fact tooltip after 2+ taps
            if (mkjClicks >= 2) {
                let factTooltip = document.querySelector(".mkj-fact-tooltip");
                if (!factTooltip) {
                    factTooltip = document.createElement("div");
                    factTooltip.className = "mkj-fact-tooltip";
                    document.body.appendChild(factTooltip);
                }
                factTooltip.textContent = mkjFacts[factIndex % mkjFacts.length];
                factTooltip.style.left = cx + "px";
                factTooltip.style.top = (rect.bottom + 12) + "px";
                factTooltip.classList.remove("visible");
                void factTooltip.offsetWidth;
                factTooltip.classList.add("visible");
                factIndex++;
                setTimeout(() => factTooltip.classList.remove("visible"), 2500);
            }

            // 5-click easter egg still works
            if (mkjClicks >= 5) {
                mkjClicks = 0;
                showEasterEgg(C.easterEggs.clickCombo);
            }
            mkjClickTimer = setTimeout(() => mkjClicks = 0, 1500);
        });
    }
}

function showEasterEgg(egg) {
    const toast = document.getElementById("achievement-toast");
    const titleEl = document.getElementById("ach-toast-title");
    const descEl = document.getElementById("ach-toast-desc");
    const iconEl = document.getElementById("ach-toast-icon");
    if (!toast) return;

    iconEl.textContent = egg.icon;
    titleEl.textContent = egg.title;
    descEl.textContent = egg.desc;
    toast.classList.add("show");
    playSound("easterEgg");
    setTimeout(() => toast.classList.remove("show"), 4000);
}

/* ============================================
   13. SAVE GAME / RESUME
   ============================================ */
function initSaveGame() {
    const key = "mkj_save";
    const banner = document.getElementById("save-banner");
    const resumeBtn = document.getElementById("save-resume-btn");
    const dismissBtn = document.getElementById("save-dismiss-btn");
    const levelSpan = document.getElementById("save-level");

    // Check for saved position
    const saved = localStorage.getItem(key);
    if (saved && banner) {
        const data = JSON.parse(saved);
        if (data.scroll > 200) {
            levelSpan.textContent = data.level || 1;
            banner.classList.add("show");

            resumeBtn.addEventListener("click", () => {
                playSound("saveGame");
                window.scrollTo({ top: data.scroll, behavior: "smooth" });
                banner.classList.remove("show");
            });

            dismissBtn.addEventListener("click", () => {
                banner.classList.remove("show");
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    }

    // Save position periodically (debounced via ScrollManager + timeout)
    let saveTimer;
    ScrollManager.on(function(scrollY, scrollPct) {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(function() {
            var level = Math.floor(scrollPct * 9) + 1;
            localStorage.setItem(key, JSON.stringify({ scroll: scrollY, level: level, time: Date.now() }));
        }, 1000);
    });
}

/* ============================================
   EXISTING SYSTEMS (kept from before)
   ============================================ */

function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize(); window.addEventListener("resize", resize);
    document.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    const COUNT = Math.min(80, Math.floor(window.innerWidth / 20));
    class P { constructor() { this.x = Math.random()*canvas.width; this.y = Math.random()*canvas.height; this.vx = (Math.random()-0.5)*0.3; this.vy = (Math.random()-0.5)*0.3; this.r = Math.random()*1.5+0.5; this.o = Math.random()*0.3+0.1; }
        update() { this.x += this.vx; this.y += this.vy; const dx=this.x-mouse.x, dy=this.y-mouse.y, d=Math.sqrt(dx*dx+dy*dy); if(d<150){const f=(150-d)/150; this.x+=(dx/d)*f*2; this.y+=(dy/d)*f*2;} if(this.x<0)this.x=canvas.width; if(this.x>canvas.width)this.x=0; if(this.y<0)this.y=canvas.height; if(this.y>canvas.height)this.y=0; }
        draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=`rgba(228,255,26,${this.o})`; ctx.fill(); } }
    for(let i=0;i<COUNT;i++) particles.push(new P());
    function anim() { ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{p.update();p.draw();}); for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy); if(d<120){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(228,255,26,${(1-d/120)*0.08})`;ctx.lineWidth=0.5;ctx.stroke();}} requestAnimationFrame(anim); }
    if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches) anim();
}

/* ============================================
   HERO CHARACTER CARD
   ============================================ */
function initHeroCard(C) {
    const card = C.heroCard;
    if (!card) return;

    const classEl = document.getElementById("hcard-class");
    const levelEl = document.getElementById("hcard-level");
    const nameEl = document.getElementById("hcard-name");
    const taglineEl = document.getElementById("hcard-tagline");
    const barsEl = document.getElementById("hcard-bars");
    const summaryEl = document.getElementById("hcard-summary");
    const highlightsEl = document.getElementById("hcard-highlights");
    const tagsEl = document.getElementById("hcard-tags");

    if (!classEl) return;

    classEl.textContent = card.class;
    levelEl.textContent = "LVL " + card.level;
    nameEl.textContent = C.profile.name;
    taglineEl.textContent = card.summaryLines[0] + " " + card.summaryLines[1];

    // HP and Mana bars
    barsEl.innerHTML = `
        <div class="hcard-bar">
            <span class="hcard-bar-label">HP ${card.hp.toLocaleString()}</span>
            <div class="hcard-bar-track"><div class="hcard-bar-fill hp" id="hcard-hp"></div></div>
        </div>
        <div class="hcard-bar">
            <span class="hcard-bar-label">MANA ${card.mana}</span>
            <div class="hcard-bar-track"><div class="hcard-bar-fill mana" id="hcard-mana"></div></div>
        </div>
    `;

    // Clear previous content (prevent duplicates)
    summaryEl.innerHTML = "";
    highlightsEl.innerHTML = "";
    tagsEl.innerHTML = "";

    // Summary lines with stagger
    card.summaryLines.forEach((line, i) => {
        const div = document.createElement("div");
        div.className = "hcard-summary-line";
        div.textContent = line;
        div.style.animationDelay = (1.5 + i * 0.15) + "s";
        summaryEl.appendChild(div);
    });

    // Highlight stats with stagger
    card.highlights.forEach((h, i) => {
        const div = document.createElement("div");
        div.className = "hcard-highlight";
        div.style.animationDelay = (2.2 + i * 0.12) + "s";
        div.innerHTML = `<span class="hcard-hl-value">${h.value}</span><span class="hcard-hl-label">${h.label}</span>`;
        highlightsEl.appendChild(div);
    });

    // Tags
    card.tags.forEach((tag, i) => {
        const span = document.createElement("span");
        span.className = "hcard-tag";
        span.textContent = tag;
        span.style.animationDelay = (2.8 + i * 0.08) + "s";
        tagsEl.appendChild(span);
    });

    // Animate bars after card reveals
    setTimeout(() => {
        const hp = document.getElementById("hcard-hp");
        const mana = document.getElementById("hcard-mana");
        if (hp) hp.style.width = "100%";
        if (mana) mana.style.width = "100%";
        playSound("cardReveal");
    }, 1800);

    // Hero particle burst
    initHeroParticles();
}

function initHeroParticles() {
    const canvas = document.getElementById("hero-particles");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const burstCount = 60;

    // Create burst particles from center
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 / burstCount) * i;
        const speed = 1 + Math.random() * 3;
        particles.push({
            x: cx, y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            r: Math.random() * 2 + 0.5,
            life: 1,
            decay: 0.005 + Math.random() * 0.01,
            color: localStorage.getItem("mkj_accent_rgb") || "228,255,26"
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach(p => {
            if (p.life <= 0) return;
            alive = true;
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.99;
            p.vy *= 0.99;
            p.life -= p.decay;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color},${p.life * 0.5})`;
            ctx.fill();
        });
        if (alive) requestAnimationFrame(animate);
    }

    // Delay burst to match card reveal
    setTimeout(() => requestAnimationFrame(animate), 800);
}

function initTerminal(C) {
    // Terminal is no longer the hero — initHeroCard replaces it
    // Keeping function stub for compatibility
    initHeroCard(C);
}

function initScrollReveal(){const r=document.querySelectorAll(".reveal");const o=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.classList.add("visible");o.unobserve(en.target);}});},{threshold:0,rootMargin:"60px 0px"});r.forEach(el=>o.observe(el));}

function initXPBar(){
    const f=document.getElementById("xp-fill"),p=document.getElementById("xp-percent");
    const marker=document.getElementById("xp-bar-marker");
    const zonesEl=document.getElementById("xp-zones");
    const le=document.getElementById("xp-level");
    if(!f||!p)return;

    let lastLevel = 1;
    const levelNames = ["Novice","Scout","Warrior","Knight","Champion","Master","Legend","Myth","Immortal","God"];
    const totalSections = DOMCache.getSectionCount();

    function u(scrollY, scrollPct){
        const pr = typeof scrollPct === "number" ? Math.min(Math.max(scrollPct,0),1) : 0;
        const pc = Math.round(pr*100);
        f.style.width=pc+"%";
        p.textContent=pc+"%";
        if(marker) marker.style.left = pc + "%";

        const l=Math.floor(pr*9)+1;
        if(le) {
            le.textContent="LVL "+l+" "+levelNames[l-1];
            if(l > lastLevel) {
                le.classList.add("level-up");
                setTimeout(() => le.classList.remove("level-up"), 500);
            }
            lastLevel = l;
        }

        if(zonesEl) {
            zonesEl.textContent = DOMCache.getDiscoveredCount() + "/" + totalSections;
        }
    }
    ScrollManager.on(u);
    u(0, 0);
}

function initSkillBars(){const b=document.querySelectorAll(".skill-bar-fill");let soundPlayed=false;const o=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){const bar=en.target;bar.style.setProperty("--target-width",bar.getAttribute("data-width")+"%");const row=bar.closest(".skill-row");const all=[...document.querySelectorAll(".skill-row")];const idx=all.indexOf(row);setTimeout(()=>bar.classList.add("filled"),idx*60);if(!soundPlayed){soundPlayed=true;playSound("skillFill");}o.unobserve(bar);}});},{threshold:0.2,rootMargin:"-40px 0px"});b.forEach(bar=>o.observe(bar));}

function initXPCounter(){const c=document.getElementById("xp-total");if(!c)return;const t=parseInt(c.getAttribute("data-target"),10);if(!t)return;let a=false;const o=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting&&!a){a=true;playSound("xpGain");const s=performance.now();(function tick(now){const p=Math.min((now-s)/1500,1);c.textContent=Math.round((1-Math.pow(1-p,3))*t).toLocaleString();if(p<1)requestAnimationFrame(tick);})(s);o.unobserve(c);}});},{threshold:0.5});o.observe(c);}

function initHamburger(){const h=document.getElementById("hamburger"),m=document.getElementById("mobile-menu");if(!h||!m)return;h.addEventListener("click",()=>{h.classList.toggle("open");m.classList.toggle("open");});m.querySelectorAll(".mobile-link").forEach(l=>l.addEventListener("click",()=>{h.classList.remove("open");m.classList.remove("open");}));}

function initNavHighlight(){const s=document.querySelectorAll("section[id]"),n=document.querySelectorAll(".nav-link");const o=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){const id=en.target.id;n.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+id));}});},{threshold:0.3,rootMargin:"-64px 0px -50% 0px"});s.forEach(sec=>o.observe(sec));}

function initScrollHintFade(){const h=document.getElementById("scroll-hint");if(!h)return;let hid=false;ScrollManager.on(function(scrollY){if(!hid&&scrollY>100){h.style.opacity="0";hid=true;}});}

function initTiltCards(){document.querySelectorAll(".tilt-card").forEach(card=>{card.addEventListener("mousemove",e=>{const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;card.style.transform=`perspective(1000px) rotateX(${((y-r.height/2)/(r.height/2))*-3}deg) rotateY(${((x-r.width/2)/(r.width/2))*3}deg) translateY(-4px)`;});card.addEventListener("mouseleave",()=>{card.style.transform="perspective(1000px) rotateX(0) rotateY(0) translateY(0)";card.style.transition="transform 0.5s cubic-bezier(0.16,1,0.3,1)";});card.addEventListener("mouseenter",()=>{card.style.transition="transform 0.1s ease-out";});});}

function initAchievementBadgeReveal(){const c=document.querySelectorAll(".achievement-card");const o=new IntersectionObserver(e=>{e.forEach(en=>{if(en.isIntersecting){en.target.classList.add("visible");o.unobserve(en.target);}});},{threshold:0.2,rootMargin:"-40px 0px"});c.forEach(card=>o.observe(card));}

/* ============================================
   QUEST UNLOCK SOUNDS — timeline items
   ============================================ */
function initQuestSounds() {
    const proQuests = document.querySelectorAll("#professional-timeline .quest");
    const acadQuests = document.querySelectorAll("#academic-tree .tree-node");
    let proCount = 0, acadCount = 0;

    const proObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                proCount++;
                setTimeout(() => playSound("questUnlock"), proCount * 120);
                proObs.unobserve(en.target);
            }
        });
    }, { threshold: 0.3, rootMargin: "-60px 0px" });
    proQuests.forEach(q => proObs.observe(q));

    const acadObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                acadCount++;
                setTimeout(() => playSound("academicUnlock"), acadCount * 120);
                acadObs.unobserve(en.target);
            }
        });
    }, { threshold: 0.3, rootMargin: "-60px 0px" });
    acadQuests.forEach(q => acadObs.observe(q));
}

/* ============================================
   HOVER SOUNDS — interactive cards
   ============================================ */
function initHoverSounds() {
    const selectorSounds = [
        { sel: "#professional-timeline .quest-content", sound: "cardHover" },
        { sel: "#academic-tree .tree-content", sound: "hover" },
        { sel: ".venture-card", sound: "ventureHover" },
        { sel: ".genai-card", sound: "genaiHover" },
        { sel: ".boss-card", sound: "bossHover" },
        { sel: ".achievement-card", sound: "achievementHover" },
        { sel: ".inventory-slot", sound: "inventoryHover" },
        { sel: ".nav-link", sound: "navHover" },
        { sel: ".mobile-link", sound: "navHover" },
    ];
    let lastHover = 0;
    selectorSounds.forEach(({ sel, sound }) => {
        document.querySelectorAll(sel).forEach(el => {
            el.addEventListener("mouseenter", () => {
                const now = Date.now();
                if (now - lastHover > 150) {
                    lastHover = now;
                    playSound(sound);
                }
            });
        });
    });

    // Venture product pills — custom sounds per product
    document.querySelectorAll(".venture-product[data-sound]").forEach(el => {
        el.addEventListener("mouseenter", () => {
            const now = Date.now();
            if (now - lastHover > 150) {
                lastHover = now;
                playSound(el.dataset.sound);
            }
        });
    });
}

/* ============================================
   SECTION-SPECIFIC REVEAL SOUNDS
   ============================================ */
function initSectionSounds() {
    const sectionSounds = {
        "ventures": "ventureReveal",
        "stats": "statReveal",
        "portfolio": "portfolioOpen",
        "genai": "genaiReveal",
        "achievements": "achievementReveal",
        "boss-battles": "bossReveal",
        "skill-tree": "skillTreeReveal",
        "academic": "academicReveal"
    };
    Object.entries(sectionSounds).forEach(([id, sound]) => {
        const section = document.getElementById(id);
        if (!section) return;
        const o = new IntersectionObserver(entries => {
            entries.forEach(en => {
                if (en.isIntersecting) {
                    playSound(sound);
                    o.unobserve(en.target);
                }
            });
        }, { threshold: 0.2, rootMargin: "-80px 0px" });
        o.observe(section);
    });
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;
    ScrollManager.on(function(scrollY) { btn.classList.toggle("visible", scrollY > 600); });
    btn.addEventListener("click", () => {
        playSound("click");
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ============================================
   SCROLL GLOW — ambient gradient at top
   ============================================ */
function initScrollGlow() {
    const glow = document.getElementById("scroll-glow");
    if (!glow) return;
    ScrollManager.on(function(scrollY) { glow.classList.toggle("visible", scrollY > 200); });
}

/* ============================================
   GENAI CARDS — full card clickable
   ============================================ */
function initGenAICardLinks() {
    document.querySelectorAll(".genai-card[data-url]").forEach(card => {
        card.addEventListener("click", (e) => {
            // Don't interfere if user clicked the actual link
            if (e.target.closest("a")) return;
            const url = card.getAttribute("data-url");
            if (url) window.open(url, "_blank", "noopener,noreferrer");
        });
    });
}

/* ============================================
   PARALLAX HERO — subtle depth on scroll
   ============================================ */
function initParallaxHero() {
    // Skip on mobile — reduces jank and parallax is hard to perceive on touch anyway
    if (window.innerWidth < 768) return;
    const hero = document.querySelector(".hero-section");
    const glowPrimary = document.querySelector(".hero-glow");
    const card = document.getElementById("hero-card-wrapper");
    if (!hero) return;
    const heroH = hero.offsetHeight || 800;
    // Wait for cardReveal animation to finish (0.5s delay + 1.2s duration = 1.7s)
    // before attaching scroll-driven transforms to avoid fighting the keyframe animation
    let ready = false;
    setTimeout(function() { ready = true; }, 1800);
    ScrollManager.on(function(scrollY) {
        if (!ready) return;
        if (scrollY < heroH) {
            const ratio = scrollY / heroH;
            // translate3d forces GPU compositing, eliminating sub-pixel jitter
            if (card) card.style.transform = "translate3d(0," + (scrollY * 0.12) + "px,0) scale(" + (1 - ratio * 0.04) + ")";
            if (glowPrimary) glowPrimary.style.transform = "translate(-50%,-50%) scale(" + (1 + ratio * 0.3) + ")";
        } else {
            // Reset when hero is out of view so re-entry looks clean
            if (card) card.style.transform = "";
            if (glowPrimary) glowPrimary.style.transform = "";
        }
    });
}

/* ============================================
   SECTION IN-VIEW — smooth content fade-in
   ============================================ */
function initSectionInView() {
    const sections = document.querySelectorAll(".section");
    let discovered = 0;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.add("in-view");
                discovered++;
                DOMCache.updateDiscovered(discovered);
                observer.unobserve(en.target);
            }
        });
    }, { threshold: 0, rootMargin: "100px 0px" });
    sections.forEach(s => observer.observe(s));
}

/* ============================================
   IDLE ENGAGEMENT NUDGES
   Shows contextual prompts when user is idle
   ============================================ */
function initIdleNudges() {
    const nudgeEl = document.createElement("div");
    nudgeEl.className = "idle-nudge";
    nudgeEl.innerHTML = '<span class="nudge-icon"></span><span class="nudge-text"></span>';
    document.body.appendChild(nudgeEl);

    const nudges = [
        { icon: "\u2B07\uFE0F", text: "Keep scrolling to unlock more territories" },
        { icon: "\u{1F50D}", text: "Explore the skill tree below" },
        { icon: "\u{1F3C6}", text: "Trophy wall awaits your discovery" },
        { icon: "\u{1F52E}", text: "Check out the AI spell book" },
        { icon: "\u2694\uFE0F", text: "Boss battles lie ahead" },
        { icon: "\u{1F4CA}", text: "Inspect the character stats" },
        { icon: "\u{1F4DC}", text: "A final quest awaits at the end" },
        { icon: "\u{1F9D9}\u200D\u2642\uFE0F", text: "The arcane library has secrets" },
        { icon: "\u{1F680}", text: "Founder's forge needs exploring" },
        { icon: "\u{1F30D}", text: "More zones to discover" },
    ];

    let idleTimer = null;
    let nudgeIndex = 0;
    let dismissed = false;
    const IDLE_DELAY = 20000;

    function showNudge() {
        if (dismissed) return;
        const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (progress > 0.9) return;

        const nudge = nudges[nudgeIndex % nudges.length];
        nudgeEl.querySelector(".nudge-icon").textContent = nudge.icon;
        nudgeEl.querySelector(".nudge-text").textContent = nudge.text;
        nudgeEl.classList.add("visible");
        playSound("nudge");
        nudgeIndex++;

        setTimeout(() => nudgeEl.classList.remove("visible"), 5000);
    }

    function resetTimer() {
        clearTimeout(idleTimer);
        nudgeEl.classList.remove("visible");
        if (!dismissed) {
            idleTimer = setTimeout(showNudge, IDLE_DELAY);
        }
    }

    nudgeEl.addEventListener("click", () => {
        nudgeEl.classList.remove("visible");
        dismissed = true;
        clearTimeout(idleTimer);
    });

    window.addEventListener("scroll", resetTimer, { passive: true });
    window.addEventListener("mousemove", resetTimer, { passive: true });
    window.addEventListener("keydown", resetTimer);

    idleTimer = setTimeout(showNudge, IDLE_DELAY);
}

/* ============================================
   INTERACTIVE XP BAR — click to jump, tooltip,
   glow pulses, milestone particles
   ============================================ */
function initInteractiveXPBar() {
    const badge = document.querySelector(".xp-badge");
    const fill = document.getElementById("xp-fill");
    const pct = document.getElementById("xp-percent");
    const levelEl = document.querySelector(".xp-level");
    if (!badge || !fill) return;

    // Click on XP bar to jump to that % of the page
    const track = document.querySelector(".xp-bar-track");
    if (track) {
        track.style.cursor = "pointer";
        track.addEventListener("click", (e) => {
            const rect = track.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            const scrollTarget = ratio * (document.documentElement.scrollHeight - window.innerHeight);
            window.scrollTo({ top: scrollTarget, behavior: "smooth" });
            playSound("mapPing");

            // Burst particles from click point
            for (let i = 0; i < 6; i++) {
                spawnFloater(e.clientX, e.clientY, "+" + Math.round(ratio * 100) + "%", "var(--accent)");
            }
        });
    }

    // Hover tooltip on XP badge showing progress details
    const tooltip = document.createElement("div");
    tooltip.className = "xp-tooltip";
    badge.style.position = "relative";
    badge.appendChild(tooltip);

    badge.addEventListener("mouseenter", () => {
        var progress = Math.round(ScrollManager.getScrollPct() * 100);
        var level = Math.floor((progress / 100) * 9) + 1;
        tooltip.innerHTML = "<strong>LVL " + level + "</strong> Explorer<br>" + DOMCache.getDiscoveredCount() + "/" + DOMCache.getSectionCount() + " zones discovered<br>" + progress + "% journey complete";
        tooltip.classList.add("visible");
    });
    badge.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));

    // Glow pulse on XP bar at milestones
    let lastMilestone = 0;
    ScrollManager.on(function(scrollY, scrollPct) {
        var progress = Math.round(scrollPct * 100);
        var milestone = Math.floor(progress / 10) * 10;
        if (milestone > lastMilestone && milestone > 0) {
            lastMilestone = milestone;
            badge.classList.add("xp-milestone");
            setTimeout(function() { badge.classList.remove("xp-milestone"); }, 1000);
        }
    });
}

/* ============================================
   DAMAGE NUMBERS — float up on click anywhere
   ============================================ */
function initDamageNumbers() {
    let clickCount = 0;

    document.addEventListener("click", (e) => {
        // Skip on interactive elements
        if (e.target.closest("a, button, input, textarea, select, .dialogue-option, .boot-content, .nav-link, .mobile-link, .minimap-dot, .element-arena, .mood-selector, .balloon-link, .loot-collection")) return;

        clickCount++;
        const isCrit = clickCount % 7 === 0;
        const count = isCrit ? 24 : 12;
        const speed = isCrit ? 6 : 3.5;

        spawnExplosion(e.clientX, e.clientY, count, speed, isCrit);
        if (isCrit) playSound("combo");
    });
}

// Get current element config from content.js
function getElementConfig() {
    const C = window.CONTENT;
    if (!C || !C.boot || !C.boot.elements) return null;
    const id = window._currentElement || "water";
    return C.boot.elements.find(e => e.id === id) || C.boot.elements[1];
}

// Element-specific particle behavior
const ELEMENT_PARTICLE_BEHAVIOR = {
    fire:  { shape: "circle", drift: "rise",     sizeRange: [3,8],  durationRange: [300,500],  gravity: -1.5 },
    water: { shape: "circle", drift: "fall",     sizeRange: [2,6],  durationRange: [500,800],  gravity: 0.8 },
    earth: { shape: "square", drift: "scatter",  sizeRange: [3,7],  durationRange: [400,600],  gravity: 1.2 },
    air:   { shape: "circle", drift: "float",    sizeRange: [2,5],  durationRange: [600,1000], gravity: -0.5 },
    ether: { shape: "star",   drift: "spiral",   sizeRange: [2,6],  durationRange: [500,900],  gravity: 0 },
};

function spawnExplosion(x, y, count, speed, isCrit) {
    const elConfig = getElementConfig();
    const elId = window._currentElement || "water";
    const behavior = ELEMENT_PARTICLE_BEHAVIOR[elId] || ELEMENT_PARTICLE_BEHAVIOR.water;
    const elColors = (elConfig && elConfig.particleColors) || ["var(--accent)", "#FFFFFF"];

    const colors = isCrit
        ? [...elColors, "#FFD700", "#FFFFFF"]
        : [...elColors.slice(0, 3), "#FFFFFF"];

    for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        p.className = "explosion-particle";
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const dist = speed * (0.5 + Math.random() * 0.8);
        let dx = Math.cos(angle) * dist * 30;
        let dy = Math.sin(angle) * dist * 30;

        // Element-specific drift
        if (behavior.drift === "rise") dy -= 30 + Math.random() * 40;
        else if (behavior.drift === "fall") dy += 20 + Math.random() * 30;
        else if (behavior.drift === "float") { dx *= 1.5; dy -= 10 + Math.random() * 20; }
        else if (behavior.drift === "spiral") {
            const spiralAngle = angle + Math.PI * 0.5;
            dx += Math.cos(spiralAngle) * 20;
            dy += Math.sin(spiralAngle) * 20;
        }

        const size = behavior.sizeRange[0] + Math.random() * (behavior.sizeRange[1] - behavior.sizeRange[0]);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = behavior.durationRange[0] + Math.random() * (behavior.durationRange[1] - behavior.durationRange[0]);
        const borderRadius = behavior.shape === "square" ? "2px" : behavior.shape === "star" ? "0" : "50%";
        const rotation = behavior.shape === "star" ? `rotate(${Math.random()*360}deg)` : "";

        p.style.cssText = `
            position:fixed; left:${x}px; top:${y}px; width:${size}px; height:${size}px;
            border-radius:${borderRadius}; background:${color}; pointer-events:none; z-index:99999;
            box-shadow: 0 0 ${size * 2}px ${color};
            ${behavior.shape === "star" ? `clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);` : ""}
            transition: transform ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94), opacity ${duration}ms ease-out;
        `;
        document.body.appendChild(p);
        requestAnimationFrame(() => {
            p.style.transform = `translate(${dx}px, ${dy}px) scale(0) ${rotation}`;
            p.style.opacity = "0";
        });
        setTimeout(() => p.remove(), duration + 50);
    }

    // Center flash ring — element colored
    const ring = document.createElement("div");
    ring.className = "explosion-ring";
    const ringSize = isCrit ? 80 : 40;
    const ringColor = (elConfig && elConfig.color) || "var(--accent)";
    ring.style.cssText = `
        position:fixed; left:${x - ringSize/2}px; top:${y - ringSize/2}px;
        width:${ringSize}px; height:${ringSize}px; border-radius:50%;
        border: 2px solid ${isCrit ? "#FFD700" : ringColor};
        pointer-events:none; z-index:99998; opacity:0.8;
        transition: transform 0.4s ease-out, opacity 0.4s ease-out;
    `;
    document.body.appendChild(ring);
    requestAnimationFrame(() => {
        ring.style.transform = `scale(${isCrit ? 3 : 2})`;
        ring.style.opacity = "0";
    });
    setTimeout(() => ring.remove(), 450);
}

// Shared floating text utility
function spawnFloater(x, y, text, color, fontSize) {
    const el = document.createElement("div");
    el.className = "damage-floater";
    el.textContent = text;
    el.style.cssText = `
        left:${x}px; top:${y}px; color:${color || "var(--accent)"};
        font-size:${fontSize || 14}px;
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("float-up"));
    setTimeout(() => el.remove(), 900);
}

/* ============================================
   SCROLL STREAK — speed bonus counter
   ============================================ */
function initScrollStreak() {
    const streakEl = document.createElement("div");
    streakEl.className = "scroll-streak";
    streakEl.innerHTML = '<span class="streak-fire"></span><span class="streak-count"></span><span class="streak-label">SCROLL STREAK</span>';
    document.body.appendChild(streakEl);

    let lastScrollY = 0;
    let lastScrollTime = 0;
    let streak = 0;
    let streakTimer = null;
    const countEl = streakEl.querySelector(".streak-count");
    const fireEl = streakEl.querySelector(".streak-fire");

    ScrollManager.on(function(scrollY) {
        var now = Date.now();
        var delta = Math.abs(scrollY - lastScrollY);
        var timeDiff = now - lastScrollTime;

        if (timeDiff < 200 && delta > 30) {
            streak++;
            countEl.textContent = streak + "x";

            if (streak >= 3) {
                streakEl.classList.add("visible");
                if (streak >= 10) {
                    streakEl.classList.add("on-fire");
                    fireEl.textContent = "\u{1F525}\u{1F525}\u{1F525}";
                } else if (streak >= 5) {
                    streakEl.classList.add("hot");
                    fireEl.textContent = "\u{1F525}";
                } else {
                    fireEl.textContent = "\u26A1";
                }
            }

            clearTimeout(streakTimer);
            streakTimer = setTimeout(function() {
                if (streak >= 10) {
                    spawnFloater(window.innerWidth / 2, window.innerHeight / 2,
                        "SCROLL STREAK x" + streak + "!", "#FF5F57", 22);
                }
                streak = 0;
                streakEl.classList.remove("visible", "on-fire", "hot");
            }, 800);
        }

        lastScrollY = scrollY;
        lastScrollTime = now;
    });
}

/* ============================================
   BOSS BATTLE CLICK MINI-GAME
   Click boss cards to drain HP with effects
   ============================================ */
function initBossClickBattle() {
    document.querySelectorAll(".boss-card").forEach(card => {
        const hpFill = card.querySelector(".boss-hp-fill");
        if (!hpFill) return;

        let hp = 100;
        let clicks = 0;

        card.addEventListener("click", (e) => {
            if (e.target.closest("a")) return;
            clicks++;
            const dmg = 5 + Math.floor(Math.random() * 10);
            hp = Math.max(0, hp - dmg);

            // Animate HP bar
            hpFill.style.width = hp + "%";
            if (hp <= 0) {
                hpFill.classList.add("depleted");
                spawnFloater(e.clientX, e.clientY, "DEFEATED!", "#4ADE80", 20);
                playSound("levelup");
                card.classList.add("boss-defeated-shake");
                setTimeout(() => card.classList.remove("boss-defeated-shake"), 500);
            } else {
                spawnFloater(e.clientX, e.clientY, "-" + dmg + " HP", "#FF5F57", 16);
                card.classList.add("boss-hit");
                setTimeout(() => card.classList.remove("boss-hit"), 200);
            }

            playSound("bossHover");
        });
    });
}

/* ============================================
   CARD FLIP — double-click quest cards to
   reveal hidden stats on back
   ============================================ */
function initCardFlip() {
    document.querySelectorAll(".quest-content").forEach(card => {
        let flipped = false;
        const original = card.innerHTML;

        card.addEventListener("dblclick", (e) => {
            e.preventDefault();
            flipped = !flipped;
            card.classList.toggle("card-flipped", flipped);

            if (flipped) {
                playSound("cardReveal");
                // Show hidden lore on back
                const xp = card.closest(".quest")?.querySelector(".quest-xp")?.textContent || "+XP";
                const title = card.querySelector(".quest-title")?.textContent || "Quest";
                card.innerHTML = `
                    <div class="card-back-content">
                        <div class="card-back-header">SECRET INTEL</div>
                        <div class="card-back-stat"><span>Quest</span><span>${title}</span></div>
                        <div class="card-back-stat"><span>XP Earned</span><span>${xp}</span></div>
                        <div class="card-back-stat"><span>Status</span><span style="color:#4ADE80">COMPLETED</span></div>
                        <div class="card-back-hint">Double-click to flip back</div>
                    </div>
                `;
            } else {
                card.innerHTML = original;
            }
        });
    });
}

/* ============================================
   CONFETTI BURST on achievement card reveal
   ============================================ */
function initConfettiBurst() {
    const cards = document.querySelectorAll(".achievement-card");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                const rect = en.target.getBoundingClientRect();
                burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
                observer.unobserve(en.target);
            }
        });
    }, { threshold: 0.5 });
    cards.forEach(c => observer.observe(c));
}

function burstConfetti(cx, cy) {
    const elConfig = getElementConfig();
    const colors = (elConfig && elConfig.particleColors) || ["#22D3EE", "#67E8F9", "#06B6D4", "#FFFFFF", "#F59E0B"];
    for (let i = 0; i < 20; i++) {
        const el = document.createElement("div");
        el.className = "confetti-piece";
        const angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.3;
        const dist = 60 + Math.random() * 80;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 4 + Math.random() * 4;
        el.style.cssText = `
            position:fixed; left:${cx}px; top:${cy}px;
            width:${size}px; height:${size * 1.5}px;
            background:${color}; border-radius:2px; pointer-events:none;
            z-index:99999; opacity:1;
            transition: all 0.8s cubic-bezier(0.16,1,0.3,1);
        `;
        document.body.appendChild(el);
        requestAnimationFrame(() => {
            el.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist + 40}px) rotate(${Math.random()*360}deg)`;
            el.style.opacity = "0";
        });
        setTimeout(() => el.remove(), 900);
    }
}

/* ============================================
   SECTION HEADER TYPEWRITER — titles type in
   ============================================ */
function initHeaderTypewriter() {
    const headers = document.querySelectorAll(".section-title");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting && !en.target.dataset.typed) {
                en.target.dataset.typed = "true";
                const fullText = en.target.textContent;
                en.target.textContent = "";
                en.target.style.visibility = "visible";

                let i = 0;
                function typeChar() {
                    if (i < fullText.length) {
                        en.target.textContent += fullText[i];
                        i++;
                        setTimeout(typeChar, 30 + Math.random() * 30);
                    }
                }
                typeChar();
                observer.unobserve(en.target);
            }
        });
    }, { threshold: 0.3 });
    headers.forEach(h => observer.observe(h));
}

/* ============================================
   MAGNETIC HOVER — inventory items attract cursor
   ============================================ */
function initMagneticHover() {
    document.querySelectorAll(".inv-slot").forEach(slot => {
        slot.addEventListener("mousemove", (e) => {
            const rect = slot.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            const icon = slot.querySelector(".inv-icon");
            if (icon) {
                icon.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.2)`;
            }
        });
        slot.addEventListener("mouseleave", () => {
            const icon = slot.querySelector(".inv-icon");
            if (icon) icon.style.transform = "";
        });
    });
}

/* ============================================
   SKILL BAR HOVER — show detailed breakdown
   ============================================ */
function initSkillHoverDetails() {
    document.querySelectorAll(".skill-row").forEach(row => {
        const nameEl = row.querySelector(".skill-name");
        const levelEl = row.querySelector(".skill-level");
        if (!nameEl || !levelEl) return;

        const level = parseInt(levelEl.textContent) || 0;
        let rankText, rankColor;
        if (level >= 95) { rankText = "LEGENDARY"; rankColor = "var(--legendary)"; }
        else if (level >= 88) { rankText = "EPIC"; rankColor = "var(--epic)"; }
        else if (level >= 80) { rankText = "RARE"; rankColor = "var(--rare)"; }
        else { rankText = "COMMON"; rankColor = "var(--text-muted)"; }

        const tip = document.createElement("div");
        tip.className = "skill-detail-tip";
        tip.innerHTML = `
            <div class="sdt-rank" style="color:${rankColor}">${rankText}</div>
            <div class="sdt-bar-label">Mastery: ${level}/100</div>
            <div class="sdt-xp">~${level * 100} XP invested</div>
        `;
        row.style.position = "relative";
        row.appendChild(tip);
    });
}

/* ============================================
   GENAI CARD HOVER SPELL EFFECT
   ============================================ */
function initGenAISpellEffect() {
    document.querySelectorAll(".genai-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            const icon = card.querySelector(".genai-icon");
            if (icon) {
                icon.classList.add("spell-cast");
                setTimeout(() => icon.classList.remove("spell-cast"), 600);
            }
        });
    });
}

/* ============================================
   VENTURE CARD ROCKET LAUNCH on hover
   ============================================ */
function initVentureRocket() {
    document.querySelectorAll(".venture-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("venture-launch");
        });
        card.addEventListener("mouseleave", () => {
            card.classList.remove("venture-launch");
        });
    });
}

/* ============================================
   ACHIEVEMENT CARD SHAKE on hover
   ============================================ */
function initAchievementShake() {
    document.querySelectorAll(".achievement-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            const icon = card.querySelector(".card-icon");
            if (icon) {
                icon.classList.add("trophy-bounce");
                setTimeout(() => icon.classList.remove("trophy-bounce"), 600);
            }
        });
    });
}

/* ============================================
   DIALOGUE TYPING EFFECT — NPC text types out
   ============================================ */
function initDialogueTyping() {
    const textEl = document.getElementById("dialogue-text");
    if (!textEl) return;

    const fullText = textEl.textContent;
    let hasTyped = false;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting && !hasTyped) {
                hasTyped = true;
                textEl.textContent = "";
                textEl.classList.add("typing-active");

                let i = 0;
                function type() {
                    if (i < fullText.length) {
                        textEl.textContent += fullText[i];
                        i++;
                        setTimeout(type, 20 + Math.random() * 15);
                    } else {
                        textEl.classList.remove("typing-active");
                    }
                }
                type();
                observer.unobserve(en.target);
            }
        });
    }, { threshold: 0.3 });

    const section = document.getElementById("contact");
    if (section) observer.observe(section);
}

/* ============================================
   FOOTER SPARKLE — sparkles trail on footer hover
   ============================================ */
function initFooterSparkle() {
    const footer = document.querySelector(".footer");
    if (!footer) return;

    footer.addEventListener("mousemove", (e) => {
        if (Math.random() > 0.7) {
            const spark = document.createElement("div");
            spark.className = "footer-spark";
            spark.style.left = e.clientX + "px";
            spark.style.top = e.clientY + "px";
            document.body.appendChild(spark);
            setTimeout(() => spark.remove(), 600);
        }
    });
}

/* ============================================
   MASCOT — floating assistant for main page
   ============================================ */
function initMainMascot(C) {
    const mascot = document.getElementById("mascot");
    const bubbleText = document.getElementById("mascot-bubble-text");
    const body = document.getElementById("mascot-body");
    if (!mascot || !bubbleText) return;

    const tips = [
        "Scroll to explore my quest log!",
        "Double-click quest cards for secret intel.",
        "Click boss cards to battle them!",
        "Try the Konami code... \u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192BA",
        "Hover over skills to see mastery details.",
        "Check the XP bar \u2014 click it to jump!",
        "5 rapid clicks on MKJ = easter egg!",
        "Inventory items follow your cursor.",
        "Every section has a unique sound.",
        "Keep scrolling for a scroll streak bonus!",
    ];
    let tipIndex = 0;

    // Show first tip
    setTimeout(() => {
        bubbleText.textContent = tips[0];
    }, 2000);

    // Cycle tips on click
    body.addEventListener("click", () => {
        tipIndex = (tipIndex + 1) % tips.length;
        bubbleText.textContent = tips[tipIndex];
        body.style.transform = "scale(1.2)";
        playSound("nudge");
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

    // Context-aware tips based on current section
    const sections = document.querySelectorAll("section[id]");
    const sectionTips = {
        "about": "This is the origin citadel!",
        "quest-log": "9.5 years of product battles here.",
        "academic": "Triple degree threat \u2014 MBA + Law + Psychology.",
        "ventures": "2X Founder energy \u{1F680}",
        "boss-battles": "Click these cards to fight!",
        "skill-tree": "97/100 in Product Strategy!",
        "stats": "The radar chart shows my powers.",
        "genai": "AI spellbook \u2014 check out Finpist!",
        "portfolio": "Swipe through the case studies.",
        "inventory": "Hover for item details.",
        "achievements": "Every trophy was earned.",
        "contact": "Final quest \u2014 let's connect!",
    };

    const sectionObs = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                const tip = sectionTips[en.target.id];
                if (tip) bubbleText.textContent = tip;
            }
        });
    }, { threshold: 0.3 });
    sections.forEach(s => sectionObs.observe(s));
}

/* ============================================
   CMD+K COMMAND PALETTE
   ============================================ */
function initCommandPalette(C) {
    const overlay = document.getElementById("cmd-overlay");
    const input = document.getElementById("cmd-input");
    const results = document.getElementById("cmd-results");
    if (!overlay || !input || !results) return;

    // Build command registry
    const commands = [];

    // Sections
    (C.nav || []).forEach(n => {
        const terr = (C.territories || {})[n.id];
        commands.push({
            icon: terr ? terr.icon : "\u{1F4CD}",
            name: n.label,
            desc: terr ? terr.name : "Navigate to " + n.label,
            action: () => { document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" }); }
        });
    });

    // Actions
    commands.push(
        { icon: "\u{1F3AE}", name: "Restart Game", desc: "Go back to boot screen", action: () => {
            const boot = document.getElementById("game-boot");
            if (boot) { window.scrollTo({ top: 0 }); boot.style.display = ""; boot.classList.remove("dismissed"); document.body.style.overflow = "hidden"; }
        }},
        { icon: "\u{1F50A}", name: "Toggle Sound", desc: "Mute or unmute game sounds", action: () => { document.getElementById("sound-toggle")?.click(); }},
        { icon: "\u{1F4CA}", name: "Journey Summary", desc: "See your exploration stats", action: () => { showJourneySummary(); }},
        { icon: "\u{1F9E0}", name: "Skill Quiz", desc: "Test your knowledge about Mani", action: () => { startSkillQuiz(C); }},
        { icon: "\u2B50", name: "Scroll to Top", desc: "Back to the beginning", action: () => { window.scrollTo({ top: 0, behavior: "smooth" }); }},
        { icon: "\u{1F4DC}", name: "Contact Mani", desc: "Send a message", action: () => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }},
    );

    let activeIndex = 0;

    function render(query) {
        const q = query.toLowerCase().trim();
        const filtered = q ? commands.filter(c =>
            c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
        ) : commands;
        activeIndex = 0;

        results.innerHTML = filtered.map((c, i) =>
            `<div class="cmd-result-item${i === 0 ? ' active' : ''}" data-idx="${i}">
                <span class="cmd-result-icon">${c.icon}</span>
                <div class="cmd-result-text">
                    <span class="cmd-result-name">${c.name}</span>
                    <span class="cmd-result-desc">${c.desc}</span>
                </div>
            </div>`
        ).join("");

        // Click handlers
        results.querySelectorAll(".cmd-result-item").forEach((el, i) => {
            el.addEventListener("click", () => { filtered[i]?.action(); close(); });
        });
    }

    function open() {
        overlay.classList.add("active");
        input.value = "";
        render("");
        setTimeout(() => input.focus(), 50);
    }
    function close() {
        overlay.classList.remove("active");
        input.blur();
    }

    // Keyboard shortcut: Cmd+K / Ctrl+K
    document.addEventListener("keydown", (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); open(); return; }
        if (!overlay.classList.contains("active")) return;

        if (e.key === "Escape") { close(); return; }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const items = results.querySelectorAll(".cmd-result-item");
            items[activeIndex]?.classList.remove("active");
            activeIndex = (activeIndex + 1) % items.length;
            items[activeIndex]?.classList.add("active");
            items[activeIndex]?.scrollIntoView({ block: "nearest" });
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const items = results.querySelectorAll(".cmd-result-item");
            items[activeIndex]?.classList.remove("active");
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            items[activeIndex]?.classList.add("active");
            items[activeIndex]?.scrollIntoView({ block: "nearest" });
        }
        if (e.key === "Enter") {
            results.querySelectorAll(".cmd-result-item")[activeIndex]?.click();
        }
    });

    input.addEventListener("input", () => render(input.value));
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
}

/* ============================================
   STORY CHAPTER BAR — scroll-driven storyline
   ============================================ */
function initStoryBar(C) {
    const bar = document.getElementById("story-bar");
    const chaptersEl = document.getElementById("story-chapters");
    const progressEl = document.getElementById("story-progress");
    if (!bar || !chaptersEl) return;

    const sections = (C.nav || []).map(n => ({
        id: n.id,
        label: n.label,
        el: document.getElementById(n.id)
    })).filter(s => s.el);

    // Build chapter dots
    chaptersEl.innerHTML = sections.map(s =>
        `<div class="story-chapter" data-id="${s.id}">${s.label}</div>`
    ).join("");

    // Add progress fill
    const fill = document.createElement("div");
    fill.className = "story-progress-fill";
    progressEl.appendChild(fill);

    const chapterEls = chaptersEl.querySelectorAll(".story-chapter");

    // Click to navigate
    chapterEls.forEach(ch => {
        ch.addEventListener("click", () => {
            document.getElementById(ch.dataset.id)?.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Track visited sections
    const visited = new Set();

    function updateStoryBar() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        fill.style.width = pct + "%";

        // Show bar after scrolling past hero
        if (scrollY > 300) {
            bar.classList.add("visible");
        } else {
            bar.classList.remove("visible");
        }

        // Update current chapter
        let currentId = null;
        sections.forEach(s => {
            const rect = s.el.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) currentId = s.id;
        });

        chapterEls.forEach(ch => {
            ch.classList.remove("current");
            if (visited.has(ch.dataset.id)) ch.classList.add("visited");
            if (ch.dataset.id === currentId) {
                ch.classList.add("current");
                visited.add(currentId);
            }
        });
    }

    ScrollManager.on(updateStoryBar);
    updateStoryBar();
}

/* ============================================
   DYNAMIC DIFFICULTY — adapts to exploration
   ============================================ */
function initDynamicDifficulty() {
    const badge = document.getElementById("difficulty-badge");
    const label = document.getElementById("diff-label");
    if (!badge || !label) return;

    const state = {
        scrollSpeed: 0,
        sectionsVisited: 0,
        clickCount: 0,
        lastScrollY: 0,
        lastScrollTime: Date.now(),
    };

    function updateDifficulty() {
        const visited = document.querySelectorAll("section.fog-revealed").length;
        state.sectionsVisited = visited;

        let diff = "NORMAL";
        let cls = "normal";

        if (visited <= 2 && state.clickCount < 5) { diff = "EASY"; cls = "easy"; }
        else if (visited >= 8 && state.clickCount > 20) { diff = "LEGENDARY"; cls = "legendary"; }
        else if (visited >= 5 || state.clickCount > 10) { diff = "HARD"; cls = "hard"; }

        label.textContent = diff;
        badge.className = "difficulty-badge visible " + cls;
    }

    document.addEventListener("click", () => { state.clickCount++; updateDifficulty(); });

    // Show after boot
    setTimeout(() => {
        badge.classList.add("visible");
        updateDifficulty();
    }, 3000);

    // Update on scroll
    ScrollManager.on(updateDifficulty);
}

/* ============================================
   ROLE SELECTION — personalized journey
   ============================================ */
function initRoleSelection(C) {
    const roleSelect = document.getElementById("role-select");
    const roleOptions = document.getElementById("role-options");
    if (!roleSelect || !roleOptions) return;

    const roles = [
        { id: "recruiter", icon: "\u{1F50D}", label: "Recruiter", focus: ["quest-log", "skill-tree", "achievements"] },
        { id: "founder", icon: "\u{1F680}", label: "Founder", focus: ["ventures", "boss-battles", "genai"] },
        { id: "pm", icon: "\u{1F3AF}", label: "Product Manager", focus: ["quest-log", "stats", "portfolio"] },
        { id: "explorer", icon: "\u{1F30D}", label: "Just Exploring", focus: [] },
    ];

    roleOptions.innerHTML = roles.map(r =>
        `<button class="role-btn" data-role="${r.id}"><span class="role-icon">${r.icon}</span>${r.label}</button>`
    ).join("");

    // Store chosen role
    roleOptions.querySelectorAll(".role-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const role = roles.find(r => r.id === btn.dataset.role);
            if (!role) return;

            // Visual feedback
            roleOptions.querySelectorAll(".role-btn").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");

            // Store role
            localStorage.setItem("mkj_role", role.id);

            // Highlight recommended sections
            if (role.focus.length > 0) {
                setTimeout(() => {
                    role.focus.forEach(secId => {
                        const sec = document.getElementById(secId);
                        if (sec) sec.style.boxShadow = "inset 0 0 0 2px rgba(228,255,26,0.1)";
                    });
                }, 500);
            }
        });
    });

    // Show role selection in boot screen
    const bootContent = document.getElementById("boot-content");
    if (bootContent && roleSelect) {
        // Will be shown by boot screen logic — move it inside
        const existingRole = localStorage.getItem("mkj_role");
        if (existingRole) {
            roleSelect.style.display = "none"; // Don't show if already selected
        }
    }
}

/* ============================================
   PERSISTENT ACHIEVEMENT SYSTEM — localStorage
   ============================================ */
function initPersistentAchievements() {
    const STORAGE_KEY = "mkj_achievements";

    function getAchievements() {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
    }

    function saveAchievement(id, data) {
        const achs = getAchievements();
        if (!achs[id]) {
            achs[id] = { ...data, unlockedAt: Date.now() };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(achs));
        }
    }

    // Expose globally for other systems
    window.mkjAchievements = { get: getAchievements, save: saveAchievement };

    // Hook into existing toast system
    const origShowToast = window.showAchievementToast;
    if (typeof origShowToast === "function") {
        window.showAchievementToast = function(id, title, desc) {
            saveAchievement(id, { title, desc });
            origShowToast(id, title, desc);
        };
    }

    // Save fog reveals as achievements
    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            if (m.target.classList && m.target.classList.contains("fog-revealed")) {
                saveAchievement("visited_" + m.target.id, { title: "Explored " + m.target.id });
            }
        });
    });
    document.querySelectorAll(".fog-section").forEach(s => {
        observer.observe(s, { attributes: true, attributeFilter: ["class"] });
    });
}

/* ============================================
   JOURNEY SUMMARY — Spotify-style recap
   ============================================ */
function showJourneySummary() {
    const overlay = document.getElementById("journey-overlay");
    const content = document.getElementById("journey-content");
    const closeBtn = document.getElementById("journey-close");
    if (!overlay || !content) return;

    // Gather stats
    const visited = document.querySelectorAll("section.fog-revealed").length;
    const totalSections = document.querySelectorAll("section[id]").length;
    const scrollPct = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    const achs = window.mkjAchievements ? Object.keys(window.mkjAchievements.get()).length : 0;
    const saved = JSON.parse(localStorage.getItem("mkj_save") || "{}");
    const level = saved.level || 1;

    content.innerHTML = `
        <div class="journey-title">Your Journey</div>
        <div class="journey-sub">Here's what you discovered</div>
        <div class="journey-stat-grid">
            <div class="journey-stat">
                <span class="journey-stat-value">${visited}/${totalSections}</span>
                <span class="journey-stat-label">Zones Explored</span>
            </div>
            <div class="journey-stat">
                <span class="journey-stat-value">LVL ${level}</span>
                <span class="journey-stat-label">Level Reached</span>
            </div>
            <div class="journey-stat">
                <span class="journey-stat-value">${scrollPct}%</span>
                <span class="journey-stat-label">World Explored</span>
            </div>
            <div class="journey-stat">
                <span class="journey-stat-value">${achs}</span>
                <span class="journey-stat-label">Achievements</span>
            </div>
        </div>
        <div class="journey-badge-row">
            ${visited >= totalSections ? '<span class="journey-badge">100% Explorer</span>' : ''}
            ${level >= 5 ? '<span class="journey-badge">Veteran</span>' : ''}
            ${achs >= 5 ? '<span class="journey-badge">Trophy Collector</span>' : ''}
            ${scrollPct >= 90 ? '<span class="journey-badge">Completionist</span>' : ''}
            <span class="journey-badge">Adventurer</span>
        </div>
        <button class="journey-share-btn" id="journey-share">Share Journey</button>
    `;

    overlay.classList.add("active");

    // Close
    closeBtn?.addEventListener("click", () => overlay.classList.remove("active"));
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.remove("active"); });

    // Share
    document.getElementById("journey-share")?.addEventListener("click", () => {
        const text = `I explored ${visited}/${totalSections} zones on Mani Kumar Jami's RPG portfolio and reached Level ${level}! Check it out:`;
        if (navigator.share) {
            navigator.share({ title: "MKJ Journey", text, url: window.location.href });
        } else {
            navigator.clipboard?.writeText(text + " " + window.location.href);
            const btn = document.getElementById("journey-share");
            if (btn) { btn.textContent = "Copied!"; setTimeout(() => btn.textContent = "Share Journey", 2000); }
        }
    });
}

/* ============================================
   SKILL QUIZ — Mini-game
   ============================================ */
function startSkillQuiz(C) {
    // Remove existing quiz if any
    document.querySelector(".quiz-overlay")?.remove();

    const questions = [
        { q: "What ARR has Mani driven?", options: ["$50M+", "$250M+", "$10M+", "$500M+"], answer: 1 },
        { q: "How many users has Mani's work reached?", options: ["50M+", "100M+", "200M+", "500M+"], answer: 2 },
        { q: "Which company's OS 2.0 did Mani lead?", options: ["DriveX", "Simplilearn", "Ola", "SquadStack"], answer: 2 },
        { q: "What passed the Turing test?", options: ["Chatbot", "Voice AI (Hinglish ASR)", "Image AI", "Translation AI"], answer: 1 },
        { q: "How many products did Greengears scale?", options: ["3", "5", "7", "10"], answer: 2 },
        { q: "What is Mani's MBA institution?", options: ["IIM-A", "ISB", "Xavier (XIMB)", "XLRI"], answer: 2 },
        { q: "What funded Greengears Agrotech?", options: ["VC Fund", "Government of India", "Angel Investor", "Self-funded"], answer: 1 },
        { q: "What is Mani's top skill level?", options: ["90", "95", "97", "100"], answer: 2 },
    ];

    // Pick 5 random questions
    const selected = questions.sort(() => Math.random() - 0.5).slice(0, 5);
    let current = 0, score = 0;

    const overlay = document.createElement("div");
    overlay.className = "quiz-overlay active";

    function renderQuestion() {
        const q = selected[current];
        overlay.innerHTML = `
            <div class="quiz-box">
                <div class="quiz-title">KNOWLEDGE CHECK ${current + 1}/5</div>
                <div class="quiz-question">${q.q}</div>
                <div class="quiz-options">
                    ${q.options.map((o, i) => `<button class="quiz-option" data-idx="${i}">${o}</button>`).join("")}
                </div>
                <div class="quiz-score">Score: ${score}/${current}</div>
            </div>
        `;

        overlay.querySelectorAll(".quiz-option").forEach(btn => {
            btn.addEventListener("click", () => {
                const idx = parseInt(btn.dataset.idx);
                const correct = idx === q.answer;
                if (correct) { score++; btn.classList.add("correct"); playSound("achievement"); }
                else { btn.classList.add("wrong"); overlay.querySelector(`[data-idx="${q.answer}"]`)?.classList.add("correct"); }

                // Disable all
                overlay.querySelectorAll(".quiz-option").forEach(b => b.style.pointerEvents = "none");

                setTimeout(() => {
                    current++;
                    if (current < selected.length) { renderQuestion(); }
                    else { renderResult(); }
                }, 1200);
            });
        });
    }

    function renderResult() {
        const pct = Math.round((score / selected.length) * 100);
        let rank = "Novice";
        if (pct >= 80) rank = "Expert";
        else if (pct >= 60) rank = "Adept";
        else if (pct >= 40) rank = "Apprentice";

        overlay.innerHTML = `
            <div class="quiz-box">
                <div class="quiz-title">QUIZ COMPLETE</div>
                <div class="quiz-question">You scored ${score}/${selected.length} (${pct}%)</div>
                <div class="quiz-score">Rank: ${rank}</div>
                <button class="quiz-close" id="quiz-close-btn">Close</button>
            </div>
        `;
        document.getElementById("quiz-close-btn")?.addEventListener("click", () => overlay.remove());

        // Save achievement
        if (window.mkjAchievements && pct >= 60) {
            window.mkjAchievements.save("quiz_master", { title: "Quiz Master", desc: "Scored " + pct + "% on knowledge quiz" });
        }
    }

    document.body.appendChild(overlay);
    renderQuestion();

    // Close on backdrop click
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
}

/* ============================================
   MOBILE SWIPE GESTURES
   ============================================ */
function initMobileSwipe() {
    // Disabled — vertical scroll site, horizontal swipe nav is confusing
    return;
}

/* ============================================
   SIDE STAT CALLOUTS — floating margin stats
   ============================================ */
function initSideCallouts() {
    if (window.innerWidth < 1500) return;

    const callouts = [
        { section: "quest-log", side: "right", top: 80, value: "9.5 yrs", label: "Product Experience" },
        { section: "quest-log", side: "left", top: 300, value: "$250M+", label: "ARR Driven" },
        { section: "quest-log", side: "right", top: 550, value: "200M+", label: "Users Reached" },
        { section: "ventures", side: "left", top: 60, value: "2X", label: "Founder" },
        { section: "ventures", side: "right", top: 200, value: "GoI", label: "Funded" },
        { section: "boss-battles", side: "left", top: 60, value: "6", label: "Bosses Defeated" },
        { section: "boss-battles", side: "right", top: 280, value: "100%", label: "Win Rate" },
        { section: "skill-tree", side: "right", top: 100, value: "97", label: "Top Skill Level" },
        { section: "skill-tree", side: "left", top: 350, value: "12", label: "Skill Classes" },
        { section: "achievements", side: "left", top: 60, value: "12", label: "Trophies" },
        { section: "achievements", side: "right", top: 300, value: "3", label: "India's Firsts" },
        { section: "genai", side: "left", top: 60, value: "4", label: "AI Spells Crafted" },
        { section: "academic", side: "right", top: 60, value: "4", label: "Degrees" },
        { section: "academic", side: "left", top: 250, value: "2", label: "In Progress" },
    ];

    callouts.forEach(c => {
        const section = document.getElementById(c.section);
        if (!section) return;
        const container = section.querySelector(".section-container");
        if (!container) return;
        container.style.position = "relative";

        const el = document.createElement("div");
        el.className = `side-callout ${c.side}`;
        el.style.top = c.top + "px";
        el.innerHTML = `
            <span class="sc-value">${c.value}</span>
            <span class="sc-label">${c.label}</span>
            <div class="sc-line"></div>
        `;
        container.appendChild(el);
    });

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1, rootMargin: "-40px" });
    document.querySelectorAll(".side-callout").forEach(el => obs.observe(el));
}

/* ============================================
   LORE NOTES — game-style collectible margin notes
   Like Dark Souls item descriptions / Zelda logs
   ============================================ */
function initLoreNotes() {
    if (window.innerWidth < 1500) return;

    const notes = [
        {
            section: "about", side: "right", top: 120,
            tag: "ORIGIN LOG", icon: "\u{1F4DC}",
            text: "\"Every legend begins with a single quest. This one started with a brain-wave sensor and a dream.\"",
            source: "B.Tech Final Project, 2014"
        },
        {
            section: "quest-log", side: "left", top: 150,
            tag: "INTEL FRAGMENT", icon: "\u{1F50D}",
            text: "\"The war room had 20,000 issues. We solved 12,000 by fixing just 15 root causes.\"",
            source: "Ola OS 2.0, 2022"
        },
        {
            section: "quest-log", side: "right", top: 700,
            tag: "BATTLE LOG", icon: "\u2694\uFE0F",
            text: "\"Digital attribution was at 35%. They said 90% was impossible. It took 6 months.\"",
            source: "DriveX Campaign, 2024"
        },
        {
            section: "ventures", side: "right", top: 100,
            tag: "FOUNDER'S DIARY", icon: "\u{1F4D3}",
            text: "\"We pitched to NITI Aayog with a prototype built in 72 hours. They funded us.\"",
            source: "Greengears, 2020"
        },
        {
            section: "boss-battles", side: "right", top: 120,
            tag: "ENEMY INTEL", icon: "\u{1F480}",
            text: "\"The WhatsApp auction boss seemed unbeatable. No one in India had tried automated bidding on chat.\"",
            source: "Boss File #2"
        },
        {
            section: "skill-tree", side: "left", top: 80,
            tag: "GRIMOIRE ENTRY", icon: "\u{1F4D6}",
            text: "\"Product Strategy at 97 \u2014 earned through 15+ products shipped, not studied.\"",
            source: "Skill Assessment"
        },
        {
            section: "genai", side: "right", top: 120,
            tag: "SPELL RECIPE", icon: "\u{1F52E}",
            text: "\"Finpist was born from a personal debt crisis. I built the AI I wished existed.\"",
            source: "Spell Workshop Log"
        },
        {
            section: "achievements", side: "left", top: 200,
            tag: "TROPHY INSCRIPTION", icon: "\u{1F3C6}",
            text: "\"India's 1st Hinglish ASR that fooled humans. The Turing test was never the goal \u2014 user trust was.\"",
            source: "Hall of Legends"
        },
        {
            section: "academic", side: "left", top: 100,
            tag: "KNOWLEDGE RUNE", icon: "\u2728",
            text: "\"MBA for strategy. Law for risk. Psychology for people. The triple stack was intentional.\"",
            source: "Scholar's Path"
        },
        {
            section: "inventory", side: "right", top: 80,
            tag: "ARMORY NOTE", icon: "\u{1F6E1}\uFE0F",
            text: "\"The most dangerous weapon isn't the code \u2014 it's knowing which problem to solve first.\"",
            source: "Armorer's Wisdom"
        },
        {
            section: "contact", side: "left", top: 40,
            tag: "QUEST BOARD", icon: "\u{1F4CB}",
            text: "\"The final quest is always the same: find allies worthy of the next adventure.\"",
            source: "NPC Mani"
        },
    ];

    notes.forEach(n => {
        const section = document.getElementById(n.section);
        if (!section) return;
        const container = section.querySelector(".section-container") || section;
        container.style.position = "relative";

        const el = document.createElement("div");
        el.className = `lore-note ${n.side}`;
        el.style.top = n.top + "px";
        el.innerHTML = `
            <div class="lore-tag">${n.tag}</div>
            <span class="lore-icon">${n.icon}</span>
            <div class="lore-text">${n.text}</div>
            <span class="lore-source">\u2014 ${n.source}</span>
        `;
        container.appendChild(el);
    });

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add("visible"), Math.random() * 400);
            }
        });
    }, { threshold: 0.1, rootMargin: "-60px" });
    document.querySelectorAll(".lore-note").forEach(el => obs.observe(el));
}

/* ============================================
   STORY OVERLAY — hero card backstory
   Opens when clicking the hero character card
   ============================================ */
function initStoryOverlay(C) {
    const overlay = document.getElementById("story-overlay");
    const panel = document.getElementById("story-panel");
    const scroll = document.getElementById("story-scroll");
    const closeBtn = document.getElementById("story-close");
    const heroCard = document.getElementById("hero-card");
    if (!overlay || !scroll || !heroCard || !C.story) return;

    const card = C.heroCard || {};
    const highlights = card.highlights || [];

    // Build full-page story
    let html = `
        <!-- Stage hero -->
        <div class="story-hero">
            <div class="story-hero-bg"></div>
            <div class="story-hero-content">
                <div class="story-hero-tag">ENTERING CHARACTER CODEX</div>
                <div class="story-hero-name">${C.profile.name}</div>
                <div class="story-hero-title">${C.profile.tagline}</div>
                <div class="story-hero-stats">
                    ${highlights.map(h => `
                        <div class="story-hero-stat">
                            <span class="story-hero-stat-value">${h.value}</span>
                            <span class="story-hero-stat-label">${h.label}</span>
                        </div>
                    `).join("")}
                </div>
            </div>
            <div class="story-scroll-cue">\u2193 SCROLL TO EXPLORE</div>
        </div>
    `;

    // Build stages
    C.story.forEach((ch, i) => {
        html += `
            <div class="story-stage" data-stage="${i}" id="story-stage-${i}">
                <div class="story-stage-inner">
                    <div class="story-stage-icon-col">
                        <div class="story-stage-icon">${ch.icon}</div>
                        <div class="story-stage-num">0${i + 1}</div>
                    </div>
                    <div class="story-stage-content">
                        <div class="story-stage-tag">${ch.tag}</div>
                        <h2 class="story-stage-title">${ch.title}</h2>
                        ${ch.formula ? `<div class="story-formula">${ch.formula}</div>` : ''}
                        <p class="story-stage-text">${ch.text}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // Footer — return to game
    html += `
        <div class="story-footer">
            <div class="story-footer-text">End of codex. Return to the adventure.</div>
            <button class="story-return-btn" id="story-return">\u2190 RETURN TO GAME</button>
        </div>
    `;

    scroll.innerHTML = html;

    // Build right-side stage nav dots
    const stageNav = document.createElement("div");
    stageNav.className = "story-stage-nav";
    C.story.forEach((ch, i) => {
        const dot = document.createElement("div");
        dot.className = "story-stage-dot";
        dot.dataset.label = ch.tag;
        dot.addEventListener("click", () => {
            document.getElementById("story-stage-" + i)?.scrollIntoView({ behavior: "smooth" });
        });
        stageNav.appendChild(dot);
    });
    overlay.appendChild(stageNav);
    const dots = stageNav.querySelectorAll(".story-stage-dot");

    // Build sticky header bar
    const stickyHeader = document.createElement("div");
    stickyHeader.className = "story-header";
    stickyHeader.innerHTML = `
        <div class="story-header-inner">
            <span class="story-header-stage">CODEX</span>
            <span class="story-header-sep"></span>
            <span class="story-header-title">Character Overview</span>
        </div>
        <div class="story-header-progress"></div>
    `;
    overlay.appendChild(stickyHeader);
    const headerStage = stickyHeader.querySelector(".story-header-stage");
    const headerTitle = stickyHeader.querySelector(".story-header-title");
    const headerProgress = stickyHeader.querySelector(".story-header-progress");

    // Change close button text
    closeBtn.innerHTML = "\u2190 EXIT CODEX";

    // Scroll-based stage reveal + sticky header
    function onStoryScroll() {
        const stages = panel.querySelectorAll(".story-stage");
        let activeIdx = -1;
        stages.forEach((s, i) => {
            const rect = s.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.7) {
                s.classList.add("in-view");
                activeIdx = i;
            }
        });
        dots.forEach((d, i) => d.classList.toggle("active", i === activeIdx));

        // Sticky header — show after scrolling past the hero
        const heroEl = panel.querySelector(".story-hero");
        const pastHero = heroEl ? panel.scrollTop > heroEl.offsetHeight * 0.6 : false;
        stickyHeader.classList.toggle("visible", pastHero);

        // Update header content based on active stage
        if (activeIdx >= 0 && C.story[activeIdx]) {
            headerStage.textContent = `STAGE 0${activeIdx + 1}`;
            headerTitle.textContent = C.story[activeIdx].title;
        } else {
            headerStage.textContent = "CODEX";
            headerTitle.textContent = "Character Overview";
        }

        // Progress bar
        const scrollH = panel.scrollHeight - panel.clientHeight;
        const pct = scrollH > 0 ? (panel.scrollTop / scrollH) * 100 : 0;
        headerProgress.style.width = pct + "%";
    }
    panel.addEventListener("scroll", onStoryScroll, { passive: true });

    // Tap hint on hero card — only add once
    if (!heroCard.querySelector(".hcard-tap-hint")) {
        const hint = document.createElement("div");
        hint.className = "hcard-tap-hint";
        hint.textContent = "TAP TO ENTER CARD ARENA";
        heroCard.querySelector(".hcard-front")?.appendChild(hint);
    }

    // Hero card click now opens Card Arena (see initCardArena)
    // Story overlay can still be opened programmatically
    window._openStoryOverlay = function() {
        overlay.classList.add("active");
        panel.scrollTop = 0;
        panel.querySelectorAll(".story-stage").forEach(s => s.classList.remove("in-view"));
        setTimeout(onStoryScroll, 100);
    };

    // Close
    function closeStory() { overlay.classList.remove("active"); }
    closeBtn.addEventListener("click", closeStory);
    document.getElementById("story-return")?.addEventListener("click", closeStory);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && overlay.classList.contains("active")) closeStory();
    });
}

/* ============================================
   PARALLAX STAR FIELD — Mouse-reactive depth layers
   3 layers of stars at different speeds
   ============================================ */
function initParallaxStarField() {
    if (window.innerWidth < 768) return;

    const canvas = document.createElement("canvas");
    canvas.className = "starfield-canvas";
    canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.7;";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");
    let w, h, mouseX = 0.5, mouseY = 0.5;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // 3 depth layers: far (slow), mid, near (fast)
    const layers = [
        { count: 80, speed: 0.008, size: [0.5, 1.2], opacity: 0.3, stars: [] },
        { count: 50, speed: 0.02,  size: [1, 2],     opacity: 0.5, stars: [] },
        { count: 25, speed: 0.04,  size: [1.5, 3],   opacity: 0.7, stars: [] }
    ];

    layers.forEach(layer => {
        for (let i = 0; i < layer.count; i++) {
            layer.stars.push({
                x: Math.random() * 2 - 0.5, // normalized -0.5 to 1.5
                y: Math.random() * 2 - 0.5,
                r: layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: 0.01 + Math.random() * 0.03
            });
        }
    });

    document.addEventListener("mousemove", e => {
        mouseX = e.clientX / w - 0.5; // -0.5 to 0.5
        mouseY = e.clientY / h - 0.5;
    });

    let scrollY = 0;
    ScrollManager.on(function(sy) { scrollY = sy; });

    function draw() {
        ctx.clearRect(0, 0, w, h);
        const scrollOffset = scrollY * 0.0001;

        layers.forEach((layer, li) => {
            const parallaxX = mouseX * layer.speed * w * 8;
            const parallaxY = mouseY * layer.speed * h * 8;
            const scrollShift = scrollOffset * (li + 1) * h;

            layer.stars.forEach(star => {
                star.twinkle += star.twinkleSpeed;
                const flicker = 0.5 + 0.5 * Math.sin(star.twinkle);
                const alpha = layer.opacity * flicker;

                const sx = star.x * w + parallaxX;
                const sy = ((star.y * h + parallaxY + scrollShift) % (h * 1.5)) - h * 0.25;

                ctx.beginPath();
                ctx.arc(sx, sy, star.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${alpha})`;
                ctx.fill();

                // Subtle glow on brighter stars
                if (star.r > 2 && alpha > 0.5) {
                    ctx.beginPath();
                    ctx.arc(sx, sy, star.r * 3, 0, Math.PI * 2);
                    const _sRgb = localStorage.getItem("mkj_accent_rgb") || "228,255,26";
                    ctx.fillStyle = `rgba(${_sRgb},${alpha * 0.1})`;
                    ctx.fill();
                }
            });
        });

        requestAnimationFrame(draw);
    }
    draw();
}

/* ============================================
   CURSOR EVOLUTION — Cursor upgrades with XP progress
   Stages: basic → glowing → particle trail → legendary aura
   ============================================ */
function initCursorEvolution() {
    if (window.innerWidth < 768) return;

    const cursor = document.getElementById("emoji-cursor");
    if (!cursor) return;

    let currentTier = 0;
    const tiers = [
        { name: "basic",     minPct: 0,  glowSize: 8,  glowOpacity: 0.4, trail: false, aura: false },
        { name: "glowing",   minPct: 25, glowSize: 14, glowOpacity: 0.6, trail: false, aura: false },
        { name: "trailing",  minPct: 50, glowSize: 18, glowOpacity: 0.7, trail: true,  aura: false },
        { name: "legendary", minPct: 75, glowSize: 24, glowOpacity: 0.9, trail: true,  aura: true  }
    ];

    // Trail particle pool
    const trailPool = [];
    const maxTrail = 12;
    for (let i = 0; i < maxTrail; i++) {
        const dot = document.createElement("div");
        dot.className = "cursor-trail-dot";
        dot.style.cssText = "position:fixed;pointer-events:none;z-index:9999;border-radius:50%;opacity:0;transition:opacity 0.3s;";
        document.body.appendChild(dot);
        trailPool.push({ el: dot, active: false });
    }

    // Aura ring
    const aura = document.createElement("div");
    aura.className = "cursor-aura-ring";
    document.body.appendChild(aura);

    let mx = 0, my = 0, trailIdx = 0, lastTrailTime = 0;

    document.addEventListener("mousemove", e => {
        mx = e.clientX;
        my = e.clientY;

        const tier = tiers[currentTier];

        // Spawn trail particles
        if (tier.trail && Date.now() - lastTrailTime > 40) {
            lastTrailTime = Date.now();
            const dot = trailPool[trailIdx % maxTrail];
            const size = 3 + Math.random() * 4;
            dot.el.style.left = (mx - size / 2) + "px";
            dot.el.style.top = (my - size / 2) + "px";
            dot.el.style.width = size + "px";
            dot.el.style.height = size + "px";
            dot.el.style.opacity = "1";
            dot.el.style.background = currentTier >= 3
                ? `radial-gradient(circle, var(--accent), rgba(var(--element-rgb, 34,211,238),0.6))`
                : `var(--accent)`;
            dot.el.style.boxShadow = `0 0 ${size * 2}px var(--accent)`;

            setTimeout(() => {
                dot.el.style.opacity = "0";
                dot.el.style.transform = `scale(0.3) translate(${(Math.random()-0.5)*20}px, ${(Math.random()-0.5)*20}px)`;
            }, 50);
            setTimeout(() => { dot.el.style.transform = ""; }, 400);
            trailIdx++;
        }

        // Update aura position
        if (tier.aura) {
            aura.style.left = mx + "px";
            aura.style.top = my + "px";
        }
    });

    // Check scroll progress and upgrade cursor tier
    function checkTier() {
        const progress = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100) || 0;
        let newTier = 0;
        for (let i = tiers.length - 1; i >= 0; i--) {
            if (progress >= tiers[i].minPct) { newTier = i; break; }
        }

        if (newTier !== currentTier) {
            currentTier = newTier;
            const tier = tiers[currentTier];
            const emojiEl = cursor.querySelector(".cursor-emoji");

            // Update glow
            if (emojiEl) {
                const _eRgb = localStorage.getItem("mkj_accent_rgb") || "228,255,26";
                emojiEl.style.filter = `drop-shadow(0 0 ${tier.glowSize}px rgba(${_eRgb},${tier.glowOpacity}))`;
            }

            // Aura ring visibility
            aura.classList.toggle("active", tier.aura);

            // Tier-up burst
            if (newTier > 0) {
                cursor.classList.add("cursor-tier-up");
                playSound("levelup");
                for (let i = 0; i < 8; i++) {
                    const angle = (Math.PI * 2 / 8) * i;
                    const px = mx + Math.cos(angle) * 30;
                    const py = my + Math.sin(angle) * 30;
                    spawnFloater(px, py, "★", "var(--accent)", 12);
                }
                setTimeout(() => cursor.classList.remove("cursor-tier-up"), 600);
            }

            // Update cursor tier class
            cursor.setAttribute("data-tier", tier.name);
        }
    }

    ScrollManager.on(checkTier);
    checkTier();
}

/* ============================================
   MATH GATE — Quick math puzzle to unlock sections
   Themed per section, easy but fun
   ============================================ */
function initPatternGate() {
    const gatedSections = [
        { id: "inventory", theme: "TREASURE VAULT", icon: "🎒", flavor: "Prove your intellect to access the tech arsenal" }
    ];

    // Puzzle generators — returns { question, answer, choices }
    function generatePuzzle() {
        const type = Math.floor(Math.random() * 5);
        let q, a, choices;

        switch (type) {
            case 0: { // Addition
                const x = 10 + Math.floor(Math.random() * 40);
                const y = 10 + Math.floor(Math.random() * 40);
                a = x + y;
                q = `${x} + ${y} = ?`;
                break;
            }
            case 1: { // Multiplication
                const x = 3 + Math.floor(Math.random() * 10);
                const y = 3 + Math.floor(Math.random() * 10);
                a = x * y;
                q = `${x} × ${y} = ?`;
                break;
            }
            case 2: { // Sequence: what comes next
                const start = Math.floor(Math.random() * 10);
                const step = 2 + Math.floor(Math.random() * 6);
                a = start + step * 4;
                q = `Next: ${start}, ${start+step}, ${start+step*2}, ${start+step*3}, ?`;
                break;
            }
            case 3: { // Subtraction
                const x = 50 + Math.floor(Math.random() * 50);
                const y = 10 + Math.floor(Math.random() * 30);
                a = x - y;
                q = `${x} − ${y} = ?`;
                break;
            }
            case 4: { // Square
                const x = 2 + Math.floor(Math.random() * 10);
                a = x * x;
                q = `${x}² = ?`;
                break;
            }
        }

        // Generate 4 choices including the correct one
        const wrongSet = new Set();
        while (wrongSet.size < 3) {
            const offset = (Math.floor(Math.random() * 10) + 1) * (Math.random() > 0.5 ? 1 : -1);
            const wrong = a + offset;
            if (wrong !== a && wrong > 0) wrongSet.add(wrong);
        }
        choices = [a, ...wrongSet];
        // Shuffle
        choices.sort(() => Math.random() - 0.5);

        return { question: q, answer: a, choices };
    }

    gatedSections.forEach(({ id, theme, icon, flavor }) => {
        const section = document.getElementById(id);
        if (!section) return;
        if (localStorage.getItem("mkj_gate_" + id)) return;

        let puzzle = generatePuzzle();

        const gate = document.createElement("div");
        gate.className = "pattern-gate";
        gate.innerHTML = `
            <div class="pattern-gate-inner">
                <div class="math-gate-icon">${icon}</div>
                <div class="pattern-gate-title">${theme}</div>
                <div class="pattern-gate-subtitle">${flavor}</div>
                <div class="math-question" id="math-q-${id}">${puzzle.question}</div>
                <div class="math-choices" id="math-c-${id}">
                    ${puzzle.choices.map(c => `<button class="math-choice" data-val="${c}">${c}</button>`).join("")}
                </div>
                <div class="pattern-hint" id="math-hint-${id}"></div>
            </div>
        `;
        section.style.position = "relative";
        section.appendChild(gate);

        const hintEl = gate.querySelector(".pattern-hint");
        const choicesEl = gate.querySelector(".math-choices");

        choicesEl.addEventListener("click", (e) => {
            const btn = e.target.closest(".math-choice");
            if (!btn) return;

            const val = parseInt(btn.dataset.val);
            playSound("click");

            if (val === puzzle.answer) {
                // Correct!
                btn.classList.add("math-correct");
                gate.classList.add("pattern-unlocked");
                hintEl.textContent = "ACCESS GRANTED";
                hintEl.style.color = "var(--accent)";
                playSound("levelup");
                localStorage.setItem("mkj_gate_" + id, "1");

                // Burst particles
                for (let i = 0; i < 12; i++) {
                    const rect = gate.getBoundingClientRect();
                    spawnFloater(
                        rect.left + Math.random() * rect.width,
                        rect.top + Math.random() * rect.height,
                        "★", "var(--accent)", 16
                    );
                }
                setTimeout(() => gate.remove(), 900);
            } else {
                // Wrong — shake, new puzzle
                btn.classList.add("math-wrong");
                gate.querySelector(".pattern-gate-inner").classList.add("pattern-shake");
                hintEl.textContent = "Wrong — try again";
                playSound("boss");

                setTimeout(() => {
                    gate.querySelector(".pattern-gate-inner").classList.remove("pattern-shake");
                    btn.classList.remove("math-wrong");
                    // Generate new puzzle
                    puzzle = generatePuzzle();
                    gate.querySelector(".math-question").textContent = puzzle.question;
                    choicesEl.innerHTML = puzzle.choices.map(c =>
                        `<button class="math-choice" data-val="${c}">${c}</button>`
                    ).join("");
                    hintEl.textContent = "";
                }, 800);
            }
        });
    });
}

/* ============================================
   ELEMENT ARENA — Fullscreen element selection
   100% inline styles, zero CSS class dependencies.
   Called after boot, BEFORE main site inits.
   ============================================ */
function showElementArena(C, onDone) {
    console.log("[Arena] showElementArena called");
    const arena = document.getElementById("element-arena");
    const elements = (C.boot && C.boot.elements) || [];
    if (!arena || !elements.length) {
        console.warn("[Arena] Missing arena div or no elements, skipping. arena:", !!arena, "elements:", elements.length);
        if (onDone) onDone(); return;
    }
    console.log("[Arena] Found", elements.length, "elements, building UI");

    const savedId = localStorage.getItem("mkj_element");
    let picked = false;
    let doneCallback = onDone;
    let previewedCard = null; // for touch support

    // Responsive sizing
    const vw = window.innerWidth;
    const isMobile = vw <= 768;

    const containerPad = isMobile ? "16px" : "24px";
    const containerGap = isMobile ? "14px" : "20px";
    const cardContainerStyle = isMobile
        ? "display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:16px 0;width:100%;"
        : "display:flex;gap:16px;justify-content:center;flex-wrap:wrap;padding:24px 0;width:100%;";
    const iconSize = isMobile ? "28px" : "40px";
    const labelSize = isMobile ? "11px" : "13px";
    const subtitleDisplay = isMobile ? "none" : "block";
    const hintText = isMobile ? "TAP TO CHOOSE YOUR ELEMENT" : "HOVER TO PREVIEW \u00b7 CLICK TO CHOOSE";

    // Build entire UI with inline styles — no external CSS
    arena.style.cssText = "position:fixed;inset:0;z-index:10000;background:#050508;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.6s ease;font-family:Inter,sans-serif;overflow:hidden;";
    arena.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:${containerGap};padding:${containerPad};max-width:960px;width:100%;position:relative;z-index:2;overflow-x:hidden;box-sizing:border-box;">
            <div style="font-size:${isMobile ? "11px" : "13px"};font-weight:700;letter-spacing:0.15em;color:rgba(255,255,255,0.35);text-transform:uppercase;">CHOOSE YOUR PATH</div>
            <div style="font-size:clamp(24px,5vw,48px);font-weight:800;color:#fff;letter-spacing:0.04em;">WHICH ELEMENT CALLS TO YOU?</div>
            <div id="arena-cards" style="${cardContainerStyle}"></div>
            <div id="arena-desc" style="font-size:${isMobile ? "12px" : "14px"};color:rgba(255,255,255,0.4);min-height:22px;max-width:500px;line-height:1.5;transition:color 0.3s;"></div>
            <div style="font-size:${isMobile ? "10px" : "11px"};font-weight:600;letter-spacing:0.12em;color:rgba(255,255,255,0.2);">${hintText}</div>
        </div>
    `;

    const cardsWrap = document.getElementById("arena-cards");
    const descEl = document.getElementById("arena-desc");
    const cards = [];

    function revertAccentToSaved() {
        const sh = localStorage.getItem("mkj_accent_hex");
        const sr = localStorage.getItem("mkj_accent_rgb");
        if (sh && sr) applyAccentColor(sh, sr, false);
        else applyAccentColor("#22D3EE", "34,211,238", false);
    }

    function resetPreview() {
        if (previewedCard) {
            previewedCard.style.borderColor = "rgba(255,255,255,0.08)";
            previewedCard.style.background = "rgba(255,255,255,0.03)";
            previewedCard.style.boxShadow = "none";
            previewedCard.style.transform = "translateY(0) scale(1)";
            previewedCard = null;
        }
        if (descEl) { descEl.textContent = ""; descEl.style.color = ""; }
        revertAccentToSaved();
    }

    function previewCard(el, card) {
        if (previewedCard && previewedCard !== card) resetPreview();
        card.style.borderColor = el.color;
        card.style.background = `rgba(${el.rgb},0.08)`;
        card.style.boxShadow = `0 0 30px rgba(${el.rgb},0.15), inset 0 0 20px rgba(${el.rgb},0.05)`;
        card.style.transform = isMobile ? "scale(1.04)" : "translateY(-6px) scale(1.04)";
        if (descEl) { descEl.textContent = el.description || el.tagline || ""; descEl.style.color = "rgba(255,255,255,0.65)"; }
        applyAccentColor(el.color, el.rgb, false);
        previewedCard = card;
    }

    function dismissArena() {
        arena.style.opacity = "0";
        setTimeout(() => {
            arena.style.display = "none";
            arena.style.pointerEvents = "none";
            document.body.style.overflow = "";
            if (doneCallback) { doneCallback(); doneCallback = null; }
        }, 600);
    }

    function selectElement(el, card) {
        if (picked) return;
        picked = true;

        // Highlight chosen, fade others
        cards.forEach(c => {
            if (c !== card) { c.style.opacity = "0.1"; c.style.transform = "scale(0.95)"; }
        });
        card.style.transform = "scale(1.1)";
        card.style.borderColor = el.color;
        card.style.boxShadow = `0 0 40px rgba(${el.rgb},0.3), 0 0 80px rgba(${el.rgb},0.1)`;

        // Save
        applyAccentColor(el.color, el.rgb, true);
        applyElementPersonality(el.id);
        localStorage.setItem("mkj_element", el.id);
        window._currentElement = el.id;

        // Update reselect button icon + label
        if (typeof window._updateElementReselectLabel === "function") {
            window._updateElementReselectLabel(el.id);
        }

        // Sync weather mood — element selection always overrides manual picks
        localStorage.setItem("mkj_mood_source", "element");
        if (el.defaultMood && typeof window.applyElementMood === "function") {
            window.applyElementMood(el.defaultMood);
        }

        try { playSound("levelup"); } catch(e2) {}

        // Fade out arena
        setTimeout(() => dismissArena(), 800);
    }

    // Create element cards
    let hasTouched = false;
    elements.forEach((el) => {
        const card = document.createElement("button");
        card.dataset.element = el.id;
        const subtitle = el.title.split("\u2014")[1] ? el.title.split("\u2014")[1].trim() : "";
        card.style.cssText = isMobile
            ? `all:unset;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:10px;
               padding:16px 12px;border-radius:12px;width:100%;box-sizing:border-box;
               background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);
               transition:transform 0.3s ease,border-color 0.3s,background 0.3s,box-shadow 0.3s,opacity 0.4s;
               opacity:0;transform:translateY(20px);`
            : `all:unset;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:14px;
               padding:24px 20px;border-radius:16px;min-width:120px;flex:1;max-width:160px;
               background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);
               transition:transform 0.3s ease,border-color 0.3s,background 0.3s,box-shadow 0.3s,opacity 0.4s;
               opacity:0;transform:translateY(20px);`;
        card.innerHTML = `
            <span class="element-arena-icon element-arena-icon--${el.id}" style="font-size:${iconSize};line-height:1;display:block;">${el.icon}</span>
            <span style="font-size:${labelSize};font-weight:800;letter-spacing:0.12em;color:${el.color};">${el.label}</span>
            <span style="font-size:10px;font-weight:500;color:rgba(255,255,255,0.35);letter-spacing:0.05em;display:${subtitleDisplay};">${subtitle}</span>
        `;

        // Desktop hover
        card.addEventListener("mouseenter", () => {
            if (picked || hasTouched) return;
            previewCard(el, card);
        });
        card.addEventListener("mouseleave", () => {
            if (picked || hasTouched) return;
            resetPreview();
        });

        // Touch support: single tap to select directly
        card.addEventListener("touchstart", (e) => {
            e.preventDefault();
            hasTouched = true;
            if (picked) return;
            selectElement(el, card);
        }, { passive: false });

        // Desktop click
        card.addEventListener("click", (e) => {
            if (hasTouched) return; // touch handled it
            selectElement(el, card);
        });

        cardsWrap.appendChild(card);
        cards.push(card);
    });

    // Center the last card if odd count on mobile grid
    if (isMobile && cards.length % 2 === 1) {
        const lastCard = cards[cards.length - 1];
        lastCard.style.gridColumn = "1 / -1";
        lastCard.style.maxWidth = "calc(50% - 5px)";
        lastCard.style.justifySelf = "center";
    }

    // Pre-highlight saved element
    if (savedId) {
        const savedCard = cards.find(c => c.dataset.element === savedId);
        if (savedCard) {
            const el = elements.find(e => e.id === savedId);
            if (el) {
                savedCard.style.borderColor = el.color;
                savedCard.style.background = `rgba(${el.rgb},0.06)`;
                savedCard.style.boxShadow = `0 0 20px rgba(${el.rgb},0.1)`;
            }
        }
    }

    // Show arena with staggered card reveal
    document.body.style.overflow = "hidden";
    void arena.offsetWidth;
    requestAnimationFrame(() => {
        arena.style.opacity = "1";
        console.log("[Arena] Arena visible. Cards:", cards.length, "isMobile:", isMobile);
    });
    cards.forEach((card, i) => {
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 300 + i * 100);
    });

    // Expose for reselect — rebuild fresh (handles orientation changes)
    window._showElementArena = function() {
        showElementArena(C, null);
    };
}

/* Small reselect button in nav */
function initElementReselectButton(C) {
    const btn = document.getElementById("element-reselect");
    const icon = document.getElementById("element-reselect-icon");
    const label = document.getElementById("element-reselect-label");
    if (!btn || !icon) return;
    const elements = (C.boot && C.boot.elements) || [];

    function syncLabel(elementId) {
        const el = elements.find(e => e.id === elementId);
        icon.textContent = el ? el.icon : "\u2728";
        if (label) label.textContent = el ? el.label.toUpperCase() : "ELEMENT";
    }

    syncLabel(localStorage.getItem("mkj_element") || "water");

    // Expose for selectElement() to call after picking
    window._updateElementReselectLabel = syncLabel;

    btn.addEventListener("click", () => {
        if (typeof window._showElementArena === "function") window._showElementArena();
    });
}

/* ============================================
   SUBSCRIBE — Newsletter email collection
   Posts to Google Apps Script → Google Sheet
   ============================================ */
function initSubscribe(C) {
    const sub = C.subscribe;
    if (!sub) return;
    const tag = document.getElementById("subscribe-tag");
    const title = document.getElementById("subscribe-title");
    const desc = document.getElementById("subscribe-desc");
    const form = document.getElementById("subscribe-form");
    const email = document.getElementById("subscribe-email");
    const btn = document.getElementById("subscribe-btn");
    const btnText = btn?.querySelector(".subscribe-btn-text");
    const status = document.getElementById("subscribe-status");
    if (!form || !email || !btn) return;

    // Populate from CMS
    if (tag) tag.textContent = sub.tag;
    if (title) title.textContent = sub.title;
    if (desc) desc.textContent = sub.desc;
    if (email) email.placeholder = sub.placeholder || "your@email.com";
    if (btnText) btnText.textContent = sub.buttonText || "SUBSCRIBE";

    let submitting = false;
    // Email validation
    function isValidEmail(str) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(str);
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (submitting) return;
        const val = email.value.trim();
        if (!val) return;

        // Validate email format
        if (!isValidEmail(val)) {
            status.textContent = "Invalid email address.";
            status.className = "subscribe-status error";
            form.classList.add("shake");
            setTimeout(() => form.classList.remove("shake"), 500);
            return;
        }

        submitting = true;
        btn.classList.add("loading");
        status.textContent = "";
        status.className = "subscribe-status";

        try {
            if (sub.url) {
                // Use GET with query params — most reliable for Google Apps Script cross-origin
                const params = new URLSearchParams({ email: val, timestamp: new Date().toISOString() });
                await fetch(sub.url + "?" + params.toString(), { mode: "no-cors" });
            } else {
                console.warn("Subscribe: No Google Apps Script URL configured in content.js");
            }
            // Show success — clear, visible confirmation
            email.value = "";
            status.textContent = "";
            status.className = "subscribe-status success";
            status.innerHTML = "\u2705 " + (sub.successMsg || "Subscribed!");
            status.style.fontSize = "15px";
            status.style.fontWeight = "700";
            if (btnText) btnText.textContent = "ENLISTED \u2694\uFE0F";
            btn.style.opacity = "0.7";
            btn.style.pointerEvents = "none";
            try { playSound("questUnlock"); } catch(e2) {}
            // Reset button after 5s
            setTimeout(() => {
                if (btnText) btnText.textContent = sub.buttonText || "ENLIST NOW";
                btn.style.opacity = "";
                btn.style.pointerEvents = "";
                status.style.fontSize = "";
                status.style.fontWeight = "";
            }, 5000);
        } catch (err) {
            status.textContent = sub.errorMsg || "Error. Try again.";
            status.classList.add("error");
            form.classList.add("shake");
            setTimeout(() => form.classList.remove("shake"), 500);
        }
        btn.classList.remove("loading");
        submitting = false;
    });
}

/* ============================================
   BALLOON PHYSICS — bouncing social links
   Real physics: gravity, bounce, drift, collisions
   ============================================ */
function initBalloonSounds() {
    const field = document.getElementById("balloon-field");
    if (!field) return;

    const links = Array.from(field.querySelectorAll(".balloon-link"));
    if (!links.length) return;

    const soundMap = {
        "Substack": "balloonSubstack",
        "LinkedIn": "balloonLinkedin",
        "X / Twitter": "balloonTwitter",
        "Get in Touch": "balloonEmail",
        "Email Me": "balloonEmail"
    };

    // Hover sounds
    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            const label = link.querySelector(".balloon-label")?.textContent;
            playSound(soundMap[label] || "balloonBounce");
        });
    });

    // Physics constants — smoother on mobile
    const isMobile = window.innerWidth <= 768;
    const SIZE = isMobile ? 56 : 80;
    const GRAVITY = isMobile ? -0.02 : -0.04;
    const BOUNCE = isMobile ? 0.4 : 0.7;
    const FRICTION = isMobile ? 0.99 : 0.997;
    const DRIFT = isMobile ? 0.012 : 0.025;

    // State — will be initialized on first visible frame
    let balloons = null;
    let initialized = false;
    let lastBounceSound = 0;

    function initPositions() {
        const w = field.offsetWidth;
        const h = field.offsetHeight;
        if (w < 10 || h < 10) return false; // Not laid out yet

        balloons = links.map((el, i) => {
            const spacing = w / (links.length + 1);
            return {
                el,
                x: spacing * (i + 1) - SIZE / 2,
                y: 40 + Math.random() * (h - 160),
                vx: (Math.random() - 0.5) * (isMobile ? 1.5 : 3),
                vy: -(isMobile ? 0.5 : 1) - Math.random() * (isMobile ? 1 : 2),
                rot: (Math.random() - 0.5) * 8,
                vr: (Math.random() - 0.5) * 0.8,
                hovered: false,
                phase: Math.random() * Math.PI * 2,
                speed: 0.018 + Math.random() * 0.012
            };
        });

        links.forEach((link, i) => {
            link.addEventListener("mouseenter", () => { balloons[i].hovered = true; });
            link.addEventListener("mouseleave", () => {
                balloons[i].hovered = false;
                balloons[i].vy -= 2.5;
                balloons[i].vx += (Math.random() - 0.5) * 4;
            });
        });

        initialized = true;
        return true;
    }

    function playBounce() {
        const now = Date.now();
        if (now - lastBounceSound > 1500) {
            lastBounceSound = now;
            playSound("balloonBounce");
        }
    }

    function tick() {
        if (!initialized) {
            if (!initPositions()) { requestAnimationFrame(tick); return; }
        }

        const w = field.offsetWidth;
        const h = field.offsetHeight;
        if (w < 10) { requestAnimationFrame(tick); return; }

        for (let i = 0; i < balloons.length; i++) {
            const b = balloons[i];

            if (b.hovered) {
                b.vx *= 0.85;
                b.vy *= 0.85;
                b.vr *= 0.85;
            } else {
                // Float upward (negative = up in screen coords)
                b.vy += GRAVITY;
                // Random horizontal drift + sine bob
                b.phase += b.speed;
                b.vx += Math.sin(b.phase) * DRIFT;
                b.vy += Math.cos(b.phase * 0.7) * DRIFT * 0.3;
            }

            // Integrate
            b.x += b.vx;
            b.y += b.vy;
            b.rot += b.vr;

            // Damping
            b.vx *= FRICTION;
            b.vy *= FRICTION;
            b.vr *= 0.992;

            // Wall bounces — gentler on mobile
            const wallKick = isMobile ? 0.1 : 0.3;
            const floorKick = isMobile ? 0.4 : 1.2;
            const rotKick = isMobile ? 0.6 : 1.5;
            if (b.x < 0)           { b.x = 0;              b.vx =  Math.abs(b.vx) * BOUNCE + wallKick; b.vr += rotKick; playBounce(); }
            if (b.x > w - SIZE)    { b.x = w - SIZE;       b.vx = -Math.abs(b.vx) * BOUNCE - wallKick; b.vr -= rotKick; playBounce(); }
            if (b.y < 0)           { b.y = 0;              b.vy =  Math.abs(b.vy) * BOUNCE + wallKick; playBounce(); }
            if (b.y > h - SIZE - 30) { b.y = h - SIZE - 30; b.vy = -Math.abs(b.vy) * BOUNCE - floorKick; playBounce(); }

            // Clamp rotation
            if (b.rot >  20) { b.rot =  20; b.vr *= -0.5; }
            if (b.rot < -20) { b.rot = -20; b.vr *= -0.5; }

            // Balloon-to-balloon repulsion
            for (let j = i + 1; j < balloons.length; j++) {
                const b2 = balloons[j];
                const dx = b2.x - b.x;
                const dy = b2.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < SIZE && dist > 0.1) {
                    const nx = dx / dist;
                    const ny = dy / dist;
                    const push = (SIZE - dist) * 0.5;
                    b.x  -= nx * push;  b.y  -= ny * push;
                    b2.x += nx * push;  b2.y += ny * push;
                    // Transfer momentum
                    const rv = (b.vx - b2.vx) * nx + (b.vy - b2.vy) * ny;
                    b.vx  -= rv * nx * 0.4;  b.vy  -= rv * ny * 0.4;
                    b2.vx += rv * nx * 0.4;  b2.vy += rv * ny * 0.4;
                    b.vr  += (Math.random() - 0.5) * 2;
                    b2.vr += (Math.random() - 0.5) * 2;
                }
            }

            // Apply — use sub-pixel for smoother motion on mobile
            b.el.style.transform = `translate3d(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px, 0) rotate(${b.rot.toFixed(1)}deg)`;
        }

        requestAnimationFrame(tick);
    }

    // Start immediately — tick handles lazy init
    requestAnimationFrame(tick);
}

/* ============================================
   FOG GATE — Dark Souls section transitions
   Shows area name + lore text on first visit
   ============================================ */
function initFogGates() {
    const AREAS = {
        "quest-log":    "THE CHRONICLE",
        "boss-battles": "TREAD CAREFULLY",
        "skill-tree":   "THE SKILL TREE",
        "academic":     "THE ARCHIVE",
        "ventures":     "VENTURES UNLOCKED",
        "genai":        "THE ARCANE ARTS",
        "achievements": "TROPHY WALL",
        "inventory":    "ARSENAL",
        "portfolio":    "THE GALLERY",
        "stats":        "CHARACTER SHEET",
        "contact":      "MAKE CONTACT",
    };

    // Build minimal toast DOM
    const gate = document.createElement("div");
    gate.className = "fog-gate";
    gate.innerHTML = `
        <div class="fog-gate-divider-top"></div>
        <span class="fog-gate-area"></span>
        <div class="fog-gate-divider-bottom"></div>
    `;
    document.body.appendChild(gate);

    const areaEl = gate.querySelector(".fog-gate-area");
    const seen = new Set();
    let busy = false;

    function showGate(sectionId) {
        const area = AREAS[sectionId];
        if (!area || busy) return;
        busy = true;

        areaEl.textContent = area;
        gate.classList.remove("fog-gate--show");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                gate.classList.add("fog-gate--show");
                setTimeout(() => {
                    gate.classList.remove("fog-gate--show");
                    busy = false;
                }, 2600);
            });
        });
    }

    const sections = Array.from(document.querySelectorAll(".section"));
    const skipIds = new Set(sections.slice(0, 2).map(s => s.id));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !seen.has(entry.target.id) && !skipIds.has(entry.target.id)) {
                seen.add(entry.target.id);
                showGate(entry.target.id);
            }
        });
    }, { threshold: 0.25 });

    sections.forEach(s => {
        if (AREAS[s.id]) observer.observe(s);
    });
}

