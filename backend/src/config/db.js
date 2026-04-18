import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Log to help you debug in GitHub Actions logs
        if (!process.env.MONGODB_URI) {
            console.error("⚠️ MONGODB_URI is missing from process.env");
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ Initial Connection Failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;