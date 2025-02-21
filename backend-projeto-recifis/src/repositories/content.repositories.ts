import NewsModel from "../models/content.model";

class ContentRepositories{    
    async getAllNews(){
        try{
            const response = NewsModel.find();
            return response;
        }catch(error){
            console.log(error);
            return error;
        }
    }

    async postNew(){
        try{
            console.log("opa af");
            console.log("ue")

            const data = {
                title: "mel",
                description: "tata"
            }

            const newContent = new NewsModel(data);
            const response = await newContent.save();

            return response;
         
        }catch(error){
            console.log(error);
            return error;
        }
    }
 
}

export default new ContentRepositories();