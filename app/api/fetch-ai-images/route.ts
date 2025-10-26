import User from "@/model/user";
import connectDB from "@/lib/mongodb";
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    const { token } = await req.json();

    try {
        const decode = jwt.decode(token);

        let email = "";
        if(decode && typeof decode === 'object'){
            email = decode.email;
            console.log("The Email",email);
        }

        await connectDB();
        const user = await User.findOne({ email });
        
        const images = user?.aiImage;
        return Response.json({ success: true, aiImages: images});
    } catch (error) {
        return Response.json({ success: false, message: 'Failed to fetch data'});
    }
}