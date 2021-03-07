import { DataTypes, Model, Optional } from 'sequelize';
import db from '../helpers/database';

interface UsertAttributes {
    id: number;
    name: string;
    email: string;
}

interface UsertCreationAttributes extends Optional<UsertAttributes, "id"> { }

interface UsertInstance extends Model<UsertAttributes, UsertCreationAttributes>, UsertAttributes { }

const User = db.define<UsertInstance>('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default User;
