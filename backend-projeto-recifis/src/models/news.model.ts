import mongoose, { Document, Schema } from "mongoose";
import { IImage } from "../services/interfaces/general.interface";

interface INews extends Document {
    title: string;
    description: string;
    speakers: string[];
    createdAt: string;
    image: IImage;
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
            size: {
                type: Number,
                required: false
            },
            publicId: {
                type: String,
                required: true
            },
            assetId:{
                type: String,
                required: true
            },
            versionId:{
                type: String,
                required: true
            },
            signature:{
                type: String,
                required: true
            },
            createdAt:{
                type: String,
                required: false
            }
        }
    }
});

const NewsModel = mongoose.model<INews>('News', newsSchema);

export default NewsModel;