import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import authRouter from './routes/authRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "script-src 'self' https://trusted-cdn.com;");
    next();
  });
// api endpoint 
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/auth',authRouter)
// localhost:4000/api/admin



app.get('/',(req,res)=>{
    res.send('API working babe')
})

app.listen(port, ()=> console.log("Server Started", port))