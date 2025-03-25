import UsersModel from "../models/users.model";


export interface IUserResponse{
    _id: string,
    isAdmin: boolean,
    email: string,
    password: string,
    name: string
}

class UsersRepositories{  
    async getUserByEmail(email: string): Promise<any>{
        const user = await UsersModel.findOne({email: email});
        const userResponse = user ? {
            _id: user._id,
            isAdmin: user?.isAdmin,
            email: user.email,
            password: user.password,
            name: user?.name
        } : null;
        return userResponse;
    }

    async createUser(user: any){
        const newUser = new UsersModel(user);
        const response = await newUser.save();
        console.log("ue", response)
        return response;
    }

}

export default new UsersRepositories();