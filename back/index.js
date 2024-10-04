import express from "express"
import path from "path"
import ExpressError from "./middleware/ExpressError.js"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
dotenv.config()


const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

import user from "./MCR/routes/user.js"
import post from "./MCR/routes/post.js"
import review from "./MCR/routes/review.js"
import sessionConfig from "./config/session.js"

// Routes
app.use('/api/user', user)
app.use('/api/post', post)
app.use('/api/review', review)


// Error handling

// Using the custom Error handler for all the possible routes 
// app.all('*', (req,res,next) => {
//     next(new ExpressError('Page Not Found, try again.', 404))
// });

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    //set static folder
    app.use(express.static(path.join(__dirname, 'front/dist')))
    //any route that is not api will be redirected to index.html
    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'front', 'dist', 'index.html')))
} else {
    app.get('/', (req,res) => {
        res.send('API is running.')
    })
}

// Here I'm using app.use() to destructure the -err- parameter
// app.use((err, req,res, next) => {
//     const {status=500, msg = 'something went wrong'} = err;
//     res.status(status).send(msg)
//     next()
// })

// Running the app
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`running, port ${port}`))