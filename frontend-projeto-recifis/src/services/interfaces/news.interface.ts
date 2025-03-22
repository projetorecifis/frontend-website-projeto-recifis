export interface INewsRequest{
    _id?: string,
    title: string,
    subtitle: string,
    text: string,
    image?: File
    publicId?: string
}

export interface INewsImage{
    originalName: string;
    path: string;
    size: number;
    publicId: string;
    assetId: string;
    versionId: string;
    signature: string;
    createdAt: string;
}

export interface INewsDataResponse{
    title: string,
    subtitle: string,
    text: string,
    image: INewsImage,
    createdAt: string,
    _id: string
}

export interface INewsMetaDataResponse{
    totalPages: number,
    page: number,
    totalDocuments: number
}
export interface INewsResponse{
    data: {
        news: INewsDataResponse[],
        metaData: INewsMetaDataResponse[]
    },
    message: string;
    status: number;
}

export interface INewsErrorResponse{
    status: number,
    message: string
}