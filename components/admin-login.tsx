"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"

export function AdminLoginForm({ className, ...props }: React.ComponentProps<"form">) {

  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();

    if(!email || !password) {
      toast.error('Fill all the details')
      return;
    }

    try{
      const res = await axios.post('/api/admin-login', { email, password });
      if(res.data.success == true) {
        localStorage.setItem('Admintoken', res.data.token)
        router.push('/admin/controls')
      } else {
        toast.error('password did not match')
      }
    } catch (error : any) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => setEmail(e.target.value)} required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
        </Field>
        <Field>
          <Button onClick={handleSubmit} type="submit">Login</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
