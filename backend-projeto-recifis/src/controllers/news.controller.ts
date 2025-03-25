import { Request, Response } from 'express';
import NewsServices from '../services/news.services';
import { Middleware } from '../middleware/middleware';

class NewsController{
    public async getAllNews(req:Request, res:Response) :Promise<any>{
        const { page = 1, limit = 15 } = req.query;
        
        const response = await NewsServices.getAllNews(page, limit);

        // const middleware = new Middleware();
        // const verifyResponse = middleware.verify(response);

        // middleware.verifyResponse(verifyResponse)

        // return res.json(middleware.formatResponse(response));

        return res.json(response);
    }
    public async postNew(req:Request, res:Response) :Promise<any>{
        const response = await NewsServices.postNew(req);

        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }
    public async updateNew(req:Request, res:Response) :Promise<any>{
        const response = await NewsServices.updateNew(req);

        console.log(response)

        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }

    public async deleteNew(req:Request, res:Response) :Promise<any>{
        const response = await NewsServices.deleteNew(req);

        console.log(response)

        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }

}

export default new NewsController()