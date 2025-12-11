import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" style={{ background: "white", color: "var(--text-primary)", borderTop: "1px solid var(--border)", padding: "4rem 0 2rem" }}>
            <div className="container">
                <div className="footer-content" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "4rem" }}>
                    {/* Column 1: Brand */}
                    <div style={{ maxWidth: "300px" }}>
                        <Link href="/" className="footer-logo" style={{ color: "var(--text-primary)", marginBottom: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "1.25rem", fontWeight: "700" }}>
                            ImageToText.net
                        </Link>
                        <p style={{ fontSize: "0.9375rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
                            The ultimate <strong>Image to Text Converter</strong>. Instantly transform picture to text, convert JPG to Word, and OCR text recognition with high accuracy.
                        </p>
                    </div>

                    {/* Column 2: Legal */}
                    <div>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5rem", color: "var(--text-primary)" }}>LEGAL</h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <li>
                                <Link href="/privacy-policy" style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", textDecoration: "none" }}>Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms" style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", textDecoration: "none" }}>Terms of Service</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1.5rem", color: "var(--text-primary)" }}>SUPPORT</h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <li>
                                <Link href="/contact" style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", textDecoration: "none" }}>Contact Us</Link>
                            </li>
                            <li>
                                <Link href="/about" style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", textDecoration: "none" }}>About Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Links/Social (Placeholder for now as per screenshot layout which has 3 main text cols + bottom row) */}
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                        © {currentYear} ImageToText.net. All rights reserved.
                    </p>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        {/* Social placeholder icons to match screenshot layout */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text-muted)", cursor: "pointer" }}>
                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text-muted)", cursor: "pointer" }}>
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text-muted)", cursor: "pointer" }}>
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </div>
                </div>
            </div>
        </footer>
    );
}
