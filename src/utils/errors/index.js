class ExtendableError extends Error {
    constructor(error, message, details) {
        super(error, message, details);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

class UserNotExist extends ExtendableError {
	constructor(error, message, details) {
		super(error, message, details);
		this.error = error;
		this.status = 404;
		this.details = details || {};
		this.message = message || 'Not exist any user with this data';
	}
}

class IncorrectPassword extends ExtendableError {
	constructor(error, message, details) {
		super(error, message, details);
		this.error = error;
		this.status = 403;
		this.details = details || {};
		this.message = message || 'Inserted password is incorrect';
	}
}

class ValidateError extends ExtendableError {
	constructor(error, message, details) {
		super(error, message, details);
		this.status = 400;
		this.details = details || {};
		this.message = message || 'Your request is not valid';
	}
}

class SystemError extends ExtendableError {
	constructor(error, message, details) {
		super(error, message, details);
		this.error = error;
		this.status = 500;
		this.details = details || {};
		this.message = message || 'System Error';
	}
}

export {SystemError, UserNotExist, IncorrectPassword, ValidateError}