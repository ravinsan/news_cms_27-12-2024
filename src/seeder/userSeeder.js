import mongoose from 'mongoose'; // Import mongoose
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import connectDB from '../connectDB/db.js'; // Import DB connection
import { User } from '../models/user.model.js';
import { Role } from '../models/role.model.js';

// Seeder function
const seedUsers = async () => {
    await connectDB(); // Connect to DB
  
    try {
      // Clear existing users (optional, for a fresh start)
      await User.deleteMany();
      console.log('Existing users deleted');
  
      // Hash the password
      const hashedPassword = await bcrypt.hash('12345678', 10); // Replace '12345678' with the desired password
  
      // Fetch or create role_id from the Role collection
      const role = await Role.findOne({ name: 'Super Admin' });
      if (!role) {
        throw new Error('Role "Super Admin" not found!');
      }
  
      // Seed users with ObjectId references
      const users = [
        {
          name: 'Super Admin',
          email: 'admin@example.com',
          password: hashedPassword,
          mobile: '1234567890',
          role_id: role._id, // Use ObjectId from the Role collection
          status: true,
          create_by: null, // Use ObjectId of the user who creates
          updated_by: null, // Use ObjectId of the user who updates
        },
      ];
  
      await User.insertMany(users);
      console.log('User seeded successfully');
    } catch (error) {
      console.error('Error seeding users:', error.message);
    } finally {
      mongoose.connection.close(); // Close DB connection
      process.exit();
    }
  };
  
  seedUsers(); // Run seeder

// command = node src/seeder/userSeeder.js