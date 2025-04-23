export interface ILoginUserRequest{
    email: string,
    password: string
}

export interface IUserDataResponse{
    _id: string,
    email: string,
    name: string,
    isAdmin: boolean,
    token: string
}

export interface IUserResponse{
    status: number,
    message: string,
    data?: IUserDataResponse
}

export interface IGetAllUsersResponse{
    status: number,
    message: string,
    data?: IUserDataResponse[]
}

export interface ISignUpUserRequest{
    email: string,
    password: string
    name: string
}

export interface IEditUserRequest{
    email: string,
    name: string,
    isAdmin: boolean
}