"use server"
import { connectDB, getCollection } from "../lib/mongo";
//import bcrypt from "bcryptjs";
import axios from 'axios';

const USER_HOST_URL = 'http://localhost:5000/user';
export const register = async (values) => {
    console.log("register function")
    const { email, password, name } = values;
    console.log("Registering user with name:", name, "email:", email, "password:", password);

    try {
        await connectDB();
        const usersCollection = getCollection("users");
        console.log("querying for existing user with email:", email);
        const userFound = await usersCollection.findOne({ email });
        // const userFound = await User.findOne({ email });
        if (userFound) {
            return {
                error: 'Email already exists!'
            }
        }
        //const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Creating user in the database (in user service) with name:", name, "email:", email);
        const res = await axios.post(`${USER_HOST_URL}/insert`, {
            name,
            email,
            password
        });

        console.log("res", res.data);
        if (res.status !== 200) {
            return {
                error: 'Error while creating user in the database (in user service)'
            }
        } else {
            console.log("User created in the database (in user service)");
        }

    } catch (e) {
        console.log(e);
    }
}