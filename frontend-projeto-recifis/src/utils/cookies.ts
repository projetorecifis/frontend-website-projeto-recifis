"use server"

import { cookies } from "next/headers"

export const getCookies = async(name: string) => {
    return await cookies().get(name)?.value;
}

export const setCookies = async(name: string, value: string) => {
    return await cookies().set({
        name,
        value,
        maxAge: 30 * 60 * 60, // 30 minutes
        httpOnly: true,
        secure: true
    });
}
