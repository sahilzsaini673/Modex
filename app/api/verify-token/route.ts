import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import Admin from "@/model/admin";

export async function POST(req: Request) {
    console.log("Verifying user");
    await connectDB();
    const { token } = await req.json();
    console.log(token);

    const mail = "sahil@sahil.com";
    const adminM = await Admin.findOne({ email: mail });

    if (!adminM?.api6) {
      return Response.json({
        success: false,
        message: "Please try again later",
      });
    }

    const secret = adminM?.api6;

    try{
       const verify = jwt.verify(token, secret);
       console.log("verify ",verify);

       if(verify) {
        return Response.json({ success: true });
       } 
       return Response.json({ success: false });
    } catch (error: any) {
        console.log(error);
       return Response.json({ success: false });
    }
}