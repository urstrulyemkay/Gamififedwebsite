/* ============================================
   WEATHER.JS v2.1 — Atmospheric Effects Engine
   Smooth crossfade transitions between moods.
   Scroll-based mood progression: day -> dawn ->
   dusk -> night -> storm as visitors explore.
   Spaceship flyovers for extra wow.
   ============================================ */

(function() {
    "use strict";

    document.addEventListener("DOMContentLoaded", function() {
        var C = window.CONTENT;
        if (!C || !C.weather) return;
        var delay = document.querySelector(".game-boot") ? 500 : 100;
        setTimeout(function() { initWeather(C); }, delay);
    });

    function initWeather(C) {
        if (window._weatherInitDone) return;
        window._weatherInitDone = true;

        var indicator = document.getElementById("weather-indicator");
        var iconEl = document.getElementById("weather-icon");
        var labelEl = document.getElementById("weather-label");
        var _currentMoodId = null;

        // ========= UTILITIES =========

        function getTimeOfDay() {
            var h = new Date().getHours();
            if (h >= 5 && h < 8) return "dawn";
            if (h >= 8 && h < 17) return "day";
            if (h >= 17 && h < 20) return "dusk";
            return "night";
        }

        // Scroll-based mood progression
        var SCROLL_MOODS = ["day", "dawn", "dusk", "night", "storm"];
        function getScrollMood() {
            var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (maxScroll <= 0) return "day";
            var scrollPct = Math.max(0, Math.min(1, window.scrollY / maxScroll));
            var idx = Math.floor(scrollPct * (SCROLL_MOODS.length - 1));
            return SCROLL_MOODS[Math.min(idx, SCROLL_MOODS.length - 1)];
        }

        function rand(min, max) { return min + Math.random() * (max - min); }

        // All weather element selectors
        var WEATHER_SELECTORS = [
            ".weather-stars", ".weather-milkyway", ".weather-rain-drop",
            ".rain-splash", ".weather-puddle", ".weather-dawn-glow",
            ".weather-dawn-sun", ".weather-dawn-ray", ".weather-horizon",
            ".weather-wind-particle", ".weather-leaf", ".weather-sun-orb",
            ".weather-heat-shimmer", ".weather-mirage", ".weather-lens-flare",
            ".weather-godray", ".weather-cloud", ".lightning-bolt",
            ".weather-moon", ".weather-firefly", ".weather-snowflake",
            ".weather-ice-crystal", ".weather-frost", ".weather-fog",
            ".weather-breath", ".weather-ember", ".weather-fire-lick",
            ".weather-screen-pulse", ".weather-burst",
            ".weather-aurora-ribbon", ".weather-petal", ".weather-ripple",
            ".weather-zen-breathe", ".weather-aurora",
            ".weather-cosmic-dust", ".weather-nebula",
            ".weather-paint-splash", ".weather-prism",
            ".weather-dust", ".weather-golden-mote", ".weather-tint",
            ".weather-bird", ".weather-dusk-sky", ".weather-spaceship"
        ];

        function clearIntervals() {
            clearInterval(window._weatherShootingInterval); window._weatherShootingInterval = null;
            clearInterval(window._weatherSplashInterval); window._weatherSplashInterval = null;
            clearInterval(window._weatherThunderInterval); window._weatherThunderInterval = null;
            clearInterval(window._weatherBurstInterval); window._weatherBurstInterval = null;
            clearInterval(window._weatherRippleInterval); window._weatherRippleInterval = null;
            clearInterval(window._weatherShipInterval); window._weatherShipInterval = null;
            document.body.classList.remove("weather-shaking");
        }

        function addTint(color) {
            var tint = document.createElement("div");
            tint.className = "weather-tint";
            tint.style.background = color;
            tint.style.opacity = "0";
            document.body.appendChild(tint);
            // Fade in
            requestAnimationFrame(function() {
                tint.style.transition = "opacity 1.5s ease-in";
                tint.style.opacity = "1";
                tint.classList.add("active");
            });
        }

        // ========================================
        // EFFECT BUILDERS
        // ========================================

        // ── NIGHT ──────────────────────────────

        function buildStars() {
            var container = document.createElement("div");
            container.className = "weather-stars";
            container.style.opacity = "0";
            for (var i = 0; i < 120; i++) {
                var star = document.createElement("div");
                var isBright = Math.random() > 0.88;
                star.className = "weather-star" + (isBright ? " bright" : "");
                star.style.left = rand(0, 100) + "%";
                star.style.top = rand(0, 80) + "%";
                star.style.animationDelay = rand(0, 6) + "s";
                star.style.animationDuration = rand(1.5, 5) + "s";
                var size = isBright ? rand(2, 4) : rand(0.5, 2.5);
                star.style.width = star.style.height = size + "px";
                container.appendChild(star);
            }
            document.body.appendChild(container);
            fadeIn(container);

            window._weatherShootingInterval = setInterval(function() {
                var cont = document.querySelector(".weather-stars");
                if (!cont) return;
                var shoot = document.createElement("div");
                shoot.className = "weather-star shooting";
                shoot.style.left = rand(5, 45) + "%";
                shoot.style.top = rand(2, 20) + "%";
                cont.appendChild(shoot);
                setTimeout(function() { shoot.remove(); }, 1500);
            }, 4000 + Math.random() * 4000);

            addTint("linear-gradient(180deg, rgba(3,3,25,0.5) 0%, rgba(5,5,20,0.2) 40%, transparent 70%)");
        }

        function buildMilkyWay() {
            var mw = document.createElement("div");
            mw.className = "weather-milkyway";
            mw.style.opacity = "0";
            document.body.appendChild(mw);
            fadeIn(mw);
        }

        function buildMoon() {
            var moon = document.createElement("div");
            moon.className = "weather-moon";
            moon.style.opacity = "0";
            var craters = [
                { top: "18%", left: "22%", w: 14, h: 14 },
                { top: "42%", left: "55%", w: 10, h: 10 },
                { top: "58%", left: "28%", w: 7, h: 7 },
                { top: "28%", left: "62%", w: 12, h: 12 },
                { top: "68%", left: "50%", w: 6, h: 6 },
            ];
            craters.forEach(function(c) {
                var crater = document.createElement("div");
                crater.className = "weather-moon-crater";
                crater.style.top = c.top; crater.style.left = c.left;
                crater.style.width = c.w + "px"; crater.style.height = c.h + "px";
                moon.appendChild(crater);
            });
            document.body.appendChild(moon);
            fadeIn(moon, 2000);
        }

        function buildFireflies() {
            var colors = [
                "rgba(74,222,128,0.9)", "rgba(228,255,26,0.7)",
                "rgba(34,211,238,0.6)", "rgba(167,139,250,0.5)",
                "rgba(255,200,50,0.6)"
            ];
            for (var i = 0; i < 20; i++) {
                var fly = document.createElement("div");
                fly.className = "weather-firefly";
                var color = colors[Math.floor(Math.random() * colors.length)];
                fly.style.background = "radial-gradient(circle, " + color + ", transparent 60%)";
                fly.style.boxShadow = "0 0 12px " + color + ", 0 0 24px " + color.replace(/[\d.]+\)$/, "0.3)");
                fly.style.left = rand(5, 90) + "%";
                fly.style.top = rand(15, 75) + "%";
                fly.style.animationDuration = rand(5, 10) + "s";
                fly.style.animationDelay = rand(0, 10) + "s";
                var size = rand(4, 8);
                fly.style.width = fly.style.height = size + "px";
                document.body.appendChild(fly);
            }
        }

        // ── STORM ──────────────────────────────

        function buildRain(heavy) {
            var count = heavy ? 100 : 40;
            var color = heavy ? "rgba(96,165,250,0.4)" : "rgba(167,139,250,0.25)";
            var speedBase = heavy ? 0.3 : 0.55;
            for (var i = 0; i < count; i++) {
                var drop = document.createElement("div");
                drop.className = "weather-rain-drop";
                drop.style.left = rand(0, 100) + "%";
                drop.style.width = (heavy ? 2 : 1) + "px";
                drop.style.height = (heavy ? 22 : 12) + rand(0, heavy ? 35 : 20) + "px";
                drop.style.background = color;
                drop.style.animationDuration = (speedBase + rand(0, 0.4)) + "s";
                drop.style.animationDelay = rand(0, 2) + "s";
                if (heavy) drop.style.transform = "rotate(8deg)";
                document.body.appendChild(drop);
            }
            window._weatherSplashInterval = setInterval(function() {
                var splash = document.createElement("div");
                splash.className = "rain-splash";
                splash.style.left = rand(0, 100) + "%";
                splash.style.background = color;
                document.body.appendChild(splash);
                setTimeout(function() { splash.remove(); }, 600);
            }, heavy ? 100 : 350);

            addTint(heavy
                ? "linear-gradient(180deg, rgba(10,15,30,0.4) 0%, rgba(20,30,50,0.2) 100%)"
                : "linear-gradient(180deg, rgba(30,20,60,0.15) 0%, transparent 80%)"
            );
        }

        function buildPuddles() {
            for (var i = 0; i < 6; i++) {
                var p = document.createElement("div");
                p.className = "weather-puddle";
                p.style.left = rand(5, 90) + "%";
                p.style.bottom = rand(0, 5) + "%";
                var w = rand(60, 150);
                p.style.width = w + "px";
                p.style.height = (w * 0.3) + "px";
                p.style.animationDelay = rand(0, 3) + "s";
                p.style.animationDuration = rand(2, 4) + "s";
                document.body.appendChild(p);
            }
        }

        function buildClouds(dark) {
            var count = dark ? 12 : 5;
            for (var i = 0; i < count; i++) {
                var cloud = document.createElement("div");
                cloud.className = "weather-cloud " + (dark ? "dark" : "light");
                var w = (dark ? 350 : 200) + rand(0, 500);
                cloud.style.width = w + "px";
                cloud.style.height = (dark ? 70 : 40) + rand(0, dark ? 100 : 50) + "px";
                cloud.style.top = rand(dark ? 0 : 5, dark ? 30 : 40) + "%";
                cloud.style.animationDuration = (dark ? 12 : 22) + rand(0, 25) + "s";
                cloud.style.animationDelay = -rand(0, 40) + "s";
                cloud.style.opacity = (dark ? 0.6 : 0.3) + rand(0, 0.4);
                document.body.appendChild(cloud);
            }
        }

        function buildThunder() {
            var lightningEl = document.getElementById("weather-lightning");
            function strike() {
                if (lightningEl) {
                    lightningEl.classList.remove("flash");
                    void lightningEl.offsetWidth;
                    lightningEl.classList.add("flash");
                    setTimeout(function() { lightningEl.classList.remove("flash"); }, 600);
                }
                var bolt = document.createElement("div");
                bolt.className = "lightning-bolt";
                bolt.style.left = rand(10, 80) + "%";
                bolt.style.top = "0";
                var boltHeight = rand(200, 400);
                bolt.style.height = boltHeight + "px";
                bolt.style.transform = "rotate(" + rand(-12, 12) + "deg)";
                var branches = 2 + Math.floor(Math.random() * 2);
                for (var b = 0; b < branches; b++) {
                    var branch = document.createElement("div");
                    branch.className = "bolt-branch";
                    branch.style.top = rand(20, 70) + "%";
                    branch.style.height = rand(40, 100) + "px";
                    branch.style.transform = "rotate(" + (Math.random() > 0.5 ? 1 : -1) * rand(15, 45) + "deg)";
                    branch.style.transformOrigin = "top left";
                    bolt.appendChild(branch);
                }
                document.body.appendChild(bolt);
                setTimeout(function() { bolt.remove(); }, 450);

                document.body.classList.add("weather-shaking");
                setTimeout(function() { document.body.classList.remove("weather-shaking"); }, 400);

                if (window._soundEnabled) {
                    try {
                        var ctx = window._audioCtx || new (window.AudioContext || window.webkitAudioContext)();
                        window._audioCtx = ctx;
                        var o1 = ctx.createOscillator(), g1 = ctx.createGain();
                        o1.type = "square"; o1.frequency.value = 300 + rand(0, 500);
                        g1.gain.setValueAtTime(0.025, ctx.currentTime);
                        g1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
                        o1.connect(g1); g1.connect(ctx.destination);
                        o1.start(); o1.stop(ctx.currentTime + 0.1);
                        setTimeout(function() {
                            var o2 = ctx.createOscillator(), g2 = ctx.createGain();
                            o2.type = "sawtooth"; o2.frequency.setValueAtTime(55, ctx.currentTime);
                            o2.frequency.exponentialRampToValueAtTime(22, ctx.currentTime + 1.2);
                            g2.gain.setValueAtTime(0.02, ctx.currentTime);
                            g2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
                            o2.connect(g2); g2.connect(ctx.destination);
                            o2.start(); o2.stop(ctx.currentTime + 1.2);
                        }, 200);
                    } catch(e) {}
                }
            }
            setTimeout(strike, 3000 + rand(0, 4000));
            window._weatherThunderInterval = setInterval(strike, 12000 + rand(0, 18000));
        }

        // ── DAY ────────────────────────────────

        function buildHotSun() {
            var orb = document.createElement("div");
            orb.className = "weather-sun-orb";
            orb.innerHTML = '<div class="weather-sun-rays"></div>';
            orb.style.opacity = "0";
            document.body.appendChild(orb);
            fadeIn(orb, 2000);
            for (var i = 0; i < 5; i++) {
                var flare = document.createElement("div");
                flare.className = "weather-lens-flare";
                flare.style.top = (8 + i * 15) + "%";
                flare.style.right = rand(10, 40) + "%";
                flare.style.transform = "rotate(" + rand(-25, 25) + "deg)";
                flare.style.animationDelay = (i * 1.2) + "s";
                flare.style.width = rand(100, 250) + "px";
                document.body.appendChild(flare);
            }
            addTint("radial-gradient(ellipse at 80% 0%, rgba(228,255,26,0.05) 0%, transparent 45%)");
        }

        function buildGodRays() {
            for (var i = 0; i < 5; i++) {
                var ray = document.createElement("div");
                ray.className = "weather-godray";
                ray.style.right = (5 + i * 8) + "%";
                ray.style.width = rand(30, 80) + "px";
                ray.style.height = rand(40, 70) + "vh";
                ray.style.transform = "rotate(" + rand(-15, 5) + "deg)";
                ray.style.animationDelay = (i * 1.5) + "s";
                ray.style.animationDuration = rand(6, 12) + "s";
                document.body.appendChild(ray);
            }
        }

        function buildHeatShimmer() {
            var shimmer = document.createElement("div");
            shimmer.className = "weather-heat-shimmer";
            document.body.appendChild(shimmer);
            var mirage = document.createElement("div");
            mirage.className = "weather-mirage";
            for (var i = 0; i < 6; i++) {
                var line = document.createElement("div");
                line.className = "weather-mirage-line";
                line.style.bottom = (i * 12) + "px";
                line.style.animationDelay = (i * 0.5) + "s";
                line.style.animationDuration = (2 + i * 0.3) + "s";
                mirage.appendChild(line);
            }
            document.body.appendChild(mirage);
        }

        function buildDustMotes() {
            for (var i = 0; i < 25; i++) {
                var d = document.createElement("div");
                d.className = "weather-dust";
                d.style.left = rand(0, 100) + "%";
                d.style.top = rand(20, 80) + "%";
                var size = rand(2, 4);
                d.style.width = d.style.height = size + "px";
                d.style.background = "rgba(228,255,26," + rand(0.15, 0.35) + ")";
                d.style.boxShadow = "0 0 " + rand(3, 6) + "px rgba(228,255,26,0.15)";
                d.style.animationDuration = rand(6, 12) + "s";
                d.style.animationDelay = rand(0, 10) + "s";
                document.body.appendChild(d);
            }
        }

        // ── DAWN ───────────────────────────────

        function buildWarmGlow() {
            var glow = document.createElement("div");
            glow.className = "weather-dawn-glow";
            glow.style.opacity = "0";
            document.body.appendChild(glow);
            fadeIn(glow, 1500);
            var sun = document.createElement("div");
            sun.className = "weather-dawn-sun";
            sun.style.opacity = "0";
            document.body.appendChild(sun);
            fadeIn(sun, 2000);
            var horizon = document.createElement("div");
            horizon.className = "weather-horizon";
            document.body.appendChild(horizon);
            addTint("linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.04) 60%, rgba(255,107,53,0.05) 100%)");
        }

        function buildDawnRays() {
            for (var i = 0; i < 7; i++) {
                var ray = document.createElement("div");
                ray.className = "weather-dawn-ray";
                ray.style.left = (15 + i * 10) + "%";
                ray.style.width = rand(20, 50) + "px";
                ray.style.height = rand(30, 55) + "vh";
                ray.style.transform = "rotate(" + rand(-20, 20) + "deg)";
                ray.style.animationDelay = (i * 0.8) + "s";
                ray.style.animationDuration = rand(5, 9) + "s";
                document.body.appendChild(ray);
            }
        }

        function buildGoldenMotes() {
            for (var i = 0; i < 22; i++) {
                var m = document.createElement("div");
                m.className = "weather-golden-mote";
                m.style.left = rand(0, 100) + "%";
                m.style.bottom = "0";
                var size = rand(2, 6);
                m.style.width = m.style.height = size + "px";
                m.style.boxShadow = "0 0 " + rand(4, 8) + "px rgba(245,158,11,0.4)";
                m.style.animationDuration = rand(5, 12) + "s";
                m.style.animationDelay = rand(0, 14) + "s";
                document.body.appendChild(m);
            }
        }

        function buildBirds() {
            for (var i = 0; i < 4; i++) {
                var bird = document.createElement("div");
                bird.className = "weather-bird";
                bird.textContent = "\u{1F426}";
                bird.style.top = rand(8, 30) + "%";
                bird.style.fontSize = rand(10, 16) + "px";
                bird.style.animationDuration = rand(15, 30) + "s";
                bird.style.animationDelay = rand(0, 20) + "s";
                document.body.appendChild(bird);
            }
        }

        function buildWind(color) {
            for (var i = 0; i < 12; i++) {
                var p = document.createElement("div");
                p.className = "weather-wind-particle";
                p.style.top = rand(0, 100) + "%";
                p.style.width = rand(60, 150) + "px";
                p.style.background = "linear-gradient(90deg, transparent, " + color + ", transparent)";
                p.style.animationDuration = rand(3, 6) + "s";
                p.style.animationDelay = rand(0, 10) + "s";
                document.body.appendChild(p);
            }
            var leafEmojis = ["\u{1F343}", "\u{1F342}", "\u{1F341}", "\u{1F33F}"];
            for (var i = 0; i < 5; i++) {
                var leaf = document.createElement("div");
                leaf.className = "weather-leaf";
                leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
                leaf.style.top = rand(10, 70) + "%";
                leaf.style.animationDuration = rand(6, 12) + "s";
                leaf.style.animationDelay = rand(0, 14) + "s";
                document.body.appendChild(leaf);
            }
        }

        // ── CHILL ──────────────────────────────

        function buildSnow() {
            var flakes = ["\u2744", "\u2746", "\u2022", "\u00B7", "\u2745"];
            for (var i = 0; i < 65; i++) {
                var s = document.createElement("div");
                s.className = "weather-snowflake";
                s.textContent = flakes[Math.floor(Math.random() * flakes.length)];
                s.style.left = rand(0, 100) + "%";
                s.style.fontSize = rand(8, 20) + "px";
                s.style.animationDuration = rand(4, 8) + "s";
                s.style.animationDelay = rand(0, 10) + "s";
                document.body.appendChild(s);
            }
            addTint("linear-gradient(180deg, rgba(180,200,220,0.07) 0%, rgba(148,163,184,0.03) 30%, transparent 50%)");
        }

        function buildFrost() {
            var frost = document.createElement("div");
            frost.className = "weather-frost";
            frost.style.opacity = "0";
            document.body.appendChild(frost);
            fadeIn(frost, 2000);
        }

        function buildFogLayer() {
            var fog = document.createElement("div");
            fog.className = "weather-fog";
            document.body.appendChild(fog);
        }

        function buildBreath() {
            for (var i = 0; i < 3; i++) {
                var b = document.createElement("div");
                b.className = "weather-breath";
                b.style.left = rand(20, 80) + "%";
                b.style.bottom = rand(10, 40) + "%";
                var size = rand(30, 60);
                b.style.width = b.style.height = size + "px";
                b.style.animationDelay = (i * 2.5) + "s";
                b.style.animationDuration = rand(5, 8) + "s";
                document.body.appendChild(b);
            }
        }

        // ── HYPE ───────────────────────────────

        function buildEmbers() {
            for (var i = 0; i < 35; i++) {
                var e = document.createElement("div");
                e.className = "weather-ember";
                e.style.left = rand(0, 100) + "%";
                e.style.bottom = rand(-5, 10) + "%";
                var size = rand(2, 7);
                e.style.width = e.style.height = size + "px";
                var isHot = Math.random() > 0.4;
                e.style.background = isHot
                    ? "radial-gradient(circle, rgba(255,100,50,0.95), rgba(245,158,11,0.5))"
                    : "radial-gradient(circle, rgba(245,158,11,0.9), rgba(239,68,68,0.4))";
                e.style.boxShadow = "0 0 " + rand(5, 10) + "px " + (isHot ? "rgba(255,100,50,0.5)" : "rgba(245,158,11,0.4)");
                e.style.animationDuration = rand(2.5, 5) + "s";
                e.style.animationDelay = rand(0, 6) + "s";
                document.body.appendChild(e);
            }
            addTint("radial-gradient(ellipse at 50% 100%, rgba(239,68,68,0.06) 0%, rgba(245,158,11,0.03) 30%, transparent 55%)");
        }

        function buildFireLicks() {
            for (var i = 0; i < 8; i++) {
                var f = document.createElement("div");
                f.className = "weather-fire-lick";
                f.style.left = rand(0, 95) + "%";
                f.style.animationDelay = rand(0, 2) + "s";
                f.style.animationDuration = rand(1.5, 3) + "s";
                f.style.width = rand(40, 80) + "px";
                f.style.height = rand(60, 120) + "px";
                document.body.appendChild(f);
            }
        }

        function buildScreenPulse() {
            var pulse = document.createElement("div");
            pulse.className = "weather-screen-pulse";
            document.body.appendChild(pulse);
        }

        function buildBurstExplosions() {
            window._weatherBurstInterval = setInterval(function() {
                var cx = rand(10, 90);
                var cy = rand(20, 80);
                var colors = ["#EF4444", "#F59E0B", "#E4FF1A", "#FF6B35"];
                for (var i = 0; i < 12; i++) {
                    var p = document.createElement("div");
                    p.className = "weather-burst";
                    p.style.left = cx + "%";
                    p.style.top = cy + "%";
                    p.style.background = colors[Math.floor(Math.random() * colors.length)];
                    p.style.boxShadow = "0 0 4px " + p.style.background;
                    var angle = (i / 12) * Math.PI * 2;
                    var dist = rand(30, 80);
                    p.style.setProperty("--bx", Math.cos(angle) * dist + "px");
                    p.style.setProperty("--by", Math.sin(angle) * dist + "px");
                    document.body.appendChild(p);
                    setTimeout(function(el) { el.remove(); }.bind(null, p), 800);
                }
            }, 3000 + rand(0, 4000));
        }

        // ── ZEN ────────────────────────────────

        function buildAuroraRibbon() {
            var ribbon = document.createElement("div");
            ribbon.className = "weather-aurora-ribbon";
            ribbon.style.opacity = "0";
            document.body.appendChild(ribbon);
            fadeIn(ribbon, 2000);
        }

        function buildPetals() {
            var petals = ["\u{1F33A}", "\u{1F338}", "\u{1F33C}", "\u{1F33B}", "\u{1F340}"];
            for (var i = 0; i < 8; i++) {
                var p = document.createElement("div");
                p.className = "weather-petal";
                p.textContent = petals[Math.floor(Math.random() * petals.length)];
                p.style.left = rand(-5, 10) + "%";
                p.style.top = rand(0, 30) + "%";
                p.style.animationDuration = rand(12, 25) + "s";
                p.style.animationDelay = rand(0, 15) + "s";
                p.style.fontSize = rand(12, 20) + "px";
                document.body.appendChild(p);
            }
        }

        function buildRipples() {
            window._weatherRippleInterval = setInterval(function() {
                var r = document.createElement("div");
                r.className = "weather-ripple";
                var size = rand(20, 40);
                r.style.width = r.style.height = size + "px";
                r.style.left = rand(10, 90) + "%";
                r.style.top = rand(20, 80) + "%";
                document.body.appendChild(r);
                setTimeout(function() { r.remove(); }, 4000);
            }, 2000 + rand(0, 3000));
        }

        function buildZenBreathe() {
            var b = document.createElement("div");
            b.className = "weather-zen-breathe";
            document.body.appendChild(b);
        }

        // ── CREATIVE ───────────────────────────

        function buildAurora() {
            var container = document.createElement("div");
            container.className = "weather-aurora";
            container.style.opacity = "0";
            for (var i = 0; i < 4; i++) {
                var band = document.createElement("div");
                band.className = "weather-aurora-band";
                container.appendChild(band);
            }
            document.body.appendChild(container);
            fadeIn(container, 2000);
            addTint("linear-gradient(180deg, rgba(20,10,40,0.25) 0%, rgba(15,5,30,0.1) 30%, transparent 55%)");
        }

        function buildCosmicDust() {
            var colors = [
                "rgba(167,139,250,0.8)", "rgba(244,114,182,0.7)",
                "rgba(34,211,238,0.6)", "rgba(74,222,128,0.6)",
                "rgba(228,255,26,0.5)", "rgba(245,158,11,0.5)"
            ];
            for (var i = 0; i < 30; i++) {
                var d = document.createElement("div");
                d.className = "weather-cosmic-dust";
                d.style.left = rand(0, 100) + "%";
                d.style.top = rand(0, 85) + "%";
                var color = colors[Math.floor(Math.random() * colors.length)];
                d.style.background = "radial-gradient(circle, " + color + ", transparent 60%)";
                d.style.boxShadow = "0 0 8px " + color + ", 0 0 16px " + color.replace(/[\d.]+\)$/, "0.2)");
                var size = rand(3, 7);
                d.style.width = d.style.height = size + "px";
                d.style.animationDuration = rand(5, 12) + "s";
                d.style.animationDelay = rand(0, 12) + "s";
                document.body.appendChild(d);
            }
        }

        function buildNebula() {
            var configs = [
                { color: "rgba(167,139,250,0.1)", x: "20%", y: "15%", size: 500 },
                { color: "rgba(244,114,182,0.08)", x: "75%", y: "35%", size: 450 },
                { color: "rgba(34,211,238,0.07)", x: "45%", y: "60%", size: 400 },
                { color: "rgba(74,222,128,0.06)", x: "65%", y: "75%", size: 350 },
            ];
            configs.forEach(function(cfg, i) {
                var n = document.createElement("div");
                n.className = "weather-nebula";
                n.style.left = cfg.x; n.style.top = cfg.y;
                n.style.width = n.style.height = cfg.size + "px";
                n.style.background = "radial-gradient(circle, " + cfg.color + " 0%, transparent 55%)";
                n.style.animationDelay = (i * 4) + "s";
                n.style.animationDuration = (18 + i * 5) + "s";
                n.style.opacity = "0";
                document.body.appendChild(n);
                fadeIn(n, 3000);
            });
        }

        function buildPaintSplashes() {
            var splashColors = [
                "rgba(167,139,250,0.06)", "rgba(244,114,182,0.05)",
                "rgba(34,211,238,0.05)", "rgba(74,222,128,0.04)",
                "rgba(228,255,26,0.04)"
            ];
            for (var i = 0; i < 5; i++) {
                var s = document.createElement("div");
                s.className = "weather-paint-splash";
                s.style.left = rand(5, 85) + "%";
                s.style.top = rand(5, 80) + "%";
                var size = rand(100, 250);
                s.style.width = size + "px";
                s.style.height = (size * rand(0.6, 1.4)) + "px";
                s.style.background = "radial-gradient(ellipse, " + splashColors[i] + ", transparent 60%)";
                s.style.animationDelay = (i * 2) + "s";
                s.style.animationDuration = rand(8, 15) + "s";
                document.body.appendChild(s);
            }
        }

        function buildPrisms() {
            for (var i = 0; i < 3; i++) {
                var p = document.createElement("div");
                p.className = "weather-prism";
                p.style.top = rand(10, 70) + "%";
                p.style.left = rand(5, 60) + "%";
                p.style.width = rand(200, 400) + "px";
                p.style.animationDelay = (i * 3) + "s";
                p.style.animationDuration = rand(6, 12) + "s";
                document.body.appendChild(p);
            }
        }

        // ── DUSK ───────────────────────────────

        function buildDuskSky() {
            var sky = document.createElement("div");
            sky.className = "weather-dusk-sky";
            sky.style.opacity = "0";
            document.body.appendChild(sky);
            fadeIn(sky, 1500);
        }

        // ── SPACESHIPS ─────────────────────────

        function buildSpaceships() {
            var ships = [
                // Large carrier
                { w: 200, h: 30, svg: '<svg viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 15 L40 5 L160 3 L200 15 L160 27 L40 25 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" stroke-width="0.5"/><path d="M50 10 L150 8 L170 15 L150 22 L50 20 Z" fill="rgba(255,255,255,0.08)"/><circle cx="180" cy="15" r="2" fill="rgba(34,211,238,0.6)"/><circle cx="170" cy="12" r="1" fill="rgba(228,255,26,0.5)"/><circle cx="170" cy="18" r="1" fill="rgba(228,255,26,0.5)"/></svg>' },
                // Sleek fighter
                { w: 120, h: 20, svg: '<svg viewBox="0 0 120 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 10 L30 3 L100 2 L120 10 L100 18 L30 17 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.22)" stroke-width="0.5"/><path d="M90 7 L110 10 L90 13 Z" fill="rgba(34,211,238,0.4)"/><line x1="5" y1="10" x2="25" y2="10" stroke="rgba(228,255,26,0.3)" stroke-width="0.5"/></svg>' },
                // Massive dreadnought
                { w: 300, h: 50, svg: '<svg viewBox="0 0 300 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 25 L60 8 L240 5 L300 25 L240 45 L60 42 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.22)" stroke-width="0.5"/><path d="M70 15 L230 12 L260 25 L230 38 L70 35 Z" fill="rgba(255,255,255,0.06)"/><rect x="80" y="20" width="140" height="10" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" stroke-width="0.3"/><circle cx="270" cy="25" r="3" fill="rgba(34,211,238,0.55)"/><circle cx="260" cy="20" r="1.5" fill="rgba(228,255,26,0.4)"/><circle cx="260" cy="30" r="1.5" fill="rgba(228,255,26,0.4)"/><circle cx="250" cy="17" r="1" fill="rgba(167,139,250,0.35)"/><circle cx="250" cy="33" r="1" fill="rgba(167,139,250,0.35)"/></svg>' },
                // Classic UFO saucer — glowing disc
                { w: 90, h: 40, svg: '<svg viewBox="0 0 90 40" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="45" cy="22" rx="44" ry="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/><ellipse cx="45" cy="18" rx="24" ry="14" fill="rgba(167,139,250,0.15)" stroke="rgba(167,139,250,0.3)" stroke-width="0.5"/><ellipse cx="45" cy="15" rx="12" ry="8" fill="rgba(167,139,250,0.08)"/><circle cx="22" cy="24" r="2" fill="rgba(34,211,238,0.5)"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.8s" repeatCount="indefinite"/></circle><circle cx="45" cy="26" r="2" fill="rgba(228,255,26,0.5)"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.6s" repeatCount="indefinite"/></circle><circle cx="68" cy="24" r="2" fill="rgba(34,211,238,0.5)"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="1s" repeatCount="indefinite"/></circle><line x1="45" y1="32" x2="45" y2="40" stroke="rgba(167,139,250,0.15)" stroke-width="8"/></svg>' },
                // Stealth bomber — angular wedge
                { w: 160, h: 35, svg: '<svg viewBox="0 0 160 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M80 2 L160 17 L145 22 L80 15 L15 22 L0 17 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.18)" stroke-width="0.5"/><path d="M80 5 L130 16 L80 13 L30 16 Z" fill="rgba(255,255,255,0.05)"/><circle cx="140" cy="18" r="1.5" fill="rgba(255,107,53,0.6)"/><circle cx="20" cy="18" r="1.5" fill="rgba(255,107,53,0.6)"/><circle cx="80" cy="8" r="1" fill="rgba(34,211,238,0.4)"/></svg>' },
                // Scout drone — small & fast
                { w: 50, h: 15, svg: '<svg viewBox="0 0 50 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7 L15 2 L45 3 L50 7 L45 12 L15 13 Z" fill="rgba(255,255,255,0.18)" stroke="rgba(34,211,238,0.35)" stroke-width="0.5"/><circle cx="42" cy="7" r="1.5" fill="rgba(228,255,26,0.6)"/><circle cx="38" cy="5" r="0.8" fill="rgba(34,211,238,0.4)"/><circle cx="38" cy="9" r="0.8" fill="rgba(34,211,238,0.4)"/></svg>' },
                // Mothership — massive with bay lights
                { w: 350, h: 60, svg: '<svg viewBox="0 0 350 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 30 L100 10 L250 8 L300 30 L250 52 L100 50 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.18)" stroke-width="0.5"/><path d="M0 30 L50 30 L100 10" stroke="rgba(255,255,255,0.12)" stroke-width="0.3" fill="none"/><path d="M0 30 L50 30 L100 50" stroke="rgba(255,255,255,0.12)" stroke-width="0.3" fill="none"/><path d="M300 30 L350 30" stroke="rgba(255,255,255,0.12)" stroke-width="0.3"/><rect x="120" y="22" width="110" height="16" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" stroke-width="0.3"/><circle cx="140" cy="30" r="2" fill="rgba(34,211,238,0.45)"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="165" cy="30" r="2" fill="rgba(228,255,26,0.4)"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.2s" repeatCount="indefinite"/></circle><circle cx="190" cy="30" r="2" fill="rgba(167,139,250,0.4)"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.8s" repeatCount="indefinite"/></circle><circle cx="215" cy="30" r="2" fill="rgba(34,211,238,0.45)"><animate attributeName="opacity" values="0.2;0.6;0.2" dur="1s" repeatCount="indefinite"/></circle><circle cx="285" cy="30" r="3.5" fill="rgba(34,211,238,0.5)"/><circle cx="275" cy="24" r="1.5" fill="rgba(228,255,26,0.35)"/><circle cx="275" cy="36" r="1.5" fill="rgba(228,255,26,0.35)"/></svg>' },
                // Alien cruiser — organic curves
                { w: 140, h: 30, svg: '<svg viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15 Q30 0 70 5 Q110 0 130 15 Q110 30 70 25 Q30 30 10 15 Z" fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.25)" stroke-width="0.5"/><path d="M30 15 Q50 8 70 10 Q90 8 110 15 Q90 22 70 20 Q50 22 30 15 Z" fill="rgba(74,222,128,0.06)"/><circle cx="70" cy="12" r="3" fill="rgba(74,222,128,0.3)"/><circle cx="55" cy="15" r="1" fill="rgba(228,255,26,0.4)"><animate attributeName="r" values="0.5;1.5;0.5" dur="2s" repeatCount="indefinite"/></circle><circle cx="85" cy="15" r="1" fill="rgba(228,255,26,0.4)"><animate attributeName="r" values="0.5;1.5;0.5" dur="2s" repeatCount="indefinite" begin="0.5s"/></circle></svg>' },
            ];

            function launchShip() {
                var ship = ships[Math.floor(Math.random() * ships.length)];
                var el = document.createElement("div");
                el.className = "weather-spaceship";
                el.style.width = ship.w + "px";
                el.style.height = ship.h + "px";
                el.innerHTML = ship.svg;

                // Random direction: left-to-right or right-to-left
                var goRight = Math.random() > 0.5;
                el.style.top = rand(8, 45) + "%";

                // Speed varies by ship size — small ships faster
                var speed = ship.w < 100 ? rand(6, 12) : ship.w > 250 ? rand(18, 30) : rand(12, 25);

                if (goRight) {
                    el.style.left = "-" + (ship.w + 50) + "px";
                    el.style.animation = "shipFlyRight " + speed + "s linear forwards";
                } else {
                    el.style.right = "-" + (ship.w + 50) + "px";
                    el.style.animation = "shipFlyLeft " + speed + "s linear forwards";
                    el.style.transform = "scaleX(-1)";
                }

                document.body.appendChild(el);
                setTimeout(function() { el.remove(); }, (speed + 5) * 1000);
            }

            // First ship after 5-10 seconds, then every 20-45 seconds
            setTimeout(launchShip, rand(5000, 10000));
            window._weatherShipInterval = setInterval(launchShip, rand(20000, 45000));

            // Occasionally launch a formation (2-3 ships staggered)
            setInterval(function() {
                if (Math.random() < 0.3) {
                    launchShip();
                    setTimeout(launchShip, rand(1500, 3000));
                    if (Math.random() < 0.4) setTimeout(launchShip, rand(3500, 5500));
                }
            }, rand(45000, 75000));
        }

        // ── FADE HELPER ────────────────────────

        function fadeIn(el, duration) {
            duration = duration || 1200;
            requestAnimationFrame(function() {
                el.style.transition = "opacity " + (duration / 1000) + "s ease-in";
                el.style.opacity = "1";
            });
        }

        // ========================================
        // BUILDER REGISTRY + APPLY
        // ========================================

        function applyWeather(tod) {
            var w = C.weather[tod];
            if (!w) return;

            // Skip if same mood already active
            if (_currentMoodId === tod) return;
            _currentMoodId = tod;

            // Update UI labels
            if (indicator && iconEl && labelEl) {
                iconEl.textContent = w.icon;
                labelEl.textContent = w.label;
                indicator.style.borderColor = w.accent + "33";
                labelEl.style.color = w.accent;
            }
            var moodIcon = document.getElementById("mood-toggle-icon");
            var moodLabel = document.getElementById("mood-toggle-label");
            if (moodIcon) moodIcon.textContent = w.icon;
            if (moodLabel) moodLabel.textContent = w.label;

            // Smooth crossfade: fade out old, wait, build new
            // If already transitioning, cancel previous and start fresh
            if (window._weatherTransitionTimer) {
                clearTimeout(window._weatherTransitionTimer);
                window._weatherTransitionTimer = null;
            }

            clearIntervals();

            // Get all current weather elements
            var currentEls = document.querySelectorAll(WEATHER_SELECTORS.join(","));
            if (currentEls.length) {
                currentEls.forEach(function(el) {
                    el.style.transition = "opacity 0.6s ease-out";
                    el.style.opacity = "0";
                });
            }

            window._weatherTransitionTimer = setTimeout(function() {
                window._weatherTransitionTimer = null;
                // Remove faded elements
                document.querySelectorAll(WEATHER_SELECTORS.join(",")).forEach(function(el) { el.remove(); });
                // Remove mood body classes
                document.body.className = document.body.className.replace(/\bmood-\w+\b/g, "").trim();
                // Apply new mood class
                document.body.classList.add("mood-" + tod);

                var builders = {
                    stars: buildStars,
                    milkyWay: buildMilkyWay,
                    moon: buildMoon,
                    fireflies: buildFireflies,
                    rain: function() { buildRain(false); },
                    heavyRain: function() { buildRain(true); },
                    puddles: buildPuddles,
                    clouds: function() { buildClouds(false); },
                    darkClouds: function() { buildClouds(true); },
                    thunder: buildThunder,
                    wind: function() { buildWind(w.accent + "30"); },
                    hotSun: buildHotSun,
                    godRays: buildGodRays,
                    heatShimmer: buildHeatShimmer,
                    dustMotes: buildDustMotes,
                    warmGlow: buildWarmGlow,
                    dawnRays: buildDawnRays,
                    goldenMotes: buildGoldenMotes,
                    birds: buildBirds,
                    snow: buildSnow,
                    frost: buildFrost,
                    fogLayer: buildFogLayer,
                    breath: buildBreath,
                    embers: buildEmbers,
                    fireLicks: buildFireLicks,
                    screenPulse: buildScreenPulse,
                    burstExplosions: buildBurstExplosions,
                    auroraRibbon: buildAuroraRibbon,
                    petals: buildPetals,
                    ripples: buildRipples,
                    zenBreathe: buildZenBreathe,
                    aurora: buildAurora,
                    cosmicDust: buildCosmicDust,
                    nebula: buildNebula,
                    paintSplashes: buildPaintSplashes,
                    prisms: buildPrisms,
                    duskSky: buildDuskSky,
                };

                (w.effects || []).forEach(function(fx) {
                    if (builders[fx]) builders[fx]();
                });

                // Spaceships fly across in any mood
                buildSpaceships();
            }, currentEls.length ? 600 : 0);
        }

        // ========================================
        // MOOD SELECTOR + SCROLL TRANSITIONS
        // ========================================

        var MOOD_KEY = "mkj_mood";
        var MOOD_SOURCE_KEY = "mkj_mood_source"; // "element" or "manual"
        var currentMood = localStorage.getItem(MOOD_KEY) || "auto";

        function getMoodWeather() {
            if (currentMood === "auto") return getScrollMood();
            return currentMood;
        }

        // Scroll-based transitions (only in auto mode)
        var _scrollDebounce = null;
        var _lastScrollMood = null;
        window.addEventListener("scroll", function() {
            if (currentMood !== "auto") return;
            clearTimeout(_scrollDebounce);
            _scrollDebounce = setTimeout(function() {
                var newMood = getScrollMood();
                if (newMood !== _lastScrollMood) {
                    _lastScrollMood = newMood;
                    _currentMoodId = null; // force reapply
                    applyWeather(newMood);
                }
            }, 400);
        }, { passive: true });

        var selector = document.getElementById("mood-selector");
        var toggle = document.getElementById("mood-toggle");
        var dropdown = document.getElementById("mood-dropdown");

        if (selector && toggle && dropdown && C.moods) {
            dropdown.innerHTML = "";
            C.moods.forEach(function(mood) {
                var btn = document.createElement("button");
                btn.className = "mood-option" + (mood.id === currentMood ? " active" : "");
                btn.innerHTML =
                    '<span class="mood-option-icon">' + mood.icon + '</span>' +
                    '<span class="mood-option-info">' +
                        '<span class="mood-option-label">' + mood.label + '</span>' +
                        '<span class="mood-option-desc">' + mood.desc + '</span>' +
                    '</span>';
                btn.addEventListener("click", function() {
                    currentMood = mood.id;
                    localStorage.setItem(MOOD_KEY, currentMood);
                    localStorage.setItem(MOOD_SOURCE_KEY, "manual");
                    _currentMoodId = null; // force reapply
                    applyWeather(getMoodWeather());
                    dropdown.querySelectorAll(".mood-option").forEach(function(o) { o.classList.remove("active"); });
                    btn.classList.add("active");
                    selector.classList.remove("open");
                });
                dropdown.appendChild(btn);
            });

            toggle.addEventListener("click", function(e) {
                e.stopPropagation();
                selector.classList.toggle("open");
            });
            document.addEventListener("click", function(e) {
                if (!selector.contains(e.target)) selector.classList.remove("open");
            });
        }

        // Initial apply
        _lastScrollMood = getScrollMood();
        applyWeather(getMoodWeather());

        // Auto-refresh every 5 minutes
        setInterval(function() {
            if (currentMood === "auto") {
                var newMood = getScrollMood();
                if (newMood !== _lastScrollMood) {
                    _lastScrollMood = newMood;
                    _currentMoodId = null;
                    applyWeather(newMood);
                }
            }
        }, 300000);

        // Expose for mood selector
        window._applyWeather = function(tod) {
            _currentMoodId = null;
            applyWeather(tod);
        };

        // Element → mood sync: set default mood based on chosen element
        // Called from element arena when user picks an element
        window.applyElementMood = function(moodId) {
            // Only skip if user manually chose a mood from the dropdown
            var moodSource = localStorage.getItem(MOOD_SOURCE_KEY);
            if (moodSource === "manual") return;

            currentMood = moodId;
            localStorage.setItem(MOOD_KEY, moodId);
            localStorage.setItem(MOOD_SOURCE_KEY, "element");
            _currentMoodId = null;
            applyWeather(moodId);

            // Update mood selector active state
            if (dropdown) {
                dropdown.querySelectorAll(".mood-option").forEach(function(o) {
                    var label = o.querySelector(".mood-option-label");
                    if (label) {
                        o.classList.toggle("active", label.textContent.toLowerCase() === moodId.toLowerCase());
                    }
                });
            }
        };

        // On init, apply element's default mood unless user manually chose one
        var savedElement = localStorage.getItem("mkj_element");
        var moodSource = localStorage.getItem(MOOD_SOURCE_KEY);
        if (savedElement && moodSource !== "manual") {
            var ELEMENT_MOODS = { fire: "hype", water: "chill", earth: "zen", air: "creative", ether: "night" };
            var elMood = ELEMENT_MOODS[savedElement];
            if (elMood) {
                currentMood = elMood;
                localStorage.setItem(MOOD_KEY, elMood);
                localStorage.setItem(MOOD_SOURCE_KEY, "element");
                _currentMoodId = null;
                applyWeather(elMood);
            }
        }
    }
})();
