import axios from 'axios';
import { httpMultFormData, http } from './http/index';
import { ICreateNewsRequest, INewsErrorResponse, INewsResponse } from './interfaces/news.interface';
import  AxiosError from 'axios';
import { htppErrorReturn } from '@/utils/htpp';

class NewsServices{
    async getAllNews(page: string, limit: number){
        try{
            const response = await http.get<INewsResponse>(`http://localhost:3003/content/news/getAll?page=${Number(page)}&limit=${limit}`);
 
            return {
                data: response.data.data,
                metaData: response.data.metaData,
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
        const response = await http.get(`http://localhost:3003/news/get/${id}`);
        return response;
    }
    async createNews(request: ICreateNewsRequest): Promise<any>{
        try{
            const speakers = request.listSpeakers || [];
            speakers.unshift(request.mainSpeaker);
            console.log(speakers)
            var formData = new FormData();
            formData.append("title", request.title);
            formData.append("description", request.description);
            formData.append("speakers", JSON.stringify(speakers));
            formData.append("image", request.image);   
            const response = await httpMultFormData.post('http://localhost:3003/content/news/create', formData);
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
}

export default new NewsServices();