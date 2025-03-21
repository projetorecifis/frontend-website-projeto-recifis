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
export interface IPostLectureBodyRequest{
    title: string;
    description: string;
    speakers: string;
    image: IImage;
    oldImage?: string;
}

export interface IGetAllLecturesDataResponse{
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    speakers: string;
    image: IImage;
};

export interface IGetAllLecturesResponse{
    status: number;
    message: string;
    data?: {
        lectures?: IGetAllLecturesDataResponse[];
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

export interface IPostLectureResponse extends IGenericResponse{
    data?: any;
}