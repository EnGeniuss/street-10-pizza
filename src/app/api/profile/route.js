import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

export async function PUT(req) {
    try {
        // Ensure the database is connected
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }

        const data = await req.json();
        const { _id, name, image, ...otherUserInfo } = data;

        let filter = {};

        if (_id) {
            filter = { _id };
        } else {
            const session = await getServerSession(authOptions);
            if (!session || !session.user.email) {
                return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            filter = { email: session.user.email };
        }

        const user = await User.findOne(filter);
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        await User.updateOne(filter, { name, image });
        await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });

        return new Response(JSON.stringify(true), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error in PUT API:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET(req) {
    try {
        // checking database is connected
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }

        const url = new URL(req.url);
        const _id = url.searchParams.get('_id');
        let filterUser = {};

        // Prioritize `_id` if provided
        if (_id) {
            filterUser = { _id };
        } else {
            const session = await getServerSession(authOptions);
            if (session && session.user && session.user.email) {
                filterUser = { email: session.user.email };
            } else {
                // If no _id and no session, return an empty response
                return new Response(JSON.stringify({ error: 'Unauthorized or missing data' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        console.log('Filter used for query:', filterUser);

        const user = await User.findOne(filterUser).lean();
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const userInfo = await UserInfo.findOne({ email: user.email }).lean();
        const userData = { ...user, ...userInfo };
        console.log (userData);
        return new Response(JSON.stringify(userData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error in GET API:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}