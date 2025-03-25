import UsersModel from "../models/users.model";

class UsersRepositories{  
    async getUserByEmail(email: string){
        const user = await UsersModel.findOne({email: email});
        return user;
    }

}

export default new UsersRepositories();