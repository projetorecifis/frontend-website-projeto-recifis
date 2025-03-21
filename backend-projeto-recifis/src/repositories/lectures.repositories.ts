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

    async updateLecture(body: IPostLectureBodyRequest, id: string, fileFromCloudinary?: UploadApiResponse){
        try{
            if(fileFromCloudinary){
                const response = await LecturesModel.findOneAndUpdate({_id: id}, {
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
            const response = await LecturesModel.findOneAndUpdate({_id: id}, {
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

    async deleteLecture(id: string){
        const response = await LecturesModel.findOneAndDelete({_id: id});
        return response;
    }
}

export default new LecturesRespositories();