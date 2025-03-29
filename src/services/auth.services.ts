// "use server"

import { httpErrorReturn } from '@/utils/htpp';
import { http } from './http/index';
import { ILoginUserDataResponse, ILoginUserRequest, ILoginUserResponse } from './interfaces/user.interface';
import { AxiosError } from 'axios';
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
            console.log("data", data);
            if(data?.status === 401){
                return httpErrorReturn(401, "E-mail ou senha inválidos.", undefined);
            }
            return httpErrorReturn(500, "Não foi possível fazer o login, por favor, tente novamente.", undefined);
        }catch(e){
            const error = e as AxiosError;
            if(error?.status === 401){
                return httpErrorReturn(401, "E-mail ou senha inválidos.", undefined);
            }
            return httpErrorReturn(500, "Não foi possível fazer o login, por favor, tente novamente.", undefined);
        }
    }
}
const authServices = new AuthServices(); 
export default authServices;