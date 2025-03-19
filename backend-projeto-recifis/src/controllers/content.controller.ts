import { Request, Response } from 'express';
import ContentServices from '../services/content.services';
import { Middleware } from '../middleware/middleware';

class ContentController{
    public async getAllNews(req:Request, res:Response) :Promise<any>{
        const { page = 1, limit = 15 } = req.query;
        
        const response = await ContentServices.getAllNews(page, limit);

        // const middleware = new Middleware();
        // const verifyResponse = middleware.verify(response);

        // middleware.verifyResponse(verifyResponse)

        // return res.json(middleware.formatResponse(response));

        return res.json(response);
    }
    public async postNew(req:Request, res:Response) :Promise<any>{
        const response = await ContentServices.postNew(req);

        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }
    public async updateNew(req:Request, res:Response) :Promise<any>{
        const response = await ContentServices.updateNew(req);

        console.log(response)

        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }

    public async deleteNew(req:Request, res:Response) :Promise<any>{
        console.log(req)
        // const response = await ContentServices.deleteNew(req);

        // console.log(response)

        // const middleware = new Middleware();
        // const verifyResponse = middleware.verifyResponse(response);

        // const formatResponse = middleware.formatResponse(verifyResponse)

        // return res.status(formatResponse.status).json(formatResponse);
    }

}

export default new ContentController()