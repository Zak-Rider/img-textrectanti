import OCRConverter from "@/components/OCRConverter";
import HowToSection from "@/components/HowToSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { faqs } from "@/data/faqs";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 style={{ marginBottom: "1.5rem", fontSize: "3.5rem", fontWeight: "900", letterSpacing: "-0.02em", lineHeight: "1.1" }}>
            <span style={{ color: "var(--primary)" }}>Image to Text</span>{" "}
            <span style={{ color: "#0f172a" }}>Converter</span>
          </h1>
          <p
            style={{
              maxWidth: "680px",
              margin: "0 auto 2rem",
              fontSize: "1.25rem",
              lineHeight: "1.6",
              color: "#334155",
              fontWeight: "500"
            }}
          >
            Instantly transform picture to text using advanced AI. The smartest OCR
            tool to convert JPG to Word, extract text from images, and digitize
            documents for free.
          </p>
        </div>
      </section>

      {/* OCR Converter */}
      <section style={{ padding: "2rem 0 3rem" }}>
        <div className="container">
          <OCRConverter />
        </div>
      </section>

      {/* How To Section */}
      <HowToSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Software Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Image to Text Converter",
            operatingSystem: "All",
            applicationCategory: "Utility",
            applicationSubCategory: "OCR Tool",
            url: "https://imagetotext.net",
            description: "Free online OCR tool that converts images to text using multilingual Tesseract.js client-side processing.",
            offers: {
              "@type": "Offer",
              price: "0.00",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "1280",
            },
          }),
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
