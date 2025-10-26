"use client"
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export default function Home() {
  const [prompt, setPrompt] = useState<String>('');
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [copied, setCopied] = useState<Boolean>(false);
  const [len, setLen] = useState(0);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (prompt.length < 3) {
      toast.error('prompt length should be more than 3 characters');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('/api/ai-writer', { prompt, token });
      if (res.data.success) {
        setArticle('');
        setArticle(res.data.article);
        setLen(res.data.article.length);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(article);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between gap-6 max-w-6xl mx-auto py-10 px-6 font-sans text-[#1a1a1a]">
      {/* Left Section */}
      <div className="sticky w-full max-w-3xl border border-[#f2e8e5] bg-[#fafafa] px-10 py-10 rounded-2xl shadow-sm">
        <h1 className="text-[2.25rem] font-semibold mb-4 text-[#1f1f1f] leading-snug">
          Free AI Article Writer & Generator
        </h1>
        <p className="text-[1.05rem] text-[#333] mb-8 leading-relaxed">
          Overcome writer’s block, find inspiration to tackle the blank page, and
          generate drafts in seconds with our AI-powered article writing tool, which
          helps you create high-quality articles in two quick steps.
        </p>

        <div className="border-t border-[#f0dcd8] my-6"></div>

        <h1 className="mb-1 text-[1.125rem] font-semibold text-[#1f1f1f]">
          Enter the prompt
        </h1>
        <h2 className="mb-4 text-[0.875rem] font-medium text-[#5a4f4f]">
          Specify your idea clearly
        </h2>

        <form onSubmit={handleGenerate}>
          <textarea
            placeholder="Example: How AI will replace humans in future..."
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border border-black outline-none focus:ring-2 focus:ring-[black] rounded-md mb-4 resize-none bg-[#fafafa] text-black"
          />
          <button
            type="submit"
            className="bg-[black] hover:bg-[#2b2b2b] text-[white] font-medium py-3 px-8 rounded-md transition-all shadow-sm"
          >
            Continue
          </button>
        </form>

        {loading && (
          <div className="mt-5 text-[#2b2b2b] font-medium text-center">
            Generating your article...
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="w-full max-w-3xl border border-[#f2e8e5] px-10 py-8 rounded-2xl bg-[#fafafa] shadow-sm flex flex-col min-h-[300px]">
        {article && article.length > 0 ? (
          <div className="mt-4 flex-1 relative">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-[#1f1f1f]">
                Your article is below
              </h2>
              <button
                onClick={handleCopy}
                className="text-sm bg-[#2b2b2b] text-[#fff] py-1.5 px-4 rounded-md hover:bg-[#444]"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="overflow-y-auto max-h-[500px] p-2 whitespace-pre-wrap text-[#2b2b2b]">
              {article}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 text-center text-[#6b5c5c] py-12">
            <div className="text-5xl mb-3">📝</div>
            <p className="text-lg font-medium">Enter the topic and click generate</p>
          </div>
        )}
        <p className="text-[14px] text-[#8c7c7c] mt-4">{len} Characters</p>
      </div>
    </div>
  );
}
