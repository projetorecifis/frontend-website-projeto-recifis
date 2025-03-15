export interface ICreateNewsRequest{
    title: string,
    description: string,
    listSpeakers: string[] | null,
    mainSpeaker: string,
    image: File
}

export interface INewsImage{
    fileName: string,
    originalName: string,
    path: string,
    size: number,
}

export interface INewsDataResponse{
    title: string,
    description: string,
    speakers: string,
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
    metaData: INewsMetaDataResponse[],
    data: INewsDataResponse[],
    message: string;
    status: number;
}

export interface INewsErrorResponse{
    status: number,
    message: string
}