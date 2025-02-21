import { Request, Response } from 'express';
import ContentServices from '../services/content.services';

class ContentController{
    public async getAllNews(req:Request, res:Response) :Promise<any>{
        const response = await ContentServices.getAllNews();
        return res.json(response);
    }


}

export default new ContentController()