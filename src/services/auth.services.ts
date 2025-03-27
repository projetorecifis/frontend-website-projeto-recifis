// "use server"

import { htppErrorReturn } from '@/utils/htpp';
import { http } from './http/index';
import { ILoginUserDataResponse, ILoginUserRequest, ILoginUserResponse } from './interfaces/user.interface';
import AxiosError from 'axios';

class AuthServices{
    async signInUser(user: ILoginUserRequest): Promise<ILoginUserResponse>{
        try{
            const { data } = await http.post<ILoginUserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, user);
            const response = data?.data as ILoginUserDataResponse;

            if(data?.status === 200){
                console.log(data)
                return {
                    status: 200,
                    message: "Usuário logado com sucesso!",
                    data: response
                }           
            }
            return{
                status: 500,
                message: "Não foi possível fazer o login, por favor, tente novamente."
            }
        }catch(error){
            if(error instanceof AxiosError){
                if((await error).status === 401){
                    return htppErrorReturn(401, "E-mail ou senha inválidos.", undefined);
                }
            }
            return htppErrorReturn(500, "Não foi possível fazer o login, por favor, tente novamente.", undefined);
        }
    }
}

export default new AuthServices();