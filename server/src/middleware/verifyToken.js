import jwt from "jsonwebtoken";
import {Admin} from "../database/index.js";

const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key";

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const data = jwt.verify(token, jwtSecret);
    const userId = data.userId;
    
    const user = await Admin.findById(userId);
    if (user) {
        req.userId = user._id;
        next();
    }else{
        return res.status(401).json({ message: "Invalid token" });
    }

    } catch (error) {
        console.error("Token verification error(Middleware error):", error);
        return res.status(401).json({ message: "Token verification error(Middleware error)" });
    }
    
}

export default verifyToken;
