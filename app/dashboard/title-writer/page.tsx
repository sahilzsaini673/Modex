"use client"
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Home() {
    const d = "### The Rising Tide of AI: Will It Replace Everyone? In the ever-evolving landscape of technology, the integration of artificial intelligence (AI) into various industries has sparked a significant debate. For tech enthusiasts, the conversation often centers on the incredible capabilities of AI and its potential to revolutionize how we work and live. However, a pressing concern remains: will AI ultimately replace everyone in the workforce? As AI technologies advance at an unprecedented pace, their applications are becoming increasingly widespread. From customer service chatbots to complex algorithms that power autonomous vehicles, AI is adept at performing tasks that were once the exclusive domain of humans. While this can lead to increased efficiency and cost savings for businesses, it raises essential questions about the future of employment. Historically, technological advancements have often resulted in job displacement. The Industrial Revolution, for example, transformed economies and societies, but it also rendered many jobs obsolete. Today, we find ourselves in a similarly transformative era, with AI poised to disrupt numerous sectors, including manufacturing, healthcare, and even creative industries. The rapid adoption of AI can be particularly daunting for tech enthusiasts who recognize the potential for both innovation and disruption. While many view AI as an opportunity to augment human intelligence and capabilities, others fear that it will lead to mass unemployment. The idea that machines could replace human workers entirely is a narrative that persists across many discussions, and the stakes are high. However, it’s important to consider the nuanced reality. While AI and automation may replace certain tasks—particularly repetitive and mundane jobs—there are aspects of work that machines cannot replicate. Creativity, emotional intelligence, and complex problem-solving are human qualities that AI struggles to emulate fully. This suggests that rather than a straightforward replacement, a more collaborative future may be on the horizon, where humans and AI work side by side. For tech enthusiasts, this potential duality presents exciting opportunities for innovation. Fields like AI ethics and responsible AI development are gaining traction as we navigate the implications of these technologies. Designing AI systems that complement human skills rather than replace them could lead to new career paths and industries. Similarly, the demand for upskilling and reskilling the workforce becomes critical as we adapt to a new economic landscape influenced by AI. Moreover, the notion of universal basic income (UBI) is being explored in response to potential job displacement caused by AI. By providing citizens with a financial safety net, UBI could alleviate some concerns regarding job loss, allowing individuals to pursue creative and entrepreneurial endeavors that AI cannot replicate.  In conclusion, the rise of AI is an opportunity and a challenge for the workforce. Tech enthusiasts must recognize that while the landscape of work is undoubtedly shifting, it does not necessarily entail a future devoid of human labor. Instead, it invites us to envision a collaborative partnership between humans and machines, where each complements the other’s strengths. The key will lie in embracing change, promoting responsible AI practices, and prioritizing education and skill development. By doing so, we can harness the power of AI not as a tool for replacement, but as a catalyst for human advancement and innovation. The future is not about AI replacing everyone; it’s about evolving together";

    const [prompt, setPrompt] = useState('');
    const [article, setArticle] = useState('');
    const [selected, setSelected] = useState<string>('General');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const categories = [
        'General',
        'Technology',
        'Business',
        'Health',
        'Lifestyle',
        'Education',
        'Travel',
        'Food',
    ];

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (prompt.trim().length < 3) {
            toast.error("Please enter a valid prompt (at least 3 characters).");
            return;
        }

        try {
            setLoading(true);
            setArticle('');
            const res = await axios.post('/api/ai-blog', { prompt, selected });

            if (res.data.success) {
                setArticle(res.data.title);
            } else {
                toast.error(res.data.message);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Request failed.");
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
        <div className="w-full flex flex-col lg:flex-row justify-around gap-4 max-w-6xl mx-auto py-6 px-4">
            <div className="sticky w-full max-w-3xl border px-8 py-8 max-h-[600px] rounded-2xl bg-[#fafafa]">
                <h1 className="text-[2.425em] font-semibold mb-4">
                    AI Title Generator
                </h1>
                <div className="border border-gray-300 my-4"></div>
                <h1 className="mb-2 text-[20px] font-semibold text-black">
                    Enter the prompt
                </h1>
                <h2 className="mb-2 text-[12px] font-semibold text-[#524949]">
                    Specify your idea clearly
                </h2>
                <form onSubmit={handleGenerate}>
                    <input
                        placeholder="Example: How AI will replace humans in future..."
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full p-3 border border-gray-300 outline-none focus:ring-2 focus:ring-black rounded-md mb-4 resize-none"
                    />
                    <div className="space-y-2 mb-4">
                        <h2 className="font-semibold text-gray-800">Category</h2>
                        <div className="grid grid-cols-3 gap-3 max-w-md">
                            {categories.map((category) => (
                                <button type='button' key={category} onClick={() => setSelected(category)} className={`px-4 py-2 rounded-full border text-sm transition${selected === category ? 'border-black text-black' : 'border-gray-300 text-gray-600 hover:border-gray-400'}`}>
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        type='submit'
                        disabled={loading}
                        className={`bg-black text-white py-3 px-6 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Generating...' : 'Continue'}
                    </button>
                </form>
                {loading && (
                    <div className="mt-4 text-black font-medium text-center">
                        Generating your title...
                    </div>
                )}
            </div>

            <div className="w-full max-w-3xl border px-8 py-4 rounded-2xl bg-[#fafafa] flex flex-col min-h-[300px]">
                {article && article.length > 0 ? (
                    <div className="mt-4 flex-1 relative">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">Your titles are below</h2>
                            <button
                                onClick={handleCopy}
                                className="text-sm bg-black text-white py-1 px-3 rounded hover:bg-gray-800"
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                        <div className="overflow-y-auto max-h-[500px] p-2 whitespace-pre-wrap font-semibold text-gray-800">
                            {article}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center flex-1 text-center text-gray-500 py-12">
                        <div className="text-4xl mb-4">#️⃣</div>
                        <p className="text-lg font-medium">Enter the topic and click generate</p>
                    </div>
                )}
            </div>
        </div>
    );


}
