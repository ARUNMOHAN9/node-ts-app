import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import Product from '../../utilities/models/product.model';

const getAddProduct: RequestHandler = async (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
}

const postAddProduct: RequestHandler = async (req, res, next) => {

    try {

        const image = req.file;

        const product = new Product({
            title: req.body.title,
            imageUrl: `images/${image.filename}`,
            price: +req.body.price,
            description: req.body.description,
            userId: req.user
        });

        if (!image) {
            return res.render('admin/edit-product', {
                pageTitle: 'Add Product',
                path: '/admin/edit-product',
                editing: false,
                hasError: true,
                product: product,
                errorMessage: 'Attached file is not an image',
                validationErrors: []
            });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('admin/edit-product', {
                pageTitle: 'Add Product',
                path: '/admin/edit-product',
                editing: false,
                hasError: true,
                product: product,
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            });
        }

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

        return res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
            hasError: false,
            errorMessage: null,
            validationErrors: []
        });
    } catch (error) {
        console.log(error);
    }
}

const postEditProduct: RequestHandler = async (req, res, next) => {

    try {
        const image = req.file;
        const prodId = req.body.productId;

        const product = await Product.findById(prodId);

        if (product) {

            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/');
            }

            product.title = req.body.title;
            if (image) {
                product.imageUrl = image.path;
            }
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

        await Product.deleteOne({ _id: prodId, userId: req.user?._id });

        res.redirect('/admin/products');
    } catch (error) {
        console.log(error);
    }
};


const getProducts: RequestHandler = async (req, res, next) => {

    try {
        const products = await Product.find({ userId: req.user._id });
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