export interface ILoginUserRequest{
    email: string,
    password: string
}

export interface ILoginUserDataResponse{
    _id: string,
    email: string,
    name: string,
    isAdmin: boolean,
    token: string
}

export interface ILoginUserResponse{
    status: number,
    message: string,
    data?: ILoginUserDataResponse
}