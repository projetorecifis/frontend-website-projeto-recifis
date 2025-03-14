import mongoose, { Document, Schema } from "mongoose";

export interface INews extends Document {
    title: string;
    description: string;
    speakers: string[];
    createdAt: string;
    image: IImage;
}

export interface IImage{
    originalName: string;
    path: string;
    fileName: string;
}

const newsSchema = new Schema<INews>({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    speakers:{
        type: [String],
        required: true
    },
    createdAt:{
        type: String,
        required: true
    },
    image:{
        type: Object,
        properties: {
            originalName: {
                type: String,
                required: true
            },
            path: {
                type: String,
                required: true
            },
            fileName: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            }
        }
    }
});

const NewsModel = mongoose.model<INews>('News', newsSchema);

export default NewsModel;