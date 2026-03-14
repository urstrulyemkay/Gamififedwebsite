/* ============================================
   SOUNDS.JS — Sound System & Audio Engine
   80+ unique sound definitions via Web Audio API.
   Exposes: playSound(), audioCtx, soundEnabled
   ============================================ */

var audioCtx = null;
var soundEnabled = true;

/* ============================================
   4. SOUND SYSTEM (Web Audio API)
   ============================================ */

function initSoundSystem() {
    const btn = document.getElementById("sound-toggle");
    const icon = document.getElementById("sound-icon");
    if (!btn) return;
    // Show initial state
    if (icon) icon.textContent = soundEnabled ? "\u{1F50A}" : "\u{1F507}";

    btn.addEventListener("click", () => {
        soundEnabled = !soundEnabled; window._soundEnabled = soundEnabled; window._audioCtx = audioCtx;
        if (icon) icon.textContent = soundEnabled ? "\u{1F50A}" : "\u{1F507}";
        if (soundEnabled && !audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
        }
    });

    // Safari: unlock AudioContext on first user interaction
    function unlockAudio() {
        if (!audioCtx) {
            try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); window._audioCtx = audioCtx; } catch(e) {}
        }
        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume().catch(function() {});
        }
        document.removeEventListener("touchstart", unlockAudio);
        document.removeEventListener("click", unlockAudio);
    }
    document.addEventListener("touchstart", unlockAudio, { once: true });
    document.addEventListener("click", unlockAudio, { once: true });
}

// Element sound profiles — modifies base frequencies/waveforms/timing
const ELEMENT_SOUND_PROFILES = {
    fire:  { freqMult: 0.85, waveform: "sawtooth", gainMult: 1.15, durationMult: 0.8,  detune: -50 },
    water: { freqMult: 1.0,  waveform: null,       gainMult: 1.0,  durationMult: 1.1,  detune: 0 },
    earth: { freqMult: 0.7,  waveform: "square",   gainMult: 1.1,  durationMult: 1.2,  detune: -100 },
    air:   { freqMult: 1.3,  waveform: "triangle",  gainMult: 0.85, durationMult: 1.15, detune: 50 },
    ether: { freqMult: 1.1,  waveform: null,       gainMult: 0.9,  durationMult: 1.3,  detune: 100 },
};

function getElementSoundProfile() {
    return ELEMENT_SOUND_PROFILES[window._currentElement || "water"] || ELEMENT_SOUND_PROFILES.water;
}

