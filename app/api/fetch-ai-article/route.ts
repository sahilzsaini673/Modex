import User from "@/model/user";
import connectDB from "@/lib/mongodb";
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    const { token } = await req.json();

    try{
        const decode = jwt.decode(token);

        let email = "";
        if(decode && typeof decode === 'object') {
            email = decode.email;
        }
        await connectDB();
        const user = await User.findOne({ email });

        const article = user?.article;
        return Response.json({ success: true, aiArticles: article});
    } catch (error) {
        return Response.json({ success: false, message: 'Falied the fetch data'});
    }
}