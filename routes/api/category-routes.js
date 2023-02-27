const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const dbCategoryData = 
  await Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  });
    res.json({message: "All categories", dbCategoryData});
} catch (err) {
  res.status(500).json({error: err.message});
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const dbCategoryData =
await Category.findOne({
  where: {
    id: req.params.id
  },
  include: [
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  ],
});
if (!dbCategoryData) {
  res.status(404).json({message: 'No category found with this id'});
  return;
} res.json({message: `Category found with id: ${req.params.id}`, dbCategoryData});

} catch (err) {
  console.log(err);
  res.status(500).json({error: err.message});
}
});

router.post('/', async(req, res) => {
  // create a new category
  try{
    const dbCategoryData = await Category.create({
      category_name: req.body.category_name,
    });

    res.json({message: "New category created", dbCategoryData});
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
  const category = 
await Category.update(
  {
    category_name: req.body.category_name
  },
  {
  where: {
    id: req.params.id,
  },
},
);
if (!dbCategoryData) {
res.status(404).json({ message: 'No category found with this id' });
return;
} 
res.json({ message: `Category updated with id: ${req.params.id}` });
  } catch { ((err) => {
    console.log(err);
    res.status(500).json(err);
  });
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
const dbCategoryData =
await Category.destroy({
  where: {
    id: req.params.id,
  },
});
if (!dbCategoryData) {
  res.status(404).json({ message: 'No category found with this id' });
  return;
}
res.json({ message: `Category deleted with id: ${req.params.id}` });
  } 
catch {((err) => {
    console.log(err);
    res.status(500).json(err);
  });
}
});
module.exports = router;
