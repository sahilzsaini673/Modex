import Admin from "@/model/admin";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
    console.log("WE ARE READY FOR WAR")
    await connectDB();
    try{
        const mail = 'sahil@sahil.com';
        const admin = await Admin.findOne({ email: mail });

        if(!admin) {
            return Response.json({ success: true, message: 'Failed to load images' })
        }

        const img = admin?.images;
        console.log("Images----------"+img);

        return Response.json({ success: true, image: img.reverse() });
    } catch(error) {
        return Response.json({ success: false, message: 'Error, please try again later'});
    }
}