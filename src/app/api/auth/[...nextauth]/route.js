import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import NextAuth from "next-auth";
import mongoose from "mongoose";
import { User } from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "src/libs/mongoConnect";

const handler = NextAuth({
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }), 
      CredentialsProvider ({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          id: 'credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: { label: "Email", type: "email", placeholder: "email@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const email = credentials?.email;
            const password = credentials?.password;

            mongoose.connect("mongodb://localhost:27017/food-app");
            const user = await User.findOne({email});
            const passwordOk = user && bcrypt.compareSync(password, user.password); 
            
            if (passwordOk) {
              return user;
            }
            
            // Return null if user data could not be retrieved
            return null
          }
        })
      ]
})

export { handler as GET, handler as POST }