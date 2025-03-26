import axios from 'axios';
import { httpMultFormData, http } from './http/index';
import { INewsRequest, INewsErrorResponse, INewsResponse } from './interfaces/news.interface';
import  AxiosError from 'axios';
import { htppErrorReturn } from '@/utils/htpp';
import { metadata } from '@/app/layout';

class NewsServices{
    createFormData(request : INewsRequest){
        var formData = new FormData();
        formData.append("title", request.title);
        formData.append("subtitle", request.subtitle);
        formData.append("text", request.text);
        
        if(request?.image) formData.append("image", request.image); 
        if(request?.publicId) formData.append("publicId", request.publicId);

        return formData;
    }

    async getAllNews(page: string, limit: number){
        try{
            const response = await http.get<INewsResponse>(`${process.env.NEXT_PUBLIC_API_URL}/news/getAll?page=${Number(page)}&limit=${limit}`);
            console.log(response.data.data.metaData)
            return {
                data: {
                    news: response.data.data.news,
                    metaData: response.data.data.metaData,
                },
                message: response.data.message,
                status: response.data.status
            };
        }catch(error){
            if(error instanceof AxiosError){
                return htppErrorReturn((await error).status, (await error).statusText, undefined);
            }
            return htppErrorReturn(500, 'Não foi possível buscar as notícias', undefined);
        }
    }
    async getNewsById(id: string){
        const response = await http.get(`${process.env.NEXT_PUBLIC_API_URL}/news/get/${id}`);
        return response;
    }
    async createNews(request: INewsRequest): Promise<any>{
        try{
            const formData = this.createFormData(request);   
            
            const response = await httpMultFormData.post(`${process.env.NEXT_PUBLIC_API_URL}/news/create`, formData);
            console.log(response)
            return {
                data: response,
                status: 200,
                message: "Notícia criada com sucesso",
            }
        }catch(error: any){  
            console.log(error);
            return{
                status: error?.status,
                message: 'Não foi possível criar a notícia'
            }
        }
    }
    async updateNews(request: INewsRequest): Promise<any>{
        try{
            const formData = this.createFormData(request);

            const response = await httpMultFormData.put(`${process.env.NEXT_PUBLIC_API_URL}/news/update/${request._id}`, formData);
            console.log(response)
            return {
                data: request,
                status: 200,
                message: "Notícia criada com sucesso",
            }
        }catch(error: any){  
            console.log(error);
            return{
                status: error?.status,
                message: 'Não foi possível criar a notícia'
            }
        }
    }

    async deleteNew(id: string, imageId: string){
        try{
            await http.delete(`${process.env.NEXT_PUBLIC_API_URL}/news/delete/${id}?image=${imageId}`);
            return {
                status: 200,
                message: "Notícia deletada com sucesso",
            }
        }catch(error){
            if(error instanceof AxiosError){
                return htppErrorReturn((await error).status, (await error).statusText, undefined);
            }
            return htppErrorReturn(500, 'Não foi possível deletar a notícia', undefined);
        }
    }


}

export default new NewsServices();