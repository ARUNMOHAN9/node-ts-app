import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-db',
    password: 'admin@123'
});

const db = pool.promise();

export default db;