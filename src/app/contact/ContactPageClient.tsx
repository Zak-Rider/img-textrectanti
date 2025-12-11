"use client";

import { useState, FormEvent } from "react";

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormState {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
}

export default function ContactPageClient() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });

    const [formState, setFormState] = useState<FormState>({
        isSubmitting: false,
        isSuccess: false,
        error: null,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = (): string | null => {
        if (!formData.name.trim()) {
            return "Please enter your name.";
        }
        if (!formData.email.trim()) {
            return "Please enter your email address.";
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return "Please enter a valid email address.";
        }
        if (!formData.message.trim()) {
            return "Please enter your message.";
        }
        if (formData.message.trim().length < 10) {
            return "Message must be at least 10 characters long.";
        }
        return null;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate
        const validationError = validateForm();
        if (validationError) {
            setFormState({
                isSubmitting: false,
                isSuccess: false,
                error: validationError,
            });
            return;
        }

        setFormState({
            isSubmitting: true,
            isSuccess: false,
            error: null,
        });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            setFormState({
                isSubmitting: false,
                isSuccess: true,
                error: null,
            });

            // Reset form
            setFormData({
                name: "",
                email: "",
                message: "",
            });
        } catch (error) {
            setFormState({
                isSubmitting: false,
                isSuccess: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "An error occurred. Please try again later.",
            });
        }
    };

    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p
                        style={{
                            maxWidth: "600px",
                            margin: "1rem auto 0",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Have questions about our image to text converter? We&apos;re here to
                        help!
                    </p>
                </div>
            </section>

            <section className="page-content">
                <div className="container">
                    <div className="contact-form">
                        <div className="card" style={{ padding: "2rem" }}>
                            {formState.isSuccess ? (
                                <div
                                    className="message message-success"
                                    style={{
                                        padding: "2rem",
                                        textAlign: "center",
                                    }}
                                >
                                    <svg
                                        width="48"
                                        height="48"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{ margin: "0 auto 1rem" }}
                                    >
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    <h3 style={{ color: "var(--success)", marginBottom: "0.5rem" }}>
                                        Message Sent Successfully!
                                    </h3>
                                    <p style={{ margin: 0 }}>
                                        Thank you for contacting us. We&apos;ll get back to you as soon
                                        as possible.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="label" htmlFor="name">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="input"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={formState.isSubmitting}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="label" htmlFor="email">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="input"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={formState.isSubmitting}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="label" htmlFor="message">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="input textarea"
                                            placeholder="How can we help you?"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            disabled={formState.isSubmitting}
                                        />
                                    </div>

                                    {formState.error && (
                                        <div
                                            className="message message-error"
                                            style={{ marginBottom: "1rem" }}
                                        >
                                            {formState.error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{ width: "100%" }}
                                        disabled={formState.isSubmitting}
                                    >
                                        {formState.isSubmitting ? (
                                            <>
                                                <span
                                                    className="loading-spinner"
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        borderWidth: "2px",
                                                    }}
                                                />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <line x1="22" y1="2" x2="11" y2="13" />
                                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                                </svg>
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        <div
                            style={{
                                marginTop: "2rem",
                                textAlign: "center",
                                color: "var(--text-secondary)",
                            }}
                        >
                            <p>
                                You can also reach us directly at{" "}
                                <a
                                    href="mailto:mail@imagetotext.net"
                                    style={{ color: "var(--primary)" }}
                                >
                                    mail@imagetotext.net
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
