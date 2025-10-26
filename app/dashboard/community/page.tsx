"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Download, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { toast } from "sonner"

const images = [
  "https://images.pexels.com/photos/25751972/pexels-photo-25751972.jpeg",
  "https://images.pexels.com/photos/34103372/pexels-photo-34103372.jpeg",
  "https://images.pexels.com/photos/34109568/pexels-photo-34109568.jpeg",
  "https://images.pexels.com/photos/32655300/pexels-photo-32655300.jpeg",
  "https://images.pexels.com/photos/32522119/pexels-photo-32522119.jpeg",
]

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [image, setImage] = useState([]);

  const handleDownload = (url: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = "image.jpg"
    link.click()
  }

  useEffect(() => {
    const fetchImages = async () => {
      try{
        const res = await axios.get('/api/all-images');
        if(res.data.success) {
          setImage(res.data.image);
        } else {
          toast.error(res.data.message);
        }
      } catch(error: any) {
        toast.error(error?.response?.data?.message);
      } 
    }
    fetchImages();
  },[]);

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-6">Image Gallery</h1> */}

      {/* Masonry grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {image.map((src, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl"
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              width={400}
              height={400}
              className="w-full rounded-xl object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
              onClick={() => setSelectedImage(src)}
            />
            {/* Hover download button */}
            <button
              onClick={() => handleDownload(src)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-black/60 hover:bg-black text-white p-2 rounded-full"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-4xl mx-auto">
              <Image
                src={selectedImage}
                alt="Full view"
                width={1000}
                height={800}
                className="rounded-xl max-h-[80vh] object-contain"
              />
              <div className="absolute top-4 right-4 flex gap-3">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => handleDownload(selectedImage)}
                >
                  <Download className="w-5 h-5" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
