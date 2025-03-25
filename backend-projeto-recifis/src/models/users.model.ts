import mongoose, { Document, Schema } from "mongoose";

interface IUsers extends Document {
    _id: Schema.Types.ObjectId;
    email: string;
    username: string;
    password: string;
    createdAt: string;
}

const userSchema = new Schema<IUsers>({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
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