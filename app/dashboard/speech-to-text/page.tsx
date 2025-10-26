"use client"
import { useState } from "react";
import Image from "next/image";

export default function Home() {
    const [audio, setAudio] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [transcript, setTranscript] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAudio(file);
            setPreview(URL.createObjectURL(file)); // preview audio
        }
    };

    // Send audio to API for transcription
    const handleTranscribe = async () => {
        if (!audio) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("file", audio);

        const res = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setTranscript(data.text);
        setLoading(false);
    };

    return (
        <div className="w-full flex flex-col lg:flex-row justify-around gap-4 max-w-6xl mx-auto py-6 px-4">
            {/* Left: Upload */}
            <div className="w-full max-w-3xl border px-8 py-8 rounded-2xl bg-[#fafafa]">
                <h1 className="text-[2.425em] font-semibold mb-4">
                    Audio to Text
                </h1>
                <div className="border border-gray-300 my-4"></div>

                <h2 className="mb-2 text-[12px] font-semibold text-[#524949]">
                    Upload your Audio
                </h2>
                <input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="mb-4"
                />

                {preview && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Preview:</p>
                        <audio controls src={preview} className="w-full" />
                    </div>
                )}

                {!audio && (
                    <label htmlFor='audio-upload'>
                        <Image src='/upload.png' height={50} width={50} alt='upload' />
                    </label>
                )}

                <div className="flex justify-end">
                    <button
                        onClick={handleTranscribe}
                        disabled={!audio || loading}
                        className="bg-black cursor-pointer text-white py-3 px-6 rounded-md transition disabled:opacity-50"
                    >
                        {loading ? "Transcribing..." : "Convert to Text"}
                    </button>
                </div>
            </div>

            {/* Right: Transcript */}
            <div className="w-full max-w-3xl border px-8 py-4 rounded-2xl bg-[#fafafa] flex flex-col min-h-[300px]">
                {transcript ? (
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-2">Transcription Result</h2>
                        <div className="whitespace-pre-wrap text-gray-800 p-2 border rounded bg-white">
                            {transcript}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center flex-1 text-center text-gray-500 py-12">
                        <div className="text-4xl mb-4">🎤</div>
                        <p className="text-lg font-medium">Upload an audio file and click convert</p>
                    </div>
                )}
            </div>
        </div>
    );
}