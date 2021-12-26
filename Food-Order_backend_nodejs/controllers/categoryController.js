import Category from "../models/CategoryModel.js";

const categoryController = {

    getCategories: async(req, res) => {
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) => {
        try {
            const {name, image} = req.body;
            const category = await Category.findOne({name})
            if(category) res.status(400).json({msg: "this category already exists"})

            const newCategory = new Category({name, image})
            await newCategory.save();
            res.json({msg: "you created a new category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const deletedCategory = await Category.findByIdAndDelete(req.params.id)
            res.json(deletedCategory)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {name, image} = req.body;
            const updatedCategory = await Category.findOneAndUpdate({_id: req.params.id}, {name, image}, {new:true})
            res.json(updatedCategory)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
};

export default categoryController;