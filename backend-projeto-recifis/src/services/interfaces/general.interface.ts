export interface IGenericResponse{
    status: number;
    message: string;
}

export interface IErrorType{
    errorType: "GENERIC-ERROR" | "FILE-NOT-FOUND" | "CLOUDINARY-ERROR" | "MONGODB-ERROR";
}

export interface IImage{
    originalName: string;
    path: string;
    size: number;
    publicId: string;
    assetId: string;
    versionId: string;
    signature: string;
    createdAt: string;
}