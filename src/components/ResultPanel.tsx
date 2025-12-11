"use client";

import { useState } from "react";

interface ResultPanelProps {
    text: string;
    onTextChange: (text: string) => void;
    isLoading: boolean;
    progress: number;
    progressStatus: string;
}

export default function ResultPanel({
    text,
    onTextChange,
    isLoading,
    progress,
    progressStatus,
}: ResultPanelProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };

    const handleDownload = () => {
        if (!text) return;

        // Create UTF-8 encoded blob
        const BOM = "\uFEFF"; // UTF-8 BOM for better compatibility
        const blob = new Blob([BOM + text], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `extracted-text-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const characterCount = text.length;

    return (
        <div className="card" style={{ height: "fit-content" }}>
            {isLoading ? (
                <div className="loading-overlay" style={{ minHeight: "300px" }}>
                    <div className="loading-spinner" />
                    <div style={{ textAlign: "center" }}>
                        <p
                            style={{
                                fontSize: "1rem",
                                fontWeight: 500,
                                color: "var(--text-primary)",
                                marginBottom: "0.5rem",
                            }}
                        >
                            Running OCR Text Recognition...
                        </p>
                        <p
                            style={{
                                fontSize: "0.875rem",
                                color: "var(--text-muted)",
                                marginBottom: "1rem",
                            }}
                        >
                            {progressStatus || "Initializing..."}
                        </p>
                        <div className="progress-bar" style={{ maxWidth: "200px", margin: "0 auto" }}>
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${Math.round(progress * 100)}%` }}
                            />
                        </div>
                        <p
                            style={{
                                fontSize: "0.75rem",
                                color: "var(--text-muted)",
                                marginTop: "0.5rem",
                            }}
                        >
                            {Math.round(progress * 100)}% complete
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "1rem",
                        }}
                    >
                        <h3 style={{ fontSize: "0.875rem", fontWeight: 600, margin: 0 }}>
                            EDITABLE RESULT
                        </h3>
                        {text && (
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                {characterCount.toLocaleString()} chars
                            </span>
                        )}
                    </div>

                    <textarea
                        className="result-textarea"
                        value={text}
                        onChange={(e) => onTextChange(e.target.value)}
                        placeholder="Extracted text will appear here..."
                        style={{ marginBottom: "1rem" }}
                        aria-label="Extracted text result"
                    />

                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <button
                            className={`btn btn-secondary btn-sm copy-btn ${copied ? "copied" : ""}`}
                            onClick={handleCopy}
                            disabled={!text}
                            style={{ flex: 1, minWidth: "120px", position: "relative" }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            {copied ? "Copied!" : "Copy All Text"}
                        </button>

                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleDownload}
                            disabled={!text}
                            style={{ flex: 1, minWidth: "120px" }}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download .TXT
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
