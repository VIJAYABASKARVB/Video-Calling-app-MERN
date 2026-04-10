import "../instrument.mjs"
import express from "express"
import {ENV} from './config/env.js'
import { connectDB } from "./config/db.js";
import {clerkMiddleware} from '@clerk/express'
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.routes.js"
import * as Sentry from "@sentry/node"

 
const app = express();

app.use(express.json());
app.use(clerkMiddleware());

app.get("/eda",(req,res)=>{
  throw new Error("Eppa Thambi!");
})

app.get('/',(req,res) => {
  res.send(`hello you are in get method!!`)
})

app.use("/api/inngest",serve({client:inngest,functions}))
app.use("/api/chat",chatRoutes)

Sentry.setupExpressErrorHandler(app);

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