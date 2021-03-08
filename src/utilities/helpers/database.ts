import { MongoClient } from 'mongodb';

const URI = "mongodb+srv://root:admin%40123@cluster0.kajhf.mongodb.net/test?retryWrites=true&w=majority";

const mongoClient = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true }).connect();

export default mongoClient;