# Restaurant Admin Dashboard - Backend API

A comprehensive RESTful API for managing restaurant menu items and orders, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Menu Management**: Complete CRUD operations for menu items
- **Order Management**: Create and track orders with status updates
- **Advanced Search**: Text-based search with MongoDB text indexing
- **Filtering**: Filter by category, availability, price range, and status
- **Pagination**: Efficient data loading with pagination support
- **Validation**: Input validation using Joi
- **Analytics**: Top-selling items using MongoDB aggregation
- **Error Handling**: Consistent error responses across all endpoints

## Prerequisites

- Node.js >= 16.0.0
- MongoDB >= 4.4 (local or MongoDB Atlas)
- npm >= 8.0.0

## Installation

### 1. Clone or Create Project Directory
```bash
mkdir restaurant-admin-backend
cd restaurant-admin-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/restaurant-admin
CLIENT_URL=http://localhost:3000
```

### 4. Seed the Database
```bash
npm run seed
```

### 5. Start the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will start at: `http://localhost:5000`

## 📁 Project Structure

```
restaurant-admin-backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── MenuItem.js          # Menu item schema
│   │   └── Order.js             # Order schema
│   ├── controllers/
│   │   ├── menuController.js    # Menu business logic
│   │   └── orderController.js   # Order business logic
│   ├── routes/
│   │   ├── menuRoutes.js        # Menu API routes
│   │   └── orderRoutes.js       # Order API routes
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handling
│   │   └── validation.js        # Input validation
│   ├── utils/
│   │   └── helpers.js           # Utility functions
│   ├── seeds/
│   │   └── seedData.js          # Database seeding
│   └── server.js                # Application entry point
├── .env                         # Environment variables
├── .env.example                 # Environment template
├── .gitignore
└── package.json
```

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Menu Items

#### Get All Menu Items
```http
GET /api/menu
```

**Query Parameters:**
- `category` - Filter by category (Appetizer, Main Course, Dessert, Beverage)
- `isAvailable` - Filter by availability (true/false)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price

**Example:**
```bash
curl http://localhost:5000/api/menu?category=Main%20Course&isAvailable=true
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

---

#### Search Menu Items
```http
GET /api/menu/search?q={query}
```

**Example:**
```bash
curl http://localhost:5000/api/menu/search?q=chicken
```

---

#### Get Single Menu Item
```http
GET /api/menu/:id
```

**Example:**
```bash
curl http://localhost:5000/api/menu/64abc123def456789
```

---

#### Create Menu Item
```http
POST /api/menu
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Grilled Steak",
  "description": "Premium ribeye steak",
  "category": "Main Course",
  "price": 999,
  "ingredients": ["beef", "salt", "pepper"],
  "preparationTime": 25,
  "isAvailable": true,
  "imageUrl": "https://example.com/image.jpg"
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Grilled Steak",
    "description": "Premium ribeye steak",
    "category": "Main Course",
    "price": 999,
    "ingredients": ["beef", "salt", "pepper"],
    "preparationTime": 25
  }'
```

---

#### Update Menu Item
```http
PUT /api/menu/:id
Content-Type: application/json
```

**Example:**
```bash
curl -X PUT http://localhost:5000/api/menu/64abc123def456789 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1099,
    "isAvailable": false
  }'
```

---

#### Delete Menu Item
```http
DELETE /api/menu/:id
```

**Example:**
```bash
curl -X DELETE http://localhost:5000/api/menu/64abc123def456789
```

---

#### Toggle Availability
```http
PATCH /api/menu/:id/availability
```

**Example:**
```bash
curl -X PATCH http://localhost:5000/api/menu/64abc123def456789/availability
```

---

### Orders

#### Get All Orders
```http
GET /api/orders
```

**Query Parameters:**
- `status` - Filter by status (Pending, Preparing, Ready, Delivered, Cancelled)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```bash
curl http://localhost:5000/api/orders?status=Pending&page=1&limit=5
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 12,
  "page": 1,
  "pages": 3,
  "data": [...]
}
```

---

#### Get Single Order
```http
GET /api/orders/:id
```

**Example:**
```bash
curl http://localhost:5000/api/orders/64abc123def456789
```

---

#### Create Order
```http
POST /api/orders
Content-Type: application/json
```

**Body:**
```json
{
  "items": [
    {
      "menuItem": "64abc123def456789",
      "quantity": 2
    }
  ],
  "customerName": "John Doe",
  "tableNumber": 5
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "menuItem": "64abc123def456789",
        "quantity": 2
      }
    ],
    "customerName": "John Doe",
    "tableNumber": 5
  }'
