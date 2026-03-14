import { addPropertyControls, ControlType } from "framer"
import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"

/**
 * CTA + Footer — Final boss encounter
 * Behavioral: Reciprocity — after showing value, ask for connection
 * Cognitive: Commitment bias — user scrolled this far, likely to act
 *
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */

function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handler)
        return () => window.removeEventListener("resize", handler)
    }, [])
    return width
}

export default function CTAFooter(props: {
    accentColor: string
    bgColor: string
    email: string
    linkedIn: string
}) {
    const {
        accentColor = "#E4FF1A",
        bgColor = "#0A0A0A",
        email = "manikumarjami@gmail.com",
        linkedIn = "https://linkedin.com/in/manikumarjami",
    } = props
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })
    const width = useWindowWidth()
    const isMobile = width < 768
    const isSmall = width < 480

    const links = [
        { label: "LinkedIn", url: linkedIn },
        { label: "Medium", url: "https://medium.com/@manikumarjami" },
        { label: "Meetbytravel", url: "https://meetbytravel.com" },
    ]

    return (
        <div
            ref={ref}
            data-section="contact"
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: bgColor,
                fontFamily: "Inter, system-ui, sans-serif",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                flexDirection: "column" as const,
            }}
        >
            {/* CTA Section */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column" as const,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: isSmall ? "48px 16px" : isMobile ? "64px 20px" : "120px 80px",
                    textAlign: "center" as const,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Background glow */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "-20%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: isMobile ? 400 : 800,
                        height: isMobile ? 200 : 400,
                        borderRadius: "50%",
                        background: `radial-gradient(ellipse, ${accentColor}06 0%, transparent 70%)`,
                        pointerEvents: "none",
                    }}
                />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: accentColor,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase" as const,
                        marginBottom: 24,
                    }}
                >
                    FINAL QUEST
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1, duration: 0.7 }}
                    style={{
                        fontSize: isSmall ? 30 : isMobile ? 36 : 56,
                        fontWeight: 700,
                        color: "#fff",
                        margin: "0 0 20px 0",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        maxWidth: 600,
                    }}
                >
                    Let's build something legendary.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontSize: isMobile ? 15 : 18,
                        lineHeight: 1.6,
                        color: "rgba(255,255,255,0.5)",
                        margin: "0 0 40px 0",
                        maxWidth: 480,
                    }}
                >
                    Product challenge, startup idea, or just want to connect — the next quest starts with a conversation.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    style={{
                        display: "flex",
                        flexDirection: isMobile ? "column" as const : "row" as const,
                        gap: 16,
                        width: isMobile ? "100%" : "auto",
                        alignItems: "center",
                    }}
                >
                    <a
                        href={`mailto:${email}`}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            padding: "16px 36px",
                            borderRadius: 100,
                            backgroundColor: accentColor,
                            color: "#0A0A0A",
                            fontSize: 15,
                            fontWeight: 600,
                            textDecoration: "none",
                            transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
                            fontFamily: "Inter, sans-serif",
                            width: isMobile ? "100%" : "auto",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)"
                            e.currentTarget.style.boxShadow = `0 8px 30px ${accentColor}40, 0 0 60px ${accentColor}10`
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)"
                            e.currentTarget.style.boxShadow = "none"
                        }}
                    >
                        Say Hello
                    </a>
                    <a
                        href={linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            padding: "16px 36px",
                            borderRadius: 100,
                            backgroundColor: "transparent",
                            color: "#fff",
                            fontSize: 15,
                            fontWeight: 500,
                            textDecoration: "none",
                            border: "1px solid rgba(255,255,255,0.12)",
                            transition: "border-color 0.2s, background-color 0.2s, transform 0.3s",
                            fontFamily: "Inter, sans-serif",
                            width: isMobile ? "100%" : "auto",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"
                            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"
                            e.currentTarget.style.transform = "translateY(-3px)"
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"
                            e.currentTarget.style.backgroundColor = "transparent"
                            e.currentTarget.style.transform = "translateY(0)"
                        }}
                    >
                        LinkedIn
                    </a>
                </motion.div>
            </div>

            {/* Footer */}
            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" as const : "row" as const,
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: isMobile ? "24px 20px" : "24px 80px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    gap: isMobile ? 16 : 0,
                    textAlign: isMobile ? "center" as const : "left" as const,
                }}
            >
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontFamily: "Inter, sans-serif" }}>
                    &copy; 2026 Mani Kumar Jami
                </span>
                <div style={{ display: "flex", gap: isMobile ? 20 : 32 }}>
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontSize: 13,
                                color: "rgba(255,255,255,0.4)",
                                textDecoration: "none",
                                transition: "color 0.2s",
                                fontFamily: "Inter, sans-serif",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

addPropertyControls(CTAFooter, {
    accentColor: { type: ControlType.Color, title: "Accent", defaultValue: "#E4FF1A" },
    bgColor: { type: ControlType.Color, title: "Background", defaultValue: "#0A0A0A" },
    email: { type: ControlType.String, title: "Email", defaultValue: "manikumarjami@gmail.com" },
    linkedIn: { type: ControlType.String, title: "LinkedIn", defaultValue: "https://linkedin.com/in/manikumarjami" },
})
