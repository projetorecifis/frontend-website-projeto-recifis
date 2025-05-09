export interface IPodcastsRequest{
    _id?: string,
    title: string,
    speakers: string[],
    description: string,
    link: string,
    image?: File
    publicId?: string
}

export interface IPodcastsImage{
    originalName: string;
    path: string;
    size: number;
    publicId: string;
    assetId: string;
    versionId: string;
    signature: string;
    createdAt: string;
}

export interface IPodcastsDataResponse{
    title: string,
    description: string,
    image: IPodcastsImage,
    speakers: string,
    link: string,
    createdAt: string,
    _id: string
}

export interface IPodcastsMetaDataResponse{
    totalPages: number,
    page: number,
    totalDocuments: number
}
export interface IPodcastsApiDataResponse{
    data: {
        podcasts: IPodcastsDataResponse[],
        metaData: IPodcastsMetaDataResponse[]
    },
    message: string;
    status: number;
}

export interface IGetAllPodcastsResponse{
    status: number,
    message: string,
    data?: IPodcastsApiDataResponse["data"]
}

export interface ICreateOrUpdatePodcastsResponse{
    status: number,
    message: string,
    data?: IPodcastsDataResponse
}