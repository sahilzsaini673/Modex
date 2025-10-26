"use client"
import axios from 'axios';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    tool: '',
    source: '',
    message: '',
  });

  const[loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    try{
      setLoading(true);
      const res = await axios.post('/api/contact', formData);
      if(res.data.success) {
        toast.success(res.data.message);
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
    <section id="contact" className="px-4 py-20 max-w-7xl mx-auto">
      {/* <Toaster/> */}
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <div className="text-sm text-gray-500 mb-4">Contact Support</div>
          <h2 className="text-5xl font-medium leading-tight text-black mb-8">
            Let's Build the Future of Content with Us.
          </h2>
          {/* <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-[15px] font-medium leading-tight hover:bg-slate-900 transition-colors">
            <MessageCircle className="w-5 h-5" />
            Chat Live
          </button> */}
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Company/Role"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              />
            </div>

            <div>
              <select
                value={formData.tool}
                onChange={(e) => setFormData({ ...formData, tool: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                required
              >
                <option value="">Primary Tool Interest</option>
                <option value="article-writer">Article Writer</option>
                <option value="image-generator">Image Generator</option>
                <option value="background-remover">Background Remover</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              >
                <option value="">How Did You Hear About Us?</option>
                <option value="search">Search Engine</option>
                <option value="social">Social Media</option>
                <option value="referral">Referral</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <textarea
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-black text-white rounded-xl font-medium leading-tight hover:bg-gray-600 transition-colors"
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
