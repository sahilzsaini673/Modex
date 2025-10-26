import OpenAI from "openai";
import Admin from "@/model/admin";

export async function POST(req: Request) {
  const { prompt, selected } = await req.json();
  console.log(prompt+" "+selected);

  try {
    const email = 'sahil@sahil.com'
    const admin = await Admin.findOne({ email });
    
    const api_key = admin?.api1;

    console.log(api_key);
    
    if(!api_key) {
      return Response.json({ success: false, message: "Failed to generate titles, please try again later" });
    }

    const client = new OpenAI({
      apiKey: api_key,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await client.responses.create({
      model: "openai/gpt-oss-20b",
      input: `You are an AI assistant that writes Blog Title based on the user's prompt and optional requirements, which are: ${prompt}. 
      Instructions:
      1. Write the Title in plain text using proper paragraphs and numbered headings.
      2. Do not use any Markdown symbols such as #, *, or ---.
      3. Do not ask any question if you have.
      4. If you are unable to write the article for any reason, provide a concise explanation (30-40 words) stating why you cannot help.
      5. Add 1 new line after every title

      Begin generate the title now at least 5`
    });
    return Response.json({ success: true, title: response.output_text });
  } catch (error) {
    return Response.json({ success: false, message: "Failed to generate titles" });
  }
}
