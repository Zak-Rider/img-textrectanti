import Tesseract, { createWorker, Worker } from "tesseract.js";

export interface OCRProgress {
    status: string;
    progress: number;
}

export interface OCRResult {
    text: string;
    confidence: number;
}

let worker: Worker | null = null;
let currentLanguage: string = "";

export async function initializeWorker(
    language: string,
    onProgress?: (progress: OCRProgress) => void
): Promise<void> {
    // If worker exists and language is the same, reuse it
    if (worker && currentLanguage === language) {
        return;
    }

    // Terminate existing worker if language changed
    if (worker) {
        await worker.terminate();
        worker = null;
    }

    // Create new worker
    worker = await createWorker(language, Tesseract.OEM.LSTM_ONLY, {
        logger: (m) => {
            if (onProgress && m.status) {
                onProgress({
                    status: m.status,
                    progress: m.progress || 0,
                });
            }
        },
    });

    currentLanguage = language;
}

export async function performOCR(
    imageSource: string | File,
    language: string,
    onProgress?: (progress: OCRProgress) => void
): Promise<OCRResult> {
    // Initialize worker if needed
    await initializeWorker(language, onProgress);

    if (!worker) {
        throw new Error("Failed to initialize OCR worker");
    }

    // Perform recognition
    const result = await worker.recognize(imageSource);

    return {
        text: result.data.text,
        confidence: result.data.confidence,
    };
}

export async function performBatchOCR(
    images: (string | File)[],
    language: string,
    onProgress?: (currentIndex: number, totalImages: number, progress: OCRProgress) => void
): Promise<string> {
    if (images.length === 0) {
        return "";
    }

    const results: string[] = [];

    for (let i = 0; i < images.length; i++) {
        const result = await performOCR(images[i], language, (progress) => {
            if (onProgress) {
                onProgress(i, images.length, progress);
            }
        });
        results.push(result.text.trim());
    }

    // Combine all texts with double newline separator
    return results.join("\n\n");
}

export async function terminateWorker(): Promise<void> {
    if (worker) {
        await worker.terminate();
        worker = null;
        currentLanguage = "";
    }
}
