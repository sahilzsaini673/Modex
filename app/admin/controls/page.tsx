"use client"
import AdminContent from "@/components/admin/admin-content";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
    const router = useRouter();
  
    useEffect(() => {
      const verify = async () => {
        const token = localStorage.getItem("token");
        try {
          const res = await axios.post('/api/verify-token', { token });
          if (res.data.success === false) {
            router.push('/admn/login')
          }
        } catch (error) {
          console.error(error);
        }
      }
     verify();
    }, []);

    
  
  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      {/* <AdminHeader /> */}
      <AdminContent />
    </div>
  );
}
