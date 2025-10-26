import User from "@/model/user";
import connectDB from "@/lib/mongodb";
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    const { token } = await req.json();

    try{
        await connectDB();
        const decode = jwt.decode(token);

        let email = ""
        if(decode && typeof decode === 'object') {
            email = decode.email;
        }

        const user = await User.findOne({ email });
        console.log("User Image - ", user?.image);
        return Response.json({ success: true, name: user?.name, profile: user?.image, email: user?.email, loc: user?.loc, gender: user?.gender, phone: user?.phone });
    } catch (error) {
        return Response.json({ success: false, message: "failed to fetch data" });
    }
}