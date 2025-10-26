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
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import axios from 'axios';
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User {
  email: string,
  password: string,
}

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const [form, setForm] = useState<User>({ email: "", password: "" });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email) {
      toast.error("email required")
      return;
    }

    if (!form.password) {
      toast.error("password required")
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('/api/login', form);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
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
          <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </Field>
        <Field>
          {/* <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div> */}
          <Input id="password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </Field>
        <Field>
          <Button onClick={handleSubmit} type="submit">{loading ? 'Please wait...' : 'Login'}</Button>
        </Field>
        {/* <FieldSeparator>Or continue with</FieldSeparator> */}
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
