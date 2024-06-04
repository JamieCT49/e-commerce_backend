const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    if (!tagData) {
      res.status(404).json({message: 'No tags found'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  };
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!tagById) {
      res.status(404).json({message: 'Tag not found'});
      return;
    };
    res.status(200).json(tagById);
  }catch (err) {
    res.status(500).json(err);
  };
  // find a single tag by its `id`
  // be sure to include its associated Product data
});
  // try {
  //   const newTag = await Tag.create({
  //     tag_name: req.body.tagName  
  //   });
  //   res.status(200).json(newTag);
  //   console.log('New tag added');
  // } catch (err) {
  //   res.status(500).json(err);
  // };
router.post('/', async (req, res) => {
  Tag
    .create(req.body)
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(error);
      res.status(500).json(err);
    });
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tagName
    },
    {
      where: {
        id: req.params.id
      }
    });
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if (!tagById) {
      res.status(404).json({message: 'Tag does not exist'});
      return;
    };
    res.status(200).json(updateTag);
    console.log("Tag updated");
  } catch (err) {
    res.status(500).json(err);
  };
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      });
      if(!deleteTag) {
        res.status(404).json({message: 'Tag not found'});
      };
      res.status(200).json(deleteTag);
      console.log('Tag deleted');
  } catch (err) {
    res.status(500).json(err);
  };
  // delete on tag by its `id` value
});

module.exports = router;
