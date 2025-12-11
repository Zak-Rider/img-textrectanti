"use client";

import { useState, useRef, useCallback } from "react";
import UploadCard from "./UploadCard";
import FileList from "./FileList";
import ImagePreview from "./ImagePreview";
import LanguageSelector from "./LanguageSelector";
import ResultPanel from "./ResultPanel";
import { performBatchOCR } from "@/lib/ocrWorker";

interface UploadedFile {
    id: string;
    file: File;
    preview: string;
}

export default function OCRConverter() {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [extractedText, setExtractedText] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressStatus, setProgressStatus] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFilesChange = useCallback((newFiles: UploadedFile[]) => {
        setFiles(newFiles);
        if (newFiles.length > 0 && !selectedFileId) {
            setSelectedFileId(newFiles[0].id);
        }
        setValidationError(null);
    }, [selectedFileId]);

    const handleRemoveFile = useCallback((id: string) => {
        setFiles((prev) => {
            const newFiles = prev.filter((f) => f.id !== id);
            // Update selected file if the removed one was selected
            if (selectedFileId === id && newFiles.length > 0) {
                setSelectedFileId(newFiles[0].id);
            } else if (newFiles.length === 0) {
                setSelectedFileId(null);
            }
            return newFiles;
        });
    }, [selectedFileId]);

    const handleClearAll = useCallback(() => {
        // Revoke all object URLs
        files.forEach((f) => URL.revokeObjectURL(f.preview));
        setFiles([]);
        setSelectedFileId(null);
        setExtractedText("");
        setSelectedLanguage("");
        setValidationError(null);
    }, [files]);

    const handleAddMore = () => {
        fileInputRef.current?.click();
    };

    const handleConvert = async () => {
        // Validation
        if (files.length === 0) {
            setValidationError("Please upload at least one image before converting.");
            return;
        }

        if (files.length > 5) {
            setValidationError("Too many files. Please process up to 5 images at a time.");
            return;
        }

        if (!selectedLanguage) {
            setValidationError("Please select a language for OCR before converting.");
            return;
        }

        setValidationError(null);
        setIsProcessing(true);
        setProgress(0);
        setProgressStatus("Initializing OCR engine...");

        try {
            const imageFiles = files.map((f) => f.file);

            const result = await performBatchOCR(
                imageFiles,
                selectedLanguage,
                (currentIndex, totalImages, ocrProgress) => {
                    // Calculate overall progress
                    const baseProgress = currentIndex / totalImages;
                    const currentFileProgress = ocrProgress.progress / totalImages;
                    setProgress(baseProgress + currentFileProgress);

                    // Format status message
                    if (totalImages > 1) {
                        setProgressStatus(
                            `Processing image ${currentIndex + 1} of ${totalImages}: ${ocrProgress.status}`
                        );
                    } else {
                        setProgressStatus(ocrProgress.status);
                    }
                }
            );

            setExtractedText(result);
        } catch (error) {
            console.error("OCR Error:", error);
            setValidationError(
                "An error occurred during text recognition. Please try again."
            );
        } finally {
            setIsProcessing(false);
            setProgress(0);
            setProgressStatus("");
        }
    };

    const selectedFile = files.find((f) => f.id === selectedFileId);
    const hasFiles = files.length > 0;

    // Show upload card when no files
    if (!hasFiles) {
        return (
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <UploadCard files={files} onFilesChange={handleFilesChange} />
                {validationError && (
                    <div
                        className="message message-error"
                        style={{ marginTop: "1rem" }}
                    >
                        {validationError}
                    </div>
                )}
            </div>
        );
    }

    // Show three-column layout when files are present
    return (
        <>
            {/* Hidden file input for "Add more" functionality */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                multiple
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        const newFiles: UploadedFile[] = Array.from(e.target.files).map(
                            (file) => ({
                                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                                file,
                                preview: URL.createObjectURL(file),
                            })
                        );
                        handleFilesChange([...files, ...newFiles]);
                    }
                    e.target.value = "";
                }}
                style={{ display: "none" }}
            />

            <div className="converter-layout">
                {/* Left Column: File List */}
                <FileList
                    files={files}
                    selectedFileId={selectedFileId}
                    onSelectFile={setSelectedFileId}
                    onRemoveFile={handleRemoveFile}
                    onClearAll={handleClearAll}
                    onAddMore={handleAddMore}
                />

                {/* Center Column: Image Preview */}
                <div>
                    <div
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            marginBottom: "1rem",
                        }}
                    >
                        <span
                            style={{
                                padding: "0.375rem 0.75rem",
                                background: "var(--text-primary)",
                                color: "white",
                                borderRadius: "var(--radius-sm)",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                            }}
                        >
                            Original
                        </span>
                    </div>
                    <ImagePreview
                        src={selectedFile?.preview || ""}
                        alt={selectedFile?.file.name || "No image selected"}
                    />
                </div>

                {/* Right Column: Language Selector, Convert Button, Results */}
                <div>
                    <div className="card" style={{ marginBottom: "1rem" }}>
                        <LanguageSelector
                            selectedLanguage={selectedLanguage}
                            onLanguageChange={(lang) => {
                                setSelectedLanguage(lang);
                                setValidationError(null);
                            }}
                            disabled={!hasFiles}
                        />

                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleConvert}
                            disabled={isProcessing}
                            style={{ width: "100%", marginTop: "0.5rem" }}
                        >
                            {isProcessing ? (
                                <>
                                    <span
                                        className="loading-spinner"
                                        style={{ width: "20px", height: "20px", borderWidth: "2px" }}
                                    />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="16 16 12 12 8 16" />
                                        <line x1="12" y1="12" x2="12" y2="21" />
                                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                    </svg>
                                    Convert to Text
                                </>
                            )}
                        </button>

                        {validationError && (
                            <div className="message message-error" style={{ marginTop: "1rem" }}>
                                {validationError}
                            </div>
                        )}
                    </div>

                    <ResultPanel
                        text={extractedText}
                        onTextChange={setExtractedText}
                        isLoading={isProcessing}
                        progress={progress}
                        progressStatus={progressStatus}
                    />
                </div>
            </div>
        </>
    );
}
