import express from "express"
import {ENV} from './config/env.js'
import { connectDB } from "./config/db.js";
import {clerkMiddleware} from '@clerk/express'
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import { err } from "inngest/types";

 
const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest",serve({client:inngest,functions}))

app.get('/',(req,res) => {
  res.send(`hello you are in get method!!`)
})

const startServer = async () => {
  try{
    await connectDB();
    if(ENV.NODE_ENV != "production"){
      app.listen(ENV.PORT,() =>{
        console.log(`Server is running on the port http://localhost:${ENV.PORT}`);
        connectDB();
      })
    }
  }catch(error){
    console.error("Error starting the server:",error);
    process.exit(1);
  }
}

startServer();

export default app;