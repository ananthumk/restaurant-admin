require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

const menuItems = [
 
  {
    name: 'Crispy Calamari',
    description: 'Lightly breaded and fried squid rings served with marinara sauce',
    category: 'Appetizer',
    price: 450,
    ingredients: ['squid', 'flour', 'marinara sauce', 'lemon'],
    isAvailable: true,
    preparationTime: 15,
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400'
  },
  {
    name: 'Buffalo Wings',
    description: 'Spicy chicken wings tossed in buffalo sauce with ranch dressing',
    category: 'Appetizer',
    price: 380,
    ingredients: ['chicken wings', 'buffalo sauce', 'ranch dressing', 'celery'],
    isAvailable: true,
    preparationTime: 20,
    imageUrl: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400'
  },
  {
    name: 'Spinach Artichoke Dip',
    description: 'Creamy blend of spinach, artichokes, and cheese served with tortilla chips',
    category: 'Appetizer',
    price: 350,
    ingredients: ['spinach', 'artichokes', 'cream cheese', 'tortilla chips'],
    isAvailable: true,
    preparationTime: 12,
    imageUrl: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400'
  },
  {
    name: 'Bruschetta',
    description: 'Grilled bread topped with fresh tomatoes, basil, and balsamic glaze',
    category: 'Appetizer',
    price: 320,
    ingredients: ['bread', 'tomatoes', 'basil', 'balsamic vinegar', 'olive oil'],
    isAvailable: false,
    preparationTime: 10,
    imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400'
  },

  {
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with roasted vegetables and lemon butter sauce',
    category: 'Main Course',
    price: 850,
    ingredients: ['salmon', 'vegetables', 'lemon', 'butter', 'herbs'],
    isAvailable: true,
    preparationTime: 25,
    imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400'
  },
  {
    name: 'Chicken Parmesan',
    description: 'Breaded chicken breast topped with marinara sauce and melted mozzarella',
    category: 'Main Course',
    price: 650,
    ingredients: ['chicken breast', 'marinara sauce', 'mozzarella', 'pasta', 'breadcrumbs'],
    isAvailable: true,
    preparationTime: 30,
    imageUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400'
  },
  {
    name: 'Beef Tenderloin',
    description: 'Premium cut beef tenderloin with mashed potatoes and red wine reduction',
    category: 'Main Course',
    price: 1200,
    ingredients: ['beef tenderloin', 'potatoes', 'red wine', 'garlic', 'thyme'],
    isAvailable: true,
    preparationTime: 35,
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400'
  },
  {
    name: 'Mushroom Risotto',
    description: 'Creamy Italian rice with wild mushrooms and parmesan cheese',
    category: 'Main Course',
    price: 580,
    ingredients: ['arborio rice', 'mushrooms', 'parmesan', 'white wine', 'butter'],
    isAvailable: true,
    preparationTime: 28,
    imageUrl: 'https://images.unsplash.com/photo-1476124369491-c4a9e1fdb2e0?w=400'
  },
  {
    name: 'Shrimp Scampi',
    description: 'Succulent shrimp in garlic butter sauce over linguine pasta',
    category: 'Main Course',
    price: 750,
    ingredients: ['shrimp', 'linguine', 'garlic', 'butter', 'white wine', 'parsley'],
    isAvailable: true,
    preparationTime: 22,
    imageUrl: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=400'
  },
  {
    name: 'BBQ Ribs',
    description: 'Slow-cooked pork ribs with homemade BBQ sauce and coleslaw',
    category: 'Main Course',
    price: 780,
    ingredients: ['pork ribs', 'bbq sauce', 'coleslaw', 'fries'],
    isAvailable: false,
    preparationTime: 40,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400'
  },

  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    category: 'Dessert',
    price: 320,
    ingredients: ['chocolate', 'flour', 'eggs', 'vanilla ice cream'],
    isAvailable: true,
    preparationTime: 18,
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400'
  },
  {
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
    category: 'Dessert',
    price: 280,
    ingredients: ['ladyfingers', 'mascarpone', 'coffee', 'cocoa powder'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400'
  },
  {
    name: 'New York Cheesecake',
    description: 'Rich and creamy cheesecake with graham cracker crust and berry compote',
    category: 'Dessert',
    price: 260,
    ingredients: ['cream cheese', 'graham crackers', 'berries', 'sugar'],
    isAvailable: true,
    preparationTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1533134242820-b86e10dc5463?w=400'
  },

  
  {
    name: 'Fresh Lemonade',
    description: 'Freshly squeezed lemonade with mint',
    category: 'Beverage',
    price: 120,
    ingredients: ['lemon', 'sugar', 'water', 'mint'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f1e?w=400'
  },
  {
    name: 'Iced Coffee',
    description: 'Cold brew coffee served over ice with cream',
    category: 'Beverage',
    price: 150,
    ingredients: ['coffee', 'ice', 'cream', 'sugar'],
    isAvailable: true,
    preparationTime: 3,
    imageUrl: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400'
  },
  {
    name: 'Mango Smoothie',
    description: 'Tropical mango smoothie with yogurt and honey',
    category: 'Beverage',
    price: 180,
    ingredients: ['mango', 'yogurt', 'honey', 'ice'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400'
  }
];


const generateOrderNumber = (index) => {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  return `ORD-${dateStr}-${(index + 1).toString().padStart(4, '0')}`;
};


const createSampleOrders = async (menuItemIds) => {
  const statuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
  const customerNames = [
    'John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis',
    'James Wilson', 'Emily Taylor', 'David Anderson', 'Olivia Martinez',
    'Robert Thomas', 'Sophia Garcia', 'William Rodriguez', 'Ava Lopez'
  ];

  const orders = [];

  for (let i = 0; i < 12; i++) {
    
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const orderItems = [];
    
    for (let j = 0; j < itemCount; j++) {
      const randomMenuItem = menuItemIds[Math.floor(Math.random() * menuItemIds.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      
      orderItems.push({
        menuItem: randomMenuItem._id,
        quantity: quantity,
        price: randomMenuItem.price
      });
    }

    // Calculate total
    const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    orders.push({
      orderNumber: generateOrderNumber(i), 
      items: orderItems,
      totalAmount: totalAmount,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
      tableNumber: Math.floor(Math.random() * 20) + 1
    });
  }

  return orders;
};


const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    
    console.log('Clearing existing data...');
    await MenuItem.deleteMany({});
    await Order.deleteMany({});
    console.log('✓ Existing data cleared');

    
    console.log('Inserting menu items...');
    const createdMenuItems = await MenuItem.insertMany(menuItems);
    console.log(`✓ Created ${createdMenuItems.length} menu items`);

    
    console.log('Creating sample orders...');
    const sampleOrders = await createSampleOrders(createdMenuItems);
    const createdOrders = await Order.insertMany(sampleOrders);
    console.log(`✓ Created ${createdOrders.length} orders`);

    // Display summary
    console.log('Database Seeded Successfully')

    // Show category breakdown
    console.log('Menu Items by Category:');
    const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];
    for (const category of categories) {
      const count = createdMenuItems.filter(item => item.category === category).length;
      console.log(`  - ${category}: ${count}`);
    }

    // Show order status breakdown
    console.log('\nOrders by Status:');
    const orderStatuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
    for (const status of orderStatuses) {
      const count = createdOrders.filter(order => order.status === status).length;
      console.log(`  - ${status}: ${count}`);
    }

    console.log("Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();