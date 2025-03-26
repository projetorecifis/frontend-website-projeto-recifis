import mongoose, { Document, Schema } from "mongoose";

interface IUsers extends Document {
    isAdmin: boolean,
    email: string;
    name: string;
    password: string;
    createdAt: string;
}

const userSchema = new Schema<IUsers>({
    isAdmin:{
        type: Boolean,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: String,
        required: true
    },
});

const UsersModel = mongoose.model<IUsers>('Users', userSchema);

export default UsersModel;