var assert = require('assert');
var getValue = require('../src');

var emp1,
	output;

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

emp1 = new Employee();

describe('Object-getValue', function() {
	describe('Check for property on Current Object', function() {
		it('should return the name', function() {
			assert.equal(getValue(emp1, 'name'), emp1.name);
		});

		it('should return the nested details.domain property', function() {
			assert.equal(getValue(emp1, 'details.domain'), emp1.details.domain);
		});

		it('should return undefined - property not found', function() {
			assert.equal(getValue(emp1, 'details.language.primary'), undefined);
		});
	});

	describe('Check for property on Prototype Object', function() {
		it('should return the age', function() {
			assert.equal(getValue(emp1, 'age'), emp1.age);
		});

		it('should return undefined - property not found', function() {
			assert.equal(getValue(emp1, 'address.area.pincode'), undefined);
		});

		it('should return undefined - property not found, even if the parent node is present child', function() {
			assert.equal(getValue(emp1, 'address.country'), undefined);
		});
	});

	describe('Check for property on Current Object - with Default Return', function() {
		it('should return the Default Return - If not found', function() {
			assert.equal(getValue(emp1, 'salary', 'Salary not found'), 'Salary not found');
		});

		it('should return the Default Return - If not found', function() {
			assert.equal(getValue(emp1, 'salary', 9999), 9999);
		});

		it('should return the property value even when the defaultReturn is passed', function() {
			assert.equal(getValue(emp1, 'name', 'John'), emp1.name);
		});
	});

	describe('Check for property on Prototype Object - with Default Return', function() {
		it('should return default return if property not found', function() {
			assert.equal(getValue(emp1, 'address.area.pincode', 560037), 560037);
		});
	});

	describe('Check for property ONLY on Current Object', function() {
		it('should NOT return the age', function() {
			assert.equal(getValue(emp1, 'age', 'Age not found', true), 'Age not found');
		});
	});

	describe('Check for property on Current OR Prototype Object', function() {
		it('should return the age', function() {
			assert.equal(getValue(emp1, 'age', 'Age not found', false), emp1.age);
		});
	});
});
