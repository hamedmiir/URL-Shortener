import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import {User} from '../../../models/user';
import {ValidateError} from "../../../utils/errors";
import securityHandler from '../../../utils/security';

module.exports = {
	createUser: async (req, res, next) => {
		try {
			let {userName , email, password} = req.body;
			let user = new User({userName, email});
			user.password = await securityHandler.hashPassword(password);
			await user.save();
			const token = await securityHandler.generateAuthToken(user);
			res.send({ user, token });
		}
		catch (e) {
			if ((e.name === 'ValidationError') || ( (e.name === 'MongoError') && (e.code === 11000) ))
				next(new ValidateError(e, e.message));
			console.error(e.message);
			next(e);
		}
	},
	loginUser: async (req, res, next) => {
	
	}
};