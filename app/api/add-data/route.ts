import Admin from "@/model/admin";

export async function POST(req: Request) {
    const arr = await req.json();
    
    const email = 'sahil@sahil.com'
    const admin = await Admin.findOne({ email });

    if(admin) {
        admin.images.push(...arr);
        await admin.save();
        console.log('DONE')
    }

    return Response.json({ message: 'DONE'})
}