import User from "../models/User.js";


const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(req.body._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Kullanıcı bulunamadı'
            });
        }

        if (user._id.toString() !== userId) {
            return res.status(401).json({
                success: false,
                message: 'Bu kullanıcıyı silme yetkiniz yok'
            });
        }

        user.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Kullanıcı silindi'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        const data = req.body;

        user.set(data);
        await user.save();

        res.json({ message: 'Kullanıcı güncellendi' });
    } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
}

const findUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' });
        }

        res.json({ success: true, user: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


export { deleteUser, updateUser, findUser };
