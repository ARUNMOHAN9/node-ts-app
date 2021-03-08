import { DataTypes, Model, Optional } from 'sequelize';
import db from '../helpers/database';

export interface OrderItemAttributes {
    id: number;
    quantity: number;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, "id"> { }

export interface OrderItemInstance extends Model<OrderItemAttributes, OrderItemCreationAttributes>, OrderItemAttributes { }

const OrderItem = db.define<OrderItemInstance>('orderItem', {
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

export default OrderItem;
