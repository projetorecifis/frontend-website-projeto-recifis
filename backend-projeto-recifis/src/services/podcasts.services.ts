import PodcastsRespositories from "../repositories/podcasts.repositories";
import { Request } from 'express';
import { IGetAllPodcastsResponse, IPostPodcastBodyRequest, IPostPodcastResponse } from "./interfaces/podcasts.interface";
import QueryString from "qs";
import PodcastsModel from "../models/podcasts.model";
import cloudinary from "../utils/cloudinary";
import { IErrorType } from "./interfaces/general.interface";
class PodcastsServices{    
    async getAllPodcasts(
        page: string | QueryString.ParsedQs | 1 | (string | QueryString.ParsedQs)[], 
        limit: string | QueryString.ParsedQs | (string | QueryString.ParsedQs)[] | 15) 
        :Promise<IGetAllPodcastsResponse | IErrorType >
    {
        try{
           const countPodcasts = await PodcastsModel.countDocuments();
           
           if(countPodcasts !== 0){
            let lastPage = 1;
            lastPage = Math.ceil(countPodcasts / Number(limit));
            const skip = (Number(page) - 1) * Number(limit);

            const { data, metaData } = await PodcastsRespositories.getAllPodcasts(skip, Number(limit), Number(page));

            return {
                status: 200,
                message: "Podcasts were found",
                data: {
                    podcasts: data,
                    metaData: metaData
                },
            }
           }
           return{
                status: 400,
                message: "No Podcasts were found",
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
    
    async postPodcast(req: Request) : Promise<IPostPodcastResponse | IErrorType>{
        try{
            const file = req?.file;
            const body: IPostPodcastBodyRequest = req.body;

            if(file){
                const cloudinaryResponse = await cloudinary.uploadImage(file);
                
                if(cloudinaryResponse?.status === 200 && cloudinaryResponse?.data){
                    const response = await PodcastsRespositories.postPodcast(cloudinaryResponse?.data, body);
                    
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

    async updatePodcast(req: Request) :Promise<any>{
        try{
            const file = req?.file;
            const body: IPostPodcastBodyRequest = req.body;
            const { id } = req.params;

            console.log("req file", req.file)
            console.log("req body", req.body)

            if(file){
                const cloudinaryResponse = await cloudinary.uploadImage(file);

                console.log("cloudinaryResponse", cloudinaryResponse)

                if(cloudinaryResponse?.status === 200 && cloudinaryResponse?.data){

                    await cloudinary.deleteImage(req?.body?.publicId as string);

                    const response = await PodcastsRespositories.updatePodcast(body, id, cloudinaryResponse?.data);
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
            const response = await PodcastsRespositories.updatePodcast(body, id);

            if(response instanceof Error){
                return { errorType: 'MONGODB-ERROR' }
            }
            return{
                status: 200,
                message: "It was updated successfully",
                data: response
            }
        }catch(error){
            console.log(error)
            
            return { errorType: 'GENERIC-ERROR' }
        }
    }

    async deletePodcast(req: Request){
        try{
            const { id } = req?.params;
            const { image } = req?.query;

            const response = await PodcastsRespositories.deletePodcast(id);
            
            if(response instanceof Error){
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

export default new PodcastsServices();