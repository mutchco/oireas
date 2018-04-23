const schema = {
	sender: {
		required: 'Email is required',
		email: {
			message: 'Must be a valid email'
		}
	},
	name: {
		required: 'Name is required'
	},
	message: {
		max: {
			value: 500,
			message: 'Message can be no more than 500 characters'
		}
	}
};

const validate = items => {

	const errors = {};
	const values = {};

	let valid = true;

	for (let s in schema) {
		if (schema[s].required && validateString(items[s]) === false) {
			valid = false;
			errors[s] = 'Required';
			continue;
		}

		if (!!items[s] && schema[s].email !== undefined && validateEmail(items[s]) === false) {
			valid = false;
			errors[s] = schema[s].email.message;
			continue;
		}

		if (!!items[s] && schema[s].max !== undefined && validateLength(items[s], schema[s].max.value) === false) {
			valid = false;
			errors[s] = schema[s].max.message;
			continue;
		}

		if (valid === true) {
			values[s] = items[s];
		}

	}

	return { valid, errors, values };

};

const validateString = string => {
	return !!string && string !== '';
};

const validateLength = (string, max) => {
	return string.length <= max;
};

const validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export default validate;