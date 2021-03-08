import { BelongsToCreateAssociationMixin, BelongsToGetAssociationMixin, DataTypes, Model, Optional } from 'sequelize';
import db from '../helpers/database';
import { CartInstance } from './cart.model';

interface UsertAttributes {
    id: number;
    name: string;
    email: string;
}

interface UsertCreationAttributes extends Optional<UsertAttributes, "id"> { }

export interface UserInstance extends Model<UsertAttributes, UsertCreationAttributes>, UsertAttributes {
    getCart: BelongsToGetAssociationMixin<CartInstance>;
    createCart: BelongsToCreateAssociationMixin<CartInstance>;
}

const User = db.define<UserInstance>('user', {
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
