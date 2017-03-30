# Object-getValue
Get the Object's property including nested, default return and hasOwnProperty check.

> Get a nested value from an object by path.

## Installation

```sh
npm install object-getvalue --save
```

## Usage

### Arguments

1. `object` (Object) The object to query
2. `property` (String) Simple or Nested property
3. (Optional) `defaultValue` (any) The value returned for `undefined` resolved values
4. (Optional) `hasOwnProperty` (bool) true if want to check for the property only on the current object but NOT on Prototype/Parent.

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

var Employee = function(name, company, empId, city) {
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

var emp1 = new Employee('Ravi', 'XYZ Consulting', 12345, 'Bangalore');

getValue(emp1, 'name') //=> 'Ravi Roshan'
getValue(emp1, 'details.domain') //=> 'e-commerce'
getValue(emp1, 'details.language.primary') //=> undefined
getValue(emp1, 'age') //=> 25 [Getting from prototype object]
getValue(emp1, 'salary', 9999) //=> 9999
getValue(emp1, 'age', 'Age not found', true) //=> 'Age not found'
```

## License

MIT
