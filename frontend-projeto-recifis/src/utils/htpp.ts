export const htppErrorReturn = (status: number, message: string, data?: undefined) => {
    return {
        status,
        message,
        data
    }
};