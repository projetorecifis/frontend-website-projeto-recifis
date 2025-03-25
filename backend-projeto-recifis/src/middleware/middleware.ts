import { failure, FailureOrSuccess, success } from "./failure-or-success";
import { FileNotFoundError, GenericError, CloudinaryError, MongoDBError, EmailAlreadyExistsError, UnauthorizedError } from "../helpers/api-errors";

export interface IMiddleware<T> {
    formatResponse(response: any): any,
    verifyResponse(response: any): any
}

type GenericResponse = FailureOrSuccess<any, any>;

export class Middleware<T> implements IMiddleware<T>{

    formatResponse(response: GenericResponse) {
        if(response?.isFailure()){
            console.log(response);
            return {
                status: response.value.status,
                message: response.value.message
            }
        }
        return {
            status: response.value.status,
            message: response.value.message,
            data: response.value.data
        }
    }

    verifyResponse(data: any){
        if('errorType' in data){
            const error = {
                'GENERIC-ERROR': new GenericError(),
                'FILE-NOT-FOUND': new FileNotFoundError(),
                'CLOUDINARY-ERROR': new CloudinaryError(),
                'MONGODB-ERROR': new MongoDBError(),
                'EMAIL-EXISTS': new EmailAlreadyExistsError(),
                'UNAUTHORIZED-ERROR': new UnauthorizedError()
            };
            const errorTypeKey = data.errorType as keyof typeof error;
         
            const fail = failure(error[errorTypeKey]);
            return fail;
        }
        return success(data);
    }
}