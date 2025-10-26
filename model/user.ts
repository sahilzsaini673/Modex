import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    gender: string;
    password: string;
    image: string;
    loc: string;
    phone: string;
    otp: string;
    isVerified: boolean;
    article: string[];
    aiImage: string[];
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    name: { type: String},
    email: { type: String, required: true},
    gender: { type: String},
    password : { type: String},
    image: { type: String},
    loc: { type: String},
    phone: { type: String},
    otp: { type: String },
    isVerified: { type: Boolean, default: false},
    article: { type: [String], default: []},
    aiImage: { type: [String], default: []}
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;