import { httpMultFormData, http } from './http/index';
import { INewsRequest, INewsResponse } from './interfaces/news.interface';
import { httpErrorReturn } from '@/utils/htpp';

class NewsServices{
    createFormData(request : INewsRequest){
        const formData = new FormData();
        formData.append("title", request.title);
        formData.append("subtitle", request.subtitle);
        formData.append("text", request.text);
        formData.append("isInTop", request.isInTop.toString());
        
        if(request?.image) formData.append("image", request.image); 
        if(request?.publicId) formData.append("publicId", request.publicId);
        if(request?.link) formData.append("link", request.link);

        return formData;
    }

    async getAllNews(page: string, limit: number){
        try{
            const response = await http.get<INewsResponse>(`${process.env.NEXT_PUBLIC_API_URL}/news/getAll?page=${Number(page)}&limit=${limit}`);
            
            return {
                data: {
                    news: response.data.data.news,
                    metaData: response.data.data.metaData,
                },
                message: response.data.message,
                status: response.data.status
            };
        }catch{
            return httpErrorReturn(500, 'Não foi possível buscar as notícias', undefined);
        }
    }
    async getNewsById(id: string){
        const response = await http.get(`${process.env.NEXT_PUBLIC_API_URL}/news/get/${id}`);
        return response;
    }
    async createNews(request: INewsRequest){
        try{
            const formData = this.createFormData(request);   
            
            const response = await httpMultFormData.post(`${process.env.NEXT_PUBLIC_API_URL}/news/create`, formData);
            
            return {
                data: response,
                status: 200,
                message: "Notícia criada com sucesso",
            }
        }catch{  
            return httpErrorReturn(500, 'Não foi possível criar a notícia', undefined);
        }
    }
    async updateNews(request: INewsRequest){
        try{
            const formData = this.createFormData(request);

            await httpMultFormData.put(`${process.env.NEXT_PUBLIC_API_URL}/news/update/${request._id}`, formData);
            
            return {
                data: request,
                status: 200,
                message: "Notícia criada com sucesso",
            }
        }catch{  
            return httpErrorReturn(500, 'Não foi possível atualizar a notícia', undefined);
        }
    }

    async deleteNew(id: string, imageId: string){
        try{
            await http.delete(`${process.env.NEXT_PUBLIC_API_URL}/news/delete/${id}?image=${imageId}`);
            return {
                status: 200,
                message: "Notícia deletada com sucesso",
            }
        }catch{
            return httpErrorReturn(500, 'Não foi possível deletar a notícia', undefined);
        }
    }


}
const newsServices = new NewsServices();
export default newsServices