import jwt from "jsonwebtoken";
import User from "@/model/user";
import Admin from "@/model/admin";
import connectDB from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { prompt, token } = await request.json();

    if (prompt.length < 3) {
      return Response.json({
        success: false,
        message: "prompt should be greater than 3 characters",
      });
    }

    const promptText = prompt;
    const imgWidth = 768;
    const imgHeight = 1024;
    const imgSeed = 42;
    const imgModel = "turbo";
    const nologo = true;
    const enhance = true;

    const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(promptText)}?width=${imgWidth}&height=${imgHeight}&seed=${imgSeed}&model=${imgModel}&nologo=${nologo}&enhance=${enhance}`;
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return Response.json({
        success: false,
        message: "Error downloading image",
      });
    }

    const decode = jwt.decode(token);
    let email = "";
    if (decode && typeof decode === "object") {
      email = decode.email;
      console.log(email);
    }

    await connectDB();
    const user = await User.findOne({ email });
    const adminEmail = 'sahil@sahil.com';
    const admin = await Admin.findOne({ email: adminEmail });

    if(admin) {
      admin.images.push(imageUrl);
      await admin.save();
    } else {
      console.log("ERROR AI IMAGES")
    }

    if (user) {
      user.aiImage.push(imageUrl);
      await user.save();
      
    } else {
      return Response.json({
        success: false,
        message: "Error generating image",
      });
    }

    return Response.json({ success: true, aiImage: imageUrl });
  } catch (error) {
    return Response.json({ success: false, message: "Error generating image" });
  }
}
