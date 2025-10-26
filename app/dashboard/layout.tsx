"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from 'next/link';
import axios from "axios"
import { useRouter, usePathname } from "next/navigation"

const routeHeadings: { [key: string]: string } = {
  '/dashboard/community': 'Image Gallery',
  '/dashboard/article-writer': 'AI Article Writer',
  '/dashboard/title-writer': 'AI Title Writer',
  '/dashboard/image-generator': 'AI Image Generator',
  '/dashboard/remove-background': 'Remove Background',
  '/dashboard/project/article': 'AI Articles',
  '/dashboard/project/ai-images': 'AI Images',
  '/dashboard/user-profile' : 'Profile'
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [profile, setProfile] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.post('/api/verify-token', { token });
        if (res.data.success === false) {
          router.push('/login')
        }
      } catch (error) {
        router.push('/login');
      }
    }

    const handleProfile = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.post('/api/profile-data', { token });
        if (res.data.success) {
          setName(res.data.name);
          setProfile(res.data.profile);
        }
      } catch (error: any) {
        console.log(error)
      }
    }

    verify();
    handleProfile();

  }, []);

  const path = usePathname();

  const heading = routeHeadings[path] || 'Page';

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-[200%] ">
        <div className="w-full bg-[#fafafa] px-4 py-5 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between ">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <span className="text-lg font-semibold text-gray-800 hidden sm:inline">
                {heading}
              </span>
            </div>

            {/* Right Side: Logo or Profile */}
            <div className="flex items-center space-x-4">
              <Link href='/dashboard/user-profile'>
                <Image src={profile}
                  width={30}
                  height={30}
                  alt="profile"
                  className="rounded-full hover:opacity-80 transition"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="border border-gray-300"></div>
        <header />
        {children}
      </main>
    </SidebarProvider>
  )
}
