const {uploadImage} = require('../../services/avatarService');
const {updateUser} = require('../../services/authService');

const avatarController = async (req, res) => {
    const {_id: id} = req.user;
    const avatarURL = await uploadImage(id, req.file);
    await updateUser(id, {avatarURL});

    res.json({avatarURL});
}

module.exports = avatarController;