import LecturesRespositories from "../repositories/lectures.repositories";
import { Request } from 'express';
import { IGetAllLecturesResponse, IPostLectureBodyRequest, IPostLectureResponse } from "./interfaces/lectures.interface";
import QueryString from "qs";
import LecturesModel from "../models/lectures.model";
import cloudinary from "../utils/cloudinary";
import { IErrorType } from "./interfaces/general.interface";
class LecturesServices{    
    async getAllLectures(
        page: string | QueryString.ParsedQs | 1 | (string | QueryString.ParsedQs)[], 
        limit: string | QueryString.ParsedQs | (string | QueryString.ParsedQs)[] | 15) 
        :Promise<IGetAllLecturesResponse | IErrorType >
    {
        try{
           const countLectures = await LecturesModel.countDocuments();
           
           if(countLectures !== 0){
            let lastPage = 1;
            lastPage = Math.ceil(countLectures / Number(limit));
            const skip = (Number(page) - 1) * Number(limit);

            const { data, metaData } = await LecturesRespositories.getAllLectures(skip, Number(limit), Number(page));

            return {
                status: 200,
                message: "Lectures were found",
                data: {
                    lectures: data,
                    metaData: metaData
                },
            }
           }
           return{
                status: 400,
                message: "No lectures were found",
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
    
    async postLecture(req: Request) : Promise<IPostLectureResponse | IErrorType>{
        try{
            const file = req?.file;
            const body: IPostLectureBodyRequest = req.body;

            if(file){
                const cloudinaryResponse = await cloudinary.uploadImage(file);
                
                if(cloudinaryResponse?.status === 200 && cloudinaryResponse?.data){
                    const response = await LecturesRespositories.postLecture(cloudinaryResponse?.data, body);
                    
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

    async updateLecture(req: Request) :Promise<any>{
        try{
            const file = req?.file;
            const body: IPostLectureBodyRequest = req.body;
            const { id } = req.params;

            if(file){
                const cloudinaryResponse = await cloudinary.uploadImage(file);

                if(cloudinaryResponse?.status === 200 && cloudinaryResponse?.data){

                    await cloudinary.deleteImage(req?.body?.publicId as string);

                    const response = await LecturesRespositories.updateLecture(body, id, cloudinaryResponse?.data);
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
            const response = await LecturesRespositories.updateLecture(body, id);
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

    async deleteLecture(req: Request){
        try{
            const { id } = req?.params;
            const { image } = req?.query;

            const response = await LecturesRespositories.deleteLecture(id);
            
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

export default new LecturesServices();