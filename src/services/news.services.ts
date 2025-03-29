import { httpMultFormData, http } from './http/index';
import { INewsRequest, INewsResponse } from './interfaces/news.interface';
import { httpErrorReturn } from '@/utils/htpp';

class NewsServices{
    createFormData(request : INewsRequest){
        const formData = new FormData();
        formData.append("title", request.title);
        formData.append("subtitle", request.subtitle);
        formData.append("text", request.text);
        
        if(request?.image) formData.append("image", request.image); 
        if(request?.publicId) formData.append("publicId", request.publicId);

        return formData;
    }

    async getAllNews(page: string, limit: number){
        try{
            const response = await http.get<INewsResponse>(`${"http://localhost:3003"}/news/getAll?page=${Number(page)}&limit=${limit}`);
            console.log(response.data.data.metaData)
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
        const response = await http.get(`${"http://localhost:3003"}/news/get/${id}`);
        return response;
    }
    async createNews(request: INewsRequest){
        try{
            const formData = this.createFormData(request);   
            
            const response = await httpMultFormData.post(`${"http://localhost:3003"}/news/create`, formData);
            console.log(response)
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

            const response = await httpMultFormData.put(`${"http://localhost:3003"}/news/update/${request._id}`, formData);
            console.log(response)
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
            await http.delete(`${"http://localhost:3003"}/news/delete/${id}?image=${imageId}`);
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