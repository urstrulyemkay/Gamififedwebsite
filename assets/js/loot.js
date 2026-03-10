
/* ============================================
   LOOT DROP SYSTEM
   Random collectible cards drop as you scroll
   ============================================ */
function initLootDrops(C) {
    if (!C.lootDrops) return;
    const toast = document.getElementById("loot-drop-toast");
    const iconEl = document.getElementById("loot-icon");
    const rarityEl = document.getElementById("loot-rarity");
    const nameEl = document.getElementById("loot-name");
    const flavorEl = document.getElementById("loot-flavor");
    const countEl = document.getElementById("loot-count");
    const gridEl = document.getElementById("loot-grid");
    if (!toast || !gridEl) return;

    const STORAGE_KEY = "mkj_loot_collection";
    let collected = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    let dropQueue = [];
    let isShowing = false;
    let scrollAccumulator = 0;
    const DROP_THRESHOLD = 1200; // pixels scrolled before a drop chance
    const DROP_CHANCE = 0.35; // 35% chance per threshold

    // Build collection grid
    function renderGrid() {
        gridEl.innerHTML = "";
        C.lootDrops.forEach((loot, i) => {
            const slot = document.createElement("div");
            const isCollected = collected.includes(i);
            slot.className = "loot-slot " + (isCollected ? "collected" : "empty");
            if (isCollected) {
                slot.textContent = loot.icon;
                const tip = document.createElement("span");
                tip.className = "loot-slot-tooltip";
                tip.textContent = loot.name;
                slot.appendChild(tip);
            }
            gridEl.appendChild(slot);
        });
        if (countEl) countEl.textContent = collected.length + "/" + C.lootDrops.length;
    }

    function showDrop(lootIndex) {
        const loot = C.lootDrops[lootIndex];
        if (!loot) return;

        isShowing = true;
        toast.setAttribute("data-rarity", loot.rarity);
        iconEl.textContent = loot.icon;
        rarityEl.textContent = loot.rarity.toUpperCase() + " DROP";
        nameEl.textContent = loot.name;
        flavorEl.textContent = loot.flavor;
        toast.classList.add("active");

        // Sound based on rarity
        if (window._soundEnabled) {
            const freqs = { legendary: 880, epic: 660, rare: 440 };
            try {
                const ctx = window._audioCtx || new (window.AudioContext || window.webkitAudioContext)();
                window._audioCtx = ctx;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(freqs[loot.rarity] || 440, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime((freqs[loot.rarity] || 440) * 1.5, ctx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.06, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(); osc.stop(ctx.currentTime + 0.8);
            } catch(e) {}
        }

        // Auto-hide after 4 seconds
        setTimeout(() => {
            toast.classList.remove("active");
            setTimeout(() => {
                isShowing = false;
                if (dropQueue.length > 0) showDrop(dropQueue.shift());
            }, 500);
        }, 4000);
    }

    function tryDrop() {
        // Find uncollected loot
        const uncollected = C.lootDrops
            .map((_, i) => i)
            .filter(i => !collected.includes(i));
        if (uncollected.length === 0) return;

        // Weighted: legendaries are rarer
        const weights = uncollected.map(i => {
            const r = C.lootDrops[i].rarity;
            return r === "legendary" ? 1 : r === "epic" ? 3 : 5;
        });
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let rand = Math.random() * totalWeight;
        let picked = uncollected[0];
        for (let j = 0; j < weights.length; j++) {
            rand -= weights[j];
            if (rand <= 0) { picked = uncollected[j]; break; }
        }

        // Collect it
        collected.push(picked);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collected));
        renderGrid();

        if (isShowing) {
            dropQueue.push(picked);
        } else {
            showDrop(picked);
        }
    }

    // Scroll listener for drops
    let lastScroll = window.scrollY;
    window.addEventListener("scroll", () => {
        const delta = Math.abs(window.scrollY - lastScroll);
        lastScroll = window.scrollY;
        scrollAccumulator += delta;
        if (scrollAccumulator >= DROP_THRESHOLD) {
            scrollAccumulator = 0;
            if (Math.random() < DROP_CHANCE) tryDrop();
        }
    }, { passive: true });

    renderGrid();

    // Click-to-expand/collapse the loot bag panel
    const panel = document.getElementById("loot-collection");
    if (panel) {
        panel.addEventListener("click", (e) => {
            // Don't toggle when clicking a slot tooltip or slot itself while expanded
            if (panel.classList.contains("expanded") && e.target.closest(".loot-slot")) return;
            panel.classList.toggle("expanded");
        });
        // Close on outside click
        document.addEventListener("click", (e) => {
            if (!panel.contains(e.target)) panel.classList.remove("expanded");
        });
    }
}

