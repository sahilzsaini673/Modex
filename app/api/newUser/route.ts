import connectDB from "@/lib/mongodb";
import User from "@/model/user";
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log("Email:- ", email.toLowerCase())
  await connectDB();

  try {
    const mail = await User.findOne({ email: email.toLowerCase() });
    if(mail && mail.isVerified === true) {
      console.log('@')
      return Response.json({ success: false, message: "user already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    
    if(mail && mail.isVerified === false) {
      console.log('1')
      mail.otp = String(otp);
      mail.password = password;
      await mail.save();
    } 
    
    if(!mail) {
      console.log('2')
      const user = await User.create({ email: email, password: password, otp: otp });
    }

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    })

    await transport.sendMail({
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: 'Verify your email',
      text: `OTP for verify your email is ${otp}`,
      replyTo: email,
    });


    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: true, message: "Internal server error" });
  }
}