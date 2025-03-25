// "use server"

import { setCookies } from '@/utils/cookies';
import { http } from './http/index';
import { ILoginUserDataResponse, ILoginUserRequest, ILoginUserResponse } from './interfaces/user.interface';

class AuthServices{
    async signInUser(user: ILoginUserRequest): Promise<ILoginUserResponse>{
        try{
            const { data } = await http.post<ILoginUserResponse>(`${"http://localhost:3003"}/users/signin`, user);
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
        }catch(error: any){
    
            if(error?.status === 401){
                return{
                    status: 401,
                    message: "E-mail ou senha inválidos."
                }
            }
            return{
                status: 500,
                message: "Não foi possível fazer o login, por favor, tente novamente."
            }
        }
    }
}

export default new AuthServices();