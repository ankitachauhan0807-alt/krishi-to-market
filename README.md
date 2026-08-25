# Krishi Market

Krishi Market is a full-stack Farmer-to-Consumer agricultural marketplace built with React/Vite/Tailwind, Node/Express, MongoDB/Mongoose and JWT authentication.

## Implemented
- Consumer, farmer and admin roles with protected routes
- Farmer verification workflow
- Product CRUD and inventory controls
- Search, category, organic and sorting filters with pagination
- Public farmer profiles and product detail pages
- Persistent consumer cart and checkout
- Mock online payment + COD
- Real order creation with transactional inventory decrement
- Order tracking timeline and farmer status updates
- Product/farmer review API with purchase validation
- Admin dashboards, users, farmers, products, categories, orders and disputes
- Responsive agricultural marketplace UI
- Seed data with demo accounts and 20 products

## Structure
`client/` React frontend · `server/` Express API and Mongoose models.

## Requirements
- Node.js 20+
- MongoDB Atlas or local MongoDB

## Setup
1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`.
2. Copy `client/.env.example` to `client/.env` and set `VITE_API_URL`.
3. Install dependencies: `npm run install:all` from the root.
4. Seed MongoDB: `npm run seed`.
5. Run both apps: `npm run dev`.

Frontend: http://localhost:5173  
Backend: http://localhost:5000

## Demo credentials
- Admin: `admin@krishimarket.com` / `Admin@123`
- Farmer: `farmer1@krishimarket.com` / `Farmer@123`
- Consumer: `consumer1@krishimarket.com` / `Consumer@123`

Additional seeded farmers: farmer2..farmer5. Additional consumers: consumer2..consumer5.

## API overview
Auth: `/api/auth/*` · Products: `/api/products/*` · Farmers: `/api/farmers/*` · Orders: `/api/orders/*` · Reviews: `/api/reviews/*` · Admin: `/api/admin/*` · Categories: `/api/categories` · Disputes: `/api/disputes`.

## Deployment
Build the client with `npm run build` inside `client/`, then deploy `client/dist` to Vercel or Netlify. Deploy `server/` to Render, Railway or AWS with a MongoDB Atlas connection. Set production `CLIENT_URL` and `VITE_API_URL` environment variables.

## MVP limitations
Images use remote URLs rather than an upload service. Online payment is intentionally mocked. Farmer order visibility is based on orders containing the farmer's product snapshot; a production system can further split multi-farmer orders into fulfillment groups.
