"use client";
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function Home() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveBackground = async () => {
        if (!image) return;
        setLoading(true);
        toast("please wait 2 minute...")
        const formData = new FormData();
        formData.append("file", image);

        try {
            const res = await axios.post("/api/remove-background", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                toast.success("Background removed successfully")
                setResultImage(res.data.image);
            } else {
                toast.error(res.data.message);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col lg:flex-row justify-around gap-4 max-w-6xl mx-auto py-6 px-4">
            {/* Left section */}
            <div className="w-full max-w-3xl border px-8 py-8 rounded-2xl bg-[#fafafa]">
                <h1 className="text-[2.425em] font-semibold mb-4">Remove Background</h1>

                <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {!image && (
                    <label htmlFor='image-upload' className="cursor-pointer inline-block mb-4">
                        <Image src='/upload.png' height={50} width={50} alt='upload' />
                        <p className="text-sm text-gray-500 mt-2">Click to upload an image</p>
                    </label>
                )}

                {preview && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Preview:</p>
                        <img src={preview} alt="preview" className="max-h-60 rounded-md border" />
                    </div>
                )}

                <div className='flex justify-end'>
                    <button
                        onClick={handleRemoveBackground}
                        disabled={!image || loading}
                        className="bg-black text-white py-3 px-6 rounded-md transition disabled:opacity-50"
                    >
                        {loading ? "Processing..." : "Continue"}
                    </button>
                </div>
            </div>

            {/* Right section */}
            <div className="w-full max-w-3xl border px-8 py-4 rounded-2xl bg-[#fafafa] flex flex-col min-h-[300px] items-center justify-center">
                {resultImage ? (
                    <div className="w-full flex flex-col items-center">
                        <h2 className="text-xl font-semibold mb-4">Background Removed Image</h2>
                        <img src={resultImage} alt="result" className="max-h-[500px] rounded-md" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center text-gray-500 py-12">
                        <div className="text-4xl mb-4">🖼️</div>
                        <p className="text-lg font-medium">Upload an image and click continue</p>
                    </div>
                )}
            </div>
        </div>
    );
}
