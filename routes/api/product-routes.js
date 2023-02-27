const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const dbProductData =
      await Product.findAll({
        include: [
          {
            model: Tag,
            attributes: ['tag_name'],
            through: ProductTag,
          },
          {
            model: Category,
            attributes: ['category_name'],
          },
        ],
      });
    res.json({ message: "All products", dbProductData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const dbProductData =
      await Product.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: Tag,
            attributes: ['tag_name'],
          },
          {
            model: Category,
            attributes: ['category_name'],
          },
        ],
      });
    if (!dbProductData)
      return res.status(404).json({ message: 'No product found with this id' });
    res.json({ message: `Product found with id: ${req.params.id}`, dbProductData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        const tagArr = await ProductTag.bulkCreate(productTagIdArr);
        return res.status(200).json({message: "Product created", product, tagArr});
      }
      return res.status(200).json({message: "Product created", product});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const product = await Product.update(req.body, {
    where: {
      id: req.body.tagIds,
    },
  }); const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
  const productTagIds = productTags.map((tag)=> tag);
  const newProductTags = 
  await req.body.tagIds
    .filter((tag_id) => !productTagIds.includes(tag_id))
    .map((tag_id) => {
      return {
        product_id: req.params.id,
        tag_id,
      };
    });
    // figure out which ones to remove
      const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);
   //run both actions
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
      res.json ({message: "Product updated", product});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
