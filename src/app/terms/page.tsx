import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - ImageToText.net",
    description:
        "Read the terms of service for using ImageToText.net, your free image to text converter. Understand your rights and responsibilities.",
    alternates: {
        canonical: "https://imagetotext.net/terms",
    },
};

export default function TermsPage() {
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1>Terms of Service</h1>
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
                        <h2>Agreement to Terms</h2>
                        <p>
                            By accessing or using ImageToText.net (&quot;the Service&quot;), you
                            agree to be bound by these Terms of Service. If you disagree with any
                            part of these terms, you may not access the Service.
                        </p>

                        <h2>Description of Service</h2>
                        <p>
                            ImageToText.net provides a free online <strong>image to text
                                converter</strong> tool that uses OCR (Optical Character Recognition)
                            technology to extract text from images. The Service processes images
                            entirely within your web browser, ensuring privacy and security.
                        </p>

                        <h2>Use of Service</h2>
                        <h3>Permitted Uses</h3>
                        <p>You may use our Service to:</p>
                        <ul>
                            <li>Convert images containing text to editable digital text</li>
                            <li>Extract text from photographs, screenshots, and scanned documents</li>
                            <li>Process images in any of the supported languages</li>
                            <li>Download or copy the extracted text for personal or commercial use</li>
                        </ul>

                        <h3>Prohibited Uses</h3>
                        <p>You agree not to use the Service to:</p>
                        <ul>
                            <li>Process illegal content or content that infringes on others&apos; rights</li>
                            <li>Attempt to reverse engineer, decompile, or hack the Service</li>
                            <li>Use automated scripts to overload or abuse the Service</li>
                            <li>Interfere with other users&apos; access to the Service</li>
                            <li>Violate any applicable laws or regulations</li>
                        </ul>

                        <h2>Intellectual Property</h2>
                        <h3>Our Content</h3>
                        <p>
                            The Service, including its design, features, and content created by
                            ImageToText.net, is protected by copyright, trademark, and other
                            intellectual property laws. You may not copy, modify, or distribute our
                            content without written permission.
                        </p>

                        <h3>Your Content</h3>
                        <p>
                            You retain all rights to the images you process through our Service. We
                            do not claim any ownership of your content. Since processing occurs
                            locally in your browser, we never have access to or store your images.
                        </p>

                        <h2>Accuracy and Reliability</h2>
                        <p>
                            While we strive for high accuracy in text extraction, OCR technology has
                            limitations. Results may vary depending on image quality, font types,
                            languages, and other factors. We recommend reviewing extracted text for
                            accuracy before using it for critical purposes.
                        </p>

                        <h2>Disclaimer of Warranties</h2>
                        <p>
                            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
                            WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT GUARANTEE
                            THAT:
                        </p>
                        <ul>
                            <li>The Service will be uninterrupted or error-free</li>
                            <li>The results will be 100% accurate</li>
                            <li>The Service will meet your specific requirements</li>
                        </ul>

                        <h2>Limitation of Liability</h2>
                        <p>
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IMAGETOTEXT.NET SHALL NOT BE
                            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
                            DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE,
                            ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
                        </p>

                        <h2>Indemnification</h2>
                        <p>
                            You agree to indemnify and hold harmless ImageToText.net and its
                            affiliates from any claims, damages, losses, or expenses arising from
                            your use of the Service or violation of these Terms.
                        </p>

                        <h2>Third-Party Links</h2>
                        <p>
                            The Service may contain links to third-party websites. We are not
                            responsible for the content or practices of these websites. Your use of
                            third-party sites is at your own risk.
                        </p>

                        <h2>Modifications to Service</h2>
                        <p>
                            We reserve the right to modify, suspend, or discontinue the Service at
                            any time without notice. We may also update these Terms of Service
                            periodically. Continued use of the Service after changes constitutes
                            acceptance of the new terms.
                        </p>

                        <h2>Governing Law</h2>
                        <p>
                            These Terms shall be governed by and construed in accordance with
                            applicable laws, without regard to conflict of law principles.
                        </p>

                        <h2>Severability</h2>
                        <p>
                            If any provision of these Terms is found to be unenforceable, the
                            remaining provisions will remain in full force and effect.
                        </p>

                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact
                            us at <a href="mailto:mail@imagetotext.net">mail@imagetotext.net</a>.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
