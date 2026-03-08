# Personal Website — Mani Kumar Jami

## Project Overview
Gamified personal portfolio website with dual architecture:
1. **Main site** — Vanilla HTML/CSS/JS (index.html + multi-page section pages). No build tools needed.
2. **Framer components** — React/TypeScript code components for Framer canvas (*.tsx files).

Theme: RPG + strategy game inspired discovery experience (Age of Empires, Rise of Nations, GTA mission vibes).
The entire site is a journey — visitors "play" through Mani's career, unlocking sections as they scroll.
Game metaphor: You're a scout discovering the story of a product leader. Each section is a territory to explore.

---

## Brand Guidelines

### Brand Identity
- **Persona**: Tech-savvy product leader who treats career as an RPG adventure
- **Tone**: Confident, playful, ambitious — never corporate or generic
- **Voice**: First-person, direct, slightly irreverent ("Let's build something legendary")
- **Positioning**: Where product strategy meets engineering depth meets entrepreneurial grit

### Brand Values
1. **Mastery** — Every skill is earned, every achievement unlocked through effort
2. **Curiosity** — The site rewards exploration, not passive consumption
3. **Boldness** — Dark, high-contrast, unapologetic design language
4. **Craftsmanship** — Every micro-interaction is intentional, nothing is decorative filler

### Brand Metaphor
The entire website is an RPG character sheet. The visitor is "inspecting" Mani's stats, quest history, skill tree, and trophy wall. This metaphor must be consistent across every section — never break the fourth wall into a generic portfolio.

---

## Color Psychology & Guidelines

### Primary Palette

| Color | Hex | Role |
|-------|-----|------|
| Void Black | #0A0A0A | Background |
| Surface Dark | #141414 | Elevated surfaces |
| Neon Lime | #E4FF1A | Primary accent |
| Pure White | #FFFFFF | Primary text |
| Muted Gray | #A1A1A1 | Secondary text |
| Border Gray | rgba(255,255,255,0.06) | Borders/dividers |

### Accent Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Lime | #E4FF1A | LEGENDARY rank, primary CTA |
| Bright Green | #A8FF00 | EPIC rank skills |
| Emerald | #4ADE80 | RARE rank, social impact |
| Cyan | #22D3EE | Certifications, finance |
| Violet | #A78BFA | Education, Academic section |
| Amber | #F59E0B | Government funding |
| Pink | #F472B6 | Languages, soft skills |

### 5 Element Colors (Full Dynamic Theming)
Each element transforms the entire UI — colors, particles, sounds, weather mood.
| Element | Color | RGB | Secondary | Default Mood |
|---------|-------|-----|-----------|-------------|
| Fire | #FF6B35 | 255,107,53 | #FFB347 | Hype |
| Water | #22D3EE | 34,211,238 | #67E8F9 | Chill |
| Earth | #4ADE80 | 74,222,128 | #86EFAC | Zen |
| Air | #E0E7FF | 224,231,255 | #C7D2FE | Creative |
| Ether | #A78BFA | 167,139,250 | #C4B5FD | Night |

### Element Selection Flow
1. Boot screen → BEGIN EXPEDITION → **Element Arena** (fullscreen, every visit)
2. 5 element cards with hover preview (desktop) / tap-to-preview (mobile)
3. Click/tap to select → saves to localStorage, applies accent color + weather mood
4. Reselect button lives in nav bar (`.nav-left`, between MKJ name and XP badge)
5. `localStorage` keys: `mkj_element`, `mkj_accent_hex`, `mkj_accent_rgb`, `mkj_mood`, `mkj_mood_source`

### Color System Architecture
- `--accent` / `--user-accent` — CSS custom property set by `applyAccentColor()`
- `--element-rgb` — RGB triplet for rgba() usage (e.g., `rgba(var(--element-rgb),0.15)`)
- `buildAccentOverrides(rgb)` — injects ~85 CSS `!important` rules for dynamic theming
- All CSS uses `rgba(var(--element-rgb, 228,255,26),X)` with lime fallback
- Canvas elements (radar chart, particles) read from `localStorage.getItem("mkj_accent_rgb")`
- Sound system applies element profiles (freq/waveform/gain modifiers) via `ELEMENT_SOUND_PROFILES`

### Color Rules
- **80/20**: 80% dark, 20% accent. Glow at 6-15% opacity, never solid accent backgrounds.
- **Text hierarchy**: White headlines, muted gray body, accent for labels/tags only.

