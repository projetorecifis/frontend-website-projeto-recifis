// import UserRepositories from '../repositories/user.repositories'
// import UserModel from '../models/user.model'
// import bcrypt from 'bcrypt'
// import JWT from '../config/jwt'
import UserRepositories from "../repositories/users.repositories";

class UserServices{   
    // public async getUserByEmail(email: string){
    //     try{
    //         if(email){
    //             const response = await UserRepositories.getUserByEmail(email);
    //             return {
    //                 status: 200,
    //                 message: "ok",
    //                 data: response
    //             }
    //         }
    //         return {
    //             status: 400,
    //             message: "Email not found"
    //         }
    //     }catch(error){
    //         console.log(error);
    //         return{
    //             status: 500,
    //             message: "Internal server error"
    //         }
    //     }
    // }
    
    public async singUpUser(){
        try{
            return {
                status: 200,
                message: "ok"
            }
        }catch(error){
            console.log(error);
            return error;
        }
    }

    async signInUser(user: any){
        try{
           console.log("opa", user);
           if(user?.email){
                const response = await UserRepositories.getUserByEmail(user.email);
                console.log(response);

                if(!!response){
                     return {
                          status: 400,
                          message: "Email already exists",
                          data: response
                     }
                }
           }
           return {
             status: 200,
             message: "ok"
           }
        }catch(error){
            console.log(error);
            return error;
        }
    }
 
}

export default new UserServices();