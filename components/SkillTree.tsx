import { addPropertyControls, ControlType } from "framer"
import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"

/**
 * RPG Skill Tree
 * Behavioral: Collection mechanic — skills "unlock" on scroll
 * Cognitive: Authority bias — visual mastery levels build credibility
 * Color Psychology: Lime bars = growth/mastery, grays = progression
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */

interface Skill {
    name: string
    level: number
    icon: string
}

const SKILLS: Skill[] = [
    { name: "Product Strategy", level: 95, icon: "\u{1F3AF}" },
    { name: "AI & Automation", level: 90, icon: "\u{1F916}" },
    { name: "Tech Leadership", level: 88, icon: "\u{26A1}" },
    { name: "Entrepreneurship", level: 85, icon: "\u{1F680}" },
    { name: "Investment Banking", level: 84, icon: "\u{1F4C8}" },
    { name: "Fraud Detection", level: 82, icon: "\u{1F6E1}" },
    { name: "Demand Forecasting", level: 80, icon: "\u{1F4CA}" },
    { name: "Finance & Analytics", level: 78, icon: "\u{1F4B9}" },
    { name: "Supply Chain Mgmt", level: 76, icon: "\u{1F4E6}" },
    { name: "Machine Learning", level: 75, icon: "\u{1F9E0}" },
    { name: "Blockchain", level: 72, icon: "\u{1F517}" },
    { name: "Algorithmic Trading", level: 70, icon: "\u{1F4D0}" },
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

function SkillBar({ skill, index, isMobile }: { skill: Skill; index: number; isMobile: boolean }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-40px" })

    const getBarColor = (level: number): string => {
        if (level >= 90) return "#E4FF1A"
        if (level >= 80) return "#A8FF00"
        if (level >= 70) return "#4ADE80"
        return "#22D3EE"
    }

    const getRank = (level: number): string => {
        if (level >= 90) return "LEGENDARY"
        if (level >= 80) return "EPIC"
        if (level >= 70) return "RARE"
        return "COMMON"
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 12 : 16,
                padding: isMobile ? "12px 16px" : "16px 20px",
                borderRadius: 12,
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                cursor: "default",
            }}
            whileHover={{
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: "rgba(228,255,26,0.15)",
                x: 4,
            }}
        >
            <div
                style={{
                    fontSize: isMobile ? 16 : 20,
                    width: isMobile ? 32 : 40,
                    height: isMobile ? 32 : 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: isMobile ? 8 : 10,
                    backgroundColor: "rgba(255,255,255,0.04)",
                    flexShrink: 0,
                }}
            >
                {skill.icon}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: isMobile ? 12 : 14, fontWeight: 600, color: "#fff", fontFamily: "Inter, sans-serif" }}>
                        {skill.name}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {!isMobile && (
                            <span
                                style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: getBarColor(skill.level),
                                    letterSpacing: "0.08em",
                                    padding: "2px 8px",
                                    borderRadius: 4,
                                    backgroundColor: `${getBarColor(skill.level)}15`,
                                }}
                            >
                                {getRank(skill.level)}
                            </span>
                        )}
                        <span style={{ fontSize: 13, fontWeight: 700, color: getBarColor(skill.level), fontFamily: "Inter, sans-serif" }}>
                            {skill.level}
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        width: "100%",
                        height: 6,
                        borderRadius: 100,
                        backgroundColor: "rgba(255,255,255,0.06)",
                        overflow: "hidden",
                    }}
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            height: "100%",
                            borderRadius: 100,
                            background: `linear-gradient(90deg, ${getBarColor(skill.level)}88, ${getBarColor(skill.level)})`,
                            boxShadow: `0 0 12px ${getBarColor(skill.level)}40`,
                        }}
                    />
                </div>
            </div>
        </motion.div>
    )
}

export default function SkillTree(props: { accentColor: string; bgColor: string }) {
    const { accentColor = "#E4FF1A", bgColor = "#141414" } = props
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })
    const width = useWindowWidth()
    const isMobile = width < 768
    const isSmall = width < 480

    const totalXP = SKILLS.reduce((a, b) => a + b.level * 100, 0)

    return (
        <div
            ref={ref}
            data-section="skill-tree"
            style={{
                width: "100%",
                height: "100%",
                padding: isSmall ? "48px 16px" : isMobile ? "64px 20px" : "100px 80px",
                backgroundColor: bgColor,
                fontFamily: "Inter, system-ui, sans-serif",
                borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            <div style={{
                display: "flex",
                flexDirection: isMobile ? "column" as const : "row" as const,
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "flex-end",
                marginBottom: isMobile ? 40 : 60,
                gap: 24,
            }}>
                <div>
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
                        SKILL TREE
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
                        Abilities Unlocked.
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 }}
                    style={{
                        textAlign: isMobile ? "left" as const : "right" as const,
                        padding: "16px 24px",
                        borderRadius: 12,
                        backgroundColor: "rgba(228,255,26,0.05)",
                        border: "1px solid rgba(228,255,26,0.12)",
                    }}
                >
                    <div style={{ fontSize: isSmall ? 24 : 28, fontWeight: 800, color: accentColor, letterSpacing: "-0.02em" }}>
                        {totalXP.toLocaleString()}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
                        TOTAL XP EARNED
                    </div>
                </motion.div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
                {SKILLS.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={i} isMobile={isMobile} />
                ))}
            </div>
        </div>
    )
}

addPropertyControls(SkillTree, {
    accentColor: { type: ControlType.Color, title: "Accent", defaultValue: "#E4FF1A" },
    bgColor: { type: ControlType.Color, title: "Background", defaultValue: "#141414" },
})
