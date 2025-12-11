export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Jenkins",
            role: "University Student",
            avatar: "SJ",
            rating: 5,
            text: "I use this tool daily to convert my handwritten lecture notes into digital text. The accuracy of this image to text converter is incredible!",
        },
        {
            name: "David Chen",
            role: "Software Engineer",
            avatar: "DC",
            rating: 5,
            text: "As a developer, I need to grab text from screenshots often. This pic to text tool respects formatting better than any paid software.",
        },
        {
            name: "Maria Rodriguez",
            role: "Translator & Writer",
            avatar: "MR",
            rating: 5,
            text: "The multilingual support is a lifesaver. It automatically detects languages when I transform picture to text for my translation work.",
        },
    ];

    const StarRating = ({ rating }: { rating: number }) => (
        <div className="testimonial-stars" style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={i < rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ color: "var(--primary)" }}
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ))}
        </div>
    );

    return (
        <section
            className="section"
            style={{ background: "white", borderTop: "1px solid var(--border)" }}
        >
            <div className="container">
                <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                    <span
                        style={{
                            display: "inline-block",
                            color: "var(--primary)",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            marginBottom: "0.75rem",
                        }}
                    >
                        TESTIMONIALS
                    </span>
                    <h2
                        style={{
                            fontSize: "2.25rem",
                            fontWeight: 800,
                            color: "#1e293b",
                            letterSpacing: "-0.025em"
                        }}
                    >
                        Trusted by thousands worldwide
                    </h2>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="card"
                            style={{
                                padding: "2rem",
                                border: "1px solid #e2e8f0",
                                background: "white",
                                borderRadius: "1rem",
                                boxShadow: "none" // Clean look as per typical modern minimal design, or we can add a subtle one if needed. Reference usually clean.
                            }}
                        >
                            <StarRating rating={testimonial.rating} />
                            <p
                                style={{
                                    fontSize: "1rem",
                                    lineHeight: "1.6",
                                    marginBottom: "1.5rem",
                                    fontStyle: "italic",
                                    color: "#475569",
                                }}
                            >
                                &ldquo;{testimonial.text}&rdquo;
                            </p>
                            <div className="testimonial-author" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div
                                    style={{
                                        width: "48px",
                                        height: "48px",
                                        borderRadius: "50%",
                                        background: "#e0e7ff", // primary-light
                                        color: "#4f46e5", // primary
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                    }}
                                >
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div
                                        style={{
                                            fontWeight: 700,
                                            color: "#1e293b",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {testimonial.name}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "0.875rem",
                                            color: "#64748b",
                                        }}
                                    >
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
