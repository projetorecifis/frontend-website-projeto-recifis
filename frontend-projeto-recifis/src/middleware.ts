import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookies } from "./utils/cookies";
import { decrypt} from "./app/actions/auth";

const protectedRoutes = ["/dashboard", "/dashboard/noticias/adicionar", "/dashboard/noticias"];
const publicRoutes = ["/login", "/quem-somos", "/conteudos", "/noticias" , "/"];
// const loginRoute = ["/login"];

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    // const isLoginRoute = loginRoute.includes(path)

    if(isProtectedRoute){
        const token = await getCookies("token");
        const payload = await decrypt(token);
        console.log("payload:::: ", payload);

        if(payload === null || !payload?.id){
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }
    }


}

export const config = {
    matcher: ['/dashboard/:path*', '/login']
};
