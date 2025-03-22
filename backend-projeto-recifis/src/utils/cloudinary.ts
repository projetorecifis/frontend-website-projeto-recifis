
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { IUploadImageCloudinaryResponse } from '../services/interfaces/news.interface';
import { CloudinaryError } from '../helpers/api-errors';
import crypto from "crypto";

class Cloudinary{    
    async uploadImage(file: Express.Multer.File) :Promise<IUploadImageCloudinaryResponse>{
        const uploadResult: UploadApiResponse = await cloudinary.uploader
        .upload(
            file?.path, {
                public_id: file?.originalname.replace(/\s/g, ''),
            }
        )
        .catch((error) => {
            console.log(error);
            throw new CloudinaryError();
        });

        return{
            status: 200,
            message: "Image was uploaded",
            data: uploadResult
        }
    }

    generateSHA1 =(data: any) => {
        const hash = crypto.createHash("sha1");
        hash.update(data);
        return hash.digest("hex");
    }
    
    generateSignature = (publicId: string, apiSecret: string) => {
        const timestamp = new Date().getTime();
        return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    };

    getPublicIdFromUrl = (url: string) => {
        const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;

        const match = url.match(regex);
        return match ? match[1] : undefined;
    };

    async deleteImage(publicId: string) : Promise<IUploadImageCloudinaryResponse>{
        console.log(publicId)
        if(publicId){
            await cloudinary.uploader
                .destroy(publicId)
                .catch((error) => {
                    console.log(error);
                    throw new CloudinaryError();
                });

            return{
                status: 200,
                message: "Image was deleted",
            }
        }

        throw new CloudinaryError(); 
    }
 
}

export default new Cloudinary();





























// import dotenv from "dotenv"
// import multer, { Multer } from 'multer';
// import { v2 as cloudinary, UploadApiResponse, 
// UploadApiErrorResponse } from 'cloudinary';
// import sharp from 'sharp';

// interface CloudinaryFile extends Express.Multer.File {
//     buffer: Buffer;
//    }

// export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const files: CloudinaryFile[] = req.files as CloudinaryFile[];
//       if (!files || files.length === 0) {
//         return next(new Error('No files provided'));
//       }
//       const cloudinaryUrls: string[] = [];
//       for (const file of files) {
//         const resizedBuffer: Buffer = await sharp(file.buffer)
//           .resize({ width: 800, height: 600 })
//           .toBuffer();
   
//         const uploadStream = cloudinary.uploader.upload_stream(
//           {
//             resource_type: 'auto',
//             folder: 'your-cloudinary-folder-name',
//           } as any,
//           (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
//             if (err) {
//               console.error('Cloudinary upload error:', err);
//               return next(err);
//             }
//             if (!result) {
//               console.error('Cloudinary upload error: Result is undefined');
//               return next(new Error('Cloudinary upload result is undefined'));
//             }
//             cloudinaryUrls.push(result.secure_url);
   
//             if (cloudinaryUrls.length === files.length) {
//               //All files processed now get your images here
//               req.body.cloudinaryUrls = cloudinaryUrls;
//               next();
//             }
//           }
//         );
//         uploadStream.end(resizedBuffer);
//       }
//     } catch (error) {
//       console.error('Error in uploadToCloudinary middleware:', error);
//       next(error);
//     }
//    };