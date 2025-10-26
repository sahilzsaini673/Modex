"use client"
import { SignUpForm } from "@/components/signup-form";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.post('/api/verify-token', { token });
        if (res.data.success === true) {
          router.push('/dashboard/community')
        }
      } catch (error) {
        console.error(error);
      }
    }
    verify();
  }, []);
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className=" text-primary-foreground flex size-6 items-center justify-center rounded-md">
              {/* <GalleryVerticalEnd className="size-4" /> */}
              <img
                src="/logo.png"
                alt="Image"
                className=" h-{20px} w-{20px} "
              />
            </div>
            Modex
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <img
          src="/login-img.gif"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}