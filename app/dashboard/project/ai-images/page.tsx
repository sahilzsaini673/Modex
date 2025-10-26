"use client"
import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { toast } from "sonner"

export default function Gallery() {
  const [image, setImages] = useState([]);

  useEffect(() => {
    const handleImages = async () => {
      const token = localStorage.getItem('token');
      try{
        const res = await axios.post('/api/fetch-ai-images', { token });
        if(res.data.success) {
          setImages(res.data.aiImages);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    }
    handleImages();
  },[]);

  const images = [
    "https://images.pexels.com/photos/53537/caravan-desert-safari-dune-53537.jpeg",
    "https://images.pexels.com/photos/25751972/pexels-photo-25751972.jpeg",
    "https://images.pexels.com/photos/34103372/pexels-photo-34103372.jpeg",
    "https://images.pexels.com/photos/34109568/pexels-photo-34109568.jpeg",
    "https://images.pexels.com/photos/32655300/pexels-photo-32655300.jpeg",
    "https://images.pexels.com/photos/32522119/pexels-photo-32522119.jpeg",
  ]

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleDownload = (url: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = "image.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      {/* <h1 className="text-3xl font-semibold mb-6">Image Gallery</h1> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {image.map((src, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-md"
          >
            {/* Image */}
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              onClick={() => setSelectedImage(src)}
            />

            {/* Hover download button */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload(src)
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Full-screen modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-4 bg-transparent border-none shadow-none">
          {selectedImage && (
            <div className="relative flex justify-center">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-h-[80vh] rounded-lg object-contain"
              />
              <Button
                className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white"
                onClick={() => handleDownload(selectedImage)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}