import ContentRepositories from "../repositories/content.repositories";
import { Request, Response } from 'express';
import { IGetAllNewsResponse, IPostNewBodyRequest } from "./interfaces/content.interface";
import QueryString from "qs";
import NewsModel from "../models/content.model";

class ContentServices{    
    async getAllNews(
        page: string | QueryString.ParsedQs | 1 | (string | QueryString.ParsedQs)[], 
        limit: string | QueryString.ParsedQs | (string | QueryString.ParsedQs)[] | 15) 
        :Promise<IGetAllNewsResponse>
    {
        try{
           const countNews = await NewsModel.countDocuments();
           if(countNews !== 0){
            let lastPage = 1;
            lastPage = Math.ceil(countNews / Number(limit));
            const skip = (Number(page) - 1) * Number(limit);

            const { data, metaData } = await ContentRepositories.getAllNews(skip, Number(limit), Number(page));
            const response = {

            }
            return {
                status: 200,
                message: "News were found",
                data: data,
                metaData: metaData
            }
           }
           return{
                status: 400,
                message: "No news were found",
            }
           
        }catch(error){
            console.log(error);
            return{
                status: 500,
                message: "Internal server error",
            }
        }
    }
    
    async postNew(req:Request) :Promise<any>{
        try{
            const file = req?.file;
            const body: IPostNewBodyRequest = req.body;

            if(file){
                const response = await ContentRepositories.postNew(file, body);
                console.log(response)
                return{
                    status: 200,
                    message: "Teste",
                    data: response
                }
            }
            return{
                status: 400,
                message: "File not found"
            }
        }catch(error){
            console.log(error);
            return{
                status: 500,
                message: error
            }
        }
    }

    async updateNew(req:Request) :Promise<any>{
        try{
            const file = req?.file;
            const body: IPostNewBodyRequest = req.body;
            const { id } = req.params;

            if(file){
                const response = await ContentRepositories.updateNew(file, body, id);
                console.log(response)
                return{
                    status: 200,
                    message: "Teste",
                    data: response
                }
            }
            return{
                status: 400,
                message: "File not found"
            }
        }catch(error){
            console.log(error);
            return{
                status: 500,
                message: error
            }
        }
    }
}

export default new ContentServices();