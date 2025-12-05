import mongoose from "mongoose";

const connectDB = async () => {
    const rawUri = process.env.MONGODB_URI

    if (!rawUri) {
        console.error('MONGODB_URI is not set. Please set it in your environment or backend/.env')
        process.exit(1)
    }

    // normalize: remove surrounding single/double quotes and whitespace
    const uri = rawUri.trim().replace(/^['"]|['"]$/g, '')

    mongoose.connection.on('connected', () => console.log('Database Connected'))
    mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err.message))

    try {
        // append database name (aarogyam) if not already present
        const connectString = uri.endsWith('/') ? `${uri}aarogyam` : `${uri}/aarogyam`
        await mongoose.connect(connectString, { serverSelectionTimeoutMS: 10000 })
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message)
        console.error('Configured MONGODB_URI:', uri)
        console.error('If you are using MongoDB Atlas, make sure your IP is whitelisted and the connection string is correct.')
        process.exit(1)
    }
}

export default connectDB