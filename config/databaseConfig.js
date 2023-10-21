import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
const db = mongoose.connect(process.env.DB_CONNECTION);


export default db;