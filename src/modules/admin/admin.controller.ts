import { RequestHandler } from 'express';
import Product from '../../utilities/models/product.model';

const getAddProduct: RequestHandler = async (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
}

const postAddProduct: RequestHandler = async (req, res, next) => {

    try {

        const product = new Product({
            title: req.body.title,
            imageUrl: req.body.imageUrl,
            price: +req.body.price,
            description: req.body.description,
            userId: req.user
        });

        await product.save();

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}

const getEditProduct: RequestHandler = async (req, res, next) => {

    try {
        const editMode = req.query.edit;
        const prodId = req.params.productId;

        if (!editMode) {
            return res.redirect('/');
        }

        const product = await Product.findById(prodId);

        if (!product) {
            return res.redirect('/');
        }

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    } catch (error) {
        console.log(error);
    }
}

const postEditProduct: RequestHandler = async (req, res, next) => {

    try {
        const prodId = req.body.productId;

        const product = await Product.findById(prodId);

        if (product) {
            product.title = req.body.title;
            product.imageUrl = req.body.imageUrl;
            product.price = +req.body.price;
            product.description = req.body.description;
            await product.save();
        }

        res.redirect('/admin/products');
    } catch (error) {
        console.log(error);
    }
};

const postDeleteProduct: RequestHandler = async (req, res, next) => {

    try {
        const prodId = req.body.productId;

        await Product.findByIdAndRemove(prodId);

        res.redirect('/admin/products');
    } catch (error) {
        console.log(error);
    }
};


const getProducts: RequestHandler = async (req, res, next) => {

    try {
        const products = await Product.find();
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    } catch (error) {
        console.log(error);
    }
};

const AdminCtrl = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts: getProducts,
    postEditProduct: postEditProduct,
    getEditProduct: getEditProduct,
    postDeleteProduct: postDeleteProduct
}

export default AdminCtrl;