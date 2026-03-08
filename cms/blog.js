/* ============================================
   BLOG CONTENT MODULE
   ============================================
   Add blog posts here. The blog engine (blog.js)
   reads from this file and renders automatically.
   ============================================ */

const BLOG_POSTS = [
    {
        slug: "building-voice-ai-that-passes-turing-test",
        title: "Building a Voice AI That Passes the Turing Test",
        date: "2024-01-15",
        category: "AI/ML",
        tags: ["Voice AI", "ASR", "Hinglish", "Product"],
        readTime: "8 min",
        excerpt: "How we built India's first Hinglish ASR model at SquadStack that passed the Turing test, and the product decisions that made it possible.",
        coverEmoji: "\u{1F399}\uFE0F",
        body: `
## The Challenge

When I joined SquadStack, the telecalling platform relied entirely on human agents. The vision was bold: build an AI that could replace human callers — but not just in English. It had to work in Hinglish, the chaotic, beautiful mix of Hindi and English that 500M+ Indians speak daily.

## The Technical Approach

We started with existing ASR models and quickly realized none could handle code-switching (jumping between Hindi and English mid-sentence). Our approach:

1. **Custom training data** — We recorded 10,000+ hours of real telecalling conversations
2. **Hybrid architecture** — Combined transformer-based models with language-specific tokenizers
3. **Context-aware switching** — The model learned when speakers switch languages based on topic
4. **Prosody matching** — Not just words, but tone, pace, and emotion

## The Product Decisions

Technical excellence alone doesn't ship products. Here's what mattered:

- **Start with low-stakes calls** — Lead qualification, not sales closing
- **Human-in-the-loop** — AI handles 80%, escalates 20% to humans
- **Feedback loops** — Every failed call trained the next model version
- **Gradual rollout** — 5% → 25% → 50% → 90% over 6 months

## Results

- Passed the Turing test: customers couldn't distinguish AI from human
- $200K new revenue in first quarter
- 45% conversion increase on qualified leads
- $5M+ ARR via PLG adoption

## Lessons Learned

The biggest lesson: **the product wrapper matters more than the model**. A 90% accurate model with great UX beats a 99% accurate model with poor UX every time.
        `,
    },
    {
        slug: "zero-to-profitable-startup-playbook",
        title: "The 0-to-Profitable Startup Playbook",
        date: "2023-09-20",
        category: "Entrepreneurship",
        tags: ["Startup", "Greengears", "Government", "Growth"],
        readTime: "12 min",
        excerpt: "Lessons from building Greengears Agrotech from zero to profitability with government funding, and why most founders get the order of operations wrong.",
        coverEmoji: "\u{1F331}",
        body: `
## Starting with a Problem, Not a Solution

Most founders build a solution and then look for a problem. At Greengears, we started in the fields — literally. We spent 3 months talking to farmers in Andhra Pradesh before writing a single line of code.

## The Government Funding Path

Getting pre-seed funding from the Government of India and Andhra Pradesh state taught me something counterintuitive: **government funding is underrated for early-stage startups**.

### Why it works:
- **Non-dilutive** — You keep 100% equity
- **Validation signal** — Government approval = institutional credibility
- **Patient capital** — No quarterly pressure from VCs
- **Network effects** — Access to government databases, programs, partnerships

## The 7-Product Strategy

Instead of one product, we built 7 interconnected products:
1. Farmer marketplace
2. Crop advisory platform
3. Supply chain tracker
4. Quality grading tool
5. Financial services bridge
6. Training portal
7. Government scheme aggregator

Each product fed data to the others. The network effects compounded.

## Scaling to 10L+ MRR

Our ABC-based pricing strategy (Activity-Based Costing) was key:
- **Free tier** — Basic crop advisory (user acquisition)
- **Transactional** — Per-sale marketplace fee (revenue)
- **Subscription** — Premium analytics (retention + margin)

## The NITI Aayog Recognition

Being selected in the Top 30 Social Innovators by NITI Aayog and UNDP Youth CoLab was a turning point. It opened doors to enterprise contracts and state-level partnerships.

## Key Takeaways

1. **Revenue first, funding second** — We were profitable before seeking external capital
2. **Build for the ecosystem, not just the user** — Our 7-product strategy created lock-in
3. **Government is a feature, not a bug** — Learn to navigate bureaucracy as a competitive advantage
4. **Measure impact, not just metrics** — Our 30L R&D grant came because we showed farmer income improvement, not just GMV
        `,
    },
    {
        slug: "product-strategy-at-200m-user-scale",
        title: "Product Strategy at 200M+ User Scale",
        date: "2024-06-10",
        category: "Product",
        tags: ["Product Strategy", "Scale", "Ola", "DriveX"],
        readTime: "10 min",
        excerpt: "What changes when your product decisions affect 200 million users? Everything. Here's what I learned leading products at Ola and DriveX.",
        coverEmoji: "\u{1F4CA}",
        body: `
## The Weight of Scale

At 200M+ users, every decision has outsized consequences. A 0.1% conversion improvement is 200,000 users. A 100ms latency increase costs millions in engagement.

## Ola OS 2.0: The War Room

When Ola launched OS 2.0, 20,000 issues flooded in within one week. I led the war room:

### The Triage System
- **P0** — App crashes, payment failures → Fix within 4 hours
- **P1** — Major UX breaks → Fix within 24 hours
- **P2** — Minor issues → Sprint backlog
- **P3** — Enhancement requests → Product roadmap

### The Clustering Approach
Instead of fixing 20,000 issues individually, we clustered them:
- 60% were variants of 15 root causes
- Fixing those 15 issues resolved 12,000+ tickets
- RCA + ICA framework: Root Cause Analysis → Immediate Corrective Action

## DriveX: The Attribution Revolution

At DriveX, digital attribution was at 35%. That means 65% of revenue couldn't be traced to its source. My team built:

1. **Full-funnel tracking** — Every touchpoint from first click to purchase
2. **Multi-touch attribution** — Credit distributed across the journey
3. **Incremental lift testing** — A/B tests at the campaign level

Result: Attribution went from 35% to 90%. CAC reduced 75%.

## Lessons at Scale

1. **Data > intuition** — At scale, your gut is wrong more often than right
2. **Speed of iteration > perfection** — Ship fast, measure, iterate
3. **Platform thinking** — Build for the ecosystem, not individual features
4. **Team leverage** — Your impact is your team's output, not your individual work
        `,
    },
];

// Make it accessible
window.BLOG_POSTS = BLOG_POSTS;
