import 'server-only'
import { z } from 'zod';

import { cookies } from 'next/headers'
const message = "Campo obrigatório"
const messageNomeNoticia = "O nome da notícia deve ter no máximo 250 caracteres"

export const SignInFormSchema = z.object({
    email: z.string().min(1, message).max(250, messageNomeNoticia),
    password: z.string().min(1, message),
});

export type FormState = 
    | {
        errors?:{
            email?: string;
            password?: string;
        }
        message?: string;
    }
    | undefined;

 
export async function deleteToken() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    }