import ContentRepositories from "../repositories/content.repositories";
import { Request, Response } from 'express';
import { IPostNewBodyRequest } from "./interfaces/content.interface";

class ContentServices{    
    async getAllNews(){
        try{
           const response = await ContentRepositories.getAllNews();
           return {
                status: 200,
                message: "News were found",
                data: response
            }
        }catch(error){
            console.log(error);
            return error;
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
}

export default new ContentServices();