export interface IError {
    message: string;
    status: number;
}

export class GenericError extends Error implements IError{
    constructor() {
        super('An technical error has occured');
    }
    status = 500;
}

export class FileNotFoundError extends Error implements IError{
    constructor() {
        super('File was not found');
    }
    status = 400;
}

export class CloudinaryError extends Error implements IError{
    constructor() {
        super('An technical error has occured on Cloudinary');
    }
    status = 500;
}

export class MongoDBError extends Error implements IError{
    constructor() {
        super('An technical error has occured on MongoDB');
    }
    status = 500;
}

// export class BadRequestError extends Error implements IError {
//     constructor() {
//         super('An technical error has occured');
//     }
//     status = 500;
// }


// export type ErrorTypes = ApiError

// export interface UseCaseError {
//     message: string;
//     errorCode: number;
// }
// export class GenericError extends Error implements UseCaseError {
//     constructor() {
//         super('An technical error has occured')
//     }
//     errorCode = 500;
// }

// export class SwitchboardSuncoError extends Error implements UseCaseError {
//     constructor() {
//         super('An technical error has occured on SwitchboardSunco')
//     }
//     errorCode = 502;
// }

// export class EventZendeskError extends Error implements UseCaseError {
//     constructor() {
//         super('An technical error has occured on EventZendeskApi')
//     }
//     errorCode = 502;
// }