function playSound(type) {
    if (!soundEnabled) return;
    if (!audioCtx) {
        try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); window._audioCtx = audioCtx; window._soundEnabled = soundEnabled; } catch(e) { return; }
    }
    // Safari requires resume on user gesture — audio stays suspended otherwise
    if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(function() {});
    }
    const t = audioCtx.currentTime;
    const elProfile = getElementSoundProfile();

    function makeOsc(oscType, freq, gainVal, duration, freqEnd) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain); gain.connect(audioCtx.destination);

        // Apply element profile modifiers
        const modFreq = freq * elProfile.freqMult;
        const modGain = gainVal * elProfile.gainMult;
        const modDuration = duration * elProfile.durationMult;
        // Use element waveform for certain oscillator types, keep others unchanged
        const modType = elProfile.waveform && (oscType === "sine" || oscType === "triangle")
            ? elProfile.waveform : oscType;

        osc.type = modType;
        osc.frequency.value = modFreq;
        osc.detune.value = elProfile.detune;
        gain.gain.value = modGain;
        if (freqEnd) osc.frequency.linearRampToValueAtTime(freqEnd * elProfile.freqMult, t + modDuration * 0.8);
        gain.gain.linearRampToValueAtTime(0, t + modDuration);
        osc.start(t); osc.stop(t + modDuration);
    }

    switch (type) {
        case "levelup":
            // Triumphant rising fanfare
            makeOsc("sine", 523, 0.06, 0.5, 1047);
            makeOsc("triangle", 659, 0.03, 0.6, 1318);
            break;
        case "achievement":
            // Victory chime — 3-note ascending arpeggio
            makeOsc("triangle", 880, 0.05, 0.15);
            setTimeout(() => makeOsc("triangle", 1175, 0.04, 0.2), 100);
            setTimeout(() => makeOsc("sine", 1397, 0.03, 0.3), 200);
            break;
        case "whoosh":
            // Fast downward sweep for fog/reveal
            makeOsc("sawtooth", 200, 0.02, 0.15, 80);
            break;
        case "click":
            // Crisp UI tap
            makeOsc("square", 600, 0.015, 0.04);
            break;
        case "boss":
            // Ominous low rumble
            makeOsc("sawtooth", 110, 0.04, 0.8, 55);
            makeOsc("square", 82, 0.02, 1.0, 41);
            break;
        case "explosion": {
            // White noise burst — kept as fallback
            const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.15, audioCtx.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
            const src = audioCtx.createBufferSource();
            const expGain = audioCtx.createGain();
            src.buffer = buf; src.connect(expGain); expGain.connect(audioCtx.destination);
            expGain.gain.value = 0.04;
            src.start(t);
            makeOsc("sine", 150, 0.03, 0.2, 60);
            break;
        }
        case "cardReveal":
            // Magical card flip — ascending shimmer
            makeOsc("sine", 330, 0.04, 0.3, 660);
            setTimeout(() => makeOsc("triangle", 440, 0.03, 0.2, 880), 150);
            setTimeout(() => makeOsc("sine", 660, 0.05, 0.4, 1320), 300);
            break;
        // ── TERRITORY SOUNDS — unique horn per section ──
        case "territory-about":
            makeOsc("triangle", 392, 0.035, 0.15); setTimeout(() => makeOsc("triangle", 523, 0.03, 0.2), 100);
            break;
        case "territory-quest-log":
            makeOsc("sawtooth", 294, 0.03, 0.12); setTimeout(() => makeOsc("triangle", 440, 0.025, 0.18), 80);
            break;
        case "territory-academic":
            makeOsc("sine", 523, 0.03, 0.12); setTimeout(() => makeOsc("sine", 698, 0.025, 0.15), 120);
            break;
        case "territory-ventures":
            makeOsc("triangle", 349, 0.03, 0.1); setTimeout(() => makeOsc("sawtooth", 523, 0.02, 0.15), 90);
            break;
        case "territory-boss-battles":
            makeOsc("sawtooth", 196, 0.035, 0.2); setTimeout(() => makeOsc("square", 147, 0.025, 0.25), 100);
            break;
        case "territory-skill-tree":
            makeOsc("sine", 440, 0.03, 0.12); setTimeout(() => makeOsc("triangle", 660, 0.025, 0.18), 80);
            break;
        case "territory-stats":
            makeOsc("triangle", 494, 0.03, 0.12); setTimeout(() => makeOsc("sine", 740, 0.02, 0.15), 110);
            break;
        case "territory-genai":
            makeOsc("square", 587, 0.02, 0.08); setTimeout(() => makeOsc("sine", 880, 0.025, 0.12), 70);
            break;
        case "territory-portfolio":
            makeOsc("triangle", 330, 0.03, 0.12); setTimeout(() => makeOsc("triangle", 494, 0.025, 0.15), 100);
            break;
        case "territory-inventory":
            makeOsc("sine", 262, 0.03, 0.1); setTimeout(() => makeOsc("sawtooth", 392, 0.02, 0.15), 90);
            break;
        case "territory-achievements":
            makeOsc("triangle", 587, 0.035, 0.12); setTimeout(() => makeOsc("sine", 880, 0.03, 0.18), 100);
            break;
        case "territory-contact":
            makeOsc("sine", 220, 0.04, 0.18); setTimeout(() => makeOsc("triangle", 330, 0.03, 0.22), 120);
            break;

        // ── FOG CLEAR SOUNDS — unique per section ──
        case "fog-quest-log":
            makeOsc("sine", 300, 0.025, 0.12, 600); makeOsc("triangle", 450, 0.02, 0.15);
            break;
        case "fog-academic":
            makeOsc("sine", 523, 0.02, 0.1); setTimeout(() => makeOsc("triangle", 659, 0.015, 0.12), 60);
            break;
        case "fog-ventures":
            makeOsc("sawtooth", 350, 0.02, 0.1, 700); makeOsc("sine", 500, 0.015, 0.12);
            break;
        case "fog-boss-battles":
            makeOsc("sawtooth", 120, 0.03, 0.2, 60); makeOsc("square", 90, 0.02, 0.25);
            break;
        case "fog-skill-tree":
            makeOsc("sine", 440, 0.02, 0.1, 880); setTimeout(() => makeOsc("triangle", 660, 0.015, 0.12), 50);
            break;
        case "fog-stats":
            makeOsc("sine", 600, 0.02, 0.1, 900); makeOsc("triangle", 750, 0.015, 0.12);
            break;
        case "fog-genai":
            makeOsc("square", 800, 0.015, 0.06); setTimeout(() => makeOsc("sine", 1200, 0.02, 0.1), 40);
            break;
        case "fog-portfolio":
            makeOsc("sine", 400, 0.02, 0.12, 800); makeOsc("triangle", 550, 0.015, 0.1);
            break;
        case "fog-inventory":
            makeOsc("sawtooth", 250, 0.02, 0.12, 500); makeOsc("sine", 380, 0.015, 0.1);
            break;
        case "fog-achievements":
            makeOsc("triangle", 500, 0.025, 0.12, 1000); makeOsc("sine", 700, 0.02, 0.15);
            break;
        case "fog-contact":
            makeOsc("sine", 220, 0.025, 0.15, 440); makeOsc("triangle", 330, 0.02, 0.12);
            break;

        // ── ACHIEVEMENT TOAST SOUNDS — unique per section ──
        case "toast-about":
            makeOsc("sine", 659, 0.03, 0.12); setTimeout(() => makeOsc("triangle", 880, 0.025, 0.15), 80);
            break;
        case "toast-quest-log":
            makeOsc("triangle", 587, 0.03, 0.1); setTimeout(() => makeOsc("sine", 784, 0.025, 0.12), 100);
            setTimeout(() => makeOsc("triangle", 1047, 0.02, 0.15), 200);
            break;
        case "toast-academic":
            makeOsc("sine", 523, 0.03, 0.12); setTimeout(() => makeOsc("sine", 784, 0.02, 0.15), 100);
            break;
        case "toast-ventures":
            makeOsc("sawtooth", 440, 0.02, 0.08); setTimeout(() => makeOsc("sine", 660, 0.025, 0.12), 80);
            setTimeout(() => makeOsc("triangle", 880, 0.02, 0.15), 160);
            break;
        case "toast-boss-battles":
            makeOsc("sawtooth", 196, 0.03, 0.15); setTimeout(() => makeOsc("square", 262, 0.025, 0.12), 100);
            setTimeout(() => makeOsc("sine", 392, 0.03, 0.18), 200);
            break;
        case "toast-skill-tree":
            makeOsc("sine", 440, 0.025, 0.1); setTimeout(() => makeOsc("triangle", 554, 0.02, 0.1), 70);
            setTimeout(() => makeOsc("sine", 659, 0.025, 0.15), 140);
            break;
        case "toast-stats":
            makeOsc("triangle", 494, 0.025, 0.1); setTimeout(() => makeOsc("sine", 659, 0.02, 0.12), 90);
            break;
        case "toast-genai":
            makeOsc("square", 700, 0.015, 0.05); setTimeout(() => makeOsc("sine", 1047, 0.025, 0.1), 60);
            setTimeout(() => makeOsc("square", 1400, 0.015, 0.08), 120);
            break;
        case "toast-portfolio":
            makeOsc("sine", 523, 0.025, 0.1); setTimeout(() => makeOsc("triangle", 784, 0.02, 0.12), 80);
            break;
        case "toast-inventory":
            makeOsc("sine", 330, 0.025, 0.1, 660); setTimeout(() => makeOsc("triangle", 494, 0.02, 0.12), 90);
            break;
        case "toast-achievements":
            makeOsc("triangle", 784, 0.03, 0.1); setTimeout(() => makeOsc("sine", 1047, 0.025, 0.12), 80);
            setTimeout(() => makeOsc("triangle", 1319, 0.02, 0.15), 160);
            break;
        case "toast-contact":
            makeOsc("sine", 262, 0.03, 0.15); setTimeout(() => makeOsc("triangle", 392, 0.025, 0.12), 100);
            setTimeout(() => makeOsc("sine", 523, 0.03, 0.2), 200);
            break;

        // ── CURSOR WHOOSH SOUNDS — thematic per section ──
        case "whoosh-about":
            // Hero entrance — shield raise whoosh
            makeOsc("sine", 400, 0.012, 0.1, 1200);
            makeOsc("triangle", 600, 0.006, 0.08, 1400);
            break;
        case "whoosh-quest-log":
            // Scroll unfurling — papyrus sweep
            makeOsc("triangle", 300, 0.01, 0.12, 800);
            setTimeout(() => makeOsc("sine", 900, 0.006, 0.06), 60);
            break;
        case "whoosh-academic":
            // Page turn — soft fluttery whoosh
            makeOsc("sine", 500, 0.01, 0.08, 1000);
            makeOsc("triangle", 1200, 0.004, 0.06, 1800);
            break;
        case "whoosh-ventures":
            // Rocket flyby — doppler shift effect
            makeOsc("sawtooth", 600, 0.008, 0.12, 1800);
            setTimeout(() => makeOsc("sine", 1800, 0.006, 0.08, 600), 60);
            break;
        case "whoosh-boss-battles":
            // Blade swing — menacing fast sweep
            makeOsc("sawtooth", 800, 0.012, 0.06, 150);
            makeOsc("square", 400, 0.006, 0.08, 100);
            break;
        case "whoosh-skill-tree":
            // Arcane energy — mystical shimmer
            makeOsc("sine", 500, 0.01, 0.1, 1500);
            setTimeout(() => makeOsc("triangle", 1500, 0.005, 0.08, 500), 40);
            break;
        case "whoosh-stats":
            // Data scan — radar sweep ping
            makeOsc("sine", 600, 0.008, 0.1, 1400);
            makeOsc("triangle", 1400, 0.005, 0.06, 600);
            break;
        case "whoosh-genai":
            // Digital teleport — glitchy warp
            makeOsc("square", 800, 0.008, 0.04, 2000);
            setTimeout(() => makeOsc("square", 1600, 0.006, 0.03, 400), 30);
            setTimeout(() => makeOsc("sine", 2400, 0.005, 0.05), 50);
            break;
        case "whoosh-portfolio":
            // Camera lens zoom — smooth focus sweep
            makeOsc("sine", 400, 0.008, 0.1, 900);
            makeOsc("triangle", 800, 0.005, 0.08, 1200);
            break;
        case "whoosh-inventory":
            // Bag rummage — jingling items
            makeOsc("sine", 1200, 0.006, 0.04);
            setTimeout(() => makeOsc("triangle", 1500, 0.005, 0.03), 25);
            setTimeout(() => makeOsc("sine", 1000, 0.006, 0.04), 50);
            break;
        case "whoosh-achievements":
            // Trophy shine — gleaming ascent
            makeOsc("triangle", 600, 0.01, 0.08, 1800);
            setTimeout(() => makeOsc("sine", 1800, 0.006, 0.06, 2400), 40);
            break;
        case "whoosh-contact":
            // Message send — gentle dispatch whoosh
            makeOsc("sine", 300, 0.01, 0.12, 900);
            makeOsc("triangle", 600, 0.006, 0.1, 1200);
            break;

        // ── RESOURCE GAIN SOUNDS — thematic per section ──
        case "resource-about":
            // Hero intel — shield buff chime
            makeOsc("sine", 880, 0.02, 0.08);
            setTimeout(() => makeOsc("triangle", 1320, 0.015, 0.06), 40);
            break;
        case "resource-quest-log":
            // Quest XP — parchment stamp approval
            makeOsc("triangle", 700, 0.018, 0.06);
            setTimeout(() => makeOsc("sine", 1050, 0.015, 0.08), 50);
            break;
        case "resource-academic":
            // Knowledge gain — book close thud + sparkle
            makeOsc("sine", 300, 0.015, 0.06);
            setTimeout(() => makeOsc("triangle", 1400, 0.012, 0.06), 40);
            setTimeout(() => makeOsc("sine", 1800, 0.008, 0.04), 70);
            break;
        case "resource-ventures":
            // Startup funding — cash register cha-ching
            makeOsc("square", 1200, 0.012, 0.04);
            setTimeout(() => makeOsc("sine", 1800, 0.015, 0.06), 40);
            setTimeout(() => makeOsc("triangle", 2200, 0.01, 0.05), 80);
            break;
        case "resource-boss-battles":
            // Damage dealt — impact crunch
            makeOsc("sawtooth", 150, 0.02, 0.06, 80);
            makeOsc("square", 300, 0.01, 0.04);
            break;
        case "resource-skill-tree":
            // Mana gained — ethereal crystal tone
            makeOsc("sine", 660, 0.018, 0.1, 1320);
            makeOsc("triangle", 990, 0.01, 0.08, 1650);
            break;
        case "resource-stats":
            // Data processed — digital ticker
            makeOsc("square", 1000, 0.01, 0.03);
            setTimeout(() => makeOsc("square", 1200, 0.01, 0.03), 35);
            setTimeout(() => makeOsc("square", 1500, 0.012, 0.04), 70);
            break;
        case "resource-genai":
            // AI compute — neural net fire
            makeOsc("square", 800, 0.008, 0.03);
            setTimeout(() => makeOsc("sine", 1600, 0.012, 0.05), 20);
            setTimeout(() => makeOsc("square", 2400, 0.008, 0.03), 40);
            break;
        case "resource-portfolio":
            // Creative spark — camera flash pop
            makeOsc("sine", 1500, 0.015, 0.04);
            setTimeout(() => makeOsc("triangle", 2000, 0.01, 0.06), 30);
            break;
        case "resource-inventory":
            // Item collected — potion bottle clink
            makeOsc("sine", 1800, 0.012, 0.05, 2200);
            setTimeout(() => makeOsc("triangle", 1200, 0.008, 0.04), 30);
            break;
        case "resource-achievements":
            // Trophy polished — bright triumphant ding
            makeOsc("sine", 1047, 0.02, 0.06);
            setTimeout(() => makeOsc("triangle", 1568, 0.015, 0.08), 50);
            setTimeout(() => makeOsc("sine", 2093, 0.012, 0.06), 100);
            break;
        case "resource-contact":
            // Message received — warm notification tone
            makeOsc("sine", 523, 0.02, 0.08);
            setTimeout(() => makeOsc("triangle", 784, 0.015, 0.1), 60);
            break;

        // ── MKJ TAP SOUNDS — escalating pitch per tap ──
        case "mkjTap-1":
            makeOsc("sine", 523, 0.03, 0.08); makeOsc("triangle", 784, 0.02, 0.06);
            break;
        case "mkjTap-2":
            makeOsc("sine", 659, 0.03, 0.08); makeOsc("triangle", 988, 0.02, 0.06);
            break;
        case "mkjTap-3":
            makeOsc("sine", 784, 0.03, 0.08); makeOsc("triangle", 1175, 0.025, 0.07);
            setTimeout(() => makeOsc("sine", 1319, 0.02, 0.06), 50);
            break;
        case "mkjTap-4":
            makeOsc("sine", 988, 0.03, 0.08); makeOsc("triangle", 1480, 0.025, 0.07);
            setTimeout(() => makeOsc("sine", 1760, 0.02, 0.08), 50);
            break;
        case "mkjTap-5":
            makeOsc("sine", 1175, 0.035, 0.06);
            setTimeout(() => makeOsc("triangle", 1568, 0.03, 0.06), 30);
            setTimeout(() => makeOsc("sine", 1760, 0.03, 0.06), 60);
            setTimeout(() => makeOsc("triangle", 2093, 0.025, 0.1), 90);
            break;

        case "easterEgg":
            // Secret discovery — magical chime cascade
            makeOsc("sine", 880, 0.03, 0.1);
            setTimeout(() => makeOsc("triangle", 1175, 0.025, 0.1), 60);
            setTimeout(() => makeOsc("sine", 1568, 0.03, 0.15), 120);
            setTimeout(() => makeOsc("triangle", 1760, 0.025, 0.2), 180);
            break;
        case "nudge":
            // Gentle attention bell — soft wind chime
            makeOsc("sine", 1200, 0.012, 0.08);
            setTimeout(() => makeOsc("triangle", 1500, 0.01, 0.1), 80);
            break;
        case "hover":
            // Soft hover tone — subtle high blip
            makeOsc("sine", 1400, 0.01, 0.06);
            break;
        case "scroll":
            // Gentle scroll tick — barely audible
            makeOsc("sine", 800, 0.008, 0.03);
            break;
        case "skillFill":
            // Rising bar fill — pitch mapped to progress
            makeOsc("sine", 440, 0.025, 0.4, 880);
            makeOsc("triangle", 550, 0.015, 0.35, 1100);
            break;
        case "combo":
            // Rapid staccato combo hit
            makeOsc("square", 700, 0.02, 0.05);
            setTimeout(() => makeOsc("square", 900, 0.025, 0.05), 40);
            break;
        case "questUnlock":
            // Quest item unlock — metallic shimmer
            makeOsc("triangle", 587, 0.035, 0.12);
            setTimeout(() => makeOsc("sine", 784, 0.03, 0.15), 80);
            setTimeout(() => makeOsc("triangle", 1047, 0.025, 0.2), 160);
            break;
        case "inventoryOpen":
            // Chest opening creak — descending warble
            makeOsc("sawtooth", 300, 0.02, 0.25, 180);
            makeOsc("sine", 400, 0.015, 0.3, 250);
            break;
        case "dialogueOpen":
            // NPC greeting — warm ascending tone
            makeOsc("sine", 262, 0.04, 0.2, 392);
            setTimeout(() => makeOsc("triangle", 330, 0.03, 0.25, 494), 120);
            break;
        case "bootDismiss":
            // Epic portal open — wide sweep + shimmer
            makeOsc("sine", 200, 0.05, 0.8, 800);
            makeOsc("triangle", 300, 0.03, 0.6, 1200);
            setTimeout(() => makeOsc("sine", 600, 0.04, 0.5, 1600), 200);
            break;
        case "saveGame":
            // Retro save sound — quick descending beeps
            makeOsc("square", 1200, 0.02, 0.06);
            setTimeout(() => makeOsc("square", 1000, 0.02, 0.06), 70);
            setTimeout(() => makeOsc("square", 800, 0.02, 0.08), 140);
            break;
        case "mapPing":
            // Minimap interaction — sonar ping
            makeOsc("sine", 1500, 0.015, 0.15, 750);
            break;
        case "xpGain":
            // XP counter tick — bright ascending pop
            makeOsc("sine", 1100, 0.02, 0.1, 1500);
            break;
        case "ventureReveal":
            // Startup launch — rocket ignition rising chord
            makeOsc("sawtooth", 220, 0.02, 0.3, 440);
            setTimeout(() => makeOsc("sine", 330, 0.03, 0.25, 660), 100);
            setTimeout(() => makeOsc("triangle", 440, 0.025, 0.3, 880), 200);
            break;
        case "statReveal":
            // Radar scan — pulsing sonar sweep
            makeOsc("sine", 600, 0.02, 0.2, 900);
            setTimeout(() => makeOsc("sine", 700, 0.015, 0.15, 1000), 150);
            break;
        case "footerPulse":
            // Final quest beacon — deep warm pulse
            makeOsc("sine", 196, 0.04, 0.5, 262);
            makeOsc("triangle", 262, 0.025, 0.6, 392);
            setTimeout(() => makeOsc("sine", 392, 0.03, 0.4, 523), 300);
            break;
        case "cardHover":
            // Card interaction — subtle crystalline tap
            makeOsc("triangle", 1800, 0.008, 0.04);
            break;
        case "portfolioOpen":
            // Portfolio showcase — camera shutter click + shine
            makeOsc("square", 2000, 0.012, 0.03);
            setTimeout(() => makeOsc("sine", 1200, 0.02, 0.15, 2400), 30);
            break;
        case "genaiReveal":
            // AI circuit activation — digital chirp sequence
            makeOsc("square", 800, 0.015, 0.05);
            setTimeout(() => makeOsc("square", 1200, 0.012, 0.05), 60);
            setTimeout(() => makeOsc("sine", 1600, 0.02, 0.1, 2000), 120);
            break;
        case "academicReveal":
            // Scholarly bell — resonant chime like a university bell tower
            makeOsc("sine", 523, 0.04, 0.4);
            setTimeout(() => makeOsc("sine", 659, 0.03, 0.35), 200);
            setTimeout(() => makeOsc("triangle", 784, 0.02, 0.5), 400);
            break;
        case "academicUnlock":
            // Parchment unfurl — soft papery sweep with pen nib tap
            makeOsc("triangle", 400, 0.02, 0.1, 600);
            setTimeout(() => makeOsc("sine", 900, 0.015, 0.08), 60);
            break;
        case "achievementReveal":
            // Trophy cabinet opening — grandiose brass swell
            makeOsc("sawtooth", 262, 0.03, 0.3, 523);
            makeOsc("triangle", 330, 0.025, 0.35, 659);
            setTimeout(() => makeOsc("sine", 523, 0.04, 0.4, 784), 150);
            break;
        case "bossReveal":
            // Arena gate — heavy descending grind with sub-bass tremor
            makeOsc("sawtooth", 160, 0.03, 0.5, 80);
            makeOsc("square", 120, 0.02, 0.6, 60);
            setTimeout(() => makeOsc("sine", 55, 0.04, 0.4), 300);
            break;
        case "skillTreeReveal":
            // Arcane tome opening — mystical ascending cascade
            makeOsc("sine", 294, 0.03, 0.15);
            setTimeout(() => makeOsc("triangle", 370, 0.025, 0.15), 80);
            setTimeout(() => makeOsc("sine", 440, 0.03, 0.15), 160);
            setTimeout(() => makeOsc("triangle", 554, 0.025, 0.2), 240);
            setTimeout(() => makeOsc("sine", 659, 0.02, 0.3), 320);
            break;
        case "ventureHover":
            // Rocket idle — brief turbine whine
            makeOsc("sawtooth", 2200, 0.006, 0.05, 1800);
            break;
        case "trukapp":
            // Truck engine rumble — low diesel idle with vibration
            makeOsc("sawtooth", 65, 0.02, 0.3, 55);
            makeOsc("square", 130, 0.008, 0.25, 120);
            setTimeout(() => makeOsc("sawtooth", 70, 0.015, 0.2, 60), 100);
            setTimeout(() => makeOsc("triangle", 45, 0.01, 0.15), 200);
            break;
        case "meetbytravel":
            // Ocean breeze and waves — airy whoosh with shimmer
            makeOsc("sine", 200, 0.015, 0.5, 150);
            makeOsc("triangle", 400, 0.006, 0.6, 350);
            setTimeout(() => makeOsc("sine", 600, 0.004, 0.4, 500), 100);
            setTimeout(() => makeOsc("triangle", 180, 0.01, 0.35, 140), 200);
            setTimeout(() => makeOsc("sine", 800, 0.003, 0.3, 700), 300);
            break;
        case "vipme":
            // Vibe/party pulse — rhythmic bass with sparkle
            makeOsc("sine", 80, 0.025, 0.15);
            setTimeout(() => makeOsc("square", 320, 0.008, 0.08), 80);
            setTimeout(() => makeOsc("sine", 80, 0.02, 0.12), 160);
            setTimeout(() => makeOsc("triangle", 640, 0.006, 0.06), 200);
            setTimeout(() => makeOsc("sine", 1200, 0.004, 0.05), 250);
            break;
        case "bossHover":
            // Danger proximity — low threatening buzz
            makeOsc("sawtooth", 90, 0.01, 0.06, 70);
            break;
        case "achievementHover":
            // Trophy clink — bright metallic tap
            makeOsc("sine", 2400, 0.008, 0.03);
            setTimeout(() => makeOsc("sine", 3200, 0.005, 0.04), 20);
            break;
        case "inventoryHover":
            // Potion bottle clink — glassy resonance
            makeOsc("sine", 1600, 0.007, 0.06, 2000);
            break;
        case "genaiHover":
            // Digital pulse — synth blip
            makeOsc("square", 1400, 0.006, 0.03);
            setTimeout(() => makeOsc("sine", 2100, 0.005, 0.04), 25);
            break;
        case "navHover":
            // Menu tick — minimal mechanical click
            makeOsc("square", 3000, 0.005, 0.02);
            break;

        // ── SECTION ENTER AMBIENCE — one-shot mood setters ──
        case "ambience-about":
            // Hero arrival — warm welcome glow
            makeOsc("sine", 196, 0.03, 0.6, 262);
            makeOsc("triangle", 294, 0.02, 0.5, 392);
            setTimeout(() => makeOsc("sine", 392, 0.015, 0.4), 300);
            break;
        case "ambience-quest-log":
            // Campfire journal — crackling warmth
            makeOsc("sawtooth", 100, 0.008, 0.3, 90);
            makeOsc("triangle", 200, 0.005, 0.25, 180);
            setTimeout(() => makeOsc("sine", 350, 0.01, 0.2), 150);
            break;
        case "ambience-academic":
            // Library hush — reverberant hall tone
            makeOsc("sine", 262, 0.025, 0.8, 294);
            makeOsc("triangle", 392, 0.012, 0.7, 440);
            setTimeout(() => makeOsc("sine", 523, 0.008, 0.5), 400);
            break;
        case "ambience-ventures":
            // Launch pad — engine hum building
            makeOsc("sawtooth", 80, 0.015, 0.5, 160);
            makeOsc("sine", 160, 0.01, 0.4, 320);
            setTimeout(() => makeOsc("triangle", 320, 0.008, 0.3, 640), 200);
            break;
        case "ambience-boss-battles":
            // Arena drums — war drums approach
            makeOsc("sine", 60, 0.03, 0.2);
            setTimeout(() => makeOsc("sine", 60, 0.025, 0.18), 200);
            setTimeout(() => makeOsc("sine", 60, 0.02, 0.15), 350);
            setTimeout(() => makeOsc("sawtooth", 80, 0.015, 0.12), 450);
            break;
        case "ambience-skill-tree":
            // Arcane library — mystical hum
            makeOsc("sine", 220, 0.02, 0.7, 247);
            makeOsc("triangle", 330, 0.01, 0.6, 370);
            makeOsc("sine", 440, 0.008, 0.5, 494);
            break;
        case "ambience-stats":
            // Control room — electronic hum + data stream
            makeOsc("sine", 440, 0.008, 0.4);
            makeOsc("square", 880, 0.003, 0.3);
            setTimeout(() => makeOsc("sine", 1760, 0.004, 0.2), 200);
            break;
        case "ambience-genai":
            // Neural network — digital consciousness awakening
            makeOsc("square", 220, 0.006, 0.15);
            setTimeout(() => makeOsc("square", 440, 0.005, 0.12), 80);
            setTimeout(() => makeOsc("sine", 880, 0.008, 0.2), 160);
            setTimeout(() => makeOsc("sine", 1760, 0.006, 0.15), 240);
            break;
        case "ambience-portfolio":
            // Gallery entrance — echoing footstep + space
            makeOsc("sine", 150, 0.015, 0.3, 120);
            setTimeout(() => makeOsc("triangle", 600, 0.005, 0.4, 500), 100);
            break;
        case "ambience-inventory":
            // Treasure vault — heavy door + echo
            makeOsc("sawtooth", 80, 0.02, 0.4, 50);
            makeOsc("sine", 120, 0.015, 0.3, 80);
            setTimeout(() => makeOsc("triangle", 400, 0.006, 0.3), 250);
            break;
        case "ambience-achievements":
            // Hall of fame — triumphant brass swell
            makeOsc("sawtooth", 196, 0.02, 0.4, 262);
            makeOsc("triangle", 262, 0.015, 0.5, 392);
            setTimeout(() => makeOsc("sine", 392, 0.02, 0.4, 523), 200);
            setTimeout(() => makeOsc("triangle", 523, 0.015, 0.3, 659), 400);
            break;
        case "ambience-contact":
            // Radio tuning — warm connection established
            makeOsc("sine", 300, 0.01, 0.3, 350);
            makeOsc("triangle", 500, 0.006, 0.25, 550);
            setTimeout(() => makeOsc("sine", 700, 0.008, 0.2), 200);
            break;

        // ── BALLOON HOVER — bouncy pop per social link ──
        case "balloonBounce":
            // Rubber balloon squeak + pop
            makeOsc("sine", 600, 0.015, 0.08, 900);
            setTimeout(() => makeOsc("triangle", 1200, 0.01, 0.06), 40);
            break;
        case "balloonSubstack":
            // Newsletter rustling pages
            makeOsc("triangle", 800, 0.008, 0.05);
            setTimeout(() => makeOsc("sine", 1000, 0.006, 0.04), 30);
            setTimeout(() => makeOsc("triangle", 1200, 0.005, 0.03), 55);
            break;
        case "balloonLinkedin":
            // Professional handshake — firm confident tone
            makeOsc("sine", 440, 0.012, 0.08);
            setTimeout(() => makeOsc("triangle", 660, 0.01, 0.06), 50);
            break;
        case "balloonTwitter":
            // Bird chirp — quick bright tweet
            makeOsc("sine", 2000, 0.008, 0.04, 2800);
            setTimeout(() => makeOsc("sine", 2400, 0.006, 0.03, 3000), 40);
            break;
        case "balloonEmail":
            // Mail send whoosh
            makeOsc("sine", 500, 0.01, 0.1, 1200);
            makeOsc("triangle", 800, 0.006, 0.08, 1600);
            break;
        case "balloonBlog":
            // Pen on paper — writing scratch
            makeOsc("sawtooth", 2000, 0.004, 0.04, 1500);
            setTimeout(() => makeOsc("sawtooth", 2200, 0.003, 0.03, 1800), 40);
            break;

        // ── PATTERN GATE SOUNDS ──
        case "patternCorrect":
            // Lock mechanism opening — gear clicks ascending
            makeOsc("sine", 523, 0.025, 0.08);
            setTimeout(() => makeOsc("triangle", 659, 0.02, 0.08), 60);
            setTimeout(() => makeOsc("sine", 784, 0.025, 0.1), 120);
            setTimeout(() => makeOsc("triangle", 1047, 0.03, 0.15), 180);
            break;
        case "patternWrong":
            // Access denied — buzzer
            makeOsc("sawtooth", 150, 0.02, 0.2, 100);
            makeOsc("square", 120, 0.015, 0.15, 80);
            break;
        case "patternDot":
            // Node activation — crisp electric tap
            makeOsc("sine", 1200, 0.015, 0.04);
            makeOsc("triangle", 1800, 0.008, 0.03);
            break;

        // ── CURSOR EVOLUTION SOUNDS ──
        case "cursorUpgrade":
            // Power-up — ascending sparkle cascade
            makeOsc("sine", 523, 0.02, 0.06);
            setTimeout(() => makeOsc("triangle", 784, 0.018, 0.06), 50);
            setTimeout(() => makeOsc("sine", 1047, 0.02, 0.08), 100);
            setTimeout(() => makeOsc("triangle", 1568, 0.015, 0.1), 150);
            break;
        case "cursorLegendary":
            // Legendary transformation — epic power surge
            makeOsc("sine", 262, 0.03, 0.15, 523);
            makeOsc("triangle", 392, 0.02, 0.12, 784);
            setTimeout(() => makeOsc("sine", 523, 0.03, 0.15, 1047), 100);
            setTimeout(() => makeOsc("triangle", 784, 0.025, 0.2, 1568), 200);
            setTimeout(() => makeOsc("sine", 1047, 0.02, 0.15, 2093), 300);
            break;

        // ── STARFIELD / ATMOSPHERE ──
        case "starTwinkle":
            // Distant star sparkle — very subtle high ping
            makeOsc("sine", 3000, 0.003, 0.06, 3500);
            break;
        case "cosmicHum":
            // Deep space ambience — low resonance
            makeOsc("sine", 55, 0.008, 0.8, 65);
            makeOsc("triangle", 82, 0.004, 0.6, 98);
            break;
    }
}

