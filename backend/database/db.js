import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGO_URI ? `${process.env.MONGO_URI}/EKART-YT` : null;
    if (!uri) {
        console.error("MONGO_URI is not defined in environment variables.");
        process.exit(1);
    }

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB connected successfully");

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB error:', err);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;