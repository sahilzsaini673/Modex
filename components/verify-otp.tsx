"use client"
import React, { useState } from "react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function InputOTPDemo() {
    const [otp, setOtp] = useState("")
    const [submittedOtp, setSubmittedOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleChange = (value: string) => {
        setOtp(value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const email = localStorage.getItem("email");

        const form = {
            email,
            otp
        }

        if (otp.length !== 6) {
            toast.error("Please enter a 6-digit OTP before submitting.")
            return;
        }

        try {
            const res = await axios.post('/api/verify-email', form);
            if (res.data.success) {
               localStorage.setItem('token', res.data.SecutityToken);
               router.push('/dashboard/community');
            } else {
                toast.error(res.data.message);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl mb-6">Verify your email</h1>
                <h2>one-time-password</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputOTP maxLength={6} value={otp} onChange={handleChange}>
                    <InputOTPGroup>
                        <InputOTPSlot className="border-black" index={0} />
                        <InputOTPSlot className="border-black" index={1} />
                        <InputOTPSlot className="border-black" index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot className="border-black" index={3} />
                        <InputOTPSlot className="border-black" index={4} />
                        <InputOTPSlot className="border-black" index={5} />
                    </InputOTPGroup>
                </InputOTP>

                <button
                    disabled={loading}
                    type="submit"
                    className="px-6 py-2 bg-black rounded-xl text-white hover:bg-black transition"
                >
                    {loading ? "Submitting.." : "Submit"}
                </button>

                {submittedOtp && <p className="text-green-600">Submitted OTP: {submittedOtp}</p>}
            </form>
        </div>

    )
}
