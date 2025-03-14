import axios from 'axios';
import { httpMultFormData, http } from './http/index';
import { ICreateNewsRequest } from './interfaces/news.interface';

class NewsServices{
    async getNews(){
        const response = await fetch('http://localhost:3000/news');
        const news = await response.json();
        return news;
    }
    // async getNewsById(id){
    //     const response = await fetch(`http://localhost:3000/news/${id}`);
    //     const news = await response.json();
    //     return news;
    // }
    async createNews(request: ICreateNewsRequest): Promise<any>{
        try{
            const speakers = request.listSpeakers;
            speakers.unshift(request.mainSpeaker);
         
            var formData = new FormData();
            formData.append("title", request.title);
            formData.append("description", request.description);
            formData.append("speakers", JSON.stringify(speakers));
            formData.append("image", request.image);   
            const response = await httpMultFormData.post('http://localhost:3000/content/news/test', formData);

            return response;
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