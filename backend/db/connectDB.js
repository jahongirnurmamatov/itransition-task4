import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB is connected on host: ${conn.connection.host}`)
    } catch (error) {
        console.log('Error in connection to database: ',error.message)
        process.exit(1)
    }
}