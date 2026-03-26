import express from "express"
import {ENV} from './config/env.js'

 
const app = express();



app.get('/',(req,res) => {
  res.send(`hello you are in get method!!`)
})

console.log("MONGO URI:",ENV.MONGO_URI)

app.listen(ENV.PORT,() => console.log(
  `Server is running on the port http://localhost:${ENV.PORT}`
))