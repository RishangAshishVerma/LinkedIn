import jwt from 'jsonwebtoken';

const generateToken = async (userId) => {
    try {
        let token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return token;
    } catch (error) {
        return res.status(500).json({ message: "Token generation error" });
    }
}

export default generateToken