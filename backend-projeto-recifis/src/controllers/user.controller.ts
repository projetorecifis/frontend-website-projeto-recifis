import UserServices from '../services/user.services';
import { Request, Response } from 'express';


class UserController{
    // public async getTeste(req:Request, res:Response) :Promise<any>{
    //     const response = await UserServices.singUpUser();
    //     return res.json(response);
    // }
    public async signInUser(req:Request, res:Response) :Promise<any>{
        const user = req.body;
        const response = await UserServices.signInUser(user)
        return res.json(response)
    }

    // public async verifyAuth(req:Request, res:Response) :Promise< UserInterface | any>{
    //     res.json({error: false, message: "Autenticado com sucesso!"})
    // }

}

export default new UserController()