import mongoose, { Connection } from "mongoose";
// Imports Mongoose and the Connection type for MongoDB connection handling.


const mongoDBUrl = process.env.MONGODB_URL;
// Gets the MongoDB connection URL from the environment variables.


if(!mongoDBUrl){
// Checks whether the MongoDB URL exists.

    throw new Error("DB ERROR")
    // Stops the application if the MongoDB URL is missing.
}


let cached = global.mongoose;
// Gets the previously cached Mongoose connection from the global object.


if(!cached){
// Checks whether a Mongoose cache has already been created.

    cached = global.mongoose ={conn:null , promise:null}
    // Creates the cache with no existing connection and no connection promise.
}


const connectDB = async()=>{
// Creates an asynchronous function responsible for connecting to MongoDB.


if(cached.conn){
// Checks whether a MongoDB connection already exists in the cache.

    return cached.conn
    // Returns the existing connection instead of creating another one.
}


if(!cached.promise){
// Checks whether a MongoDB connection attempt is already in progress.

    cached.promise = mongoose.connect(mongoDBUrl).then((con)=>con.connection)
    // Starts the MongoDB connection and stores the connection promise in the cache.
}


try {
// Starts error handling for the MongoDB connection attempt.

    const conn = await cached.promise
    // Waits for the MongoDB connection promise to finish.

    cached.conn = conn
    // Saves the successfully established connection in the cache.

    return conn
    // Returns the successfully established MongoDB connection.

} catch (error) {
    
    cached.promise = null
    // Clears the failed promise so another connection attempt can be made.

    throw error
    // Sends the original MongoDB error back to the caller.
    
}

}
// Ends the connectDB function.


export default connectDB
// Exports the connectDB function so other files can use it.