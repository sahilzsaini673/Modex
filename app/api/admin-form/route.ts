import User from "@/model/user";
import Admin from "@/model/admin";
import connectDB from "@/lib/mongodb";
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
    const form = await req.json();
    await connectDB();

    try{
        const decode = jwt.decode(form.token);
        let email = "";

        if(decode && typeof decode === 'object') {
            email = decode.email;
            console.log(email);
        }

        const admin = await Admin.findOne({ email });
        if(!admin) {
            return Response.json({ success: false, message: 'You are not allowed to make changes' });
        }

        admin.api1 = form.groq;
        admin.api2 = form.cloudName;
        admin.api3 = form.apiKey;
        admin.api4 = form.apiSecret;
        admin.api5 = form.mongoUri;
        admin.api6 = form.sercetKey;

        await admin.save();
        return Response.json({ success: true, message: 'Data Changed successfully' });
    } catch(error) {
        return Response.json({ success: false, message: 'Failed to store Data' });
    }
}