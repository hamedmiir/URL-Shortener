import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import {IncorrectPassword, UserNotExist} from "../../utils/errors";
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	userName: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	email: {
		type: String,
		required: true,
		lowercase: true
	},
	password: {
		type: Object,
		required: true,
		minLength: 7
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}],
	urls: [{
		type: Schema.Types.ObjectId,
		ref: 'UrlObject'
	}]
}, {
	timestamp: true
});

UserSchema.index({userName: 1}, { unique: true });

UserSchema.path('email').validate(email => {
	const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return validEmail.test(String(email).toLowerCase());
});

// UserSchema.pre('save', async (next) => {
// 	const user = this;
// 	if (user.isModified('password'))
// 		user.password = await bcrypt.hash(user.password,10);
// 	next();
// });

UserSchema.statics.loginByEmail = async (email, password) => {
	const user = await User.findOne({email});
	if (!user)
		throw new UserNotExist('', 'Not found any user with this email address', {
			email
		});
	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch)
		throw new IncorrectPassword();
	return user;
};

export let User = mongoose.model('User', UserSchema);