import { Sequelize } from 'sequelize';

const db = new Sequelize({
    database: 'node-db',
    username: 'root',
    password: 'admin@123',
    dialect: 'mysql',
    host: 'localhost'
});

export default db;
