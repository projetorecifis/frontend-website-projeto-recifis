import { Middleware } from '../middleware/middleware';
import UserServices from '../services/user.services';
import { Request, Response } from 'express';


class UserController{
    // public async getTeste(req:Request, res:Response) :Promise<any>{
    //     const response = await UserServices.singUpUser();
    //     return res.json(response);
    // }
    public async signInUser(req:Request, res:Response) :Promise<any>{
        const body = req.body;
        const response = await UserServices.signInUser(body)
        
        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }

    public async signUpUser(req:Request, res:Response) :Promise<any>{
        const body = req.body;
        const response = await UserServices.signUpUser(body)
        
        const middleware = new Middleware();
        const verifyResponse = middleware.verifyResponse(response);

        const formatResponse = middleware.formatResponse(verifyResponse)

        return res.status(formatResponse.status).json(formatResponse);
    }

    // public async verifyAuth(req:Request, res:Response) :Promise< UserInterface | any>{
    //     res.json({error: false, message: "Autenticado com sucesso!"})
    // }

}

export default new UserController()