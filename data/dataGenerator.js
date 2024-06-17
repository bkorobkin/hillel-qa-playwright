const { faker } = require('@faker-js/faker');

function generateRegistrationData() {
  const emailPrefix = 'aqa-';
  const password = faker.internet.password();
  const email = `${emailPrefix}${faker.internet.email()}`;
  return {
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: email,
    password: password,
    reEnterPassword: password,
  };
}

module.exports = { generateRegistrationData };
