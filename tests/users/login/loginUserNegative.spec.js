import { faker } from '@faker-js/faker';
import { test } from '../../_fixtures/fixtures';
import { INVALID_EMAIL_OR_PASSWORD_MESSAGE } from '../../../src/constants/authErrorMessages';

const loginNegativeCases = [
  {
    title: 'Login with not existing email',
    getCredentials: () => ({
      email: faker.internet.email(),
      password: faker.internet.password(),
    }),
    errorKey: 'email or password',
    errorMessage: INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  },
  {
    title: 'Login with wrong formatted email',
    getCredentials: () => ({
      email: 'notanemail',
      password: faker.internet.password(),
    }),
    errorKey: 'email or password',
    errorMessage: INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  },
  {
    title: 'Login with wrong password',
    getCredentials: registeredUser => ({
      email: registeredUser.email,
      password: 'wrongPassword123',
    }),
    errorKey: 'email or password',
    errorMessage: INVALID_EMAIL_OR_PASSWORD_MESSAGE,
  },
];

for (const { title, getCredentials, errorKey, errorMessage } of loginNegativeCases) {
  test(title, async ({ usersApi, registeredUser }) => {
    const response = await usersApi.loginUser(getCredentials(registeredUser));

    await usersApi.assertUnprocessableEntityResponseCode(response);
    await usersApi.assertErrorMessageInResponseBody(response, errorMessage, errorKey);
  });
}
