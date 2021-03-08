import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyGetAssociationsMixin, DataTypes, HasManySetAssociationsMixin, Model, Optional } from 'sequelize';
import db from '../helpers/database';
import { CartItemAttributes } from './cart-item.model';
import { ProductInstance } from './product.model';

interface CartAttributes {
    id: number;
}

interface CartCreationAttributes extends Optional<CartAttributes, "id"> { }

export interface CartInstance extends Model<CartAttributes, CartCreationAttributes>, CartAttributes {
    setProducts: HasManySetAssociationsMixin<ProductInstance, ProductInstance['id']>;
    getProducts: BelongsToManyGetAssociationsMixin<ProductInstance>;
    addProducts: BelongsToManyAddAssociationsMixin<ProductInstance, ProductInstance['id']>;
    addProduct: BelongsToManyAddAssociationMixin<ProductInstance, ProductInstance['id']>;
}

const Cart = db.define<CartInstance>('cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
});

export default Cart;
