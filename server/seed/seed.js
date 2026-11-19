import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import FarmerProfile from '../models/FarmerProfile.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

const img = (q) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=900&q=80`;

const productImages = {
  Tomato: img('1546094096-0df4bcaaa337'),
  Potato: img('1518977676601-b53f82aba655'),
  Onion: img('1508747703725-719777637510'),
  Carrot: img('1590868309235-ea34bed7bd7f'),
  Spinach: img('1576045057995-568f588f82fb'),
  Mango: 'https://harvesttotable.com/wp-content/uploads/2019/11/Mango-bigstock-Tropical-Mango-Tree-With-Big-R-288199537-scaled.jpg',
  Banana: img('1481349518771-20055b2a7b24'),
  Apple: img('1579613832125-5d34a13ffe2a'),
  Milk: img('1550583724-b2692b85b150'),
  Paneer: img('1452195100486-9cc805987862'),
  Curd: img('1488477181946-6428a0291777'),
  'Basmati Rice': img('1586201375761-83865001e31c'),
  Wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1c5a6ec32?w=800&q=80',
  Lentils:  'https://images.unsplash.com/photo-1585996483596-6d80e0c2d0e4?w=800&q=80',
  Chickpeas: img('1515543904379-3d757abe63ea'),
  'Organic Honey':  'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
  'Mustard Oil': img('1474979266404-7eaacbcd87c5'),
  'Green Peas': img('1583663848850-46af132dc08e'),
  Guava: img('1536511132770-e5058c7e8c46'),
  Jaggery: 'https://healthjade.com/wp-content/uploads/2017/10/jaggery.jpg'
};

const farmers = [
  ['Rajesh Kumar', 'Green Valley Farms', 'Kanpur', 'organic'],
  ['Suresh Patel', 'Patel Fresh Fields', 'Lucknow', 'mixed'],
  ['Anil Verma', 'Verma Agro Farm', 'Unnao', 'conventional'],
  ['Priya Sharma', 'Sunrise Organics', 'Kanpur', 'organic'],
  ['Ravi Singh', 'Singh Dairy & Grains', 'Fatehpur', 'mixed']
];

const products = [
  ['Tomato', 'Vegetables', 45, 'kg', 50, true],
  ['Potato', 'Vegetables', 32, 'kg', 100, false],
  ['Onion', 'Vegetables', 38, 'kg', 80, false],
  ['Carrot', 'Vegetables', 55, 'kg', 40, true],
  ['Spinach', 'Vegetables', 25, 'packet', 35, true],
  ['Mango', 'Fruits', 95, 'kg', 60, false],
  ['Banana', 'Fruits', 48, 'dozen', 80, false],
  ['Apple', 'Fruits', 160, 'kg', 45, false],
  ['Milk', 'Dairy', 65, 'litre', 70, false],
  ['Paneer', 'Dairy', 320, 'kg', 20, false],
  ['Basmati Rice', 'Grains', 110, 'kg', 100, false],
  ['Wheat', 'Grains', 42, 'kg', 150, false],
  ['Lentils', 'Pulses', 125, 'kg', 70, false],
  ['Organic Honey', 'Organic Products', 480, 'packet', 25, true],
  ['Mustard Oil', 'Organic Products', 190, 'litre', 40, true],
  ['Green Peas', 'Vegetables', 75, 'kg', 55, true],
  ['Guava', 'Fruits', 70, 'kg', 40, true],
  ['Curd', 'Dairy', 80, 'litre', 30, false],
  ['Chickpeas', 'Pulses', 105, 'kg', 75, false],
  ['Jaggery', 'Organic Products', 95, 'kg', 50, true]
];

async function seed() {
  await connectDB();

  await Promise.all([
    User.deleteMany({}),
    FarmerProfile.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({})
  ]);

  const cats = await Category.insertMany(
    [
      'Vegetables',
      'Fruits',
      'Dairy',
      'Grains',
      'Pulses',
      'Organic Products',
      'Other'
    ].map((name) => ({ name }))
  );

  const catMap = Object.fromEntries(
    cats.map((c) => [c.name, c._id])
  );

  await User.create({
    name: 'Krishi Admin',
    email: 'admin@krishimarket.com',
    password: await bcrypt.hash('Admin@123', 12),
    role: 'admin',
    phone: '9999999999'
  });

  for (let i = 0; i < farmers.length; i++) {
    const [name, farm, city, method] = farmers[i];

    const u = await User.create({
      name,
      email: `farmer${i + 1}@krishimarket.com`,
      password: await bcrypt.hash('Farmer@123', 12),
      role: 'farmer',
      phone: `900000000${i}`
    });

    await FarmerProfile.create({
      userId: u._id,
      farmName: farm,
      farmerName: name,
      farmLocation: city,
      city,
      state: 'Uttar Pradesh',
      pincode: '208001',
      cropTypes: ['Vegetables', 'Fruits'],
      farmingMethod: method,
      description:
        'Family-run farm focused on fresh produce for local families.',
      verificationStatus: i === 2 ? 'pending' : 'approved'
    });
  }

  for (let i = 0; i < 5; i++) {
    await User.create({
      name: `Demo Consumer ${i + 1}`,
      email: `consumer${i + 1}@krishimarket.com`,
      password: await bcrypt.hash('Consumer@123', 12),
      role: 'consumer',
      phone: `910000000${i}`
    });
  }

  const fps = await FarmerProfile.find({
    verificationStatus: 'approved'
  });

  for (let i = 0; i < products.length; i++) {
    const d = products[i];
    const farmer = fps[i % fps.length];

    await Product.create({
      farmer: farmer._id,
      name: d[0],
      category: catMap[d[1]],
      price: d[2],
      unit: d[3],
      quantityAvailable: d[4],
      minimumOrderQuantity: 1,

      // IMPORTANT: product-specific image
      images: [productImages[d[0]]],

      farmingMethod: farmer.farmingMethod,
      harvestDate: new Date(),
      location: farmer.city,
      isOrganic: d[5],
      isAvailable: true,
      description: `Fresh ${d[0].toLowerCase()} sourced directly from ${farmer.farmName}.`
    });
  }

  console.log('Seed complete');
  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
