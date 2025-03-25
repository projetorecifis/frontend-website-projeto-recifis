import { UploadApiResponse } from "cloudinary";
import PodcastsModel from "../models/podcasts.model";
import { IPostPodcastBodyRequest } from "../services/interfaces/podcasts.interface";
import { GenericError } from "../helpers/api-errors";
class PodcastsRespositories{    
    async getAllPodcasts(skip: number, limit: number, page: number): Promise<any>{
        try{
            const response = await PodcastsModel.aggregate([
                {
                    $match: {}
                },
                {
                    $facet: {
                        data: [
                            {
                                $skip: skip
                            },
                            {
                                $limit: limit
                            },
                        ],
                        metaData: [
                            {
                                $count: 'totalDocuments',
                            },
                            {
                                $addFields: {
                                    page: page,
                                    totalPages: {
                                        $ceil: {
                                            $divide: ['$totalDocuments', limit]
                                        }
                                    },
                                }
                            }
                        ]
                    }
                }
            ])
            return response[0];
        }catch(error){
            console.log(error);
            return error;
        }
    }

    async postPodcast(fileFromCloudinary: UploadApiResponse, body: IPostPodcastBodyRequest){
        const report = new PodcastsModel({
            title: body.title,
            description: body.description,
            createdAt: new Date().toISOString(),
            link: body.link,
            image: {
                originalName: fileFromCloudinary?.original_filename,
                path: fileFromCloudinary?.secure_url,
                size: fileFromCloudinary?.bytes,
                publicId: fileFromCloudinary?.public_id,
                assetId: fileFromCloudinary?.asset_id,
                versionId: fileFromCloudinary?.version,
                signature: fileFromCloudinary?.signature,
                createdAt: fileFromCloudinary?.created_at
            }
        });
       
        const response = await report.save();

        return response;
    }
 
    async updatePodcast(body: IPostPodcastBodyRequest, id: string, fileFromCloudinary?: UploadApiResponse){
        try{
            if(fileFromCloudinary){
                const response = await PodcastsModel.findOneAndUpdate({_id: id}, {
                    title: body?.title,
                    description: body?.description,
                    link: body?.link,
                    image: {
                        originalName: fileFromCloudinary?.original_filename,
                        path: fileFromCloudinary?.secure_url,
                        size: fileFromCloudinary?.bytes,
                        publicId: fileFromCloudinary?.public_id,
                        assetId: fileFromCloudinary?.asset_id,
                        versionId: fileFromCloudinary?.version,
                        signature: fileFromCloudinary?.signature,
                        createdAt: fileFromCloudinary?.created_at
                    }
                });
                return response;
            }
            const response = await PodcastsModel.findOneAndUpdate({_id: id}, {
                title: body?.title,
                description: body?.description,
                link: body?.link,
            });

            return response
            
        }catch(error){
            console.log(error);
            return error;
        }
    }     

    async deletePodcast(id: string){
        const response = await PodcastsModel.findOneAndDelete({_id: id});
        return response;
    }
}

export default new PodcastsRespositories();