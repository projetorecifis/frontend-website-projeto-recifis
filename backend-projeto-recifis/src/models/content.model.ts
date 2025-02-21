import mongoose, { Document, Schema } from "mongoose";

export interface INews extends Document {
    title: string;
    description: string;
}

const newsSchema = new Schema<INews>({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

const NewsModel = mongoose.model<INews>('News', newsSchema);

export default NewsModel;