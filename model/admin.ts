import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IAdmin extends Document {
    email: string;
    password: string;

    api1: string;
    api2: string;
    api3: string;
    api4: string;
    api5: string;
    api6: string;

    images: string[] 
}

const AdminSchema: Schema<IAdmin> = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String},

    api1: {type: String},
    api2: {type: String},
    api3: {type: String},
    api4: {type: String},
    api5: {type: String},
    api6: {type: String},

    images: {type: [String], default: []}
});

const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;