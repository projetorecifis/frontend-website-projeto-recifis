"use server"
import { z } from "zod";
import { SignInFormSchema } from "../lib/definitions";
import AuthServices from "@/services/auth.services";
import { getCookies, setCookies } from "@/utils/cookies";
import { jwtVerify } from 'jose'
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

const encodedKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_KEY as string);


export async function signIn(formData: z.infer<typeof SignInFormSchema>) {

    const validatedFields = SignInFormSchema.safeParse({
        email: formData.email as string,
        password: formData.password as string,
    });

    console.log("validatedFields =>", validatedFields);

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const response = await AuthServices.signInUser(formData);
    console.log("response =>", response);

    if(response?.data !== undefined && response?.status === 200){
        await setCookies("token", response.data?.token);
    }

    return{
        message: response.message,
        status: response.status,
        data: response?.data
    }

}

function parseJwt (token: string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

export async function getToken(){
    const token = await getCookies("token");
  
    if (token !== undefined){  
        return parseJwt(token.toString());
    }
    return null;
}

export async function signOut() {
    await cookies().delete('token');
    redirect('/login');
}

export async function decrypt(session: string | undefined = '') {
    try {
      const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ['HS256'],
      })
      return payload;
    } catch{
        console.log('Failed to verify session');
        return null;
      
    }
  }