---

## Typography
- **Typeface**: Inter (Google Fonts) + Press Start 2P (boot screen only)
- **Section tags**: 17px, weight 700, letter-spacing +0.12em, uppercase
- **Section titles**: clamp(56px, 10vw, 96px), weight 700
- **Nav links**: 16px, weight 500
- **Nav name (MKJ)**: 18px, weight 700
- **XP level/percent**: 14px, weight 800
- **Body**: 16px regular, 13-14px captions

---

## Folder Structure
```
personalwebsite/
├── index.html                 # Main HTML shell (~500 lines)
├── CLAUDE.md                  # This file
├── cms/
│   ├── content.js             # Single source of truth (~600 lines)
│   └── blog.js                # Blog fallback content
├── assets/
│   ├── css/
│   │   ├── styles.css         # Core design system (~2700 lines)
│   │   ├── card-arena.css     # Card Arena TCG styles (~850 lines)
│   │   ├── weather.css        # Weather/mood atmosphere (~980 lines)
│   │   ├── page.css           # Section detail pages (~195 lines)
│   │   └── blog.css           # Blog styles (~170 lines)
│   ├── js/
│   │   ├── sounds.js          # Sound system + 80 sound defs (~490 lines)
│   │   ├── main.js            # RPG gamification engine (~3190 lines)
│   │   ├── card-arena.js      # Trading Card Game system (~630 lines)
│   │   ├── loot.js            # Loot drop collection (~130 lines)
│   │   ├── weather.js         # Weather/mood atmosphere (~960 lines)
│   │   ├── page.js            # Section page engine (~470 lines)
│   │   └── blog.js            # Blog page engine (~250 lines)
│   └── img/
│       └── og-card.svg
├── pages/
│   └── template.html          # Multi-page template (loads ?s=section-id)
├── blog/
│   ├── index.html             # Blog listing page
│   └── post.html              # Blog post page
├── components/                # Framer React/TypeScript components
│   ├── AchievementWall.tsx
│   ├── CTAFooter.tsx
│   └── SkillTree.tsx
├── strapi/                    # Strapi CMS for blog
└── .claude/
```

---

## Multi-Page Architecture
- `pages/template.html` — single template, loads any section via `?s=section-id`
- `assets/js/page.js` — page engine: content builder, mascot, voice chat, prev/next nav
- `assets/css/page.css` — page-specific styles (nav, hero, mascot, voice bar)
- Section pages include: mascot assistant, voice chat bar, prev/next navigation
- Voice chat: Web Speech API input, local KB from content.js, browser TTS fallback
- Ready for ElevenLabs + Claude API integration via serverless functions

---

## 45+ Gamification Systems (main.js)

### Core Systems (1-13)
1. **Boot Screen** — 5-element particle canvas, orbiting orbs, typed title (min-height prevents layout shift), Enter/click dismiss
2. **Territory HUD** — "Entering territory" banners, unique sound per section (`territory-{id}`)
3. **Resource HUD** — INTEL/XP/ZONES counters, unique sound per section (`resource-{id}`)
4. **Hero Character Card** — RPG card reveal, HP/mana bars, particle burst, parallax scroll
5. **Emoji Avatar Cursor** — per-section emoji+label, unique whoosh per section (`whoosh-{id}`)
6. **Minimap** — vertically centered right side, connecting lines, tooltips, click-to-navigate
7. **Combo Counter** — increments on section discovery
8. **Sound System** — Web Audio API oscillators, 80+ unique sound definitions
9. **Level-Up Toasts** — fires at 25/50/75/100% scroll
10. **Achievement Toasts** — unique sound per section (`toast-{id}`)
11. **Fog of War** — sections hidden until scroll, unique sound per section (`fog-{id}`)
12. **Dialogue Box CTA** — NPC conversation, keyboard shortcuts 1-4, typing effect
13. **Boss Battles** — 2-col grid, enemy cards with name/learning/scar, HP bar animations, battle scars news ticker

