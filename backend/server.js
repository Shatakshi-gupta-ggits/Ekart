import express from 'express'
import 'dotenv/config'
import connectDB from './database/db.js'
import userRoute from './routes/userRoute.js'


const app = express();
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())

app.use('/api/v1/user', userRoute);
//http://localhost:3000/api/v1/user/register

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`server is listening at port: ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();