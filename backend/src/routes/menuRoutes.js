const express = require('express');
const router = express.Router();
const {
  getAllMenuItems,
  searchMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability
} = require('../controllers/menuController');
const { validateMenuItem } = require('../middleware/validation');


router.get('/', getAllMenuItems);

router.get('/search', searchMenuItems);

router.get('/:id', getMenuItemById);

router.post('/', validateMenuItem, createMenuItem);

router.put('/:id', validateMenuItem, updateMenuItem);

router.delete('/:id', deleteMenuItem);

router.patch('/:id/availability', toggleAvailability);

module.exports = router;