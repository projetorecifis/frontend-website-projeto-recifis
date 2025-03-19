import { UploadApiResponse } from "cloudinary";
import NewsModel from "../models/content.model";
import ImageModel from "../models/image.moodel";
import { IPostNewBodyRequest } from "../services/interfaces/content.interface";
import { GenericError } from "../helpers/api-errors";
class ContentRepositories{    
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
            description: body.description,
            createdAt: new Date().toISOString(),
            speakers: body.speakers,
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
 

    // async postImage(file: Express.Multer.File){
    //     try{
    //         const image = new ImageModel({
    //             originalName: file?.originalname,
    //             path: file?.path,
    //             fileName: file?.filename,
    //             createdAt: new Date().toISOString()
    //         });

    //         const response = await image.save();

    //         return{
    //             status: 200,
    //             message: "Image was saved",
    //             data: response
    //         }   
    //     }catch(error){
    //         return{
    //             status: 500,
    //             message: "error"
    //         }
    //     }
    // }

    async updateNew(body: IPostNewBodyRequest, id: string, fileFromCloudinary?: UploadApiResponse){
        try{
            if(fileFromCloudinary){
                const response = await NewsModel.findOneAndUpdate({_id: id}, {
                    title: body?.title,
                    description: body?.description,
                    speakers: body?.speakers,
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
                description: body?.description,
                speakers: body?.speakers,
            });

            return response
            
        }catch(error){
            console.log(error);
            return error;
        }
    }     
}

export default new ContentRepositories();