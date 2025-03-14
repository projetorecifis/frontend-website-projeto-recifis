export interface ICreateNewsRequest{
    title: string,
    description: string,
    listSpeakers: string[],
    mainSpeaker: string,
    image: File
}