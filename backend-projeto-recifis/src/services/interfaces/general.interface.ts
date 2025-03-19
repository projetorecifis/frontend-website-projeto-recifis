export interface IGenericResponse{
    status: number;
    message: string;
}

export interface IErrorType{
    errorType: "GENERIC-ERROR" | "FILE-NOT-FOUND" | "CLOUDINARY-ERROR" | "MONGODB-ERROR";
}