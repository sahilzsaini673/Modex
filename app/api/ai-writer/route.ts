import OpenAI from "openai";
import jwt from 'jsonwebtoken';
import User from "@/model/user";
import connectDB from "@/lib/mongodb";
import Admin from "@/model/admin";

export async function POST(req: Request) {
  const { prompt, token } = await req.json();
  console.log(prompt);

  try {
    await connectDB();
    const Aemail = 'sahil@sahil.com'
    const admin = await Admin.findOne({ email: Aemail });
    
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
      input: `You are an AI assistant that writes structured articles based on the user's topic and optional requirements, which are: ${prompt}. 
      Instructions:
      1. Write the article in plain text using proper paragraphs and numbered headings.
      2. Do not use any Markdown symbols such as #, *, or ---.
      3. Do not include any questions in the article.
      4. If you are unable to write the article for any reason, provide a concise explanation (30-40 words) stating why you cannot help.

      Begin writing the article now.`
    });
    

    const decode = jwt.decode(token);

    let email = "";
    if (decode && typeof decode === "object") {
      email = decode.email;
      console.log(email);
    }

    await connectDB();
    const user = await User.findOne({ email });

    if(user) {
      user.article.push(response.output_text);
      await user.save();
    } else {
      return Response.json({ success: false, message: "Error generating image" });
    }
    return Response.json({ success: true, article: response.output_text });
  } catch (error) {
    return Response.json({ success: true, message: "Failed to generate article" });
  }
}