### Advanced Systems (14-25)
14. **Radar Chart** — animated Canvas hexagon for character stats
15. **Inventory Grid** — hex-grid offset, rarity glow colors, magnetic hover
16. **Easter Eggs** — Konami code + rapid click on MKJ logo
17. **Save Game** — localStorage position save/resume
18. **Quest Sounds** — separate professional/academic observers with unique sounds
19. **Hover Sounds** — 9 distinct hover sound types (per card type)
20. **Section Reveal Sounds** — 8 unique section-specific reveal sounds
21. **Back to Top** — fixed button with click sound
22. **Scroll Glow** — ambient lime gradient at top
23. **GenAI Card Links** — full card clickable via data-url
24. **Parallax Hero** — requestAnimationFrame depth on hero card
25. **Section In-View** — smooth content fade-in

### Fun Interaction Systems (26-41)
26. **Interactive XP Bar** — click to jump, tooltip (level/zones/%), milestone glow pulse, level names (Novice to God), zones counter
27. **Damage Numbers** — click anywhere for floating "+XP" text, every 7th click = CRITICAL HIT
28. **Scroll Streak** — fast scrolling builds combo (3x/5x/10x with fire effects)
29. **Boss Click Battle** — click boss cards to drain HP with damage numbers, shake, defeat celebration
30. **Card Flip** — double-click quest cards to reveal "SECRET INTEL" on back
31. **Confetti Burst** — confetti particles on achievement card reveal
32. **Section Header Typewriter** — titles type in character-by-character on scroll
33. **Magnetic Hover** — inventory icons follow cursor magnetically
34. **Skill Detail Tooltips** — hover shows rank, mastery %, XP invested
35. **GenAI Spell Cast** — icon spin+glow on hover
36. **Venture Rocket Launch** — enhanced glow on hover
37. **Achievement Trophy Bounce** — icon bounces on hover
38. **Dialogue Typing Effect** — NPC greeting types out when contact section enters view
39. **Footer Sparkle Trail** — sparkle particles follow cursor in footer
40. **Mascot** — floating assistant with blinking eyes that follow cursor, contextual tips per section, clickable for hints
41. **MKJ Logo Interaction** — particle burst, glitch effect, escalating sounds (5 levels), random facts, returns to boot screen
42. **Idle Nudges** — 20s inactivity → contextual scroll prompts (10 rotating messages)

### Atmosphere & Progression Systems (43-50)
43. **Dynamic Weather v2** — scroll-based atmosphere transitions: day -> dawn -> dusk -> night -> storm as visitor scrolls deeper. Body-level CSS mood classes shift entire page color grading. 30+ unique visual effects across 9 moods. Self-initializing standalone module (weather.js + weather.css)
44. **Mood Selector** — dropdown (top-left) lets visitors override weather: Auto (scroll-based), Storm, Chill, Hype, Zen, Creative. Persists to localStorage, syncs across main + section pages
45. **Loot Drops** — random collectible cards drop while scrolling (35% chance per ~1200px), 12 items with rarity tiers (legendary/epic/rare), weighted drops, toast notification with rarity glow + sound, Loot Bag panel tracks collection progress, persists to localStorage
46. **Spaceship Flyovers** — SVG spaceships (carrier, fighter, dreadnought) cross the screen every 30-60s in any mood, random direction, fade in/out
47. **Thunder/Lightning** — multi-flash overlay + bolt with 2-3 branches + screen shake + sawtooth rumble sound, fires every 3-10s during Storm mood
48. **Scroll Mood Transitions** — in Auto mode, weather morphs as visitors explore: top=Day, 25%=Dawn, 50%=Dusk, 75%=Night, bottom=Storm. Creates cinematic journey feeling
49. **God Rays** — volumetric light beams from sun (Day mood), 5 angled rays with pulsing opacity
50. **Burst Explosions** — periodic particle burst effects (Hype mood), 12 particles radiate outward with CSS custom properties for direction

---

## Weather Effects System v2

### Unique Effects Per Mood (30+ total)
| Mood | Unique Effects |
|------|----------------|
| Night | 120 twinkling stars + bright variants, milky way band, moon with halo+craters, 20 multi-color fireflies, shooting stars every 4-8s |
| Storm | 100 angled rain drops + splashes, 6 puddle reflections, 12 dark menacing clouds, lightning bolts with 2-3 branches + flash + shake + sound |
| Day | 220px sun orb with corona + spinning conic rays, 5 god rays, 5 lens flares, heat shimmer + 6 mirage lines, 25 golden dust motes |
| Dawn | Rising sun disc, 7 fanning light rays, golden horizon line, 22 rising golden motes, 4 bird silhouettes, 12 wind streaks + 5 leaves |
| Dusk | Purple-orange sky gradient, light rain + clouds, wind streaks + leaves |
| Chill | 65 snowflakes (5 types), frost vignette with glass edge, thick drifting fog, 3 breath vapor puffs |
| Hype | 35 rising embers, 8 fire licks from bottom edge, intense red screen pulse, periodic burst explosions (12 particles each) |
| Zen | Aurora ribbon, 8 floating sakura/flower petals, expanding ripple circles, breathing pulse overlay, 20 fireflies |
| Creative | 4-band aurora with dance animation, 30 color-shifting cosmic dust, 4 large nebula blobs, 5 morphing paint splashes, 3 prismatic light refractions |

