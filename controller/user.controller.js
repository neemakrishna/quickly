import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
export const signUp = async (req, res, next) => {
    try {
        
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
        const user = await User.create({
           
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        return res.status(200).json({ user, message: 'Sign up success', status: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', status: false });
    }
};

export const signIn = async (req, res, next) => {
    try {
       
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid1 credentials', status: false });
        }
        const status = await bcrypt.compare(password, user.password);
        if (!status) {
            return res.status(401).json({ message: 'Invalid credentials', status: false });
        }
        const token = jwt.sign({ subject: user.email }, 'krishna');
        return res.status(200).json({ message: 'Sign In Success', user: user, token: token, status: true });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error', status: false });
    }
};
export const tokenVerify = (req, res, next) => {
    try {
        let token = req.Headers.authorization;
        if (!token) throw Error();
        jwt.verify(token, 'krishna')
        next();
    } catch (err) {
        res.status(500).json({ massage: "internal server error", status: false });
    }
};
