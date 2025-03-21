import NewsRespositories from "../repositories/news.repositories";
import { Request, Response } from 'express';
import { IGetAllNewsResponse, IPostNewBodyRequest, IPostNewResponse } from "./interfaces/news.interface";
import QueryString from "qs";
import NewsModel from "../models/news.model";
import cloudinary from "../utils/cloudinary";
import { FileNotFoundError, GenericError } from "../helpers/api-errors";
import { error } from "console";
import { IErrorType } from "./interfaces/general.interface";
class NewsServices{    
    async getAllNews(
        page: string | QueryString.ParsedQs | 1 | (string | QueryString.ParsedQs)[], 
        limit: string | QueryString.ParsedQs | (string | QueryString.ParsedQs)[] | 15) 
        :Promise<IGetAllNewsResponse | IErrorType >
    {
        try{
           const countNews = await NewsModel.countDocuments();
           if(countNews !== 0){
            let lastPage = 1;
            lastPage = Math.ceil(countNews / Number(limit));
            const skip = (Number(page) - 1) * Number(limit);

            const { data, metaData } = await NewsRespositories.getAllNews(skip, Number(limit), Number(page));

            return {
                status: 200,
                message: "News were found",
                data: {
                    news: data,
                    metaData: metaData
                },
            }
           }
           return{
                status: 400,
                message: "No news were found",
                data:{
                    metaData: {
                        currentPage: 1,
                        itemsPerPage: 1,
                        lastPage: 1,
                        totalItems: 0
                    }
                }
            }
           
        }catch(error){
            return { errorType: 'GENERIC-ERROR' }
        }
    }
    
    async postNew(req: Request) : Promise<IPostNewResponse | IErrorType>{
        try{
            const file = req?.file;
            const body: IPostNewBodyRequest = req.body;

            if(file){
                const cloudinaryResponse = await cloudinary.uploadImage(file);
                
                if(cloudinaryResponse?.status === 200 && cloudinaryResponse?.data){
                    const response = await NewsRespositories.postNew(cloudinaryResponse?.data, body);
                    
                    if(response instanceof Error){
                        return { errorType: 'MONGODB-ERROR' }
                    }
                    return{
                        status: 200,
                        message: "It was created successfully",
                        data: response
                    }     
                }
                return{ errorType: 'CLOUDINARY-ERROR' }
            }

            return { errorType: 'FILE-NOT-FOUND' }
        }catch(error){
            return { errorType: 'GENERIC-ERROR' }
        }
    }

    async updateNew(req: Request) :Promise<any>{
        try{
            const file = req?.file;
            const body: IPostNewBodyRequest = req.body;
            const { id } = req.params;

            if(file){
                const cloudinaryResponse = await cloudinary.uploadImage(file);

                if(cloudinaryResponse?.status === 200 && cloudinaryResponse?.data){

                    await cloudinary.deleteImage(req?.body?.oldImage);

                    const response = await NewsRespositories.updateNew(body, id, cloudinaryResponse?.data);
                    console.log(response)

                    if(response instanceof Error){
                        return { errorType: 'MONGODB-ERROR' }
                    }

                    return{
                        status: 200,
                        message: "It was updated successfully",
                        data: response
                    }
                }
                return{ errorType: 'CLOUDINARY-ERROR' }
            }
            const response = await NewsRespositories.updateNew(body, id);
            if(response instanceof Error){
                return { errorType: 'MONGODB-ERROR' }
            }
            return{
                status: 200,
                message: "It was updated successfully",
                data: response
            }
        }catch(error){
            return { errorType: 'GENERIC-ERROR' }
        }
    }

    async deleteNew(req: Request){
        try{
            const { id } = req?.params;
            const { image } = req?.query;
            console.log("id", id)
            console.log("image" , image)
            const response = await NewsRespositories.deleteNew(id);
            console.log(response)
            if(response instanceof Error || !response){
                return { errorType: 'MONGODB-ERROR' }
            }
            await cloudinary.deleteImage(image as string);
            return{
                status: 200,
                message: "It was deleted successfully",
            }

        }catch(error){
            return { errorType: 'GENERIC-ERROR' }
        }
    }
}

export default new NewsServices();