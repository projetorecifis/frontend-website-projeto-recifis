import mongoose, { Document, Schema } from "mongoose";
import { IImage } from "../services/interfaces/general.interface";

interface IPodcasts extends Document {
    title: string;
    description: string;
    link: string;
    createdAt: string;
    image: IImage;
}

const podcastsSchema = new Schema<IPodcasts>({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdAt:{
        type: String,
        required: true
    },
    link:{
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

const PodcastsModel = mongoose.model<IPodcasts>('Podcasts', podcastsSchema);

export default PodcastsModel;