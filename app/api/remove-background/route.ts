import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import Admin from '@/model/admin';

function bufferToStream(buffer: Buffer): Readable {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return Response.json({ success: false, message: 'Image not uploaded' });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const email = 'sahil@sahil.com';
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return Response.json({ success: false, message: 'Admin not found' });
    }

    cloudinary.config({
      cloud_name: admin.api2,
      api_key: admin.api3,
      api_secret: admin.api4,
    });

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "bg_removed",
          resource_type: "image",
          transformation: [
            { effect: "background_removal" },
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      bufferToStream(buffer).pipe(uploadStream);
    });

    return Response.json({
      success: true,
      message: 'Image generated successfully',
      image: uploadResult.secure_url
    }, { status: 200 });

  } catch (error) {
    console.error("Upload failed:", error);
    return Response.json({ success: false, message: 'Failed to remove background' });
  }
}
