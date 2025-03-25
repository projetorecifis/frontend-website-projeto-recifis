import axios from 'axios';
import { httpMultFormData, http } from './http/index';
import { IPodcastsRequest, IPodcastsErrorResponse, IPodcastsResponse } from './interfaces/podcasts.interface';
import  AxiosError from 'axios';
import { htppErrorReturn } from '@/utils/htpp';
import { metadata } from '@/app/layout';

class PodcastsServices{
    createFormData(request : IPodcastsRequest){
        
        var formData = new FormData();
        formData.append("title", request.title);
        formData.append("description", request.description);
        formData.append("link", request.link);
        
        if(request?.image) formData.append("image", request.image); 
        if(request?.publicId) formData.append("publicId", request.publicId);

        return formData;
    }

    async getAllPodcasts(page: string, limit: number){
        try{
            const response = await http.get<IPodcastsResponse>(`${"http://localhost:3003"}/podcasts/getAll?page=${Number(page)}&limit=${limit}`);
            console.log(response.data.data.metaData)
            return {
                data: {
                    podcasts: response.data.data.podcasts,
                    metaData: response.data.data.metaData,
                },
                message: response.data.message,
                status: response.data.status
            };
        }catch(error){
            if(error instanceof AxiosError){
                return htppErrorReturn((await error).status, (await error).statusText, undefined);
            }
            return htppErrorReturn(500, 'Não foi possível buscar os podcasts', undefined);
        }
    }
    async getPodcastsById(id: string){
        const response = await http.get(`${"http://localhost:3003"}/podcasts/get/${id}`);
        return response;
    }
    async createPodcasts(request: IPodcastsRequest): Promise<any>{
        try{
            const formData = this.createFormData(request);   
            
            const response = await httpMultFormData.post(`${"http://localhost:3003"}/podcasts/create`, formData);
            console.log(response)
            return {
                data: response,
                status: 200,
                message: "Podcast criado com sucesso",
            }
        }catch(error: any){  
            console.log(error);
            return{
                status: error?.status,
                message: 'Não foi possível criar o podcast'
            }
        }
    }
    async updatePodcasts(request: IPodcastsRequest): Promise<any>{
        try{
            const formData = this.createFormData(request);

            const response = await httpMultFormData.put(`${"http://localhost:3003"}/podcasts/update/${request._id}`, formData);
            console.log(response)
            return {
                data: request,
                status: 200,
                message: "Podcast criado com sucesso",
            }
        }catch(error: any){  
            console.log(error);
            return{
                status: error?.status,
                message: 'Não foi possível criar o podcast'
            }
        }
    }

    async deletePodcast(id: string, imageId: string){
        try{
            await http.delete(`${"http://localhost:3003"}/podcasts/delete/${id}?image=${imageId}`);
            return {
                status: 200,
                message: "Podcast deletado com sucesso",
            }
        }catch(error){
            if(error instanceof AxiosError){
                return htppErrorReturn((await error).status, (await error).statusText, undefined);
            }
            return htppErrorReturn(500, 'Não foi possível deletar o podcast', undefined);
        }
    }


}

export default new PodcastsServices();