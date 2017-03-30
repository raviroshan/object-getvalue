function getValue(obj, properties, defaultReturn, onlyOwnProperty) {
	var propertyArray = properties.split('.');
	var appendObj = obj;
	var res = defaultReturn;
	var key, index;

	if (typeof obj !== 'object') {
		throw new Error('Please pass a valid object as first parameter');
	}

	if (typeof properties !== 'string') {
		throw new Error('Please pass a valid string as second parameter');
	}

	if (properties.trim() === '') {
		return defaultReturn || obj;
	}

	for (index = 0; index < propertyArray.length; index++) {
		key = propertyArray[index];
		// Check if the user wants to Get the Value of Property ONLY on the Current Object
		// By default it checks prototype properties
		if (onlyOwnProperty) {
			if (appendObj.hasOwnProperty(key)) {
				res = appendObj[key];
			} else {
				res = undefined;
			}
		} else {
			res = appendObj[key];
		}

		// If Value is undefined, break the flow and return undefined
		// Else increment the appendObj pointer to the new/child property
		if (res === undefined) {
			res = defaultReturn;
			break;
		} else {
			appendObj = appendObj[key];
		}
	}
	return res;
}

module.exports = getValue;
