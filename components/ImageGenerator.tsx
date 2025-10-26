'use client'
import { useState } from 'react'
import ImageFilters from './ImageFilters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { Undo2, Crop, Send, Download } from 'lucide-react'
import { toast } from 'sonner'

const defaultImage = 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=1024&q=80';

export default function ImageGenerator() {
  const [imageSrc, setImageSrc] = useState<string>(defaultImage)
  const [filter, setFilter] = useState<string>('')
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (prompt.length <= 3) {
      toast.error('prompt should be greater than 3 characters');
      return;
    }

    try {
      setLoading(true);
      toast('please wait for 2 minutes...')
      const res = await axios.post('/api/ai-image', { prompt, token });
      if (res.data.success) {
        setImageSrc(res.data.aiImage);
        toast.success('Image generate successfully')
        setLoading(false)
      } else {
        toast.error(res.data.message);
        setTimeout(()=> {
          toast(res.data.message)
        }, 2000)
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative flex aspect-square w-full max-w-xl border rounded-md overflow-hidden">
        <img
          src={imageSrc}
          alt="Generated"
          className={`object-cover w-full h-full transition-all duration-300 ${filter}`}
        />
        {/* <div className="absolute right-2 top-2 flex flex-col gap-2">
          <ImageFilters setFilter={setFilter} imageSrc={imageSrc} />
        </div> */}
      </div>
      <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-md w-full max-w-xl">
        <Input
          placeholder="Generate an image..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button size="icon" onClick={generateImage} disabled={loading}>
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}