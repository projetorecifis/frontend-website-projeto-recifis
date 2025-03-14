import mongoose, { Document, Schema } from "mongoose";

export interface IImage extends Document {
    originalName: string;
    path: string;
    fileName: string;
    createdAt: string;
}

const imageSchema = new Schema<IImage>({
    originalName:{
        type: String,
        required: true
    },
    path:{
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    createdAt:{
        type: String,
        required: true
    }
});

const ImageModel = mongoose.model<IImage>('Images', imageSchema);

export default ImageModel;