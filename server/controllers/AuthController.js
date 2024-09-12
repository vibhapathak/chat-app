import { compare } from 'bcrypt';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import { response } from 'express';

const maxage = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_KEY, { expiresIn: maxage });
}

export const signup = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send("Email and password are required.");
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).send("User with this email already exists.");
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword });

        response.cookie("jwt", createToken(email, user.id), {
            maxage,
            secure: true,
            sameSite: "None",
        });

        return response.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                // Add any other user fields you need
                profileSetup: user.profileSetup
            }
        });
    } catch (error) {
        console.error(error);
        return response.status(500).send("Internal server error.");
    }
}

export const login = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).send("Email and password are required.");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).send("User with the given email not found.");
        }

        const auth = await compare(password, user.password);
        if (!auth) {
            return response.status(401).send("Password is incorrect.");
        }

        response.cookie("jwt", createToken(email, user.id), {
            maxage,
            secure: true,
            sameSite: "None",
        });

        return response.status(200).json({
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                color: user.color,
                profileSetup: user.profileSetup
            }
        });
    } catch (error) {
        console.error(error);
        return response.status(500).send("Internal server error.");
    }
}

export const getUserInfo = async (request, response, next) =>{
try {
    const userData = await User.findById(request.userId);
   console.log(request.userId);
   if(!userData){
    return response.status(404).send("user with the given mail not found");
   }
    return response.status(200).json({
        user: {
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            image: userData.image,
            color: userData.color,
            profileSetup: userData.profileSetup
        }
   });
} catch (error) {
    console.error(error);
    return response.status(500).send("Internal server error.");
}
}
