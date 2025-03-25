import { UploadApiResponse } from "cloudinary";
import LecturesModel from "../models/lectures.model";
import { IPostLectureBodyRequest } from "../services/interfaces/lectures.interface";
import { GenericError } from "../helpers/api-errors";
class LecturesRespositories{    
    async getAllLectures(skip: number, limit: number, page: number): Promise<any>{
        try{
            const response = await LecturesModel.aggregate([
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

    async postLecture(fileFromCloudinary: UploadApiResponse, body: IPostLectureBodyRequest){
        const report = new LecturesModel({
            title: body.title,
            description: body.description,
            createdAt: new Date().toISOString(),
            speakers: body.speakers,
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
 

    async updateLecture(body: IPostLectureBodyRequest, id: string, fileFromCloudinary?: UploadApiResponse){
        try{
            if(fileFromCloudinary){
                const response = await LecturesModel.findOneAndUpdate({_id: id}, {
                    title: body?.title,
                    description: body?.description,
                    speakers: body?.speakers,
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
            const response = await LecturesModel.findOneAndUpdate({_id: id}, {
                title: body?.title,
                description: body?.description,
                speakers: body?.speakers,
                link: body?.link,
            });

            return response
            
        }catch(error){
            console.log(error);
            return error;
        }
    }     

    async deleteLecture(id: string){
        const response = await LecturesModel.findOneAndDelete({_id: id});
        return response;
    }
}

export default new LecturesRespositories();