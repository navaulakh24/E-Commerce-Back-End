const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  await Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
await Category.findByPk(req.params.id, {
  attributes: ['id', 'category_name'],
  include: [
    {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    },
  ],
})
  .then((dbCategoryData) => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
});

router.post('/', async (req, res) => {
  // create a new category
await Category.create(req.body)
  .then((dbCategoryData) => res.json(dbCategoryData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
await Category.update(req.body, {
  where: {
    id: req.params.id,
  },
})
.then(category=> Category.findByPk(req.params.id))  
.then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
await Category.destroy({
  where: {
    id: req.params.id,
  },
})
.then((deletedCategory) => {
    res.json(deletedCategory);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
