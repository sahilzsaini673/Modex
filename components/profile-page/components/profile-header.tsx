"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Calendar, Mail, MapPin } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function ProfileHeader() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const [imageSrc, setImageSrc] = useState<string>("https://bundui-images.netlify.app/avatars/08.png");


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Modex_User_Profile"); // 👈 Your unsigned preset
    formData.append("folder", "profile-uploads"); // Optional: folder in Cloudinary

    try {
      toast("please wait...")
      const res = await fetch("https://api.cloudinary.com/v1_1/dop0bmqgh/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const token = localStorage.getItem('token');

      if (data.secure_url) {
        const url = data.secure_url;
        toast(url);
        const res = await axios.post('/api/upload-image', { url, token });
        if(!res.data.success) {
          toast.error("Failed to upload Image");
          return;
        }
        setProfile(data.secure_url); // ✅ Set the uploaded image URL
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error("Something went wrong");
    }
  };


  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loc, setLoc] = useState('');

  useEffect(() => {
    const handleProfile = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.post('/api/profile-data', { token });
        if (res.data.success) {
          setName(res.data.name);
          setProfile(res.data.profile);
          setEmail(res.data.email);
          setLoc(res.data.loc)
        } else {
          toast.error("Error")
        }
      } catch (error: any) {
        console.log(error)
      }
    }
    handleProfile();
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          {/* Profile Avatar Section */}
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile} alt="Profile" />
              <AvatarFallback className="text-2xl">MX</AvatarFallback>
            </Avatar>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />

            {/* Camera Button */}
            <Button
              size="icon"
              variant="outline"
              onClick={handleCameraClick}
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-100"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>

          {/* User Info Section */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{name}</h1>
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {email}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {loc}
              </div>
              {/* <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined March 2023
              </div> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
