import connectDB from "@/lib/connectDB";
// Imports the MongoDB connection function.

import User from "@/model/user.model";
// Imports the User model used to access the users collection.

import bcrypt from "bcryptjs";
// Imports bcrypt for securely hashing passwords.

import { NextRequest, NextResponse } from "next/server";
// Imports Next.js request and response utilities.


export async function POST(req:NextRequest){
// Creates a POST API route for user registration.

try {
// Starts error handling for the complete registration process.

    await connectDB()
    // Connects to MongoDB before performing any database operation.

    const {name , email , password} = await req.json();
    // Extracts the name, email, and password from the request body.

    const existUser = await User.findOne({email})
    // Searches MongoDB to check whether the email is already registered.

    if(existUser){
    // Checks whether a user with this email already exists.

        return NextResponse.json({message:"user already exists"} , {status:400})
        // Returns a 400 response because the email is already registered.
    }


    const hashedPassword = await bcrypt.hash(password , 10);
    // Hashes the user's password using 10 bcrypt salt rounds.

    const user = await User.create({
        name , email , password:hashedPassword
    })
    // Creates the new user in MongoDB with the hashed password.

    return NextResponse.json({user} , {status:200})
    // Returns a successful response containing the created user.

} catch (error) {
// Runs when registration or database connection fails.

    console.error("REGISTER ERROR:", error)
    // Prints the actual error in the terminal for debugging.

    return NextResponse.json({message:"Registration failed"} , {status:500})
    // Returns a 500 response when the registration process fails.
}

}
// Ends the POST API route.