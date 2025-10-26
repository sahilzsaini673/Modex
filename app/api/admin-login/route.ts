import Admin from "@/model/admin";
import connectDB from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(email);
  await connectDB();

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      const newAdmin = await Admin.create({ email: email, password });
    } else {
      if (admin.password != password) {
        return Response.json({
          success: false,
          message: "password did not match",
        });
      }
    }

    const mail = "sahil@sahil.com";
    const adminM = await Admin.findOne({ email: mail });

    const payload = { email: email };
    if (!adminM?.api6) {
        return Response.json({ success: false, message: 'Please try again later' });
    }
    const secret = adminM?.api6;
    const token = jwt.sign(payload, secret, { expiresIn: "48d" });

    return Response.json({
      success: true,
      message: "login successfully",
      token: token,
    });
  } catch (error) {
    return Response.json({ success: false, message: "Error" });
  }
}