### Body Mood Classes
Each mood applies `body.mood-{id}` with:
- CSS custom properties: `--mood-accent`, `--mood-glow`
- `::before` pseudo-element for full-viewport ambient gradient
- Unique background color grading per mood

### Mood Presets
| Mood | Icon | Accent | Scroll Position |
|------|------|--------|-----------------|
| Day | sun | #E4FF1A | 0-20% |
| Dawn | sunrise | #F59E0B | 20-40% |
| Dusk | sunset | #A78BFA | 40-60% |
| Night | moon | #22D3EE | 60-80% |
| Storm | thundercloud | #60A5FA | 80-100% |

### Weather localStorage Keys
- `mkj_mood` — selected mood ID ("auto"/"storm"/"chill"/etc.)
- `mkj_loot_collection` — array of collected loot indices

---

## Sound System (80+ unique sounds, Web Audio API)

### CRITICAL RULE: No sound repetitions across sections
Every section has its own unique sounds for ALL 5 per-section systems.

### Per-Section Sound Systems (each section has unique sound for all 5):
| System | Pattern | Count |
|--------|---------|-------|
| Territory HUD | `territory-{sectionId}` | 12 unique |
| Fog of War | `fog-{sectionId}` | 11 unique |
| Achievement Toast | `toast-{sectionId}` | 12 unique |
| Cursor Whoosh | `whoosh-{sectionId}` | 12 unique |
| Resource Gain | `resource-{sectionId}` | 12 unique |

### Section Reveal Sounds (unique, fires once):
`bootDismiss`, `cardReveal`, `ventureReveal`, `statReveal`, `genaiReveal`, `portfolioOpen`, `achievementReveal`, `bossReveal`, `skillTreeReveal`, `academicReveal`, `inventoryOpen`, `dialogueOpen`

### Per-Item Sounds:
`questUnlock`, `academicUnlock`, `boss`, `skillFill`, `xpGain`

### Hover Sounds (9 types):
`cardHover`, `hover`, `ventureHover`, `genaiHover`, `bossHover`, `achievementHover`, `inventoryHover`, `navHover`, `trukapp` (truck rumble), `meetbytravel` (ocean breeze), `vipme` (vibe pulse)

### Interaction Sounds:
`mkjTap-1` through `mkjTap-5`, `easterEgg`, `nudge`, `combo`, `levelup`, `click`, `mapPing`, `saveGame`

---

## UI Interactions Per Section

| Section | Unique Interactions |
|---------|-------------------|
| **Boot Screen** | 5-element orbs, particle canvas, progress loading, typed title (no layout shift), Enter dismiss |
| **Hero** | Parallax depth, particle burst, HP/MANA bars, character card reveal |
| **Quest Log** | Alternating timeline, shimmer borders, card flip (dblclick), quest node pulse |
| **Academic** | Violet accent, page-turn rotateY reveal, violet shimmer borders |
| **Ventures** | 2-column grid, shimmer borders, rocket launch hover |
| **Boss Battles** | 2-col grid, click-to-battle HP drain, shake/defeat, battle scars ticker, venture product hover sounds |
| **Skill Tree** | Bar fill with stagger, XP counter tick-up, detail tooltips on hover |
| **Stats** | Canvas radar chart animation |
| **GenAI** | Full-card clickable, spell cast icon effect |
| **Portfolio** | Canva embeds with skeleton shimmer loaders |
| **Inventory** | Hex-grid offset, magnetic cursor hover, rarity glow |
| **Achievements** | Bento grid, confetti burst, trophy bounce, UNLOCKED badge |
| **Contact** | NPC dialogue typing effect, keyboard shortcuts 1-4 |
| **Footer** | Sparkle trail on mousemove |

---

