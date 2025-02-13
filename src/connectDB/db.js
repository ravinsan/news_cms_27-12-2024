import mongoose from "mongoose";

process.loadEnvFile();

const connectDB = async () =>{
    try{
         const conn = await mongoose.connect(process.env.DB_URI);
         console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(err)
    {
        console.log(err)
        process.exit(1)
    }
}

export default connectDB;