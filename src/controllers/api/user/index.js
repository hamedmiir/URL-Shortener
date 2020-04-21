import bcrypt from 'bcrypt';

import {User} from '../../../models/mongo/user';
import {IncorrectPassword, UserNotExist, ValidateError} from "../../../utils/errors";
import securityHandler from '../../../utils/security';
import {UrlObject} from "../../../models/mongo/shortenedUrl";
import {hashUrl} from "../../../utils/url-handler";

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
		try {
			const {email, password} = req.body;
			let user = await User.findOne({email});
			if (!user)
				throw new UserNotExist('', 'Not found any user with this email address', {
					email
				});
			const isPasswordMatch = await bcrypt.compare(password, user.password);
			if (!isPasswordMatch)
				throw new IncorrectPassword();
			let token = await securityHandler.generateAuthToken(user);
			res.header('token', token).send(user);
		}
		catch (e) {
			console.error(e.message);
			next(e);
		}
	},
	findUser: async (req, res, next) => {
		try {
			res.send({User: User.findOne({_id: req.params.id})});
		}
		catch (e) {
			console.log(e);
			next(UserNotExist(e,' No user found with this id'));
		}
	},
	addUrl: async (req, res, next) => {
		try {
			let userId = req.params.id;
			let {originalUrl, suggestedPath} = req.body;
			//TODO: Should validate url with regex
			let user = await User.findOne({_id: userId});
			let shortenedUrl = await hashUrl(user, originalUrl, suggestedPath);
			let url = new UrlObject(originalUrl, shortenedUrl);
			user.urls.push(url);
			res.send({
				message: 'Your url has been saved',
				newUrl: shortenedUrl
			})
		}
		catch (e) {
			console.log(e.message);
			next(e);
		}
	}
};