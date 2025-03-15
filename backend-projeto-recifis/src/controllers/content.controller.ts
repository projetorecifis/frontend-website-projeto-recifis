import { Request, Response } from 'express';
import ContentServices from '../services/content.services';

class ContentController{
    public async getAllNews(req:Request, res:Response) :Promise<any>{
        const { page = 1, limit = 15 } = req.query;
    
        const response = await ContentServices.getAllNews(page, limit);

        return res.json(response);
    }
    public async postNew(req:Request, res:Response) :Promise<any>{
        console.log(req.body);
        console.log(req.file);
  
        const response = await ContentServices.postNew(req);
        return res.json(response);
    }
    public async updateNew(req:Request, res:Response) :Promise<any>{
        const response = await ContentServices.updateNew(req);
        return res.json(response);
    }

}

export default new ContentController()