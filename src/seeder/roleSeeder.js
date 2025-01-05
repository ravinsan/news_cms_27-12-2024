import mongoose from 'mongoose'; // Import mongoose
import connectDB from '../connectDB/db.js';
import { Role } from '../models/role.model.js';

// Seeder function
const seedRoles = async () => {
  await connectDB(); // Connect to DB

  try {
    // Clear existing roles (optional, for a fresh start)
    await Role.deleteMany();
    console.log('Existing roles deleted');

    // Seed roles
    const roles = [
      { name: 'Super Admin' },
      { name: 'Admin' },
      { name: 'Manager' },
      { name: 'Employee' },
    ];

    await Role.insertMany(roles);
    console.log('Roles seeded successfully');
  } catch (error) {
    console.error('Error seeding roles:', error.message);
  } finally {
    mongoose.connection.close(); // Close DB connection
    process.exit();
  }
};

seedRoles(); // Run seeder

// command = node src/seeder/roleSeeder.js