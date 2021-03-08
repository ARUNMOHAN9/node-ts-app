import { DataTypes, Model, Optional } from 'sequelize';
import db from '../helpers/database';

export interface CartItemAttributes {
    id: number;
    quantity: number;
}

interface CartItemCreationAttributes extends Optional<CartItemAttributes, "id"> { }

export interface CartItemInstance extends Model<CartItemAttributes, CartItemCreationAttributes>, CartItemAttributes { }

const CartItem = db.define<CartItemInstance>('cartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER
    }
});

export default CartItem;