## CSS Features
- Shimmer borders (`@property --shimmer-angle` conic-gradient)
- Academic violet theme (nodes, lines, shimmer, page-turn rotateY)
- Skeleton loaders for portfolio embeds
- Section glow dividers (radial gradient)
- Scroll glow (fixed ambient lime gradient)
- Level-up animation (scale bounce on XP badge)
- Damage floaters (floating text with transition)
- Scroll streak counter (fixed top-right with fire states)
- Boss hit/defeated shake animations
- Card flip (rotateY 180deg with back content)
- Confetti particles (burst from center)
- Skill detail tooltip on hover
- Spell cast animation (scale + rotate)
- Trophy bounce animation
- Typing cursor (blink animation)
- Footer sparkle (fade + scale)
- Mascot (float animation, blink, cursor-following eyes)
- MKJ glitch (hue-rotate keyframes)
- Weather v2: body mood classes (::before ambient gradients), milky way drift, moon glow+halo, firefly float, shooting star trails, angled rain+splash, puddle ripple, dark cloud drift, multi-flash lightning+bolt branches, screen shake, sun pulse+corona+ray spin, god ray pulse, heat shimmer+mirage wave, dawn glow+sun rise+dawn rays, golden mote rise, bird fly, wind drift+leaf drift, snowfall, frost pulse+glass edge, fog drift, breath puff, ember rise, fire lick, screen pulse, burst particles (CSS custom props), aurora ribbon wave, petal drift, ripple expand, zen breathe, aurora dance (4 bands), cosmic float+hue-rotate, nebula shift, paint splash, prism shift
- Mood selector dropdown (slide-in, active state), mood toggle glow
- Loot drop toast (rarity glow, icon bounce, slide-up)
- Loot collection grid (slot hover scale, tooltip)
- Spaceship flyover (SVG silhouettes, linear crossing animation)
- Responsive: 1024px, 768px, 480px breakpoints

---

## Mascot
- Floating assistant in bottom-right corner
- Blinking eyes that track cursor position
- Speech bubble with contextual tips per section
- Clickable — cycles through tip messages
- Present on both main page and section detail pages

---

## Content Module (cms/content.js)
Single source of truth. ALL site text comes from this file.

**Structure**: `profile`, `heroCard`, `story`, `cursor`, `stats`, `inventory`, `bosses` (6 enemy cards with name/learning/scar), `battleScars` (ticker items), `toasts`, `territories`, `boot`, `nav`, `sectionHeaders`, `seo`, `dialogue`, `easterEggs`, `professional` (6 roles), `entrepreneurship` (2 ventures with product pills: TrukApp/MeetByTravel/VipMe), `academic` (4 entries), `skills` (12), `achievements` (12), `genaiPortfolio` (4), `portfolio` (3), `terminal` (fallback), `lootDrops` (12 collectible items with rarity/icon/flavor), `weather` (9 mood presets with unique effect arrays), `moods` (6 mood selector options), `cardArena` (4 suits x 4 cards)

### Blog CMS (Strapi)
- **Repo**: github.com/urstrulyemkay/personalwebsiteblogs
- **Cloud**: elegant-approval-0b3680a50f.strapiapp.com
- **Content types**: Article (title, slug, excerpt, content, cover, category, tags, readTime, featured), Category (name, slug, color)
- **Frontend**: assets/js/blog.js fetches from Strapi API, falls back to cms/blog.js
- **Bootstrap**: src/index.ts auto-grants public read permissions

### Critical Init Order
`initScrollReveal()` MUST run LAST in the boot callback — after all dynamic content builders (buildVentures, initBossBattles, etc.) so the IntersectionObserver can find dynamically created `.reveal` elements.

---

## Known Issues
- Framer MCP plugin disconnects — keep Framer tab in foreground
- `color-mix()` not supported in Safari < 16.4
- Google Docs cannot be fetched via WebFetch (auth required)
- Tablet/Phone Framer breakpoint nodes empty
- Voice chat on section pages uses browser TTS (ElevenLabs integration pending)

---

## Reference Inspiration
- bychudy.com, nivedhanirmal.com, sunhung.net, the1.amsterdam, ugly.cash, maggie-app.com, journey-digital.com
- Age of Empires / Rise of Nations — fog of war, territory discovery, minimap
- GTA — mission briefings, progress screens
- Diablo / Path of Exile — skill trees, item rarity, character sheets
- Yu-kai Chou's Octalysis — 8 core drives of gamification
