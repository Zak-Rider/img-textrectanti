export default function WhyChooseUs() {
    const features = [
        {
            icon: (
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
            ),
            title: "Pic to Text in Seconds",
            description:
                "Powered by advanced AI to deliver results fast. Convert JPG to Word accurately while preserving the original layout structure.",
        },
        {
            icon: (
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 3v13h6" />
                    <path d="M22 21h-7" />
                    <path d="M10 21l3-11" />
                    <path d="M2 15h10" />
                    <path d="M15 15l1.5-6" />
                    <path d="M18 10l1.5 6" />
                </svg>
            ),
            title: "Multilingual OCR",
            description:
                "Automatic language detection for English, Spanish, French, Chinese, Japanese, Arabic, Russian, Hindi. The ultimate image to word converter for global users.",
        },
        {
            icon: (
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
            ),
            title: "Secure & Private",
            description:
                "We value your privacy. Your files are processed in real-time and are never stored on our servers. The connection is encrypted with SSL.",
        },
    ];

    return (
        <section className="section" style={{ background: "white" }}>
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <span
                        style={{
                            display: "inline-block",
                            padding: "0.5rem 1rem",
                            color: "var(--primary)",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            marginBottom: "1rem",
                        }}
                    >
                        WHY CHOOSE US?
                    </span>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)", marginBottom: "1.5rem" }}>
                        Best Free Online Image to Text Converter
                    </h2>
                    <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.125rem", color: "var(--text-secondary)" }}>
                        ImageToText.net is the leading solution for converting images to editable text.
                        Whether it&apos;s a scanned document, a screenshot, or a photo of a whiteboard,
                        our AI detects and extracts text instantly.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {features.map((feature, index) => (
                        <div key={index} className="card feature-card card-hover" style={{
                            border: "none",
                            boxShadow: "none",
                            textAlign: "left",
                            padding: "0",
                            background: "transparent"
                        }}>
                            <div className="feature-icon" style={{
                                width: "64px",
                                height: "64px",
                                background: "var(--primary-light)",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--primary)",
                                marginBottom: "1.5rem",
                                margin: "0 0 1.5rem 0"
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: 700 }}>
                                {feature.title}
                            </h3>
                            <p style={{ fontSize: "1rem", margin: 0, lineHeight: "1.6" }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
