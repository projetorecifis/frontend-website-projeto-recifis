import axios from 'axios';
import { httpMultFormData, http } from './http/index';
import { ILecturesRequest, ILecturesErrorResponse, ILecturesResponse } from './interfaces/lectures.interface';
import  AxiosError from 'axios';
import { htppErrorReturn } from '@/utils/htpp';
import { metadata } from '@/app/layout';

class LecturesServices{
    createFormData(request : ILecturesRequest){
        const speakers = request.listSpeakers || [];
        speakers.unshift(request.mainSpeaker);
        
        var formData = new FormData();
        formData.append("title", request.title);
        formData.append("description", request.description);
        formData.append("speakers", JSON.stringify(speakers));
        formData.append("link", request.link);
        
        if(request?.image) formData.append("image", request.image); 
        if(request?.publicId) formData.append("publicId", request.publicId);

        return formData;
    }

    async getAllLectures(page: string, limit: number){
        try{
            const response = await http.get<ILecturesResponse>(`${"http://localhost:3003"}/lectures/getAll?page=${Number(page)}&limit=${limit}`);
            console.log(response.data.data.metaData)
            return {
                data: {
                    lectures: response.data.data.lectures,
                    metaData: response.data.data.metaData,
                },
                message: response.data.message,
                status: response.data.status
            };
        }catch(error){
            if(error instanceof AxiosError){
                return htppErrorReturn((await error).status, (await error).statusText, undefined);
            }
            return htppErrorReturn(500, 'Não foi possível buscar as Palestras', undefined);
        }
    }
    async getLecturesById(id: string){
        const response = await http.get(`${"http://localhost:3003"}/lectures/get/${id}`);
        return response;
    }
    async createLectures(request: ILecturesRequest): Promise<any>{
        try{
            const formData = this.createFormData(request);   
            
            const response = await httpMultFormData.post(`${"http://localhost:3003"}/lectures/create`, formData);
            console.log(response)
            return {
                data: response,
                status: 200,
                message: "Palestra criada com sucesso",
            }
        }catch(error: any){  
            console.log(error);
            return{
                status: error?.status,
                message: 'Não foi possível criar a palestra'
            }
        }
    }
    async updateLectures(request: ILecturesRequest): Promise<any>{
        try{
            const formData = this.createFormData(request);

            const response = await httpMultFormData.put(`${"http://localhost:3003"}/lectures/update/${request._id}`, formData);
            console.log(response)
            return {
                data: request,
                status: 200,
                message: "Palestra criada com sucesso",
            }
        }catch(error: any){  
            console.log(error);
            return{
                status: error?.status,
                message: 'Não foi possível criar a palestra'
            }
        }
    }

    async deleteLecture(id: string, imageId: string){
        try{
            await http.delete(`${"http://localhost:3003"}/lectures/delete/${id}?image=${imageId}`);
            return {
                status: 200,
                message: "Palestra deletada com sucesso",
            }
        }catch(error){
            if(error instanceof AxiosError){
                return htppErrorReturn((await error).status, (await error).statusText, undefined);
            }
            return htppErrorReturn(500, 'Não foi possível deletar a palestra', undefined);
        }
    }


}

export default new LecturesServices();