import { faker } from '@faker-js/faker';

/**
 * @param {import('../logger/Logger').Logger | null} [logger]
 */
export function generateNewUserData(logger = null) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const user = {
    username: `${firstName}_${lastName}`.replaceAll(`'`).toLowerCase(),
    email: `${firstName}_${faker.internet.email()}`.toLowerCase(),
    password: faker.internet.password(),
  };

  if (logger) {
    logger.debug(`Generated new user data: ${JSON.stringify(user)}`);
  }
  return user;
}
