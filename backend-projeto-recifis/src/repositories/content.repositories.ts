import NewsModel from "../models/content.model";
import { Request } from "express";
import ImageModel from "../models/image.moodel";
import { IPostNewBodyRequest } from "../services/interfaces/content.interface";
class ContentRepositories{    
    async getAllNews(){
        try{
            const response = NewsModel.find();
            return response;
        }catch(error){
            console.log(error);
            return error;
        }
    }

    async postNew(file: Express.Multer.File, body: IPostNewBodyRequest){
        try{
            const report = new NewsModel({
                title: body.title,
                description: body.description,
                createdAt: new Date().toISOString(),
                speakers: body.speakers,
                image: {
                    originalName: file?.originalname,
                    path: file?.path,
                    fileName: file?.filename,
                    size: file?.size
                }
            });
            const response = await report.save();
            console.log(file);
            console.log(body);
            return response;   
        }catch(error){
            console.log(error);
            return error;
        }
    }
 

    async postImage(file: Express.Multer.File){
        try{
            const image = new ImageModel({
                originalName: file?.originalname,
                path: file?.path,
                fileName: file?.filename,
                createdAt: new Date().toISOString()
            });

            const response = await image.save();

            return{
                status: 200,
                message: "Image was saved",
                data: response
            }   
        }catch(error){
            return{
                status: 500,
                message: "error"
            }
        }
    }
 
}

export default new ContentRepositories();