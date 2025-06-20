
import { httpMultFormData, http } from './http/index';
import { ILecturesRequest, ILecturesResponse } from './interfaces/lectures.interface';
import { httpErrorReturn } from '@/utils/htpp';

class LecturesServices{
    createFormData(request : ILecturesRequest){
        const speakers = request.listSpeakers || [];
        speakers.unshift(request.mainSpeaker);
        
        const formData = new FormData();
        formData.append("title", request.title);
        formData.append("description", request.description);
        formData.append("speakers", JSON.stringify(speakers));
        formData.append("link", request.link);
        formData.append("isInCarousel", request.isInCarousel.toString());
        
        if(request?.image) formData.append("image", request.image); 
        if(request?.publicId) formData.append("publicId", request.publicId);

        return formData;
    }

    async getAllLectures(page: string, limit: number){
        try{
            const response = await http.get<ILecturesResponse>(`/lectures/getAll?page=${Number(page)}&limit=${limit}`);
            
            return {
                data: {
                    lectures: response.data.data.lectures,
                    metaData: response.data.data.metaData,
                },
                message: response.data.message,
                status: response.data.status
            };
        }catch{
            return httpErrorReturn(500, 'Não foi possível buscar as Palestras', undefined);
        }
    }
    async getLecturesById(id: string){
        const response = await http.get(`/lectures/get/${id}`);
        return response;
    }
    async createLectures(request: ILecturesRequest){
        try{
            const formData = this.createFormData(request);   
            
            const response = await httpMultFormData.post(`/lectures/create`, formData);
           
            return {
                data: response,
                status: 200,
                message: "Palestra criada com sucesso",
            }
        }catch{  
            return httpErrorReturn(500, 'Não foi possível criar a palestra', undefined);
        }
    }
    async updateLectures(request: ILecturesRequest){
        try{
            const formData = this.createFormData(request);

            await httpMultFormData.put(`/lectures/update/${request._id}`, formData);
            
            return {
                data: request,
                status: 200,
                message: "Palestra criada com sucesso",
            }
        }catch{  
            return httpErrorReturn(500, 'Não foi possível atualizar a palestra', undefined);
        }
    }

    async deleteLecture(id: string, imageId: string){
        try{
            await http.delete(`/lectures/delete/${id}?image=${imageId}`);
            return {
                status: 200,
                message: "Palestra deletada com sucesso",
            }
        }catch{
            return httpErrorReturn(500, 'Não foi possível deletar a palestra', undefined);
        }
    }


}
const lecturesServices = new LecturesServices();
export default lecturesServices;