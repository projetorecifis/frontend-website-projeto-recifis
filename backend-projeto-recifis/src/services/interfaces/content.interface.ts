export interface IPostNewBodyRequest{
    title: string;
    description: string;
    speakers: string;
    image: File;
}

export interface IGetAllNewsDataResponse{
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    speakers: string;
    image: {
        originalName: string;
        fileName: string;
        size: number;
    }
};

export interface IGetAllNewsResponse{
    status: number;
    message: string;
    data?: IGetAllNewsDataResponse[];
    metaData?: {
        currentPage: number;
        lastPage: number;
        totalItems: number;
        itemsPerPage: number;
    }
};