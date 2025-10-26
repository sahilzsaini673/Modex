import mongoose from 'mongoose';

let isConnected = false;

const connectDB =  async() => {
    if(isConnected) {
        return;
    }

    try {
        await mongoose.connect('mongodb://localhost:27017/', {
            dbName: "Modex"
        })
        isConnected = true;
        console.log("Database connected successfully...")
    } catch(error) {
        console.log("Error connecting to database... ",error);
    }
}

export default connectDB;