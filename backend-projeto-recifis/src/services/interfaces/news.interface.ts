import { UploadApiResponse } from "cloudinary";
import { IGenericResponse } from "./general.interface";

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
export interface IPostNewBodyRequest{
    title: string;
    subtitle: string;
    text: string;
    image: IImage;
}

export interface IGetAllNewsDataResponse{
    _id: string;
    title: string;
    subtitle: string;
    text: string;
    createdAt: string;
    image: IImage;
};

export interface IGetAllNewsResponse{
    status: number;
    message: string;
    data?: {
        news?: IGetAllNewsDataResponse[];
        metaData?: {
            currentPage: number;
            lastPage: number;
            totalItems: number;
            itemsPerPage: number;
        }
    }
};

export interface IUploadImageCloudinaryResponse{
    status: number;
    message: string;
    data?: UploadApiResponse;
}

export interface IPostNewResponse extends IGenericResponse{
    data?: any;
}