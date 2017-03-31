# object-getvalue [(npm-link)](https://www.npmjs.com/package/object-getvalue)

[![Build Status](https://travis-ci.org/raviroshan/object-getvalue.svg?branch=master)](https://travis-ci.org/raviroshan/object-getvalue)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

Get the Object's property directly including nested properties.
It supports the default return value and hasOwnProperty check.

Runtime Error occurs when any key in the sequence is undefined while getting the Object's nested property value.
> person.address.location.current.city

To Avoid that, it's best practise to check for each property on object in sequence
```js
if (person.address &&
	person.address.location &&
	person.address.location.current &&
	person.address.location.current.city) {

	// var city = person.address.location.current.city

}
```

This package helps you in directly getting the nested property value from the Object
> getValue(person, 'address.location.current.city')   //=> 'Bangalore'

## Installation

```sh
npm install object-getvalue --save
```

## Usage

### Arguments

1. `object` (Object) The object to query
2. `property` (String) Simple or Nested property
3. (Optional) `defaultValue` (any) The value returned ONLY if property value resolves to `undefined`
4. (Optional) `hasOwnProperty` (bool - `default : false`) Checks for the property only on the current object but NOT on Prototype/Parent.

### Example

```js
var getValue = require('object-getvalue');

var Person = function() {
	this.name = 'No name defined yet';
	this.age = 25;
	this.address = {
		city: 'Default - New Delhi',
		country: 'Default - India'
	};
};

var Employee = function() {
	this.name = 'Ravi Roshan';
	this.company = 'XYZ Consulting';
	this.empId = 12345;
	this.address = {
		city: 'Bangalore'
	};
	this.details = {
		role: 'Developer',
		designation: 'Consultant',
		domain: 'e-commerce'
	};
};

Employee.prototype = new Person();

var emp1 = new Employee();

// Check for property on Current Object
getValue(emp1, 'name') //=> 'Ravi Roshan'
getValue(emp1, 'details.domain') //=> 'e-commerce'
getValue(emp1, 'details.language.primary') //=> undefined

// Check for property on Prototype Object'
getValue(emp1, 'age') //=> 25 [Getting from prototype Person Object]
getValue(emp1, 'address.area.pincode') //=> undefined

// Check for property on Current Object - with Default Return
getValue(emp1, 'salary', 9999) //=> 9999
getValue(emp1, 'salary', 'Salary not found') //=> 'Salary not found'
getValue(emp1, 'name', 'John') //=> 'Ravi Roshan' [name doesn't resolve to undefined so defaultReturn is not considered]

// Check for property ONLY on Current Object
getValue(emp1, 'age', 'Age not found', true) //=> 'Age not found'

// Check for property on Current OR Prototype Object
getValue(emp1, 'age', 'Age not found', false) //=> 25
```

## License

MIT
