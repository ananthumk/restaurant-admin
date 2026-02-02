const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Menu item name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
        message: '{VALUE} is not a valid category'
      }
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
      get: (v) => parseFloat(v.toFixed(2)),
      set: (v) => parseFloat(v.toFixed(2))
    },
    ingredients: {
      type: [String],
      default: []
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    preparationTime: {
      type: Number,
      required: [true, 'Preparation time is required'],
      min: [0, 'Preparation time cannot be negative']
    },
    imageUrl: {
      type: String,
      trim: true,
      default: 'https://via.placeholder.com/300x200?text=No+Image'
    }
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
  }
);

// Create text index for search functionality
menuItemSchema.index({ name: 'text', ingredients: 'text' });

// Create index on category for filtering
menuItemSchema.index({ category: 1 });

// Create index on isAvailable for filtering
menuItemSchema.index({ isAvailable: 1 });

// Create compound index for common queries
menuItemSchema.index({ category: 1, isAvailable: 1 });

// Virtual for formatted price in Indian Rupees
menuItemSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price.toFixed(2)}`;
});

// Instance method to toggle availability
menuItemSchema.methods.toggleAvailability = function() {
  this.isAvailable = !this.isAvailable;
  return this.save();
};

// Static method to find available items
menuItemSchema.statics.findAvailable = function() {
  return this.find({ isAvailable: true });
};

// Static method to find by category
menuItemSchema.statics.findByCategory = function(category) {
  return this.find({ category });
};

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;