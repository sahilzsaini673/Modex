import User from "@/model/user";
import connectDB from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import Admin from "@/model/admin";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(email);
  try {
    await connectDB();
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log("1");
      return Response.json({ success: false, message: "Email not found" });
    }

    if (user.password != password) {
      console.log("2");
      return Response.json({
        success: false,
        message: "Password did not match",
      });
    }

    const mail = "sahil@sahil.com";
    const adminM = await Admin.findOne({ email: mail });

    if (!adminM?.api6) {
      return Response.json({
        success: false,
        message: "Please try again later",
      });
    }

    const payload = { email: email };
    const secret = adminM?.api6;

    const token = jwt.sign(payload, secret, { expiresIn: "48d" });
    console.log("3");
    return Response.json({ success: true, token: token });
  } catch (error) {
    console.log("4");

    return Response.json({ success: false, message: "Failed to Login" });
  }
}
