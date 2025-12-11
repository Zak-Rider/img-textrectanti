import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
    title: "Contact Us - Free Image to Text Converter",
    description:
        "Have questions about our image to text converter? Contact ImageToText.net for support, feedback, or partnership inquiries. We're here to help!",
    alternates: {
        canonical: "https://imagetotext.net/contact",
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
