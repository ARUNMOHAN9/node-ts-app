import { Db, MongoClient } from 'mongodb';

const URI = "mongodb+srv://root:admin%40123@cluster0.kajhf.mongodb.net/test?retryWrites=true&w=majority";

let _db: Db;

const mongoClient = async () => {
    try {
        const client = await new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true }).connect();
        _db = client.db();
        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
};

export const getDb = () => {
    if (_db) {
        return _db;
    }
    throw new Error("No database found");
}



export default mongoClient;