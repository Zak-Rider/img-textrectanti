"use client";

interface UploadedFile {
    id: string;
    file: File;
    preview: string;
}

interface FileListProps {
    files: UploadedFile[];
    selectedFileId: string | null;
    onSelectFile: (id: string) => void;
    onRemoveFile: (id: string) => void;
    onClearAll: () => void;
    onAddMore: () => void;
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) {
        return bytes + " B";
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + " KB";
    } else {
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }
}

export default function FileList({
    files,
    selectedFileId,
    onSelectFile,
    onRemoveFile,
    onClearAll,
    onAddMore,
}: FileListProps) {
    return (
        <div className="card" style={{ height: "fit-content" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                }}
            >
                <h3 style={{ fontSize: "0.875rem", fontWeight: 600, margin: 0 }}>
                    YOUR FILES
                </h3>
                <button
                    onClick={onClearAll}
                    style={{
                        background: "none",
                        border: "none",
                        color: "var(--primary)",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        cursor: "pointer",
                    }}
                >
                    Start Over
                </button>
            </div>

            <div className="file-list">
                {files.map((file) => (
                    <div
                        key={file.id}
                        className={`file-item ${selectedFileId === file.id ? "active" : ""}`}
                        onClick={() => onSelectFile(file.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                onSelectFile(file.id);
                            }
                        }}
                    >
                        <img
                            src={file.preview}
                            alt={file.file.name}
                            className="file-item-thumbnail"
                        />
                        <div className="file-item-info">
                            <div className="file-item-name" title={file.file.name}>
                                {file.file.name}
                            </div>
                            <div className="file-item-size">{formatFileSize(file.file.size)}</div>
                        </div>
                        <button
                            className="file-item-remove"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemoveFile(file.id);
                            }}
                            title="Remove file"
                            aria-label={`Remove ${file.file.name}`}
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
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={onAddMore}
                style={{
                    width: "100%",
                    marginTop: "0.75rem",
                    padding: "0.75rem",
                    background: "var(--surface)",
                    border: "1px dashed var(--border)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "all var(--transition-fast)",
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                }}
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
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add another image
            </button>
        </div>
    );
}
