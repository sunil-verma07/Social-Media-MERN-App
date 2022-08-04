import express from "express"
import cors from 'cors'
import errorMiddleware from './middleware/error.js'
import cookieparser from "cookie-parser"
const app = express()
import fileUpload from 'express-fileupload'

app.use(cors())
app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({
    limit: '50mb'
  }));
app.use(fileUpload({
    useTempFiles:true
}))

import userRoute from "./routes/UserRoute.js"
import postRoute from './routes/PostRoute.js'
import chatRoute from './routes/ChatRoute.js'
import messageRoute from './routes/MessageRoute.js'

app.use("/api/v1/post",postRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/chat",chatRoute);
app.use("/api/v1/message",messageRoute);



app.use(errorMiddleware)

export default app