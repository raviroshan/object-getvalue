function getValue(obj, properties, defaultReturn, onlyOwnProperty) {
	var propertyArray;
	var appendObj = obj;
	var res = defaultReturn;
	var key, index;

	var lastPosition;
	var arrayIndexPosition = -1;

	if (typeof obj !== 'object') {
		throw new Error('Please pass a valid object as first parameter');
	}

	if (typeof properties !== 'string') {
		throw new Error('Please pass a valid string as second parameter');
	} else {
		propertyArray = properties.split('.');
	}

	if (properties.trim() === '') {
		return defaultReturn || obj;
	}

	for (index = 0; index < propertyArray.length; index++) {
		key = propertyArray[index];

		// Check for the Property - Array or simple Key
		if (key.charAt(key.length - 1) === ']') {
			lastPosition = key.lastIndexOf('[');
			arrayIndexPosition = Number(key.substring(lastPosition + 1, key.length - 1));
			key = key.substring(0, lastPosition);
		}

		// Check if the user wants to Get the Value of Property ONLY on the Current Object
		// By default it checks prototype properties
		if (onlyOwnProperty) {
			if (appendObj.hasOwnProperty(key)) {
				res = (arrayIndexPosition > -1) ? appendObj[key][arrayIndexPosition] : appendObj[key];
			} else {
				res = undefined;
			}
		} else {
			res = (arrayIndexPosition > -1) ? appendObj[key][arrayIndexPosition] : appendObj[key];
		}

		// If Value is undefined, break the flow and return undefined
		// Else increment the appendObj pointer to the new/child property
		if (res === undefined) {
			res = defaultReturn;
			break;
		} else {
			appendObj = (arrayIndexPosition > -1) ? appendObj[key][arrayIndexPosition] : appendObj[key];
			arrayIndexPosition = -1;
		}
	}
	return res;
}

module.exports = getValue;
