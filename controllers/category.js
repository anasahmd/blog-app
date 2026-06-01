import { validationResult } from 'express-validator';
import Category from '../models/category.js';
import slugify from 'slugify';

const categoryController = {};

categoryController.listAllCategories = async (req, res) => {
	const categories = await Category.find();
	res.json({ categories });
};

categoryController.postCategory = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, description, isActive } = req.body;

	const category = new Category({ name, description, isActive });
	category.slug = slugify(name, { lower: true, strict: true });
	category.createdBy = req.userId;

	const savedCategory = await category.save();

	res.status(201).json({ category: savedCategory });
};

categoryController.updateCategory = async (req, res) => {
	const { id } = req.params;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { name, description, isActive } = req.body;

	const slug = slugify(name, { lower: true, strict: true });

	const category = await Category.findOneAndUpdate(
		{ _id: id },
		{ name, description, isActive, slug },
		{ returnDocument: 'after', runValidators: true },
	);

	if (!category) {
		return res.status(404).json({ error: 'Category not found' });
	}

	res.status(201).json({ category });
};

// TODO: Delete related posts of the category
categoryController.deleteCategory = async (req, res) => {
	const { id } = req.params;
	const deletedCategory = await Category.findOneAndDelete({ _id: id });

	if (!deletedCategory) {
		return res.status(404).json({ error: 'Category not found' });
	}

	res.json({ category: deletedCategory });
};

export default categoryController;
