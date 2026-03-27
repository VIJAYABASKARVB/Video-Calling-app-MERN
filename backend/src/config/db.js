import mongoose from 'mongoose'
import {ENV} from './env.js'

export const connectDB = async () => {

  try{
    const connectionDB = await mongoose.connect(ENV.MONGO_URI);
    console.log("MONGO CONNECTED SUCCESSFULLY!!",connectionDB.connection.host)
  }catch(err){
    console.log("Error coonnecting to MONGODB:",err.message);
    process.exit(1);
  }

}