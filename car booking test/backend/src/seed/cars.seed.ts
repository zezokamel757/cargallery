import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { CarSchema } from '../car/car.model';

dotenv.config();

const cars = [
  {
    make: 'Toyota',
    carModel: 'Camry',
    year: 2024,
    price: 28500,
    color: 'Silver',
    mileage: 12000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    engine: '2.5L 4-Cylinder',
    description: 'Reliable midsize sedan with excellent fuel economy.',
    images: ['placeholder.jpg'],
  },
  {
    make: 'Honda',
    carModel: 'Civic',
    year: 2023,
    price: 24500,
    color: 'Blue',
    mileage: 18000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L 4-Cylinder',
    description: 'Sporty compact with great handling and efficiency.',
    images: ['placeholder.jpg'],
  },
  {
    make: 'BMW',
    carModel: '3 Series',
    year: 2024,
    price: 45900,
    color: 'Black',
    mileage: 8000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L Turbo',
    description: 'Luxury sport sedan with premium interior.',
    images: ['placeholder.jpg'],
  },
  {
    make: 'Mercedes-Benz',
    carModel: 'C-Class',
    year: 2023,
    price: 48900,
    color: 'White',
    mileage: 15000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L Turbo',
    description: 'Elegant luxury sedan with advanced safety features.',
    images: ['placeholder.jpg'],
  },
  {
    make: 'Tesla',
    carModel: 'Model 3',
    year: 2024,
    price: 42990,
    color: 'Red',
    mileage: 5000,
    fuelType: 'Electric',
    transmission: 'Single-Speed',
    engine: 'Dual Motor AWD',
    description: 'All-electric sedan with long range and autopilot.',
    images: ['placeholder.jpg'],
  },
  {
    make: 'Ford',
    carModel: 'Mustang',
    year: 2023,
    price: 38900,
    color: 'Yellow',
    mileage: 10000,
    fuelType: 'Gasoline',
    transmission: 'Manual',
    engine: '5.0L V8',
    description: 'Iconic American muscle car with powerful V8 engine.',
    images: ['placeholder.jpg'],
  },
  {
    make: 'Chevrolet',
    carModel: 'Corvette',
    year: 2024,
    price: 68900,
    color: 'Orange',
    mileage: 3000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '6.2L V8',
    description: 'Mid-engine supercar with stunning performance.',
    images: ['placeholder.jpg'],
  },
  {
    make: 'Audi',
    carModel: 'A4',
    year: 2023,
    price: 41900,
    color: 'Gray',
    mileage: 14000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '2.0L Turbo',
    description: 'Premium compact sedan with quattro all-wheel drive.',
    images: ['placeholder.jpg'],
  },
  {
    make: 'Nissan',
    carModel: 'Altima',
    year: 2024,
    price: 26900,
    color: 'White',
    mileage: 9000,
    fuelType: 'Gasoline',
    transmission: 'CVT',
    engine: '2.5L 4-Cylinder',
    description: 'Comfortable family sedan with spacious interior.',
    images: ['placeholder.jpg'],
  },
  {
    make: 'Hyundai',
    carModel: 'Tucson',
    year: 2024,
    price: 32900,
    color: 'Green',
    mileage: 7000,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    engine: '1.6L Turbo Hybrid',
    description: 'Compact SUV with modern tech and great warranty.',
    images: ['placeholder.jpg'],
  },
  {
    make: 'Jeep',
    carModel: 'Wrangler',
    year: 2023,
    price: 38900,
    color: 'Khaki',
    mileage: 20000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: '3.6L V6',
    description: 'Off-road capable SUV with removable top.',
    images: ['placeholder.jpg'],
  },
  {
    make: 'Porsche',
    carModel: '911',
    year: 2024,
    price: 115000,
    color: 'Silver',
    mileage: 2000,
    fuelType: 'Gasoline',
    transmission: 'PDK',
    engine: '3.0L Twin-Turbo Flat-6',
    description: 'Legendary sports car with precision engineering.',
    images: ['placeholder.jpg'],
  },
];

async function seedCars() {
  const uri = process.env.CARS_DB;
  if (!uri) {
    throw new Error('CARS_DB is not set in .env');
  }

  const connection = await mongoose.createConnection(uri).asPromise();
  const Car = connection.model('Car', CarSchema);

  const existingCount = await Car.countDocuments();
  if (existingCount > 0) {
    console.log(`Found ${existingCount} existing cars. Clearing collection...`);
    await Car.deleteMany({});
  }

  const inserted = await Car.insertMany(cars);
  console.log(`Seeded ${inserted.length} cars successfully.`);

  await connection.close();
}

seedCars()
  .then(() => {
    console.log('Cars database seed complete.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to seed cars database:', error.message);
    process.exit(1);
  });
