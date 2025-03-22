import { Request, Response } from 'express';
import PodcastsServices from '../services/podcasts.services';
import { Middleware } from '../middleware/middleware';

class PodcastsController{
    public async getAllPodcasts(req:Request, res:Response) :Promise<any>{
        const { page = 1, limit = 15 } = req.query;
        
        const response = await PodcastsServices.getAllPodcasts(page, limit);

        // const middleware = new Middleware();
        // const verifyResponse = middleware.verify(response);

        // middleware.verifyResponse(verifyResponse)

        // return res.json(middleware.formatResponse(response));

        return res.json(response);
    }
    public async postPodcast(req:Request, res:Response) :Promise<any>{
        const response = await PodcastsServices.postPodcast(req);

        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }
    public async updatePodcast(req:Request, res:Response) :Promise<any>{
        const response = await PodcastsServices.updatePodcast(req);

        console.log(response)

        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }

    public async deletePodcast(req:Request, res:Response) :Promise<any>{
        const response = await PodcastsServices.deletePodcast(req);

        console.log(response)

        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }

}

export default new PodcastsController()