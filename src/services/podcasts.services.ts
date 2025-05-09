import { httpMultFormData, http } from './http/index';
import { IPodcastsRequest, IPodcastsDataResponse, IPodcastsApiDataResponse, IGetAllPodcastsResponse } from './interfaces/podcasts.interface';
import { httpErrorReturn } from '@/utils/htpp';

class PodcastsServices{
    createFormData(request : IPodcastsRequest){
        
        const formData = new FormData();
        formData.append("title", request.title);
        formData.append("description", request.description);
        formData.append("link", request.link);
        formData.append("speakers", JSON.stringify(request.speakers));
        
        if(request?.image) formData.append("image", request.image); 
        if(request?.publicId) formData.append("publicId", request.publicId);

        return formData;
    }

    async getAllPodcasts(page: string, limit: number): Promise<IGetAllPodcastsResponse>{
        try{
            const response = await http.get<IPodcastsApiDataResponse>(`${process.env.NEXT_PUBLIC_API_URL}/podcasts/getAll?page=${Number(page)}&limit=${limit}`);
           
            return {
                data: {
                    podcasts: response.data.data.podcasts,
                    metaData: response.data.data.metaData,
                },
                message: response.data.message,
                status: response.data.status
            };
        }catch{
            return httpErrorReturn(500, 'Não foi possível buscar os podcasts', undefined);
        }
    }
    async getPodcastsById(id: string){
        const response = await http.get(`${process.env.NEXT_PUBLIC_API_URL}/podcasts/get/${id}`);
        return response;
    }
    async createPodcasts(request: IPodcastsRequest){
        try{
            const formData = this.createFormData(request);   
            
            const response = await httpMultFormData.post<IPodcastsDataResponse | undefined>(`${process.env.NEXT_PUBLIC_API_URL}/podcasts/create`, formData);
            
            return {
                data: response,
                status: 200,
                message: "Podcast criado com sucesso",
            }
        }catch{  
            return httpErrorReturn(500, 'Não foi possível criar o podcast', undefined);
        }
    }
    async updatePodcasts(request: IPodcastsRequest){
        try{
            const formData = this.createFormData(request);

            await httpMultFormData.put(`${process.env.NEXT_PUBLIC_API_URL}/podcasts/update/${request._id}`, formData);
            
            return {
                data: request,
                status: 200,
                message: "Podcast criado com sucesso",
            }
        }catch{  
            return httpErrorReturn(500, 'Não foi possível criar o podcast', undefined);
        }
    }

    async deletePodcast(id: string, imageId: string){
        try{
            await http.delete(`${process.env.NEXT_PUBLIC_API_URL}/podcasts/delete/${id}?image=${imageId}`);
            return {
                status: 200,
                message: "Podcast deletado com sucesso",
            }
        }catch{
            return httpErrorReturn(500, 'Não foi possível deletar o podcast', undefined);
        }
    }


}
const podcastServices = new PodcastsServices();
export default podcastServices;