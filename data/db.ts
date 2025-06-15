import mongoose from "mongoose";

const connectDB=async ()  => {
    try{
        if(!process.env.MONGO_URI){
            throw new Error("Mango URI not found")
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connection working");
    }catch(error){
        console.log('something went wrong $(error)');
    }
};

export default connectDB;