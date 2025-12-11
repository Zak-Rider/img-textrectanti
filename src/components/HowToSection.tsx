export default function HowToSection() {
    const steps = [
        {
            number: 1,
            title: "Upload Image",
            description:
                "Drag & drop your files or click to upload. We support JPG, PNG, and WEBP formats up to 5MB each.",
        },
        {
            number: 2,
            title: "Wait for Extraction",
            description:
                "Our advanced AI OCR engine scans your image and extracts text with 99% accuracy in seconds.",
        },
        {
            number: 3,
            title: "Copy or Download",
            description:
                "Copy the result to your clipboard or save as a TXT file. Edit the text directly in your browser if needed.",
        },
    ];

    return (
        <section className="section" style={{ background: "var(--surface)" }}>
            <div className="container">
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "3rem",
                    }}
                >
                    How to Convert Image to Text?
                </h2>

                <div className="steps-container">
                    {steps.map((step) => (
                        <div key={step.number} className="step-card">
                            <div className="step-number">{step.number}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
