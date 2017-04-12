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
	this.hobbies = [{
		name: 'Singing',
		type: 'Indoor'
	}, {
		name: 'Football',
		type: 'Outdoor'
	}, {
		name: 'Dancing',
		type: 'Outdoor'

	}, {
		name: 'Cooking',
		type: 'Outdoor'
	}];
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
	this.friends = [{
		name: 'Siddant',
		age: 27
	}, {
		name: 'Harsh',
		age: 26
	}, {
		name: 'Stuti',
		age: 30
	}];
};

// Inherit the Person Prototype
Employee.prototype = new Person();

// Create instance of Employee
emp1 = new Employee();

describe('Object-getValue', function() {
	describe('Check for property on Current Object', function() {
		describe('Key as Object Property', function() {
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

		describe('Array as Object Property', function() {
			it('should return second friend name property', function() {
				assert.equal(getValue(emp1, 'friends[1].name'), 'Harsh');
			});

			it('should return second friend complete Object', function() {
				assert.equal(getValue(emp1, 'friends[1]'), emp1.friends[1]);
			});

			it('should return undefined - object not found', function() {
				assert.equal(getValue(emp1, 'friends[5]'), undefined);
			});

			it('should return undefined - property not found', function() {
				assert.equal(getValue(emp1, 'friends[5].name'), undefined);
			});
		});
	});

	describe('Check for property on Prototype Object', function() {
		describe('Key as Object Property', function() {
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

		describe('Array as Object Property', function() {
			it('should return first hobby name property', function() {
				assert.equal(getValue(emp1, 'hobbies[0].name'), emp1.hobbies[0].name);
			});

			it('should return first hobby complete Object', function() {
				assert.equal(getValue(emp1, 'hobbies[0]'), emp1.hobbies[0]);
			});

			it('should return undefined - object not found', function() {
				assert.equal(getValue(emp1, 'hobbies[5]'), undefined);
			});

			it('should return undefined - property not found', function() {
				assert.equal(getValue(emp1, 'hobbies[5].name'), undefined);
			});
		});
	});

	describe('Check for property on Current Object - with Default Return', function() {
		it('should return the Default Return [Type : String] - If not found', function() {
			assert.equal(getValue(emp1, 'salary', 'Salary not found'), 'Salary not found');
		});

		it('should return the Default Return [Type : Number] - If not found', function() {
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

		it('should NOT return first hobby name property', function() {
			assert.equal(getValue(emp1, 'hobbies[0].name', 'Hobby not found', true), 'Hobby not found');
		});

		it('should return first friend name property', function() {
			assert.equal(getValue(emp1, 'friends[0].name', 'Friend Name not found', true), emp1.friends[0].name);
		});
	});

	describe('Check for property on Current OR Prototype Object', function() {
		it('should return the age', function() {
			assert.equal(getValue(emp1, 'age', 'Age not found', false), emp1.age);
		});
	});
});
