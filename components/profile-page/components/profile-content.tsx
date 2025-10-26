"use client"
import { useState, useEffect } from "react"
import { Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import { toast, Toaster } from "sonner"

interface User {
  name: string,
  email: string,
  loc: string,
  phone: string,
  token: string
}

export default function ProfileContent() {
  const [tab, setTab] = useState("personal");

  const handleProfile = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('/api/profile-data', { token });
      if (res.data.success) {
        setForm({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          loc: res.data.loc,
          token: token || ""
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  const [form, setForm] = useState<User>({ name: "", email: "", loc: "", phone: "", token: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.name || !form.loc || !form.phone) {
      toast.error("Please fill out all fields correctly");
      return;
    }

    const token = localStorage.getItem('token');

    try {
      setLoading2(true);
      const res = await axios.post('/api/personal-form', { ...form, token: token });
      if (res.data.success) {

        setForm({
          ...form,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          loc: res.data.loc
        });
        toast.success(res.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading2(false);
    }
  }

  const [password, setPassword] = useState('');
  const [Cpassowrd, setCPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handlePassword = async () => {
    setLoading(true);
    if (!password || !Cpassowrd) {
      toast.error("Fill the form");
      return;
    }
    if (password != Cpassowrd) {
      toast.error("Password did not match");
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('/api/change-password', { password, token });
      if (res.data.success) {
        toast.success("Password change successfully")
      } else {
        toast.error("Failed to change password")
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      <Toaster />
      <Tabs defaultValue="personal" value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>

        {/* PERSONAL INFO TAB */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your basic account details below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={form.name} placeholder="John Doe" onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={form.email} type="email" placeholder="john@example.com" onChange={(e) => setForm({ ...form, email: e.target.value })} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={form.phone} placeholder="+1 (555) 123-4567" onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={form.loc} placeholder="San Francisco, CA" onChange={(e) => setForm({ ...form, loc: e.target.value })} />
                </div>
              </div>

              <div className="flex justify-end">
                <Button disabled={loading2} onClick={handleSubmit} className="px-6">{loading2 ? 'Please wait...' : 'Save Changes'}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CHANGE PASSWORD TAB */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Keep your account secure by updating your password regularly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" onChange={(e) => setCPassword(e.target.value)} />
              </div>

              <div className="flex justify-end">
                <Button onClick={handlePassword} disabled={loading} className="px-6">
                  <Key className="mr-2 h-4 w-4" /> {loading ? 'please wait...' : 'Update Password'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
