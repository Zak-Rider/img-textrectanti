import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Advertise With Us - ImageToText.net",
    description:
        "Reach millions of users with advertising on ImageToText.net. Explore partnership opportunities and promote your brand on our popular OCR platform.",
    alternates: {
        canonical: "https://imagetotext.net/advertise",
    },
};

export default function AdvertisePage() {
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1>Advertise With Us</h1>
                    <p
                        style={{
                            maxWidth: "600px",
                            margin: "1rem auto 0",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Partner with ImageToText.net to reach a global audience of
                        professionals, students, and developers
                    </p>
                </div>
            </section>

            <section className="page-content">
                <div className="container">
                    <div className="prose">
                        <h2>Why Advertise on ImageToText.net?</h2>
                        <p>
                            ImageToText.net is one of the leading free <strong>image to text
                                converter</strong> tools on the web. Our platform attracts a diverse,
                            engaged audience looking for productivity and document digitization
                            solutions.
                        </p>

                        <h2>Our Audience</h2>
                        <p>
                            Our users include professionals, students, researchers, developers,
                            and content creators from around the world who actively seek solutions
                            for:
                        </p>
                        <ul>
                            <li>Document digitization and OCR software</li>
                            <li>Productivity and workflow automation tools</li>
                            <li>Education and learning platforms</li>
                            <li>Cloud storage and file management</li>
                            <li>Business and enterprise solutions</li>
                            <li>Developer tools and APIs</li>
                        </ul>

                        <h2>Advertising Options</h2>
                        <p>We offer flexible advertising solutions to meet your marketing goals:</p>

                        <h3>Display Advertising</h3>
                        <p>
                            Premium banner placements across our website, including the homepage,
                            tool pages, and content sections. Available in various sizes and formats.
                        </p>

                        <h3>Sponsored Content</h3>
                        <p>
                            Native content integration that provides value to our audience while
                            promoting your brand. Perfect for thought leadership and product
                            demonstrations.
                        </p>

                        <h3>Newsletter Sponsorship</h3>
                        <p>
                            Reach our email subscribers with targeted messaging about your
                            products and services.
                        </p>

                        <h3>Custom Partnerships</h3>
                        <p>
                            We&apos;re open to creative collaboration opportunities. Let&apos;s
                            discuss how we can work together to achieve your marketing objectives.
                        </p>

                        <h2>Get Started</h2>
                        <p>
                            Interested in advertising with us? Contact our partnerships team to
                            discuss your needs and get a custom quote.
                        </p>
                        <p>
                            <Link
                                href="/contact"
                                className="btn btn-primary"
                                style={{ display: "inline-flex" }}
                            >
                                Contact Us
                            </Link>
                        </p>

                        <h2>Advertising Guidelines</h2>
                        <p>
                            We maintain high standards for advertisements on our platform. All ads
                            must be:
                        </p>
                        <ul>
                            <li>Relevant to our audience&apos;s interests</li>
                            <li>Non-intrusive and respectful of user experience</li>
                            <li>Compliant with applicable advertising regulations</li>
                            <li>Free from misleading or deceptive content</li>
                        </ul>
                        <p>
                            We reserve the right to decline any advertisement that doesn&apos;t
                            meet our guidelines or align with our values.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
