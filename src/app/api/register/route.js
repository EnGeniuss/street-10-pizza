import { User } from "../../../models/User";
import mongoose from "mongoose";

export async function POST(req) {
    const body = await req.json();
    mongoose.connect("mongodb://localhost:27017/food-app",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000
      })
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
      });
    const createdUser = await User.create(body);
    return Response.json(createdUser);
}