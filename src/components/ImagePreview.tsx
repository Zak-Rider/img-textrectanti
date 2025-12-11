"use client";

interface ImagePreviewProps {
    src: string;
    alt: string;
}

export default function ImagePreview({ src, alt }: ImagePreviewProps) {
    return (
        <div className="preview-container">
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="preview-image"
                    style={{ padding: "1rem" }}
                />
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                        color: "var(--text-muted)",
                    }}
                >
                    <svg
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p style={{ fontSize: "0.875rem" }}>Select an image to preview</p>
                </div>
            )}
        </div>
    );
}
