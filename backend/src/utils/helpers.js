
/**
 * Format price to 2 decimal places
 * @param {Number} price
 * @returns {Number}
 */
const formatPrice = (price) => {
  return parseFloat(price.toFixed(2));
};

/**
 * Generate random order number
 * @returns {String}
 */
const generateOrderNumber = () => {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORD-${dateStr}-${random}`;
};

/**
 * Calculate order total from items
 * @param {Array} items - Array of order items
 * @returns {Number}
 */
const calculateOrderTotal = (items) => {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

/**
 * Paginate results
 * @param {Number} page - Current page
 * @param {Number} limit - Items per page
 * @returns {Object} - Skip and limit values
 */
const getPaginationParams = (page = 1, limit = 10) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;
  
  return {
    skip,
    limit: limitNum,
    page: pageNum
  };
};

/**
 * Get pagination metadata
 * @param {Number} total - Total items
 * @param {Number} page - Current page
 * @param {Number} limit - Items per page
 * @returns {Object}
 */
const getPaginationMetadata = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    total,
    page: parseInt(page),
    pages: totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

/**
 * Validate MongoDB ObjectId
 * @param {String} id
 * @returns {Boolean}
 */
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

/**
 * Format date to readable string
 * @param {Date} date
 * @returns {String}
 */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Generate random table number
 * @returns {Number}
 */
const generateTableNumber = () => {
  return Math.floor(Math.random() * 50) + 1;
};

/**
 * Get random element from array
 * @param {Array} array
 * @returns {*}
 */
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

module.exports = {
  formatPrice,
  generateOrderNumber,
  calculateOrderTotal,
  getPaginationParams,
  getPaginationMetadata,
  isValidObjectId,
  formatDate,
  generateTableNumber,
  getRandomElement
};