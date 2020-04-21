import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtExpireTime = 3000;
module.exports = {
	hashPassword: async (password) => {
		return await bcrypt.hash(password, 10);
	},
	generateAuthToken: async (user) => {
		//TODO: Replace with clean refresh token later
		const token = jwt.sign({_id: user._id}, process.env.JWT_KEY, {
			algorithm: 'HS256',
			expiresIn: jwtExpireTime
		});
		user.tokens.concat({token});
		await user.save();
		return token;
	},
	//TODO: Use this middleware for authorization
	tokenChecker: async (req,res,next) => {
		try {
			const token = req.body.token || req.query.token || req.headers['x-access-token'];
			if (token) {
				req.decoded = await jwt.verify(token, process.env.JWT_KEY);
				next();
			} else {
				return res.status(401).send({
					message: 'No token provided in request.'
				});
			}
		}
		catch (e) {
			console.error(e.message);
			next(e);
		}
	}
};