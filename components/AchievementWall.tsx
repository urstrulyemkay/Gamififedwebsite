import { addPropertyControls, ControlType } from "framer"
import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"

/**
 * Achievement Wall — Bento grid of unlockable achievements
 * Behavioral: Endowment effect — achievements feel "earned"
 * Cognitive: Social proof + Authority bias via certs/awards
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */

interface Achievement {
    title: string
    subtitle: string
    icon: string
    size: "large" | "medium" | "small"
    color: string
}

const ACHIEVEMENTS: Achievement[] = [
    {
        title: "2X Founder",
        subtitle: "Built & scaled two startups. Meetbytravel — 0 to profitability in 18 months.",
        icon: "\u{1F680}",
        size: "large",
        color: "#E4FF1A",
    },
    {
        title: "MBA \u2014 Xavier Institute",
        subtitle: "Finance, Operations & Marketing. First Class. CRISIL Young Thought Leader.",
        icon: "\u{1F393}",
        size: "medium",
        color: "#A78BFA",
    },
    {
        title: "CFA Level 1",
        subtitle: "CFA certified. CIBOP. NCFM Financial Markets \u2014 Score: 82.",
        icon: "\u{1F4C8}",
        size: "small",
        color: "#22D3EE",
    },
    {
        title: "Youth Co Lab \u2014 Top 30",
        subtitle: "Top 30 Social Innovation Ideas, NITI Aayog recognition.",
        icon: "\u{1F30D}",
        size: "medium",
        color: "#4ADE80",
    },
    {
        title: "GoI Funded",
        subtitle: "Startup funded by the Government of India.",
        icon: "\u{1F3DB}",
        size: "small",
        color: "#F59E0B",
    },
    {
        title: "10+ National Case Competitions",
        subtitle: "Tata Steel-a-Thon Runner Up. Mahindra War Room Silver. V-Guard, GMR Raxa, Infosys Ingenious Finalist.",
        icon: "\u{1F3C6}",
        size: "large",
        color: "#E4FF1A",
    },
    {
        title: "Bloomberg Certified",
        subtitle: "Bloomberg Market Concepts. Campus Rep. Algo Trading & AI/ML certified.",
        icon: "\u{1F4B9}",
        size: "medium",
        color: "#22D3EE",
    },
    {
        title: "Client Delight x4",
        subtitle: "Virtusa's highest client badge, 4 quarters straight. Virtusan of the Day.",
        icon: "\u{2B50}",
        size: "small",
        color: "#E4FF1A",
    },
    {
        title: "HSBC IB \u2014 PPI Holder",
        subtitle: "HSBC Investment Banking Campus Finalist. Pre-Placement Interview holder.",
        icon: "\u{1F3E6}",
        size: "medium",
        color: "#22D3EE",
    },
    {
        title: "5 Languages",
        subtitle: "Telugu, Hindi, English, Tamil, Japanese.",
        icon: "\u{1F5E3}",
        size: "small",
        color: "#F472B6",
    },
    {
        title: "Best Project \u2014 SRM",
        subtitle: "Smart Home Control using Brain Wave Sensor. ZigBee + attention detection.",
        icon: "\u{1F52C}",
        size: "medium",
        color: "#4ADE80",
    },
    {
        title: "Credit Research Challenge",
        subtitle: "Regional Finalist, 2019. Deep credit analysis & financial modeling.",
        icon: "\u{1F4E1}",
        size: "small",
        color: "#A78BFA",
    },
]

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [])
    return width
}

function AchievementCard({ achievement, index, columns }: { achievement: Achievement; index: number; columns: number }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-60px" })

    const isLarge = achievement.size === "large" && columns > 1

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            style={{
                gridColumn: isLarge ? "span 2" : "span 1",
                padding: isLarge ? "36px" : columns === 1 ? "20px" : "28px",
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column" as const,
                gap: columns === 1 ? 12 : 16,
                transition: "border-color 0.3s, box-shadow 0.4s",
            }}
        >
            {/* Glow */}
            <div
                style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${achievement.color}12 0%, transparent 70%)`,
                    pointerEvents: "none",
                }}
            />

            {/* Icon */}
            <motion.div
                animate={isInView ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.08 }}
                style={{
                    fontSize: isLarge ? 36 : columns === 1 ? 24 : 28,
                    width: isLarge ? 64 : columns === 1 ? 44 : 52,
                    height: isLarge ? 64 : columns === 1 ? 44 : 52,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: columns === 1 ? 12 : 16,
                    backgroundColor: `${achievement.color}10`,
                    border: `1px solid ${achievement.color}20`,
                }}
            >
                {achievement.icon}
            </motion.div>

            {/* Text */}
            <div>
                <h3
                    style={{
                        fontSize: isLarge ? 22 : columns === 1 ? 15 : 17,
                        fontWeight: 700,
                        color: "#fff",
                        margin: "0 0 6px 0",
                        letterSpacing: "-0.01em",
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    {achievement.title}
                </h3>
                <p
                    style={{
                        fontSize: columns === 1 ? 12 : 14,
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.5)",
                        margin: 0,
                        fontFamily: "Inter, sans-serif",
                    }}
                >
                    {achievement.subtitle}
                </p>
            </div>

            {/* Unlocked badge */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.08 }}
                style={{
                    position: "absolute",
                    top: columns === 1 ? 14 : 20,
                    right: columns === 1 ? 14 : 20,
                    fontSize: columns === 1 ? 9 : 10,
                    fontWeight: 700,
                    color: achievement.color,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    padding: columns === 1 ? "3px 8px" : "4px 10px",
                    borderRadius: 6,
                    backgroundColor: `${achievement.color}12`,
                    border: `1px solid ${achievement.color}20`,
                    fontFamily: "Inter, sans-serif",
                }}
            >
                UNLOCKED
            </motion.div>
        </motion.div>
    )
}

export default function AchievementWall(props: { accentColor: string; bgColor: string }) {
    const { accentColor = "#E4FF1A", bgColor = "#0A0A0A" } = props
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const width = useWindowWidth()
    const isMobile = width < 768
    const isSmall = width < 480
    const columns = isSmall ? 1 : isMobile ? 1 : width < 1024 ? 2 : 3

    return (
        <div
            ref={ref}
            data-section="achievements"
            style={{
                width: "100%",
                height: "100%",
                padding: isSmall ? "48px 16px" : isMobile ? "64px 20px" : "100px 80px",
                backgroundColor: bgColor,
                fontFamily: "Inter, system-ui, sans-serif",
                borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <div style={{ marginBottom: isMobile ? 40 : 60 }}>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: accentColor,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase" as const,
                        marginBottom: 16,
                    }}
                >
                    ACHIEVEMENT WALL
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    style={{
                        fontSize: isSmall ? 28 : isMobile ? 32 : 48,
                        fontWeight: 700,
                        color: "#fff",
                        margin: 0,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                    }}
                >
                    Trophies Collected.
                </motion.h2>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: columns === 1 ? 12 : 16,
                }}
            >
                {ACHIEVEMENTS.map((ach, i) => (
                    <AchievementCard key={ach.title} achievement={ach} index={i} columns={columns} />
                ))}
            </div>
        </div>
    )
}

addPropertyControls(AchievementWall, {
    accentColor: { type: ControlType.Color, title: "Accent", defaultValue: "#E4FF1A" },
    bgColor: { type: ControlType.Color, title: "Background", defaultValue: "#0A0A0A" },
})
