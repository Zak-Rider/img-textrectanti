"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface UploadedFile {
    id: string;
    file: File;
    preview: string;
}

interface UploadCardProps {
    onFilesChange: (files: UploadedFile[]) => void;
    files: UploadedFile[];
}

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_TOTAL_FILES = 5; // Maximum 5 images total

export default function UploadCard({ onFilesChange, files }: UploadCardProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): string | null => {
        // Check file type
        if (!ACCEPTED_TYPES.includes(file.type.toLowerCase())) {
            const extension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
            if (!ACCEPTED_EXTENSIONS.includes(extension)) {
                return `"${file.name}" is not a supported format. Please use JPG, JPEG, PNG, or WEBP files only.`;
            }
        }

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            return `"${file.name}" is too large (${sizeMB} MB). Maximum file size is 5 MB.`;
        }

        return null;
    };

    const processFiles = useCallback(
        (newFiles: FileList | File[]) => {
            setError(null);
            const filesArray = Array.from(newFiles);

            // Check total file count limit
            if (files.length + filesArray.length > MAX_TOTAL_FILES) {
                setError(
                    `You can only upload up to ${MAX_TOTAL_FILES} images total. You currently have ${files.length} image(s). Please remove some files first or select fewer images.`
                );
                return;
            }

            const validFiles: UploadedFile[] = [];
            const errors: string[] = [];

            filesArray.forEach((file) => {
                const validationError = validateFile(file);
                if (validationError) {
                    errors.push(validationError);
                } else {
                    validFiles.push({
                        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                        file,
                        preview: URL.createObjectURL(file),
                    });
                }
            });

            if (errors.length > 0) {
                setError(errors.join(" "));
            }

            if (validFiles.length > 0) {
                onFilesChange([...files, ...validFiles]);
            }
        },
        [files, onFilesChange]
    );

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFiles(e.target.files);
        }
        // Reset input to allow selecting the same file again
        e.target.value = "";
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    // Handle paste from clipboard
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;

            const imageFiles: File[] = [];
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.startsWith("image/")) {
                    const file = items[i].getAsFile();
                    if (file) {
                        imageFiles.push(file);
                    }
                }
            }

            if (imageFiles.length > 0) {
                e.preventDefault();
                processFiles(imageFiles);
            }
        };

        document.addEventListener("paste", handlePaste);
        return () => document.removeEventListener("paste", handlePaste);
    }, [processFiles]);

    // Cleanup preview URLs on unmount
    useEffect(() => {
        return () => {
            files.forEach((f) => URL.revokeObjectURL(f.preview));
        };
    }, []);

    return (
        <div className="card" style={{ padding: "2rem" }}>
            <div
                className={`upload-zone ${isDragOver ? "drag-over" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        handleClick();
                    }
                }}
                aria-label="Upload image area. Click or drag and drop images here."
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={ACCEPTED_EXTENSIONS.join(",")}
                    multiple
                    onChange={handleFileInputChange}
                    style={{ display: "none" }}
                    aria-hidden="true"
                />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <div
                        style={{
                            width: "64px",
                            height: "64px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "var(--primary-light)",
                            borderRadius: "50%",
                        }}
                    >
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem", color: "#1f2937" }}>
                            Upload an image
                        </h3>
                        <p style={{ fontSize: "1.125rem", color: "#4b5563", marginBottom: "2rem" }}>
                            Drag and drop, or paste from clipboard
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick();
                        }}
                    >
                        Choose File
                    </button>

                    <p
                        style={{
                            fontSize: "0.875rem",
                            color: "var(--text-muted)",
                            marginTop: "0.5rem",
                        }}
                    >
                        Supports JPG, PNG, WEBP (Max 5MB per file, 5 images total)
                    </p>
                </div>
            </div>

            {error && (
                <div className="message message-error" style={{ marginTop: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0, marginTop: "2px" }}
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{error}</span>
                    </div>
                </div>
            )}

            {/* Trust badges row */}
            <div className="trust-badges" style={{
                marginTop: "2.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "2rem",
                opacity: 0.6,
                filter: "grayscale(100%)",
                color: "#6b7280" // Ensure a visible gray color
            }}>
                {/* Google Logo */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "24px", height: "24px" }} aria-label="Google Cloud Vision" role="img">
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.09z" fill="currentColor" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" />
                    </svg>
                </div>
                {/* AWS Logo */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1 }} aria-label="Amazon Web Services" role="img">
                    <span style={{ fontSize: "1.1rem", fontWeight: "700", letterSpacing: "-0.5px" }}>aws</span>
                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginTop: "-2px" }} aria-hidden="true">
                        <path d="M2 2 Q 12 12 22 2" />
                        <path d="M18 6 L 22 2 L 18 1" strokeWidth="0" fill="currentColor" />
                    </svg>
                </div>
                {/* PDF File Icon */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="PDF Support" role="img">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM11.5 11.5V16.5H12.5V14.5H13.5V13.5H12.5V12.5H14.5V11.5H11.5ZM16.5 11.5V16.5H15.5V11.5H16.5ZM8.5 11.5V16.5H9.5V15H10.5C10.78 15 11 14.78 11 14.5V13C11 12.72 10.78 12.5 10.5 12.5H9.5V11.5H8.5ZM9.5 13.5V12.5H10.5V13.5H9.5Z" />
                    </svg>
                </div>

                {/* Translate Icon (A symbol) */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Multilingual Support" role="img">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M12.87 15.07L10.33 12.56L10.36 12.53C12.1 10.59 13.34 8.36 14.07 6H17V4H9.99V2H7.99V4H1V6H12.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8H4.69C5.42 9.63 6.42 11.17 7.67 12.56L2.58 17.58L4 19L9 14L13.61 18.5L12.87 15.07ZM18.5 10H16.5L12 22H14L15.12 19H19.87L21 22H23L18.5 10ZM15.88 17L17.5 12.67L19.12 17H15.88Z" />
                    </svg>
                </div>
            </div>
            <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                Powered by advanced AI for precise OCR text recognition.
            </p>
        </div>
    );
}
