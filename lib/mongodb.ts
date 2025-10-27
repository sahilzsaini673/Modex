import mongoose from 'mongoose';

let isConnected = false;

const connectDB =  async() => {
    if(isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB, {
            dbName: "Modex"
        })
        isConnected = true;
        console.log("Database connected successfully...")
    } catch(error) {
        console.log("Error connecting to database... ",error);
    }
}

export default connectDB;
