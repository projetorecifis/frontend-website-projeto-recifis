import { UploadApiResponse } from "cloudinary";
import { IGenericResponse, IImage } from "./general.interface";

export interface IPostPodcastBodyRequest{
    title: string;
    description: string;
    speakers: string;
    link: string;
    image: IImage;
    oldImage?: string;
}

export interface IGetAllPodcastsDataResponse{
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    speakers: string;
    link: string;
    image: IImage;
};

export interface IGetAllPodcastsResponse{
    status: number;
    message: string;
    data?: {
        podcasts?: IGetAllPodcastsDataResponse[];
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

export interface IPostPodcastResponse extends IGenericResponse{
    data?: any;
}