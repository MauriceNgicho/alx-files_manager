import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const dbName = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        this.db = this.client.db(dbName);
        console.log('MongoDB connected');
      })
      .catch((err) => {
        console.error(`MongoDB connection error: ${err}`);
      });
  }

  isAlive() {
    return Boolean(this.db);
  }

  async nbUsers() {
    try {
      const users = this.db.collection('users');
      return await users.countDocuments();
    } catch (err) {
      console.error(`Error counting users: ${err}`);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const files = this.db.collection('files');
      return await files.countDocuments();
    } catch (err) {
      console.error(`Error counting files: ${err}`);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
