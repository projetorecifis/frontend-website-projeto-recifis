import axios from 'axios';

export const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
        'Accept': 'application/json',
        'Content' : 'application/json'
    }
})

export const httpMultFormData = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
        'Content-Type': 'multipart/form-data',
        'Accept': 'multipart/form-data',
        'Content' : 'application/json'
    }
})
