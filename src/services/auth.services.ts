// "use server"

import { httpErrorReturn } from '@/utils/htpp';
import { http } from './http/index';
import { IUserDataResponse, ILoginUserRequest, IGetAllUsersResponse, ISignUpUserRequest, IUserResponse, IEditUserRequest } from './interfaces/user.interface';
import { AxiosError } from 'axios';
import { getCookies } from '@/utils/cookies';
import { errorGetUsers, succesUserLoggedInSuccessfully, 
    errorEmailOrPasswordInvalid, errorLoginWasNotPossible, 
    errorDeleteUser, successUserWasDeleted,
    successUsersWereFound , errorEmailAlreadyExists,
    succesUserSignedUpSuccessfully,
    errorSignUpUser,
    successUserWasEdited,
    errorEditUser,
    errorNotPermitted
} from './messages/auth.messages';
class AuthServices{

    async getAllUsers(){
        try{
            const token = await getCookies("token");
          
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

    async signInUser(user: ILoginUserRequest): Promise<IUserResponse>{
        try{
            const { data } = await http.post<IUserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users/signin`, user);
            const response = data?.data as IUserDataResponse;
            
            if(data?.status === 200){
                return {
                    status: 200,
                    message: succesUserLoggedInSuccessfully,
                    data: response
                }           
            }
           
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
            console.debug("error auth::", e);
            const error = e as AxiosError;

            if(error?.status === 401){
                return httpErrorReturn(401, errorEmailOrPasswordInvalid, undefined);
            }
            return httpErrorReturn(500, errorLoginWasNotPossible, undefined);
        }
    }

    async signUpUser(user: ISignUpUserRequest): Promise<IUserResponse>{
        try{
            const token = await getCookies("token");

            const { data } = await http.post<IUserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users/signup`, user, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const response = data?.data as IUserDataResponse;

            if(data?.status === 200){
                return {
                    status: 200,
                    message: succesUserSignedUpSuccessfully,
                    data: response
                }           
            }

            throw new Error(errorSignUpUser);
        }catch(e){
            console.debug("error auth::", e);
            const error = e as AxiosError;

            if(error?.status === 400){
                return httpErrorReturn(
                    400, 
                    errorEmailAlreadyExists, 
                    undefined
                );
            }
            if(error?.status === 403){
                return httpErrorReturn(
                    403, 
                    errorNotPermitted, 
                    undefined
                );
            }
            return httpErrorReturn(
                500, 
                errorSignUpUser, 
                undefined
            );
        }
    }

    async deleteUserById(id: string): Promise<IUserResponse>{
        try{
            const token = await getCookies("token");
            
            const { data } = await http.delete<IUserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users/delete/${id}`, {
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
        }catch(e){
            console.debug("error edit auth::", e);
            const error = e as AxiosError;

            if(error?.status === 403){
                return httpErrorReturn(
                    403, 
                    errorNotPermitted, 
                    undefined
                );
            }
            return httpErrorReturn(
                500, 
                errorDeleteUser, 
                undefined
            );
        }
    }

    async editUser(id: string, user: IEditUserRequest): Promise<IUserResponse>{
        try{
            const token = await getCookies("token");
            
            const { data } = await http.put<IUserResponse>(`${process.env.NEXT_PUBLIC_API_URL}/users/update/${id}`, user, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            const response = data?.data as IUserDataResponse;

            if(data?.status === 200){
                return {
                    status: 200,
                    message: successUserWasEdited,
                    data: response
                }           
            }
            return httpErrorReturn(
                500, 
                errorEditUser, 
                undefined
            );
        }catch(e){
            console.debug("error edit auth::", e);
            const error = e as AxiosError;

            if(error?.status === 403){
                return httpErrorReturn(
                    403, 
                    errorNotPermitted, 
                    undefined
                );
            }
            return httpErrorReturn(
                500, 
                errorEditUser, 
                undefined
            );
        }
    }
}
const authServices = new AuthServices(); 
export default authServices;