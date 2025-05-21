const jwt = require('jsonwebtoken');

const generateTokenUser = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET_USER,
        {
            expiresIn: process.env.JWT_EXPIRATION_USER || '2d',
        }
    )
}

module.exports = generateTokenUser;