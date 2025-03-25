import { UploadApiResponse } from "cloudinary";
import NewsModel from "../models/news.model";
import ImageModel from "../models/lectures.model";
import { IPostNewBodyRequest } from "../services/interfaces/news.interface";
import { GenericError } from "../helpers/api-errors";
class NewsRespositories{    
    async getAllNews(skip: number, limit: number, page: number): Promise<any>{
        try{
            const response = await NewsModel.aggregate([
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

    async postNew(fileFromCloudinary: UploadApiResponse, body: IPostNewBodyRequest){
        const report = new NewsModel({
            title: body.title,
            subtitle: body.subtitle,
            text: body.text,
            createdAt: new Date().toISOString(),
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
 

    async updateNew(body: IPostNewBodyRequest, id: string, fileFromCloudinary?: UploadApiResponse){
        try{
            if(fileFromCloudinary){
                const response = await NewsModel.findOneAndUpdate({_id: id}, {
                    title: body?.title,
                    subtitle: body?.subtitle,
                    text: body?.text,
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
            const response = await NewsModel.findOneAndUpdate({_id: id}, {
                title: body?.title,
                subtitle: body?.subtitle,
                text: body?.text
            });

            return response
            
        }catch(error){
            console.log(error);
            return error;
        }
    }     

    async deleteNew(id: string){
        const response = await NewsModel.findByIdAndDelete(id);
        return response;
    }
}

export default new NewsRespositories();