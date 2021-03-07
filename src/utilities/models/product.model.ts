import { DataTypes, Model, Optional } from 'sequelize';
import db from '../helpers/database';

interface ProductAttributes {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {
    userId: number;
}

interface ProductInstance extends Model<ProductAttributes, ProductCreationAttributes>, ProductAttributes { }

const Product = db.define<ProductInstance>('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Product;
