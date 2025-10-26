import connectDB from "@/lib/mongodb";
import User from "@/model/user";
import jwt from "jsonwebtoken";
import Admin from "@/model/admin";

export async function POST(req: Request) {
  const { email, otp } = await req.json();
  await connectDB();
  console.log(email);

  try {
    const user = await User.findOne({ email });

    if (user && user.otp === String(otp)) {
      user.isVerified = true;
      await user.save();
    } else {
      return Response.json({ success: false, message: "wrong otp" });
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
    return Response.json({ success: true, SecutityToken: token });
  } catch (error) {
    return Response.json({ success: false, message: "Internal server error" });
  }
}
