import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    
    if (!uri) {
        console.error("❌ MONGO_URI is not defined in environment variables.");
        process.exit(1);
    }

    try {
        mongoose.set('strictQuery', false);
        
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            maxPoolSize: 10,
        });

        console.log(`✅ MongoDB Connected!`);
        console.log(`📊 Database: ${conn.connection.name}`);
        console.log(`🌐 Host: ${conn.connection.host}`);
        
        // Connection events
        mongoose.connection.on('connected', () => {
            console.log('🔗 Mongoose connected to DB');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('❌ Mongoose connection error:', err.message);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('🔌 Mongoose disconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
       
        process.exit(1);
    }
};

export default connectDB;