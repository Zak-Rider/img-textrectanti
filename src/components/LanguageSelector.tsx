"use client";

interface LanguageSelectorProps {
    selectedLanguage: string;
    onLanguageChange: (language: string) => void;
    disabled?: boolean;
}

// Tesseract.js language codes
export const SUPPORTED_LANGUAGES = [
    { code: "eng", name: "English" },
    { code: "ara", name: "Arabic" },
    { code: "ben", name: "Bangla (Bengali)" },
    { code: "chi_sim", name: "Chinese (Simplified)" },
    { code: "chi_tra", name: "Chinese (Traditional)" },
    { code: "ces", name: "Czech" },
    { code: "dan", name: "Danish" },
    { code: "nld", name: "Dutch" },
    { code: "tgl", name: "Filipino (Tagalog)" },
    { code: "fra", name: "French" },
    { code: "kat", name: "Georgian" },
    { code: "deu", name: "German" },
    { code: "hin", name: "Hindi" },
    { code: "ind", name: "Indonesian" },
    { code: "ita", name: "Italian" },
    { code: "jpn", name: "Japanese" },
    { code: "kor", name: "Korean" },
    { code: "fas", name: "Persian (Farsi)" },
    { code: "pol", name: "Polish" },
    { code: "por", name: "Portuguese" },
    { code: "ron", name: "Romanian" },
    { code: "rus", name: "Russian" },
    { code: "spa", name: "Spanish" },
    { code: "swe", name: "Swedish" },
    { code: "tha", name: "Thai" },
    { code: "tur", name: "Turkish" },
    { code: "urd", name: "Urdu" },
    { code: "vie", name: "Vietnamese" },
];

export default function LanguageSelector({
    selectedLanguage,
    onLanguageChange,
    disabled = false,
}: LanguageSelectorProps) {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <label className="label" htmlFor="language-select">
                Select Language
            </label>
            <select
                id="language-select"
                className="input select"
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                disabled={disabled}
                style={{
                    opacity: disabled ? 0.6 : 1,
                    cursor: disabled ? "not-allowed" : "pointer",
                }}
            >
                <option value="">Choose a language...</option>
                {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
            {disabled && (
                <p
                    style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        marginTop: "0.5rem",
                    }}
                >
                    Upload at least one image to enable language selection
                </p>
            )}
        </div>
    );
}
