// import UserRepositories from '../repositories/user.repositories'
// import UserModel from '../models/user.model'
// import bcrypt from 'bcrypt'
// import JWT from '../config/jwt'

class UserServices{    
    async singUpUser(){
        try{
           console.log("opa");
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