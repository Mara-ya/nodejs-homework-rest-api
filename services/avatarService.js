var Jimp = require('jimp');
const path = require('path');
const fs = require('fs').promises;
const PUBLIC_DIR = path.resolve('./public/avatars');
const { updateUser } = require('./authService');

const uploadImage = async (id, file) => {
    const avatarURL = path.join(PUBLIC_DIR, `${id}${file.originalname}`);
    try {
        const image = await Jimp.read(file.path)
        image.resize(250,250)
        .write(avatarURL);
        await fs.unlink(file.path);
        await updateUser(id, avatarURL)
        return avatarURL;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

module.exports = {
    uploadImage
}