// "use server"

import { httpErrorReturn } from '@/utils/htpp';
import { http } from './http/index';
import { IUserDataResponse, ILoginUserRequest, ILoginUserResponse, IGetAllUsersResponse } from './interfaces/user.interface';
import { AxiosError } from 'axios';
import { getCookies } from '@/utils/cookies';
import { errorGetUsers, succesUserLoggedInSuccessfully, 
    errorEmailOrPasswordInvalid, errorLoginWasNotPossible, 
    errorDeleteUser, successUserWasDeleted,
    successUsersWereFound 
} from './messages/auth.messages';
class AuthServices{

    async getAllUsers(){
        try{
            const token = await getCookies("token");
            console.log(token)
          
            const { data } = await http.get<IGetAllUsersResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users/getAll`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const response = data?.data as IUserDataResponse[];

            if(data?.status === 200){
                return {
                    status: 200,
                    message: successUsersWereFound,
                    data: response
                }           
            }
            return httpErrorReturn(
                500, 
                errorGetUsers, 
                undefined
            );
        }catch{
            return httpErrorReturn(
                500, 
                errorGetUsers, 
                undefined
            );
        }
    }

    async signInUser(user: ILoginUserRequest): Promise<ILoginUserResponse>{
        try{
            const { data } = await http.post<ILoginUserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, user);
            const response = data?.data as IUserDataResponse;
            console.log("response signInUser::", response);
            if(data?.status === 200){
                console.log(data)
                return {
                    status: 200,
                    message: succesUserLoggedInSuccessfully,
                    data: response
                }           
            }
            console.log("data", data);
            if(data?.status === 401){
                return httpErrorReturn(
                    401, 
                    errorEmailOrPasswordInvalid, 
                    undefined
                );
            }
            return httpErrorReturn(
                500, 
                errorLoginWasNotPossible, 
                undefined
            );
        }catch(e){
            console.log("error auth::", e);
            const error = e as AxiosError;

            if(error?.status === 401){
                return httpErrorReturn(401, errorEmailOrPasswordInvalid, undefined);
            }
            return httpErrorReturn(500, errorLoginWasNotPossible, undefined);
        }
    }

    async deleteUserById(id: string): Promise<ILoginUserResponse>{
        try{
            const token = await getCookies("token");
            
            const { data } = await http.delete<ILoginUserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users/delete/${id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const response = data?.data as IUserDataResponse;

            if(data?.status === 200){
                return {
                    status: 200,
                    message: successUserWasDeleted,
                    data: response
                }           
            }
            return httpErrorReturn(
                500, 
                errorDeleteUser, 
                undefined
            );
        }catch{
            return httpErrorReturn(
                500, 
                errorDeleteUser, 
                undefined
            );
        }
    }
}
const authServices = new AuthServices(); 
export default authServices;