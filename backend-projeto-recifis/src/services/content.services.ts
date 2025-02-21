import ContentRepositories from "../repositories/content.repositories";

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
 
}

export default new ContentServices();