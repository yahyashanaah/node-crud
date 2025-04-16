const Item = require('../models/itemModel');

exports.getAllItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

exports.createItem = async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json(newItem);
};

exports.updateItem = async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
};
