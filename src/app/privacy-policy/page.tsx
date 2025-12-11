import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - ImageToText.net",
    description:
        "Read our privacy policy to understand how ImageToText.net handles your data. We prioritize your privacy with client-side processing.",
    alternates: {
        canonical: "https://imagetotext.net/privacy-policy",
    },
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p
                        style={{
                            maxWidth: "600px",
                            margin: "1rem auto 0",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Last updated: December 2024
                    </p>
                </div>
            </section>

            <section className="page-content">
                <div className="container">
                    <div className="prose">
                        <h2>Introduction</h2>
                        <p>
                            At ImageToText.net, we take your privacy seriously. This Privacy Policy
                            explains how we collect, use, and protect your information when you use
                            our <strong>image to text converter</strong> service.
                        </p>

                        <h2>Data We Collect</h2>
                        <h3>Images You Upload</h3>
                        <p>
                            <strong>We do not collect or store any images you process.</strong> Our
                            OCR (Optical Character Recognition) technology runs entirely in your
                            browser. Your images are never uploaded to our servers. All text
                            extraction happens locally on your device, ensuring complete privacy.
                        </p>

                        <h3>Analytics Data</h3>
                        <p>
                            We use Google Analytics to understand how visitors use our website. This
                            service may collect:
                        </p>
                        <ul>
                            <li>Pages visited and time spent on each page</li>
                            <li>Browser type and device information</li>
                            <li>General geographic location (country/city level)</li>
                            <li>Referring website or search terms</li>
                        </ul>
                        <p>
                            This data is anonymized and used solely to improve our service. We do not
                            sell or share this information with third parties for marketing purposes.
                        </p>

                        <h3>Contact Form Submissions</h3>
                        <p>
                            When you contact us through our contact form, we collect the information
                            you provide, including your name, email address, and message. This
                            information is used solely to respond to your inquiry and is not shared
                            with third parties.
                        </p>

                        <h2>Cookies</h2>
                        <p>
                            We use minimal cookies necessary for the operation of our website:
                        </p>
                        <ul>
                            <li>
                                <strong>Essential Cookies:</strong> Required for basic website
                                functionality.
                            </li>
                            <li>
                                <strong>Analytics Cookies:</strong> Used by Google Analytics to
                                understand website usage patterns.
                            </li>
                        </ul>
                        <p>
                            You can disable cookies through your browser settings, though this may
                            affect some website functionality.
                        </p>

                        <h2>Third-Party Services</h2>
                        <h3>Google Analytics</h3>
                        <p>
                            We use Google Analytics to analyze website traffic. Google Analytics uses
                            cookies to collect anonymous information about how visitors use our site.
                            For more information, please review{" "}
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Google&apos;s Privacy Policy
                            </a>
                            .
                        </p>

                        <h3>Tesseract.js</h3>
                        <p>
                            Our OCR functionality is powered by Tesseract.js, an open-source library
                            that runs in your browser. It may download language data files from CDN
                            servers to enable text recognition in different languages. No image data
                            is sent to these servers.
                        </p>

                        <h2>Data Security</h2>
                        <p>
                            We implement appropriate security measures to protect against unauthorized
                            access, alteration, disclosure, or destruction of data. Since image
                            processing occurs client-side, your images never leave your device,
                            providing the highest level of privacy protection.
                        </p>

                        <h2>Children&apos;s Privacy</h2>
                        <p>
                            Our service is not directed at children under 13. We do not knowingly
                            collect personal information from children under 13. If you believe we
                            have collected information from a child under 13, please contact us
                            immediately.
                        </p>

                        <h2>Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access any personal data we hold about you</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt out of analytics tracking</li>
                        </ul>

                        <h2>Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you
                            of any changes by posting the new Privacy Policy on this page and
                            updating the &quot;Last updated&quot; date.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at{" "}
                            <a href="mailto:mail@imagetotext.net">mail@imagetotext.net</a>.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
