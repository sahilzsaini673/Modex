import { NextRequest, NextResponse } from "next/server";

const KEY = '1292b081744e44adbda3f316ba4a446f';
const API = "https://api.assemblyai.com/v2";

async function upload(buffer: Buffer) {
  const res = await fetch(`${API}/upload`, {
    method: "POST",
    headers: { authorization: KEY, "content-type": "application/octet-stream" },
    // body: buffer,
  });
  return (await res.json()).upload_url;
}

async function transcribe(url: string) {
  const res = await fetch(`${API}/transcript`, {
    method: "POST",
    headers: { authorization: KEY, "content-type": "application/json" },
    body: JSON.stringify({ audio_url: url }),
  });
  return (await res.json()).id;
}

async function poll(id: string): Promise<string> {
  while (true) {
    const res = await fetch(`${API}/transcript/${id}`, { headers: { authorization: KEY } });
    const json = await res.json();
    if (json.status === "completed") return json.text;
    if (json.status === "error") throw new Error(json.error);
    await new Promise((r) => setTimeout(r, 2000));
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof Blob)) return NextResponse.json({ error: "No file" }, { status: 400 });
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await upload(buffer);
    const id = await transcribe(url);
    const text = await poll(id);
    return NextResponse.json({ text });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Error" }, { status: 500 });
  }
};
