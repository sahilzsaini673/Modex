"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { CollapsibleDemo } from "./collapsible"
import { CollapsibleDemo2 } from "./collapsible2"
import { CollapsibleDemo1 } from "./collapsible-p"
import Image from "next/image"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"

export function AppSidebar() {
  const router = useRouter()
  const [profile, setProfile] = useState("")
  const [name, setName] = useState("")

  const logOut = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  useEffect(() => {
    const handleProfile = async () => {
      const token = localStorage.getItem("token")
      try {
        const res = await axios.post("/api/profile-data", { token })
        if (res.data.success) {
          setName(res.data.name)
          setProfile(res.data.profile)
        } else {
          toast.error("Error")
        }
      } catch (error: any) {
        console.log(error)
      }
    }
    handleProfile()
  }, [])

  return (
    <Sidebar
      className="bg-gradient-to-br from-purple-100 to-black text-[#2b2b2b] border-r border-[#f2e8e5] min-h-screen shadow-sm"
    >
      {/* Header */}
      <SidebarHeader className="pt-6 pb-2 px-5 bg-transparent">
        <div className="flex items-center">
          <Image src="/logo.png" width={30} height={30} alt="logo" />
          <div className="ml-3">
            <h1 className="font-bold text-[16px] text-[#1f1f1f]">
              Modex Enterprise
            </h1>
          </div>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="overflow-x-hidden px-5 py-2 space-y-4 bg-transparent">
        <div>
          <p className="text-[#7b6f6f] text-sm font-medium mb-1">Public</p>
          <CollapsibleDemo1 />
        </div>

        <div>
          <p className="text-[#7b6f6f] text-sm font-medium mb-1">Features</p>
          <CollapsibleDemo />
        </div>

        <div>
          <p className="text-[#7b6f6f] text-sm font-medium mb-1">Projects</p>
          <CollapsibleDemo2 />
        </div>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="mt-auto px-5 pb-5 bg-transparent">
        <div className="flex items-center justify-between border  rounded-2xl px-4 py-3 transition">
          <div className="flex items-center">
            <Image
              className="border rounded-full"
              src={profile || "/default-avatar.png"}
              width={36}
              height={36}
              alt="profile"
            />
            <div className="ml-3">
              <h1 className="font-semibold text-[14px] text-[#1f1f1f]">
                {name ? name : "User"}
              </h1>
              <p className="text-[12px] text-[#7b6f6f] mt-0.5">Active</p>
            </div>
          </div>
          <LogOut
            onClick={logOut}
            className="cursor-pointer text-[#7b6f6f] hover:text-[#1f1f1f] transition"
            size={18}
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
