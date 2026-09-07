import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDB from "./lib/connectDB"
import User from "./model/user.model"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"


export const { handlers, signIn, signOut, auth } = NextAuth({
// Creates the NextAuth configuration and exports its authentication functions.

providers: [
// Defines the authentication providers that NextAuth will use.

Credentials({
// Creates a Credentials provider for email and password login.

credentials:{
// Defines the credentials fields that will appear in the login process.

email:{label:"Email" , type:"email"},
// Defines the email field and tells NextAuth it is an email input.

password:{label: "Password", type:"password"}
// Defines the password field and hides the entered password.

},

async authorize(credentials , request){
// Runs when the user submits the email and password for authentication.

    await connectDB()
 

    const email = credentials.email as string 
    // Gets the email entered by the user and treats it as a string.

    const password = credentials.password as string
    // Gets the password entered by the user and treats it as a string.

    const user = await User.findOne({email});
    // Searches MongoDB for a user whose email matches the entered email.

    if(!user){
        // Checks whether a user was found.

        throw new Error ("NO USER FOUND")
        // Stops authentication and throws an error if no user exists.
    }

    const isMatch = await bcrypt.compare(password , user.password)
    // Compares the entered password with the hashed password stored in MongoDB.

    if(!isMatch){
         // Checks whether the entered password does not match the stored password.

         throw new Error ("INCORRECT PASSWORD")
         // Stops authentication and throws an error when the password is incorrect.
    }

    return {
        // Returns the authenticated user's information to NextAuth.

        id:user._id.toString(),
        // Converts the MongoDB ObjectId into a string and stores it as the user ID.

        email:user.email,
        // Adds the user's email to the authenticated user object.

        name:user.name,
        // Adds the user's name to the authenticated user object.

        role:user.role
        // Adds the user's role so it can be used for authorization.
    }   
}
}),
Google({
    // need to create from google console API
    clientId:process.env.AUTH_GOOGLE_ID,
    clientSecret:process.env.AUTH_GOOGLE_SECRET
    
})

],


callbacks:{
    // creating user for login with google
   async signIn({user , account}) {

    // Check whether the user is signing in with Google.
    // This logic runs only for Google OAuth sign-ins.
    if(account?.provider === "google"){

        
        await connectDB();

        let DBUser = await User.findOne({email:user.email})
        if(!DBUser){
            DBUser = await User.create({
                name:user.name,
                email:user.email,
                image:user.image
            })
        }

        // Store our MongoDB user's ID and role inside the Auth.js user object
        // so they can be used later in the session and authorization logic.
        user.id = DBUser._id.toString()
        user.role = DBUser.role.toString()

    }

    // Returning true allows the sign-in process to continue.
    return true
}, 



// Defines callbacks that run during the NextAuth authentication flow.

// user coming from provider return user
// The user object returned from authorize() is available here.

jwt({token , user}) {
// Runs whenever NextAuth creates or updates the JWT token.

    if(user){
        // Checks whether a user object is available.

        token.id = user.id
        // Stores the user's ID inside the JWT token.

        token.name = user.name
        // Stores the user's name inside the JWT token.

        token.email = user.email
        // Stores the user's email inside the JWT token.

        token.role = user.role
        // Stores the user's role inside the JWT token.
    }

    return token
    // Returns the updated JWT token.
},

session({session , token}){
// Runs when NextAuth creates the session that your application can access.

    if(session.user){
        // Checks whether the session contains a user object.

        session.user.id = token.id as string
        // Copies the user ID from the JWT token into the session.

        session.user.email = token.email as string
        // Copies the user's email from the JWT token into the session.

        session.user.name = token.name as string
        // Copies the user's name from the JWT token into the session.

        session.user.role = token.role as string
        // Copies the user's role from the JWT token into the session.
    }

    return session
    // Returns the updated session so it can be accessed by the application.

}
},

pages:{
// Defines custom pages that NextAuth should use.

signIn:"/login" , error:"/login"
// Sends both normal sign-in and authentication-error pages to the /login route.
},

session:{
// Configures how NextAuth stores and manages sessions.

strategy:"jwt", maxAge:10 * 24 * 60 * 60
// Uses JWT-based sessions and keeps the session valid for 10 days.

},
secret:process.env.AUTH_SECRET
})
// Ends the NextAuth configuration.