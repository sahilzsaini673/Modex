import connectDB from "@/lib/mongodb";
import User from "@/model/user";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  console.log("GOTCHA");
  await connectDB();

  try {
    const { name, email, phone, loc, token } = await req.json();

    if (!token) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded !== "object" || !decoded.email) {
      return Response.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const userEmail = decoded.email;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Update user fields
    user.name = name;
    // user.email = email;
    user.phone = phone;
    user.loc = loc;

    await user.save();

    return Response.json({
      success: true,
      message: "Profile updated successfully",
      name: user.name,
      email: user.email,
      phone: user.phone,
      loc: user.loc,
    });
  } catch (err) {
    console.error("Form submission error:", err);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
