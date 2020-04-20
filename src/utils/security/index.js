import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

module.exports = {
	hashPassword: async (password) => {
		return await bcrypt.hash(password, 10);
	},
	generateAuthToken: async (user) => {
		const token = jwt.sign({_id: user._id}, process.env.JWT_KEY);
		console.log(token);
		user.tokens.concat({token});
		await user.save();
		return token;
	}
};