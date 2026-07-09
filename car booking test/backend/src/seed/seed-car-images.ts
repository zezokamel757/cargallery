import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { CarSchema } from '../car/car.model';

dotenv.config();

const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads');

// Verified real car photos from Pexels / Unsplash (free to use)
const imageUrlsByCar: Record<string, string[]> = {
  'Toyota|Camry': [
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  'Honda|Civic': [
    'https://images.pexels.com/photos/239316/pexels-photo-239316.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  'BMW|3 Series': [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/1164774/pexels-photo-1164774.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1873334/pexels-photo-1873334.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  'Mercedes-Benz|C-Class': [
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1873334/pexels-photo-1873334.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  'Tesla|Model 3': [
    'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  'Ford|Mustang': [
    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80',
  ],
  'Chevrolet|Corvette': [
    'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-automobiles-39501.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  ],
  'Audi|A4': [
    'https://images.pexels.com/photos/2445547/pexels-photo-2445547.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1873334/pexels-photo-1873334.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80',
  ],
  'Nissan|Altima': [
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  'Hyundai|Tucson': [
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
  'Jeep|Wrangler': [
    'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ],
  'Porsche|911': [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-automobiles-39501.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ],
};

async function downloadImage(url: string, destPath: string): Promise<void> {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'CarBookingSeed/1.0' },
  });
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.startsWith('image/')) {
    throw new Error(`Not an image: ${url} (${contentType})`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 10000) {
    throw new Error(`Image too small (${buffer.length} bytes): ${url}`);
  }
  await fs.promises.writeFile(destPath, buffer);
}

function getUrlsForCar(make: string, carModel: string): string[] {
  const key = `${make}|${carModel}`;
  const urls = imageUrlsByCar[key];
  if (!urls) {
    throw new Error(`No image URLs configured for ${make} ${carModel}`);
  }
  return urls;
}

async function removeOldImages(oldFilenames: string[]): Promise<void> {
  for (const filename of oldFilenames) {
    const filePath = path.join(UPLOADS_DIR, filename);
    try {
      await fs.promises.unlink(filePath);
    } catch {
      // ignore missing files
    }
  }
}

async function seedCarImages() {
  const uri = process.env.CARS_DB;
  if (!uri) {
    throw new Error('CARS_DB is not set in .env');
  }

  await fs.promises.mkdir(UPLOADS_DIR, { recursive: true });

  const connection = await mongoose.createConnection(uri).asPromise();
  const Car = connection.model('Car', CarSchema);

  const cars = await Car.find().exec();
  if (cars.length === 0) {
    throw new Error('No cars found. Run npm run seed:cars first.');
  }

  console.log(`Replacing images for ${cars.length} cars with real photos...`);

  for (const car of cars) {
    const urls = getUrlsForCar(car.make, car.carModel);
    const oldImages = car.images ?? [];
    const filenames: string[] = [];

    for (const url of urls) {
      const filename = `${uuidv4()}.jpg`;
      const destPath = path.join(UPLOADS_DIR, filename);
      await downloadImage(url, destPath);
      filenames.push(filename);
      console.log(`  ${car.make} ${car.carModel} -> ${filename}`);
    }

    await Car.findByIdAndUpdate(car._id, { images: filenames });
    await removeOldImages(oldImages);
    console.log(`  Updated ${car.make} ${car.carModel}`);
  }

  await connection.close();
  console.log('All car images replaced with real photos.');
}

seedCarImages()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Failed to seed car images:', error.message);
    process.exit(1);
  });
