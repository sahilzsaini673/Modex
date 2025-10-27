import mongoose from 'mongoose';

let isConnected = false;


const connectDB =  async() => {
    if(isConnected) {
        return;
    }

    const uri = process.env.MONGODB;
    if(!uri) return Response.json({ success: false, message: 'DB URL NOT FOUND' });

    try {
        await mongoose.connect(uri, {
            dbName: "Modex"
        })
        isConnected = true;
        console.log("Database connected successfully...")
    } catch(error) {
        console.log("Error connecting to database... ",error);
    }
}

export default connectDB;
