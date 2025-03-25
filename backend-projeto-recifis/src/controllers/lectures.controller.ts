import { Request, Response } from 'express';
import LecturesServices from '../services/lectures.services';
import { Middleware } from '../middleware/middleware';

class LecturesController{
    public async getAllLectures(req:Request, res:Response) :Promise<any>{
        const { page = 1, limit = 15 } = req.query;
        
        const response = await LecturesServices.getAllLectures(page, limit);

        // const middleware = new Middleware();
        // const verifyResponse = middleware.verify(response);

        // middleware.verifyResponse(verifyResponse)

        // return res.json(middleware.formatResponse(response));

        return res.json(response);
    }
    public async postLecture(req:Request, res:Response) :Promise<any>{
        const response = await LecturesServices.postLecture(req);

        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }
    public async updateLecture(req:Request, res:Response) :Promise<any>{
        const response = await LecturesServices.updateLecture(req);

        console.log(response)

        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }

    public async deleteLecture(req:Request, res:Response) :Promise<any>{
        const response = await LecturesServices.deleteLecture(req);

        console.log(response)

        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }

}

export default new LecturesController()