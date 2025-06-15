import { MongoClient } from "mongodb";

const MONGO_URI = "mongodb+srv://cmoitreyo:codePlusPass123@cluster0.x14eqgy.mongodb.net/userDb?retryWrites=true&w=majority&appName=Cluster0";
const DB_NAME = "userDb";

class MongoDB {
    constructor() {
        this.client = null;
        this.db = null;
        this.isConnected = false;
        this.connectionPromise = null;
    }

    async connect() {
        // Return existing connection if already connected
        if (this.isConnected && this.db) {
            console.log("Using existing MongoDB connection");
            return this.db;
        }

        // Return existing connection promise if connection is in progress
        if (this.connectionPromise) {
            console.log("Connection in progress, waiting...");
            return this.connectionPromise;
        }

        // Create new connection
        this.connectionPromise = this._establishConnection();
        return this.connectionPromise;
    }

    async _establishConnection() {
        try {
            this.client = new MongoClient(MONGO_URI);
            await this.client.connect();
            this.db = this.client.db(DB_NAME);
            this.isConnected = true;
            console.log("✅ Connected to MongoDB");
            return this.db;
        } catch (error) {
            console.error("❌ MongoDB connection failed:", error);
            this.connectionPromise = null;
            throw error;
        }
    }

    getDB() {
        if (!this.isConnected || !this.db) {
            throw new Error("Database not connected. Call connect() first.");
        }
        return this.db;
    }

    getCollection(name) {
        return this.getDB().collection(name);
    }

    async disconnect() {
        if (this.client) {
            await this.client.close();
            this.client = null;
            this.db = null;
            this.isConnected = false;
            this.connectionPromise = null;
            console.log("📤 Disconnected from MongoDB");
        }
    }
}

// Create singleton instance
const mongoDB = new MongoDB();

// Export the singleton instance and convenience functions
export default mongoDB;

export const connectDB = () => mongoDB.connect();
export const getDB = () => mongoDB.getDB();
export const getCollection = (name) => mongoDB.getCollection(name);
export const disconnectDB = () => mongoDB.disconnect();

// Usage examples:
// await connectDB();
// const submissions = getCollection("submissions");
// const users = getCollection("users");