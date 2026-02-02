const Joi = require('joi');

/**
 * Validation  for menu items
 */
const menuItemSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      'string.empty': 'Menu item name is required',
      'string.max': 'Name cannot exceed 100 characters',
      'any.required': 'Menu item name is required'
    }),
  
  description: Joi.string()
    .trim()
    .max(500)
    .allow('')
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  
  category: Joi.string()
    .valid('Appetizer', 'Main Course', 'Dessert', 'Beverage')
    .required()
    .messages({
      'any.only': 'Category must be one of: Appetizer, Main Course, Dessert, Beverage',
      'any.required': 'Category is required'
    }),
  
  price: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative',
      'any.required': 'Price is required'
    }),
  
  ingredients: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      'array.base': 'Ingredients must be an array of strings'
    }),
  
  isAvailable: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'isAvailable must be a boolean'
    }),
  
  preparationTime: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Preparation time must be a number',
      'number.min': 'Preparation time cannot be negative',
      'any.required': 'Preparation time is required'
    }),
  
  imageUrl: Joi.string()
    .uri()
    .allow('')
    .messages({
      'string.uri': 'Image URL must be a valid URL'
    })
});

/**
 * Validation for orders
 */
const orderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        menuItem: Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'string.pattern.base': 'Invalid menu item ID',
            'any.required': 'Menu item ID is required'
          }),
        quantity: Joi.number()
          .integer()
          .min(1)
          .required()
          .messages({
            'number.base': 'Quantity must be a number',
            'number.min': 'Quantity must be at least 1',
            'any.required': 'Quantity is required'
          })
      })
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'Order must contain at least one item',
      'any.required': 'Order items are required'
    }),
  
  customerName: Joi.string()
    .trim()
    .max(100)
    .required()
    .messages({
      'string.empty': 'Customer name is required',
      'string.max': 'Customer name cannot exceed 100 characters',
      'any.required': 'Customer name is required'
    }),
  
  tableNumber: Joi.number()
    .integer()
    .min(1)
    .max(999)
    .required()
    .messages({
      'number.base': 'Table number must be a number',
      'number.min': 'Table number must be at least 1',
      'number.max': 'Table number cannot exceed 999',
      'any.required': 'Table number is required'
    })
});

/**
 * Middleware to validate menu items
 */
const validateMenuItem = (req, res, next) => {
  const { error } = menuItemSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });
  
  if (error) {
    const messages = error.details.map(detail => detail.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', ')
    });
  }
  
  next();
};

/**
 * Middleware to validate orders
 */
const validateOrder = (req, res, next) => {
  const { error } = orderSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });
  
  if (error) {
    const messages = error.details.map(detail => detail.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', ')
    });
  }
  
  next();
};

module.exports = {
  validateMenuItem,
  validateOrder
};