import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Us - Free Image to Text Converter",
    description:
        "Learn about ImageToText.net, the free online OCR tool that converts images to text instantly. Discover our mission to make text extraction accessible to everyone.",
    alternates: {
        canonical: "https://imagetotext.net/about",
    },
};

export default function AboutPage() {
    return (
        <>
            <section className="page-header">
                <div className="container">
                    <h1>About ImageToText.net</h1>
                    <p
                        style={{
                            maxWidth: "600px",
                            margin: "1rem auto 0",
                            color: "var(--text-secondary)",
                        }}
                    >
                        Your trusted free image to text converter powered by advanced OCR
                        technology
                    </p>
                </div>
            </section>

            <section className="page-content">
                <div className="container">
                    <div className="prose">
                        <h2>Our Mission</h2>
                        <p>
                            At ImageToText.net, we believe that extracting text from images should
                            be simple, fast, and accessible to everyone. Our mission is to provide
                            the best free <strong>image to text converter</strong> that works
                            instantly in your browser without any registration or upload to external
                            servers.
                        </p>
                        <p>
                            Whether you&apos;re a student digitizing handwritten notes, a professional
                            extracting data from scanned documents, or anyone who needs to convert a
                            photo to text, our OCR tool is designed to make your life easier.
                        </p>

                        <h2>What Makes Us Different</h2>
                        <p>
                            Unlike many other <strong>OCR online</strong> tools that require you to
                            upload your images to their servers, ImageToText.net processes everything
                            locally in your browser. This means:
                        </p>
                        <ul>
                            <li>
                                <strong>Complete Privacy:</strong> Your images never leave your device.
                                We don&apos;t store, collect, or have access to any of your files.
                            </li>
                            <li>
                                <strong>Lightning Fast:</strong> No waiting for uploads or server
                                processing. Text extraction happens instantly on your machine.
                            </li>
                            <li>
                                <strong>Works Offline:</strong> Once the page loads, you can even use
                                our tool without an internet connection.
                            </li>
                            <li>
                                <strong>No Limits:</strong> Convert as many images as you want without
                                daily caps or watermarks.
                            </li>
                        </ul>

                        <h2>Our Technology</h2>
                        <p>
                            We use <strong>Tesseract.js</strong>, a powerful open-source OCR engine
                            that brings the same technology used by major tech companies directly to
                            your browser. Our text recognition system supports over 28 languages,
                            including English, Spanish, French, German, Chinese, Japanese, Arabic,
                            Hindi, and many more.
                        </p>
                        <p>
                            Our <strong>picture to text converter</strong> leverages advanced machine
                            learning algorithms to accurately recognize and extract text from:
                        </p>
                        <ul>
                            <li>Scanned documents and PDFs</li>
                            <li>Screenshots and screen captures</li>
                            <li>Photos of printed text</li>
                            <li>Handwritten notes and whiteboards</li>
                            <li>Business cards and receipts</li>
                            <li>Book pages and magazines</li>
                        </ul>

                        <h2>Who We Serve</h2>
                        <p>
                            Our free <strong>image to text</strong> tool is used by millions of
                            people worldwide, including:
                        </p>
                        <ul>
                            <li>Students and educators digitizing learning materials</li>
                            <li>Professionals extracting data from documents</li>
                            <li>Researchers analyzing printed sources</li>
                            <li>Content creators repurposing text from images</li>
                            <li>Developers testing OCR workflows</li>
                            <li>Anyone who needs to convert a picture to editable text</li>
                        </ul>

                        <h2>Our Commitment</h2>
                        <p>
                            We are committed to keeping ImageToText.net free forever. We believe
                            that essential tools for text extraction should be available to everyone
                            regardless of their financial situation. Our platform will always offer
                            a robust, no-cost solution for converting images to text.
                        </p>

                        <h2>Get in Touch</h2>
                        <p>
                            Have questions, feedback, or suggestions? We&apos;d love to hear from you!
                            Visit our{" "}
                            <Link href="/contact" style={{ color: "var(--primary)" }}>
                                Contact page
                            </Link>{" "}
                            to send us a message, or check out our{" "}
                            <Link href="/advertise" style={{ color: "var(--primary)" }}>
                                Advertise page
                            </Link>{" "}
                            if you&apos;re interested in partnership opportunities.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
