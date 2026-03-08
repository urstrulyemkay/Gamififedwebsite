/* ============================================
   CONTENT MODULE — Edit all site content here
   ============================================
   Change any text, add/remove items, and the
   entire site updates automatically.
   ============================================ */

const CONTENT = {

    // ── PROFILE ──────────────────────────────────
    profile: {
        name: "Mani Kumar Jami",
        shortName: "MKJ",
        title: "AVP of Product & Business Lead",
        tagline: "9.5 Years | $250M+ ARR | AI Platforms | 0\u21921 & 1\u2192100",
        headline: "I build products that scale to 200M+ users.",
        location: "Bengaluru, India",
        email: "manikumarjami@gmail.com",
        phone: "+91-7992591090",
        linkedIn: "https://www.linkedin.com/in/manikumarjami/",
        medium: "https://medium.com/@manikumarjami",
        meetbytravel: "https://meetbytravel.com",
        substack: "https://substack.com/@emkayjami",
        twitter: "https://x.com/manikumarjami",
        topmate: "https://topmate.io/manikumarjami",
    },

    // ── HERO CARD (replaces terminal) ───────────
    heroCard: {
        class: "PRODUCT LEADER",
        level: 95,
        hp: 9500,
        mana: 250,
        summaryLines: [
            "Senior product leader. 9.5 years.",
            "$250M+ ARR. 200M+ users reached.",
            "AI/ML, Marketplaces, SaaS, Growth.",
            "Creator of India's firsts. 2X Founder.",
        ],
        highlights: [
            { label: "ARR DRIVEN", value: "$250M+" },
            { label: "USERS", value: "200M+" },
            { label: "PRODUCTS", value: "15+" },
            { label: "TEAM LED", value: "25+" },
        ],
        tags: ["LLMs", "RAG", "Voice AI", "PLG", "Marketplace", "P&L Owner"],
    },

    // ── MY STORY (hero card backstory) ────────────
    story: [
        {
            tag: "ORIGIN",
            title: "Welcome",
            icon: "\u2694\uFE0F",
            text: "I am a CX Specialist in Product Management with deep experience across the full growth stack \u2014 Acquisitions (content marketing, virality loops, experimentation, A/B, funnel optimization), Engagement (communications, gamification, optimizations), and Revenue (anything and everything that impacts profit). I\u2019ve saved more than $1M across products I\u2019ve worked on. 2X Founder \u2014 received funding from GoI, scaled a company from 0 to 20+ employees in 18 months with profitability."
        },
        {
            tag: "PHILOSOPHY",
            title: "My Product Philosophy",
            icon: "\u{1F9E0}",
            formula: "Profit \u2248 Sum(Users + Problems + Business)",
            text: "I am not a User-Centric PM, Problem-Centric PM, or Business-Centric PM. I realized that profit comes only if you are solving a problem for a user which the business is happy with. The bottom line needs to be the focus if you want your product/company to grow \u2014 not just personal growth. I understand finance and profitability deeply: CFA Level 2 Candidate, Certified Investment Banking Operations Professional. I am a Growth and Profit Centric PM."
        },
        {
            tag: "PSYCHOLOGY",
            title: "Psychology & UX",
            icon: "\u{1F52C}",
            text: "I am a Psychology student and I have been up-skilling extensively in Gamification, Information Architecture, Search & Recommendations, and User Research. You can see this philosophy embedded across this entire website \u2014 every interaction is designed with behavioral psychology in mind."
        },
        {
            tag: "LEADERSHIP",
            title: "I Built Teams from 0 to N",
            icon: "\u{1F91D}",
            text: "If you ask me People or Profit \u2014 my response is People, even in dreams. During my entrepreneurial journey I understood the importance of understanding a person, their life, and its impact on work. I don\u2019t think I can ever become a \u2018manager\u2019 \u2014 I believe in being a team player and empathetic leader. Profit comes naturally if I can make people believe in my vision while understanding their priorities."
        },
        {
            tag: "TECHNOLOGY",
            title: "My Take on Technology",
            icon: "\u{1F4BB}",
            text: "Always curious to learn and apply technology. Software-hardware integration (Ola Electric app pod), ASR models (acquisition, quality audit, training), Communication Engines (retain, resurrect, engage users), Image Optimization Models, Process Automation using no-code tools, 3rd party integrations, and deep reporting & feedback systems \u2014 understanding how data is created, not just what it says."
        },
    ],

    // ── EMOJI CURSOR — per-section avatar ────────
    cursor: {
        default:      { emoji: "\u{1F3AE}", label: "Explorer" },
        about:        { emoji: "\u{1F0CF}", label: "Inspecting..." },
        "quest-log":  { emoji: "\u2694\uFE0F",   label: "Warrior" },
        ventures:     { emoji: "\u{1F680}",       label: "Founder" },
        academic:     { emoji: "\u{1F393}",       label: "Scholar" },
        "boss-battles": { emoji: "\u{1F480}",     label: "Boss Zone" },
        "skill-tree": { emoji: "\u{1F9D9}\u200D\u2642\uFE0F", label: "Mage" },
        stats:        { emoji: "\u{1F4CA}",       label: "Analyst" },
        genai:        { emoji: "\u{1F52E}",       label: "Spellcaster" },
        portfolio:    { emoji: "\u{1F4CB}",       label: "Reviewing..." },
        inventory:    { emoji: "\u{1F392}",       label: "Armory" },
        achievements: { emoji: "\u{1F3C6}",       label: "Champion" },
        contact:      { emoji: "\u{1F4DC}",       label: "Messenger" },
    },

    // ── CHARACTER STATS (Radar Chart) ────────────
    stats: {
        labels: ["P&L", "AI/ML", "GTM", "LEAD", "0\u21921", "BIZ"],
        fullLabels: ["P&L Ownership", "AI/ML Depth", "Go-To-Market", "Leadership", "0-to-1 Building", "Business Acumen"],
        descriptions: [
            "$250M+ ARR portfolio, revenue growth, CAC optimization",
            "LLMs, RAG, Voice AI, ASR \u2014 India's firsts",
            "PLG, GTM execution, 270% growth at scale",
            "25+ team, 10 PM mentorship, cross-functional influence",
            "Rapid POC, MVP to scale, 2X founder experience",
            "CFA, HSBC IB, financial modeling, enterprise deals",
        ],
        values: [95, 93, 90, 88, 92, 85],
    },

    // ── INVENTORY \u2014 Tech Stack (Vehicle Highway) ──
    inventory: [
        // LEGENDARY — Supercars (fastest lane)
        { name: "LLMs & RAG",              icon: "\u{1F9E0}", rarity: "legendary", desc: "LangChain, Langfuse, agentic workflows." },
        { name: "Voice AI / ASR",           icon: "\u{1F399}\uFE0F", rarity: "legendary", desc: "India's 1st Hinglish Turing-passing model." },
        { name: "Conversational AI",        icon: "\u{1F4AC}", rarity: "legendary", desc: "AI telecalling, lead nurturing, dialog systems." },
        { name: "GenAI Products",           icon: "\u2728",    rarity: "legendary", desc: "Shipped 4+ GenAI products \u2014 fraud detection, image optimization, voice agents." },
        { name: "AI Evals & Quality",       icon: "\u{1F9EA}", rarity: "legendary", desc: "LLM evaluation frameworks, model benchmarking, quality audits at scale." },
        { name: "Cursor / Claude",          icon: "\u{1F916}", rarity: "legendary", desc: "AI copilots. 10x productivity multiplier." },
        { name: "Bloomberg Terminal",        icon: "\u{1F4B9}", rarity: "legendary", desc: "Financial data, analytics & capital markets." },
        // EPIC — SUVs (heavy-duty lane)
        { name: "AI Tools Evaluation",      icon: "\u{1F50E}", rarity: "epic",      desc: "Evaluating, selecting & deploying AI tools across product workflows." },
        { name: "Memory & Context Mgmt",    icon: "\u{1F4BE}", rarity: "epic",      desc: "LLM memory management, context windows, RAG retrieval optimization." },
        { name: "Token & Cost Optimization", icon: "\u{1F4B8}", rarity: "epic",      desc: "Prompt engineering for cost efficiency, token budgeting, model selection." },
        { name: "SQL & Databases",          icon: "\u{1F4CA}", rarity: "epic",      desc: "Large-scale schemas, queries, data pipelines." },
        { name: "Mixpanel & Analytics",     icon: "\u{1F50D}", rarity: "epic",      desc: "Event tracking, cohorts, funnels, retention analysis." },
        { name: "Growth & Funnels",         icon: "\u{1F4C8}", rarity: "epic",      desc: "Acquisition, activation, retention, referral, revenue." },
        { name: "AI Workflows",             icon: "\u{1F504}", rarity: "epic",      desc: "End-to-end AI pipelines \u2014 training, serving, monitoring." },
        { name: "Twilio / ElevenLabs",      icon: "\u{1F4DE}", rarity: "epic",      desc: "Voice AI integrations & communication engines." },
        { name: "Capital Markets & Finance",icon: "\u{1F3E6}", rarity: "epic",      desc: "CFA L2, HSBC IB, financial modeling, unit economics." },
        { name: "PLG & GTM",               icon: "\u{1F680}", rarity: "epic",      desc: "Product-led growth, go-to-market execution, 270% revenue growth." },
        { name: "AWS / Cloud",              icon: "\u2601\uFE0F",  rarity: "epic",      desc: "Microservices, scalable infrastructure." },
        { name: "3rd Party Integrations",   icon: "\u{1F517}", rarity: "epic",      desc: "APIs, webhooks, payment gateways, CRM connectors." },
        // RARE — Bikes (nimble utility lane)
        { name: "N8N / No-Code",            icon: "\u26A1",    rarity: "rare",      desc: "50+ daily self-serve automations." },
        { name: "Lovable / Replit",         icon: "\u{1F4BB}", rarity: "rare",      desc: "Rapid prototyping & AI-assisted app building." },
        { name: "Figma",                    icon: "\u{1F3A8}", rarity: "rare",      desc: "Product design, wireframes & prototyping." },
        { name: "Content Marketing",        icon: "\u{1F4DD}", rarity: "rare",      desc: "SEO, virality loops, content-led acquisition." },
        { name: "A/B Testing & CRO",        icon: "\u{1F3AF}", rarity: "rare",      desc: "Experimentation, funnel optimization, hypothesis-driven growth." },
        { name: "Gamification & UX",        icon: "\u{1F3AE}", rarity: "rare",      desc: "Behavioral psychology applied to product engagement." },
        { name: "Communication Engines",    icon: "\u{1F4E8}", rarity: "rare",      desc: "Push, email, WhatsApp \u2014 retain, resurrect, engage users." },
        { name: "Linear / ComfyUI",         icon: "\u{1F500}", rarity: "rare",      desc: "Project management & AI image workflows." },
        { name: "React / Node.js",          icon: "\u269B\uFE0F",  rarity: "rare",      desc: "Full-stack web applications." },
    ],

    // ── BOSS BATTLES ─────────────────────────────
    bosses: [
        {
            name: "The Cold Start Problem",
            hp: 100, defeated: true, year: "2021\u20142024", reward: "+5,000 XP",
            story: "Launched 7+ products from absolute zero \u2014 no users, no data, no brand trust. Every marketplace, SaaS tool, and WhatsApp commerce play started with the same impossible chicken-and-egg. Solved it with scrappy manual onboarding, founder-led sales, and building supply before demand existed.",
            learning: "No framework survives first contact with zero users. You have to do the unscalable things first.",
            scar: "Spent 3 months building a product nobody asked for. Killed it. Started listening before building.",
        },
        {
            name: "Hardware \u00D7 Software Chaos",
            hp: 100, defeated: true, year: "2022\u20142024", reward: "+4,500 XP",
            story: "Product lived across firmware, mobile apps, and cloud infra \u2014 nothing worked the first time. Battled OTA failures, device fragmentation across 100M+ units at Ola, and the brutal reality that hardware bugs ship permanently. Led a war room through 20,000 issues in a single week.",
            learning: "Software can be hotfixed. Hardware can't. Build with that fear, and your quality bar rises permanently.",
            scar: "Watched a firmware bug brick 10K devices in production. Never skipped a hardware QA cycle again.",
        },
        {
            name: "Real GTM \u2260 Playbook GTM",
            hp: 100, defeated: true, year: "2023\u20142024", reward: "+4,000 XP",
            story: "Threw out the SaaS growth playbook. In India's used vehicle market, PLG meant WhatsApp auctions at 2 AM, dealer trust built one chai meeting at a time, and funnels redesigned around how real buyers actually behave. Delivered 250% revenue growth by playing a different game.",
            learning: "The best GTM strategy is the one that matches how your customer actually makes decisions, not how a framework says they should.",
            scar: "Burned 3 months and budget on a paid acquisition playbook that didn't convert a single dealer. Chai > CAC.",
        },
        {
            name: "Building India's Firsts",
            hp: 100, defeated: true, year: "2021\u20142024", reward: "+4,500 XP",
            story: "No benchmarks. No case studies. No one to copy. Built India's 1st Hinglish Voice AI that passed the Turing test, India's 1st automated WhatsApp auction for used 2-wheelers, and a GoI-funded agri-tech platform \u2014 all against skeptical stakeholders and the constant pressure to play safe.",
            learning: "When there's no reference, conviction is the only compass. Data will catch up \u2014 but only if you ship first.",
            scar: "Pitched the Voice AI idea 11 times before getting a yes. Ten rejections taught me to sell the vision, not the spec.",
        },
        {
            name: "Topline vs. Bottomline",
            hp: 100, defeated: true, year: "2019\u20142024", reward: "+3,500 XP",
            story: "Growth at all costs is a lie. Reduced CAC by 75% while scaling revenue 250%. Took a startup from zero to profitable in 18 months. Killed features that drove vanity metrics but burned cash. Learned that a healthy business is built on unit economics, not fundraising slides.",
            learning: "Revenue without margin is just movement. Profit is the only proof that the model works.",
            scar: "Chased a \u20B950L revenue line that was -30% margin. Shut it down. Topline ego is the silent startup killer.",
        },
        {
            name: "The Conviction Tax",
            hp: 100, defeated: true, year: "2015\u20142024", reward: "+3,000 XP",
            story: "Every first-of-its-kind product came with a tax \u2014 being told it won't work, fighting for resources, shielding the team from political heat, and owning every failure publicly when bets didn't land. The cost of building with gut when data doesn't exist yet.",
            learning: "Taking a stand for your team means absorbing heat so they can stay focused. That's the job.",
            scar: "Took public blame for a product bet that failed. The team stayed intact. The next bet worked. Worth it.",
        },
    ],

    // ── BATTLE SCARS (Lessons from boss fights) ──
    battleScars: [
        "Cold starts teach you that no framework survives first contact with zero users",
        "Hardware humbles you \u2014 you can't hotfix atoms",
        "Real PLG is built in the field, not in a pitch deck",
        "If no one's done it before, the only playbook is conviction",
        "Topline without bottomline is just expensive storytelling",
        "The price of building bold is owning every failure publicly",
    ],

    // ── ACHIEVEMENT TOASTS ───────────────────────
    toasts: {
        about:        { title: "Genesis", desc: "You discovered the story" },
        "quest-log":  { title: "Quest Master", desc: "Reviewed all campaign missions" },
        ventures:     { title: "Founder's Mark", desc: "Discovered the entrepreneurial ventures" },
        academic:     { title: "Scholar", desc: "Explored the training grounds" },
        "boss-battles": { title: "Boss Hunter", desc: "Witnessed all boss defeats" },
        "skill-tree": { title: "Skill Inspector", desc: "Analyzed the full skill tree" },
        stats:        { title: "Stat Reader", desc: "Inspected the character sheet" },
        genai:        { title: "Spellcaster", desc: "Reviewed the AI creations" },
        portfolio:    { title: "War Chronicler", desc: "Studied the battle reports" },
        inventory:    { title: "Armorer", desc: "Browsed the full armory" },
        achievements: { title: "Trophy Hunter", desc: "Browsed the hall of legends" },
        contact:      { title: "Final Boss", desc: "Reached the final quest" },
    },

    // ── TERRITORIES (Age of Empires style) ────────
    territories: {
        "about":        { icon: "\u{1F3F0}", name: "The Origin Citadel", tag: "ENTERING" },
        "quest-log":    { icon: "\u2694\uFE0F", name: "Campaign Grounds", tag: "ADVANCING TO" },
        "ventures":     { icon: "\u{1F680}", name: "Founder's Forge", tag: "ENTERING" },
        "academic":     { icon: "\u{1F3DB}\uFE0F", name: "Academy of Knowledge", tag: "EXPLORING" },
        "boss-battles": { icon: "\u{1F480}", name: "The Boss Arena", tag: "WARNING \u2014 ENTERING" },
        "skill-tree":   { icon: "\u{1F9D9}\u200D\u2642\uFE0F", name: "The Arcane Library", tag: "DISCOVERED" },
        "stats":        { icon: "\u{1F4CA}", name: "Character Sanctum", tag: "INSPECTING" },
        "genai":        { icon: "\u{1F52E}", name: "The Spell Workshop", tag: "DISCOVERED" },
        "portfolio":    { icon: "\u{1F4CB}", name: "War Archives", tag: "OPENING" },
        "inventory":    { icon: "\u{1F392}", name: "The Armory", tag: "ACCESSING" },
        "achievements": { icon: "\u{1F3C6}", name: "Hall of Legends", tag: "ENTERING" },
        "contact":      { icon: "\u{1F4DC}", name: "The Final Quest", tag: "APPROACHING" },
    },

    // ── BOOT SCREEN ─────────────────────────────
    boot: {
        emblem: "MKJ",
        studioName: "JAMI STUDIOS PRESENTS",
        missionTag: "NEW GAME",
        chapter: "CHAPTER I",
        brief: "You are about to explore the career of a Product Leader who built products for 200M+ users, drove $250M+ ARR, and created India's firsts in AI & marketplaces. Each section is a territory to conquer.",
        startBtn: "BEGIN EXPEDITION",
        startHint: "PRESS ENTER OR CLICK",
        stats: [
            { key: "DIFFICULTY", value: "LEGENDARY" },
            { key: "TERRITORIES", value: "11 REGIONS" },
            { key: "TOTAL XP", value: "95,000" },
        ],
        elements: [
            {
                id: "fire", icon: "\u{1F525}", label: "FIRE",
                title: "FIRE \u2014 P&L & Revenue Execution",
                stat: "P&L", value: 95,
                color: "#FF6B35", rgb: "255,107,53",
                secondaryColor: "#FFB347", secondaryRgb: "255,179,71",
                tagline: "BURN THROUGH LIMITS",
                description: "You lead with intensity. Revenue targets, P&L ownership, scaling teams \u2014 fire bends to your will.",
                defaultMood: "hype",
                particleStyle: "ember",
                particleColors: ["#FF6B35","#FF4500","#FFB347","#FF8C00","#FFA07A"],
                soundProfile: { freqMult: 0.85, waveform: "sawtooth", attack: 0.01, decay: 0.15, detune: -50 },
                shimmerColors: ["rgba(255,107,53,0.3)","rgba(255,179,71,0.15)","rgba(255,69,0,0.1)"],
            },
            {
                id: "water", icon: "\u{1F30A}", label: "WATER",
                title: "WATER \u2014 AI/ML Depth",
                stat: "AI", value: 93, default: true,
                color: "#22D3EE", rgb: "34,211,238",
                secondaryColor: "#67E8F9", secondaryRgb: "103,232,249",
                tagline: "FLOW WITHOUT RESISTANCE",
                description: "You solve deep technical puzzles. AI architectures, data pipelines, ML systems \u2014 water finds every path.",
                defaultMood: "chill",
                particleStyle: "droplet",
                particleColors: ["#22D3EE","#67E8F9","#06B6D4","#0EA5E9","#38BDF8"],
                soundProfile: { freqMult: 1.0, waveform: "sine", attack: 0.03, decay: 0.3, detune: 0 },
                shimmerColors: ["rgba(34,211,238,0.3)","rgba(103,232,249,0.15)","rgba(6,182,212,0.1)"],
            },
            {
                id: "earth", icon: "\u26F0\uFE0F", label: "EARTH",
                title: "EARTH \u2014 Go-To-Market Scale",
                stat: "GTM", value: 90,
                color: "#4ADE80", rgb: "74,222,128",
                secondaryColor: "#86EFAC", secondaryRgb: "134,239,172",
                tagline: "BUILD THINGS THAT LAST",
                description: "You build foundations. Go-to-market, distribution, partnerships \u2014 earth holds everything together.",
                defaultMood: "zen",
                particleStyle: "leaf",
                particleColors: ["#4ADE80","#86EFAC","#22C55E","#16A34A","#A3E635"],
                soundProfile: { freqMult: 0.7, waveform: "square", attack: 0.02, decay: 0.4, detune: -100 },
                shimmerColors: ["rgba(74,222,128,0.3)","rgba(134,239,172,0.15)","rgba(34,197,94,0.1)"],
            },
            {
                id: "air", icon: "\u{1F32C}\uFE0F", label: "AIR",
                title: "AIR \u2014 0-to-1 Speed",
                stat: "0\u21921", value: 92,
                color: "#E0E7FF", rgb: "224,231,255",
                secondaryColor: "#C7D2FE", secondaryRgb: "199,210,254",
                tagline: "MOVE FAST, BREAK BARRIERS",
                description: "You move at velocity. Zero-to-one launches, rapid prototyping, speed of execution \u2014 air clears every obstacle.",
                defaultMood: "creative",
                particleStyle: "wisp",
                particleColors: ["#E0E7FF","#C7D2FE","#A5B4FC","#818CF8","#F0F4FF"],
                soundProfile: { freqMult: 1.3, waveform: "triangle", attack: 0.05, decay: 0.25, detune: 50 },
                shimmerColors: ["rgba(224,231,255,0.3)","rgba(199,210,254,0.15)","rgba(165,180,252,0.1)"],
            },
            {
                id: "ether", icon: "\u2728", label: "ETHER",
                title: "ETHER \u2014 Business Acumen",
                stat: "BIZ", value: 85,
                color: "#A78BFA", rgb: "167,139,250",
                secondaryColor: "#C4B5FD", secondaryRgb: "196,181,253",
                tagline: "SEE THE BIGGER PICTURE",
                description: "You see patterns others miss. Business strategy, cross-functional vision, connecting dots \u2014 ether transcends boundaries.",
                defaultMood: "night",
                particleStyle: "star",
                particleColors: ["#A78BFA","#C4B5FD","#8B5CF6","#7C3AED","#DDD6FE"],
                soundProfile: { freqMult: 1.1, waveform: "sine", attack: 0.04, decay: 0.5, detune: 100 },
                shimmerColors: ["rgba(167,139,250,0.3)","rgba(196,181,253,0.15)","rgba(139,92,246,0.1)"],
            },
        ],
    },

    // ── NAVIGATION & SECTIONS ───────────────────
    nav: [
        { id: "about",        label: "About" },
        { id: "quest-log",    label: "Career" },
        { id: "ventures",     label: "Ventures" },
        { id: "academic",     label: "Education" },
        { id: "boss-battles", label: "Bosses" },
        { id: "skill-tree",   label: "Skills" },
        { id: "genai",        label: "GenAI" },
        { id: "portfolio",    label: "Portfolio" },
        { id: "achievements", label: "Trophies" },
        { id: "contact",      label: "Contact" },
    ],

    // ── SECTION HEADERS ─────────────────────────
    sectionHeaders: {
        "quest-log":    { tag: "QUEST LOG",        title: "Missions Completed." },
        "academic":     { tag: "TRAINING GROUNDS",  title: "Knowledge Acquired." },
        "ventures":     { tag: "SIDE QUESTS",       title: "Ventures Founded." },
        "boss-battles": { tag: "BOSS BATTLES",      title: "Enemies Vanquished." },
        "skill-tree":   { tag: "SKILL TREE",        title: "Abilities Unlocked." },
        "stats":        { tag: "CHARACTER SHEET",    title: "Base Stats." },
        "genai":        { tag: "SPELL BOOK",         title: "AI Creations." },
        "portfolio":    { tag: "WAR JOURNAL",        title: "Battle Reports." },
        "inventory":    { tag: "INVENTORY",          title: "Equipment Loadout." },
        "achievements": { tag: "ACHIEVEMENT WALL",   title: "Trophies Collected." },
    },

    // ── SEO ─────────────────────────────────────
    seo: {
        title: "Mani Kumar Jami \u2014 Product Leader & 2X Founder | AI Builder",
        description: "Product strategist, AI builder, and 2X founder based in Bengaluru. $250M+ ARR, 200M+ users. Explore my career like an RPG.",
        keywords: "Mani Kumar Jami, Product Leader, AI Builder, Founder, DriveX, TVS Group, MBA Xavier, Product Strategy, Voice AI",
        url: "https://manikumarjami.com",
    },

    // ── DIALOGUE OPTIONS (NPC CTA) ───────────────
    dialogue: {
        npcName: "Mani",
        greeting: "A fellow adventurer! I've built products at 200M+ scale, deployed Voice AI that passes the Turing test, and scaled startups from zero. What quest brings you here?",
        options: [
            { text: "\u2694\uFE0F  \"I have a product challenge at scale.\"",     action: "mailto:manikumarjami@gmail.com?subject=Product%20Challenge" },
            { text: "\u{1F680} \"Let's build an AI product together.\"",    action: "mailto:manikumarjami@gmail.com?subject=AI%20Product%20Collaboration" },
            { text: "\u{1F91D} \"Just want to connect.\"",              action: "https://linkedin.com/in/manikumarjami" },
            { text: "\u{1F4AC} \"Tell me about your GenAI portfolio.\"",   action: "mailto:manikumarjami@gmail.com?subject=GenAI%20Portfolio" },
        ],
    },

    // ── EASTER EGGS ──────────────────────────────
    easterEggs: {
        konamiReward: { title: "Konami Master", desc: "You found the secret code!", icon: "\u{1F47E}" },
        clickCombo: { title: "Speed Clicker", desc: "5 rapid clicks on MKJ logo!", icon: "\u{1F5B1}\uFE0F" },
    },

    // ── PROFESSIONAL EXPERIENCE ──────────────────
    professional: [
        {
            year: "Sep 2024 \u2014 Present",
            xp: 5000,
            title: "AVP, CX & AI Products \u2014 DriveX (TVS Group)",
            url: "https://www.drivex.in/",
            desc: "Owned multi-product portfolio: Website, Marketplace, Dealer Platforms, AI SaaS. $50M+ ARR. 250% revenue growth. Digital attribution 35% \u2192 90%. CAC reduced 75%. Built shared AI platform (LLMs, RAG, agentic workflows) \u2014 $2.5M ARR from AI monetization. Closed 5+ enterprise deals adding $6M ARR in 6 months.",
            badges: [
                { text: "$50M+ ARR", rank: "legendary" },
                { text: "AVP", rank: "legendary" },
                { text: "AI PLATFORM", rank: "epic" },
                { text: "TVS FUTURE LEADERS", rank: "amber" },
            ],
            current: true,
        },
        {
            year: "Dec 2023 \u2014 Sep 2024",
            xp: 4500,
            title: "General Manager, Consumer Apps \u2014 DriveX (TVS Group)",
            url: "https://www.drivex.in/",
            desc: "Built India's 1st automated used 2W WhatsApp auction platform. $12M ARR marketplace without incremental costs. Deployed Voice AI for lead qualification \u2014 45% conversion increase, 4x sales productivity, 99% fraud reduction. Mentored 10 PMs, 50% promoted in 2 years.",
            badges: [
                { text: "INDIA'S 1ST", rank: "legendary" },
                { text: "$12M ARR", rank: "epic" },
                { text: "VOICE AI", rank: "epic" },
                { text: "10 PMs LED", rank: "rare" },
            ],
        },
        {
            year: "Dec 2022 \u2014 Dec 2023",
            xp: 4000,
            title: "Senior PM, AI Products \u2014 SquadStack",
            url: "https://www.squadstack.ai/",
            desc: "India's 1st AI telecalling platform. Built India's 1st Hinglish ASR model \u2014 passed the Turing test. $5M+ ARR via PLG. Reduced onboarding from 6hrs to 30min. Dynamic task allocation engine boosted CSAT 40%, cut OpEx 35%.",
            badges: [
                { text: "TURING TEST", rank: "legendary" },
                { text: "$5M+ ARR", rank: "epic" },
                { text: "ASR/NLP", rank: "epic" },
                { text: "PLG", rank: "rare" },
            ],
        },
        {
            year: "Apr 2022 \u2014 Dec 2022",
            xp: 3500,
            title: "Senior PM, User Experience \u2014 Ola",
            url: "https://www.olacabs.com/",
            desc: "Ola OS 2.0 release for 100M+ users. Led war room: 20,000 issues in 1 week. Optimized loading (4s), engagement (5 min/user/day), cut escalations 40%. Boosted Ola Electric conversions 20 \u2192 50/day in AP.",
            badges: [
                { text: "100M+ USERS", rank: "legendary" },
                { text: "OS 2.0", rank: "epic" },
                { text: "WAR ROOM", rank: "rare" },
                { text: "OLA ELECTRIC", rank: "cyan" },
            ],
        },
        {
            year: "Jun 2020 \u2014 Jan 2022",
            xp: 3000,
            title: "Product Manager \u2014 Simplilearn",
            url: "https://www.simplilearn.com/",
            desc: "GTM for top-selling course. 1.5x industry course completion. Launched Job Guarantee Program \u2014 270% revenue growth in 8 months. Designed 10+ programs with top universities, $1M MRR per category.",
            badges: [
                { text: "270% GROWTH", rank: "epic" },
                { text: "JOB GUARANTEE", rank: "rare" },
                { text: "$1M MRR", rank: "epic" },
                { text: "EDTECH", rank: "cyan" },
            ],
        },
        {
            year: "Aug 2014 \u2014 Jun 2017",
            xp: 2500,
            title: "Product Engineer \u2014 Virtusa Polaris (Citibank)",
            url: "https://www.virtusa.com/",
            desc: "Built enterprise data-archival platform saving $1M+ annually. 40-70% cost reduction for telecom & BFSI clients. Large-scale database schemas and data pipelines.",
            badges: [
                { text: "$1M+ SAVED", rank: "epic" },
                { text: "ENTERPRISE", rank: "rare" },
                { text: "DATA PLATFORM", rank: "cyan" },
            ],
        },
    ],

    // ── ENTREPRENEURSHIP ─────────────────────────
    entrepreneurship: [
        {
            year: "2019 \u2014 2022",
            xp: 3200,
            title: "Co-Founder \u2014 Ro-One ITDS",
            url: "https://www.linkedin.com/company/ro-one-information-technology-and-digital-solutions/",
            desc: "Built 5+ digital platforms (logistics, travel, gov-tech, fintech). INR 20M+ revenue through product-focused sales. Built and managed 25-member engineering team.",
            badges: [
                { text: "INR 20M+", rank: "epic" },
                { text: "25 TEAM", rank: "rare" },
                { text: "5+ PLATFORMS", rank: "rare" },
            ],
            products: [
                { name: "TrukApp", slug: "trukapp", icon: "\u{1F69A}", desc: "Logistics platform for truck fleet management", sound: "trukapp" },
                { name: "MeetByTravel", slug: "meetbytravel", icon: "\u{1F3D6}\uFE0F", desc: "Social travel platform connecting travelers", sound: "meetbytravel" },
                { name: "VipMe", slug: "vipme", icon: "\u{1F3B6}", desc: "Exclusive vibe and social experiences platform", sound: "vipme" },
            ],
        },
        {
            year: "2020 \u2014 2022",
            xp: 2800,
            title: "Co-Founder \u2014 Greengears Agrotech",
            url: "https://www.thecompanycheck.com/org/green-gears-agro-tech/c3ef8e5159",
            desc: "Pre-seed funded by Government of India & AP. Top 30 Social Innovator (NITI Aayog & UNDP Youth CoLab). Scaled 7 products to 10L+ MRR. ABC-based pricing strategy.",
            badges: [
                { text: "GoI FUNDED", rank: "legendary" },
                { text: "NITI AAYOG TOP 30", rank: "epic" },
                { text: "7 PRODUCTS", rank: "rare" },
                { text: "30L R&D GRANT", rank: "amber" },
            ],
        },
    ],

    // ── ACADEMIC JOURNEY ─────────────────────────
    academic: [
        {
            year: "2023 \u2014 Ongoing",
            xp: 1500,
            title: "Master of Business Laws \u2014 NLSIU",
            url: "https://www.nls.ac.in/",
            desc: "Assessing legal risks for decision-making across contract, corporate, commercial, IP, and banking & investment laws.",
            badges: [
                { text: "LAW", rank: "violet" },
                { text: "NLSIU", rank: "epic" },
            ],
        },
        {
            year: "2025 \u2014 Ongoing",
            xp: 1200,
            title: "MA Psychology \u2014 IGNOU",
            desc: "Building expertise in behavioral psychology for better research, people leadership, and UX-centric product design.",
            badges: [
                { text: "PSYCHOLOGY", rank: "violet" },
                { text: "UX RESEARCH", rank: "rare" },
            ],
        },
        {
            year: "2017 \u2014 2019",
            xp: 2000,
            title: "MBA \u2014 Xavier Institute of Management (XIMB)",
            url: "https://ximb.edu.in/",
            desc: "Finance, Marketing & Strategy. HSBC IB PPO. National Case Competition finalist across 10+ B-school competitions. Bloomberg Campus Rep. CRISIL Young Thought Leader 2017.",
            badges: [
                { text: "HSBC IB PPO", rank: "legendary" },
                { text: "BLOOMBERG", rank: "cyan" },
                { text: "CRISIL YTL", rank: "violet" },
                { text: "10+ CASES", rank: "epic" },
            ],
        },
        {
            year: "2010 \u2014 2014",
            xp: 1500,
            title: "B.Tech ECE \u2014 SRM University",
            url: "https://www.srmist.edu.in/",
            desc: "Best Project Award 2014 \u2014 Smart Home Control using Brain Wave Sensor. Scholarship holder. SRMJEE Rank 91. Cultural fest organizer.",
            badges: [
                { text: "BEST PROJECT", rank: "rare" },
                { text: "SCHOLARSHIP", rank: "cyan" },
                { text: "RANK 91", rank: "rare" },
            ],
        },
    ],

    // ── SKILLS ────────────────────────────────────
    skills: [
        { name: "Product Strategy (0\u21921, 1\u2192100)", level: 97, icon: "\u{1F3AF}" },
        { name: "AI/ML (LLMs, RAG, Voice AI)", level: 95, icon: "\u{1F916}" },
        { name: "P&L Ownership & Revenue", level: 93, icon: "\u{1F4B0}" },
        { name: "Marketplace & Growth", level: 92, icon: "\u{1F4C8}" },
        { name: "PLG & GTM Execution", level: 90, icon: "\u{1F680}" },
        { name: "Tech Leadership (25+ team)", level: 88, icon: "\u26A1" },
        { name: "Enterprise Sales & Deals", level: 86, icon: "\u{1F4BC}" },
        { name: "Data & Analytics", level: 85, icon: "\u{1F4CA}" },
        { name: "Behavioral Psychology & UX", level: 84, icon: "\u{1F9E0}" },
        { name: "Investment Banking", level: 82, icon: "\u{1F3E6}" },
        { name: "Legal & Compliance", level: 75, icon: "\u{1F4DC}" },
        { name: "Blockchain & Web3", level: 72, icon: "\u{1F517}" },
    ],

    // ── ACHIEVEMENTS ─────────────────────────────
    achievements: [
        { title: "$250M+ ARR Portfolio", subtitle: "Owned multi-product portfolio at DriveX. 250% revenue growth. $50M+ ARR responsibility.", icon: "\u{1F4B0}", size: "large", color: "#E4FF1A" },
        { title: "India's Firsts x3", subtitle: "1st WhatsApp auction platform. 1st Hinglish ASR Turing-passing model. 1st blockchain ed-tech.", icon: "\u{1F1EE}\u{1F1F3}", size: "large", color: "#E4FF1A" },
        { title: "200M+ Users Reached", subtitle: "Built products at Ola, DriveX, and Simplilearn serving 200M+ cumulative users.", icon: "\u{1F30D}", size: "medium", color: "#22D3EE" },
        { title: "TVS Future Leaders", subtitle: "Fast-track promotion. Inducted into TVS Group Future Leaders Program.", icon: "\u2B50", size: "medium", color: "#F59E0B" },
        { title: "2X Founder", subtitle: "Ro-One ITDS: INR 20M+ revenue. Greengears: GoI funded, NITI Aayog Top 30.", icon: "\u{1F680}", size: "medium", color: "#4ADE80" },
        { title: "HSBC IB PPO", subtitle: "Investment Banking PPO holder from HSBC. CFA Level 2 Candidate.", icon: "\u{1F3E6}", size: "small", color: "#22D3EE" },
        { title: "MBA \u2014 XIMB + NLSIU Law", subtitle: "MBA Finance/Strategy. Master of Business Laws. MA Psychology (ongoing).", icon: "\u{1F393}", size: "medium", color: "#A78BFA" },
        { title: "10+ National Case Competitions", subtitle: "Tata Steelathon, Mahindra War Room, V-Guard, GMR Raxa, Infosys, CRC National Finalist.", icon: "\u{1F3C6}", size: "large", color: "#E4FF1A" },
        { title: "30L R&D Grant from GoI", subtitle: "Top 30 Youth CoLab ideas. National Innovation Challenge. Government of India funded.", icon: "\u{1F3DB}\uFE0F", size: "small", color: "#F59E0B" },
        { title: "Voice AI That Passes Turing Test", subtitle: "Built India's 1st Hinglish AI telecalling model. 45% conversion lift. 99% fraud reduction.", icon: "\u{1F399}\uFE0F", size: "medium", color: "#22D3EE" },
        { title: "Guest Lecturer", subtitle: "Delivered sessions at XIMB, IIM Visakhapatnam, and SRM University.", icon: "\u{1F4E2}", size: "small", color: "#A78BFA" },
        { title: "5 Languages", subtitle: "Telugu, Hindi, English, Tamil, Japanese.", icon: "\u{1F5E3}\uFE0F", size: "small", color: "#F472B6" },
    ],

    // ── GenAI PORTFOLIO ──────────────────────────
    genaiPortfolio: [
        { name: "Finpist", desc: "Personal debt optimizer \u2014 understands financial risks, recommends optimization strategies.", icon: "\u{1F4B3}", url: "https://www.finpist.com/" },
        { name: "Fraud Detection Voice Agent", desc: "Anomaly detection across SOPs and telecaller performance using Voice AI.", icon: "\u{1F6E1}\uFE0F", url: "https://www.producthunt.com/products/voice-call-anomaly-watch/launches/voice-call-anomaly-watch" },
        { name: "Image Optimization Agent", desc: "Background removal, segmentation, and object detection at scale.", icon: "\u{1F5BC}\uFE0F", url: "https://www.youtube.com/watch?v=oeCnP9cJa9g&feature=youtu.be" },
        { name: "AI Telecalling & Lead Nurturing", desc: "Intent-driven outbound/inbound calls, lead scoring, script generation, next-best-action.", icon: "\u{1F4DE}", url: "https://www.linkedin.com/posts/manikumarjami_hackathon-productbuilding-drivex-activity-7373684216703889408-UkH3/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAjtdnkB4xMPiL0dz0tsL9PZ6uh8W7htCsM" },
    ],

    // ── PORTFOLIO (Canva embeds) ───────────────
    portfolio: [
        {
            title: "Product Portfolio",
            desc: "Case studies, product teardowns, and strategy decks.",
            embedUrl: "https://www.canva.com/design/DAGjzjzS2jA/E020HDdzheJwL_48BvDEcw/view?embed",
            icon: "\u{1F4CB}",
        },
        {
            title: "Client Consulting — Project A",
            desc: "Product consulting engagement: strategy, roadmap, and execution.",
            embedUrl: "https://www.canva.com/design/DAGjzZg8WvU/rUogw5sf3qxzoxp6jUvPkA/view?embed",
            icon: "\u{1F4BC}",
        },
        {
            title: "Client Consulting — Project B",
            desc: "Product consulting engagement: growth strategy and delivery.",
            embedUrl: "https://www.canva.com/design/DAGjzROsGpY/-o4zsVQO286aFwwI4EQPeQ/view?embed",
            icon: "\u{1F91D}",
        },
    ],

    // ── TERMINAL SEQUENCES (kept for fallback) ───
    terminal: [
        { type: "command", text: "whoami" },
        { type: "output", lines: [
            { style: "highlight", text: "Mani Kumar Jami" },
            { style: "output", text: "AVP of Product | 2X Founder | AI Builder" },
            { style: "muted", text: "9.5 years | $250M+ ARR | 200M+ users | Bengaluru" },
        ]},
        { type: "pause", duration: 600 },
        { type: "command", text: "cat active_quests.md" },
        { type: "output", lines: [
            { style: "highlight", text: "## DriveX (TVS Group) \u2014 AVP, CX & AI Products" },
            { style: "output", text: "Multi-product portfolio | $50M+ ARR | AI Platform" },
            { style: "highlight", text: "## India's Firsts" },
            { style: "output", text: "1st WhatsApp Auction | 1st Hinglish Turing AI | 1st Blockchain Ed-Tech" },
        ]},
        { type: "pause", duration: 600 },
        { type: "command", text: "cat skills --top 5" },
        { type: "output", lines: [
            { style: "highlight", text: "LEGENDARY  Product Strategy (0\u21921) ......... 97" },
            { style: "highlight", text: "LEGENDARY  AI/ML (LLMs, RAG, Voice) ....... 95" },
            { style: "epic", text: "EPIC       P&L & Revenue ................. 93" },
            { style: "epic", text: "EPIC       Marketplace & Growth .......... 92" },
            { style: "epic", text: "EPIC       PLG & GTM .................... 90" },
        ]},
        { type: "pause", duration: 600 },
        { type: "command", text: "cat achievements.log" },
        { type: "output", lines: [
            { style: "highlight", text: "[UNLOCKED] $250M+ ARR \u2014 multi-product portfolio owner" },
            { style: "highlight", text: "[UNLOCKED] India's Firsts x3 \u2014 WhatsApp auction, Hinglish AI, blockchain" },
            { style: "highlight", text: "[UNLOCKED] 200M+ users reached across Ola, DriveX, Simplilearn" },
            { style: "highlight", text: "[UNLOCKED] TVS Future Leaders | HSBC IB PPO | CFA L2" },
            { style: "highlight", text: "[UNLOCKED] 2X Founder | GoI Funded | NITI Aayog Top 30" },
            { style: "muted", text: "" },
            { style: "muted", text: "// Scroll down to explore the full quest log..." },
        ]},
    ],

    // ── CARD ARENA — Trading Card Game ─────────
    // ── LOOT DROPS — collectible scroll drops ──
    lootDrops: [
        { name: "First Principles", rarity: "legendary", icon: "\u{1F4DC}", flavor: "\"Don't ask what the user wants. Ask what problem keeps them up at night.\"" },
        { name: "Scaling Shard", rarity: "epic", icon: "\u26A1", flavor: "200M+ users don't happen by accident. Every system was designed to break gracefully." },
        { name: "Founder's Grit", rarity: "epic", icon: "\u{1F48E}", flavor: "0 to 20 employees in 18 months. Profitable. Government-funded. No shortcuts." },
        { name: "Growth Elixir", rarity: "rare", icon: "\u{1F9EA}", flavor: "Viral loops, PLG funnels, A/B experiments \u2014 growth is a science, not luck." },
        { name: "Debug Token", rarity: "rare", icon: "\u{1F41B}", flavor: "The best PMs ship fast and fix faster. Every bug is a learning XP drop." },
        { name: "AI Fragment", rarity: "epic", icon: "\u{1F916}", flavor: "LLMs, RAG pipelines, voice AI \u2014 I don't just talk about AI, I build it." },
        { name: "Strategy Scroll", rarity: "rare", icon: "\u{1F4C3}", flavor: "Profit = Users + Problems + Business. Miss one, miss everything." },
        { name: "Empathy Rune", rarity: "legendary", icon: "\u{1F49C}", flavor: "People or profit? People. Always. Profit follows belief." },
        { name: "Data Crystal", rarity: "rare", icon: "\u{1F52E}", flavor: "I understand how data is created, not just what it says." },
        { name: "Innovation Spark", rarity: "epic", icon: "\u{1F525}", flavor: "India's first WhatsApp auction. India's first Hinglish AI. First is a habit." },
        { name: "Finance Codex", rarity: "rare", icon: "\u{1F4B0}", flavor: "CFA L2 candidate. I don't just build products \u2014 I build P&Ls." },
        { name: "Team Crest", rarity: "legendary", icon: "\u{1F6E1}\uFE0F", flavor: "25+ people led. Not managed \u2014 led. Culture-first, outcome-driven." },
    ],


    // ── WEATHER/TIME — dynamic atmosphere ────────
    weather: {
        day:   { label: "Day",    icon: "\u2600\uFE0F", accent: "#E4FF1A", effects: ["hotSun", "godRays", "heatShimmer", "dustMotes"] },
        dawn:  { label: "Dawn",   icon: "\u{1F305}", accent: "#F59E0B", effects: ["warmGlow", "dawnRays", "goldenMotes", "birds", "wind"] },
        dusk:  { label: "Dusk",   icon: "\u{1F306}", accent: "#A78BFA", effects: ["duskSky", "rain", "clouds", "wind"] },
        night: { label: "Night",  icon: "\u{1F319}", accent: "#22D3EE", effects: ["stars", "milkyWay", "moon", "fireflies"] },
        storm: { label: "Storm",  icon: "\u26C8\uFE0F", accent: "#60A5FA", effects: ["heavyRain", "puddles", "thunder", "darkClouds"] },
        chill: { label: "Chill",  icon: "\u2744\uFE0F",  accent: "#94A3B8", effects: ["snow", "frost", "fogLayer", "breath"] },
        hype:  { label: "Hype",   icon: "\u{1F525}",     accent: "#EF4444", effects: ["embers", "fireLicks", "screenPulse", "burstExplosions"] },
        zen:   { label: "Zen",    icon: "\u{1F33F}",     accent: "#4ADE80", effects: ["petals", "auroraRibbon", "ripples", "zenBreathe", "fireflies"] },
        creative: { label: "Creative", icon: "\u{1F308}", accent: "#A78BFA", effects: ["aurora", "cosmicDust", "nebula", "paintSplashes", "prisms"] },
    },
    // ── MOOD SELECTOR — visitor picks vibe ──────
    moods: [
        { id: "auto",     label: "Auto",     icon: "\u{1F554}", desc: "Changes as you scroll" },
        { id: "storm",    label: "Storm",    icon: "\u26C8\uFE0F", desc: "Thunder & lightning" },
        { id: "chill",    label: "Chill",    icon: "\u2744\uFE0F",  desc: "Snow & frost" },
        { id: "hype",     label: "Hype",     icon: "\u{1F525}",     desc: "Fire & explosions" },
        { id: "zen",      label: "Zen",      icon: "\u{1F33F}",     desc: "Petals & ripples" },
        { id: "creative", label: "Creative", icon: "\u{1F308}",     desc: "Aurora & nebula" },
    ],

    // ── CARD ARENA — Trading Card Game ─────────
    cardArena: {
        product: [
            { name: "Strategic Vision", rarity: "legendary", power: 95, cost: 8, icon: "\u{1F3AF}", desc: "I drove $250M+ ARR across 15+ products. I see 3 moves ahead \u2014 turning ambiguity into roadmaps that print revenue.", tags: ["Strategy", "Roadmap"] },
            { name: "Growth Engine", rarity: "epic", power: 88, cost: 6, icon: "\u{1F680}", desc: "I built viral loops and PLG funnels that reached 200M+ users at Ola and Simplilearn. Acquisition is my playground.", tags: ["Growth", "PLG"] },
            { name: "P&L Mastery", rarity: "epic", power: 85, cost: 7, icon: "\u{1F4B0}", desc: "CFA L2 candidate. I took my startup from zero to profitability in 18 months. I don\u2019t just build products \u2014 I build businesses.", tags: ["Finance", "Revenue"] },
            { name: "Market Sense", rarity: "rare", power: 78, cost: 5, icon: "\u{1F50D}", desc: "I launched India\u2019s first WhatsApp auction and first Hinglish AI assistant. I find gaps nobody else sees.", tags: ["Research", "Analysis"] },
        ],
        technology: [
            { name: "AI Architect", rarity: "legendary", power: 92, cost: 9, icon: "\u{1F916}", desc: "I built LLM pipelines, RAG systems, and an AI voice agent that passes real-world Turing tests. AI isn\u2019t a buzzword for me \u2014 I ship it.", tags: ["AI/ML", "LLM"] },
            { name: "System Design", rarity: "epic", power: 86, cost: 7, icon: "\u{1F3D7}\uFE0F", desc: "I\u2019ve architected platforms serving 200M+ users at Ola. I know what breaks at scale and how to prevent it.", tags: ["Architecture", "Scale"] },
            { name: "Voice AI", rarity: "rare", power: 80, cost: 6, icon: "\u{1F399}\uFE0F", desc: "I built voice AI from scratch \u2014 ASR model training, quality audits, and dialog systems that handle real customer conversations.", tags: ["Voice", "NLU"] },
            { name: "Data Alchemy", rarity: "rare", power: 76, cost: 5, icon: "\u{1F52C}", desc: "I built deep reporting and feedback systems at Ola Electric. I understand how data is created, not just what it says.", tags: ["Analytics", "Data"] },
        ],
        process: [
            { name: "Zero to One", rarity: "legendary", power: 94, cost: 8, icon: "\u26A1", desc: "2X founder. I took MeetByTravel from idea to GoI-funded company with 20+ employees in 18 months. I know how to build from nothing.", tags: ["Startup", "0-to-1"] },
            { name: "Sprint Master", rarity: "epic", power: 84, cost: 5, icon: "\u{1F3C3}", desc: "I run sprint cycles that ship fast without burning teams. At DriveX I shipped a full marketplace platform in record time.", tags: ["Agile", "Delivery"] },
            { name: "Scale Playbook", rarity: "epic", power: 82, cost: 6, icon: "\u{1F4C8}", desc: "I\u2019ve scaled products from 0 to 1 and 1 to 100. At Simplilearn I helped build communication engines powering millions of learners.", tags: ["Scaling", "Ops"] },
            { name: "Automation Mind", rarity: "rare", power: 74, cost: 4, icon: "\u2699\uFE0F", desc: "I saved $1M+ across products through process automation \u2014 no-code tools, integrations, and workflow optimization that eliminate waste.", tags: ["Automation", "Efficiency"] },
        ],
        psychology: [
            { name: "Empathy Shield", rarity: "legendary", power: 93, cost: 7, icon: "\u{1F49C}", desc: "People over profit \u2014 even in dreams. I built a team from 0 to 20+ by understanding each person\u2019s life and aligning their goals with the mission.", tags: ["Leadership", "EQ"] },
            { name: "Gamification", rarity: "epic", power: 87, cost: 6, icon: "\u{1F3AE}", desc: "This entire website is gamified \u2014 I designed it using behavioral psychology. XP bars, achievements, fog-of-war. I turn products into experiences.", tags: ["Engagement", "UX"] },
            { name: "Team Forge", rarity: "epic", power: 85, cost: 7, icon: "\u{1F91D}", desc: "I\u2019ve led 25+ people teams. I don\u2019t manage \u2014 I lead. Culture-first, outcome-driven. My teams ship because they believe in the vision.", tags: ["Teams", "Culture"] },
            { name: "User Whisperer", rarity: "rare", power: 79, cost: 5, icon: "\u{1F9E0}", desc: "I\u2019m a Psychology student who applies cognitive biases and behavioral science to product design. Every interaction I craft is intentional.", tags: ["Research", "Behavior"] },
        ],
    },
};

// ── SUBSCRIBE / NEWSLETTER ────────────────
// To enable: Deploy a Google Apps Script as web app that writes to a Google Sheet.
// Paste the deployment URL below. See: https://developers.google.com/apps-script/guides/web
CONTENT.subscribe = {
    tag: "GUILD RECRUITMENT",
    title: "JOIN THE QUEST LOG",
    desc: "Get dispatches from the field \u2014 product insights, AI experiments, and founder war stories. No spam, just signal.",
    placeholder: "your.email@realm.com",
    buttonText: "ENLIST NOW",
    successMsg: "Welcome to the guild, adventurer!",
    errorMsg: "Spell failed! Try again.",
    url: "", // Google Apps Script web app URL
};

window.CONTENT = CONTENT;
