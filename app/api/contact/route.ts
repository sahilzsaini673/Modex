import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const formData = await req.json();

  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    await transport.sendMail({
      from: process.env.NODEMAILER_USER,
      to: process.env.NODEMAILER_USER,
      subject: "Modex AI Contact Request",
      text: `Name: ${formData.name}, 
      Email: ${formData.email}, 
      Company: ${formData.company}, 
      tool: ${formData.tool}, 
      source: ${formData.source}, 
      message: ${formData.message}`,
    });

    return Response.json({
      success: true,
      message: "message sent successfully!",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Failed to sent message!",
    });
  }
}
