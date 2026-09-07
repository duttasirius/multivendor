import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl

  const publicRoutes = [
    "/login","/register","/about","/contact"
]

if(publicRoutes.some((path)=>pathname.startsWith(path))){
    return NextResponse.next()
}

const session = await auth();
//checking inside auth if user is logged in 

if(!session){
    // Check if the user is not authenticated.
    
    const loginUrl = new URL("/login" , request.url);
    // Create the login URL using the same domain as the current request.
    
    loginUrl.searchParams.set("callbackUrl" , request.url);
    // Store the current URL so the user can return to it after login.
    
    return NextResponse.redirect(loginUrl)
    // Redirect the unauthenticated user to the login page.
}
return NextResponse.next()

}
 
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}