```

---

#### Update Order Status
```http
PATCH /api/orders/:id/status
Content-Type: application/json
```

**Body:**
```json
{
  "status": "Preparing"
}
```

**Example:**
```bash
curl -X PATCH http://localhost:5000/api/orders/64abc123def456789/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Ready"}'
```

---

#### Get Top Selling Items (Analytics)
```http
GET /api/orders/analytics/top-selling
```

**Example:**
```bash
curl http://localhost:5000/api/orders/analytics/top-selling
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "menuItemId": "64abc123def456789",
      "name": "Grilled Salmon",
      "category": "Main Course",
      "price": 850,
      "imageUrl": "...",
      "totalQuantity": 45,
      "totalRevenue": 38250,
      "orderCount": 23
    }
  ]
}
```

---

## Testing the API

### Using cURL

#### 1. Get All Menu Items
```bash
curl http://localhost:5000/api/menu
```

#### 2. Search for Items
```bash
curl http://localhost:5000/api/menu/search?q=salmon
```

#### 3. Filter by Category
```bash
curl http://localhost:5000/api/menu?category=Appetizer
```

#### 4. Get Available Items Only
```bash
curl http://localhost:5000/api/menu?isAvailable=true
```

#### 5. Create a Menu Item
```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Caesar Salad",
    "description": "Fresh romaine lettuce with caesar dressing",
    "category": "Appetizer",
    "price": 9.99,
    "ingredients": ["lettuce", "parmesan", "croutons"],
    "preparationTime": 10
  }'
```

#### 6. Get Orders with Filters
```bash
curl http://localhost:5000/api/orders?status=Delivered&page=1&limit=5
```

#### 7. Get Top Selling Items
```bash
curl http://localhost:5000/api/orders/analytics/top-selling
```

### Using Postman

1. Import the endpoints into Postman
2. Set base URL: `http://localhost:5000/api`
3. For POST/PUT requests, set header: `Content-Type: application/json`
4. Add request body in JSON format

---

## Database Schema

### MenuItem Schema
```javascript
{
  name: String (required, indexed),
  description: String,
  category: String (enum, required),
  price: Number (required),
  ingredients: [String],
  isAvailable: Boolean (default: true),
  preparationTime: Number (required),
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  orderNumber: String (unique, auto-generated),
  items: [{
    menuItem: ObjectId (ref: MenuItem),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String (enum),
  customerName: String,
  tableNumber: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Key Features Implementation

### 1. Text Search with Indexing
Menu items are indexed for text search on `name` and `ingredients` fields:
```javascript
menuItemSchema.index({ name: 'text', ingredients: 'text' });
```

### 2. Input Validation
All inputs are validated using Joi before processing:
- Required fields checking
- Type validation
- Enum validation for categories and statuses
- Price and quantity range validation

### 3. MongoDB Aggregation Pipeline
Top-selling items analytics uses aggregation:
```javascript
Order.aggregate([
  { $match: { status: 'Delivered' } },
  { $unwind: '$items' },
  { $group: { _id: '$items.menuItem', totalQuantity: { $sum: '$items.quantity' } } },
  { $sort: { totalQuantity: -1 } },
  { $limit: 5 },
  { $lookup: { from: 'menuitems', ... } }
])
```

### 4. Error Handling
Consistent error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Deployment

### MongoDB Atlas Setup
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/restaurant-admin
```

### Deploy to Render
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Deploy to Heroku
```bash
heroku create restaurant-admin-api
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set NODE_ENV=production
git push heroku main
```

---

## Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (Mac)
brew services start mongodb-community

# Start MongoDB (Linux)
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Find process on port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### Seed Script Issues
```bash
# Clear database manually
mongo restaurant-admin --eval "db.dropDatabase()"

# Run seed again
npm run seed
```

---

##  Scripts

```json
{
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "seed": "node src/seeds/seedData.js"
}
```

---

## Security Notes

- Add authentication middleware for protected routes
- Use environment variables for sensitive data
- Implement rate limiting
- Add CORS configuration for production
- Sanitize user inputs

---

## License

ISC

---

## 👥 Support

For issues or questions, please create an issue in the repository.

---

## Checklist

- [x] MongoDB schema design
- [x] RESTful API endpoints
- [x] Input validation
- [x] Error handling
- [x] Text search functionality
- [x] Pagination
- [x] Aggregation pipeline
- [x] Seed data script
- [ ] Authentication (future)
- [ ] Rate limiting (future)
- [ ] API documentation with Swagger (future)