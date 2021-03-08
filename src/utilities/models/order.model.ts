import { BelongsToManyAddAssociationsMixin, DataTypes, Model, Optional } from 'sequelize';
import db from '../helpers/database';
import { ProductInstance } from './product.model';

interface OrderAttributes {
    id: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> { }

export interface OrderInstance extends Model<OrderAttributes, OrderCreationAttributes>, OrderAttributes {
    addProducts: BelongsToManyAddAssociationsMixin<ProductInstance, ProductInstance['id']>;
}

const Order = db.define<OrderInstance>('order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
});

export default Order;
