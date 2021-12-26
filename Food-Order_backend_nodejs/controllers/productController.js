import Product from "../models/Product.js";

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString} //queryString = req.query 
        //console.log(queryObj);
        // const excludedFields = ["page", "sort", "limit"];
        // excludedFields.forEach(value => delete(queryObj[value]))
        // console.log(queryObj);
        let queryStr = JSON.stringify(queryObj);

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => "$" + match)
        //console.log({queryStr});

        this.query.find(JSON.parse(queryStr))
        
        return this;
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join('');
            //console.log(sortBy);
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort("-createdAt")
        }
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 20
        const skip = (page -1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

export default {

    getProducts: async function (req, res, next) {
        try {
            const features = new APIfeatures(Product.find().populate("category"), req.query).filtering().sorting().paginating()
            const products = await features.query
            res.json({
                status: "success",
                result: products.length,
                products: products
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async function (req, res, next) {
        try {
            const {title, price, description, image, category} = req.body;
            if(!image) return res.status(400).json({msg: "pls add an image"});
            const newProduct = new Product({
                title: title,
                price,
                description,
                image,
                category
            });
            await newProduct.save();
            res.json({msg: "created a new product"});
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async function (req, res, next) {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.json({msg: "deleted a product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async function (req, res, next) {
        try {
            const {title, price, description, image, category} = req.body;
            
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                title: title, price, description, image, category
            }, {new: true})
            res.json(updatedProduct)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getProductsCategory: async function (req, res, next) {
        try {
            const features = new APIfeatures(Product.find().populate("category"), req.query).filtering().sorting().paginating();
            const products = await features.query;
            // const productsCategory = products.map(product => {
            //     if(product.category.name === req.params.categoryName){
            //         return product
            //     }
            
            // }
            // )
            //console.log(products);
            const productsCategory = products.filter(product => product.category.name.toLowerCase() === req.params.categoryName.toLowerCase())
            res.json({
                products: productsCategory
            })
            // const {title, price, description, image, category} = req.body;
            
            // await Product.find(req.params.categoryName
            // })
            // res.json(req.params.categoryName)
        } catch (err) {
            console.log(err);
            return res.status(500).json({msg: err.message})
        }
        
    }
}
