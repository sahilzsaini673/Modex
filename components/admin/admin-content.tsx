"use client"
import { useState, useEffect } from "react"
import { Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function AdminContent() {
  const [tab, setTab] = useState("personal");

  const [form, setForm] = useState({
    groq: '',
    cloudName: '',
    apiKey: '',
    apiSecret: '',
    mongoUri: '',
    sercetKey: '',
    token: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: value,
    }));
  };
  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('Admintoken');
    if (token) {
      setForm(prev => ({ ...prev, token }));
    }

    const verify = async () => {
      const token = localStorage.getItem('Admintoken');

      const res = await axios.post('/api/verifytoken', { token });
      if(!res.data.success) {
        router.push('/admin/login')
      }
    }
    verify();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.groq || !form.cloudName || !form.apiKey || !form.apiSecret || !form.mongoUri || !form.sercetKey) {
      toast.error('Fill the form correctly');
      return;
    }

    if(!form.token) {
      toast.error('token is missing');
      return;
    }

    try {
      const res = await axios.post('/api/admin-form', form);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="">
      <Tabs defaultValue="personal" value={tab} onValueChange={setTab} className="space-y-6">
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Update your API keys and credentials below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="groq">Groq API</Label>
                  <Input id="groq" value={form.groq} onChange={handleChange} placeholder="Enter Groq API key" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cloudName">Cloud Name</Label>
                  <Input id="cloudName" value={form.cloudName} onChange={handleChange} placeholder="Enter Cloud Name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input id="apiKey" value={form.apiKey} onChange={handleChange} placeholder="Enter API Key" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiSecret">API Secret</Label>
                  <Input id="apiSecret" value={form.apiSecret} onChange={handleChange} placeholder="Enter API Secret" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mongoUri">MongoDB URI</Label>
                  <Input id="mongoUri" value={form.mongoUri} onChange={handleChange} placeholder="Enter MongoDB URI" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sercetKey">JWT Secret Key</Label>
                  <Input id="sercetKey" value={form.sercetKey} onChange={handleChange} placeholder="Enter Secret Key" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSubmit} className="px-6">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CHANGE PASSWORD TAB */}
        {/* <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Keep your account secure by updating your password regularly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" placeholder="Enter current password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>

              <div className="flex justify-end">
                <Button className="px-6">
                  <Key className="mr-2 h-4 w-4" /> Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
