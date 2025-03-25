export interface ILecturesRequest{
    _id?: string,
    title: string,
    description: string,
    listSpeakers: string[] | null,
    mainSpeaker: string,
    link: string,
    image?: File
    publicId?: string
}

export interface ILecturesImage{
    originalName: string;
    path: string;
    size: number;
    publicId: string;
    assetId: string;
    versionId: string;
    signature: string;
    createdAt: string;
}

export interface ILecturesDataResponse{
    title: string,
    description: string,
    speakers: string,
    image: ILecturesImage,
    link: string,
    createdAt: string,
    _id: string
}

export interface ILecturesMetaDataResponse{
    totalPages: number,
    page: number,
    totalDocuments: number
}
export interface ILecturesResponse{
    data: {
        lectures: ILecturesDataResponse[],
        metaData: ILecturesMetaDataResponse[]
    },
    message: string;
    status: number;
}

export interface ILecturesErrorResponse{
    status: number,
    message: string
}