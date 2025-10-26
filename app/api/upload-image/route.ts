import connectDB from "@/lib/mongodb";
import User from "@/model/user";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
 console.log("GOTTA")

  await connectDB();
  try {
    const { url, token } = await req.json();
    console.log(url, token)
    if (!token || !url) {
      return Response.json({ success: false, message: "Missing token or image URL" }, { status: 400 });
    }

    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded !== "object" || !decoded.email) {
      return Response.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const email = decoded.email;
    console.log(email)

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    user.image = url;
    await user.save();

    return Response.json({ success: true, message: "Profile image updated" });
  } catch (error) {
    console.error("Upload API error:", error);
    return Response.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
