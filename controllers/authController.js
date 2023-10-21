import User from '../models/User.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';



const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Lütfen kullanıcı adınızı ve şifrenizi girin'
        });
    }

    try {
        const user = await User.create({
            username,
            password
        });

        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Lütfen kullanıcı adınızı ve şifrenizi girin'
        });
    }
    try {
        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Kullanıcı bulunamadı'
            });
        }

        let passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Geçersiz kimlik bilgileri'
            });
        }
        const token = await generateToken(user);

        res.status(200).json({
            success: true,
            data: user,
            token: `Bearer ${token}`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const logout = async (req, res) => {
    res.json({ message: 'Kullanıcı çıkış yaptı' });
}



export { register, login, logout };