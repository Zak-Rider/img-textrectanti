"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="section" style={{ background: "transparent" }}>
            <div className="container">
                <div
                    style={{
                        background: "#eff6ff",
                        borderRadius: "1.5rem",
                        padding: "3rem 2rem",
                        maxWidth: "1000px",
                        margin: "0 auto",
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "2.5rem",
                            fontSize: "2rem",
                            fontWeight: 800,
                            color: "#0f172a",
                        }}
                    >
                        Frequently Asked Questions
                    </h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="faq-item"
                                style={{
                                    background: "white",
                                    border: "none",
                                    borderRadius: "0.75rem",
                                    overflow: "hidden",
                                }}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={openIndex === index}
                                    style={{
                                        padding: "1.25rem 1.5rem",
                                        color: "#1e293b",
                                        fontWeight: 700,
                                        fontSize: "1.125rem",
                                    }}
                                >
                                    <span>{faq.question}</span>
                                    <svg
                                        className={`faq-icon ${openIndex === index ? "open" : ""}`}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ color: "#4f46e5" }}
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                {openIndex === index && (
                                    <div
                                        className="faq-answer animate-fade-in"
                                        style={{
                                            padding: "0 1.5rem 1.5rem",
                                            color: "#475569",
                                            fontSize: "0.95rem",
                                            lineHeight: "1.6",
                                            borderTop: "none",
                                        }}
                                    >
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
