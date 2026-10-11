import { faker } from '@faker-js/faker';
import { test } from '../../_fixtures/fixtures';

const updateUserNegativeCases = [
  {
    title: 'Update user with empty auth token',
    getToken: () => '',
  },
  {
    title: 'Update not existing user',
    getToken: () => faker.string.alphanumeric(30),
  },
];

for (const { title, getToken } of updateUserNegativeCases) {
  test(title, async ({ usersApi, updateUserData }) => {
    updateUserData.token = getToken();

    const response = await usersApi.updateUser(updateUserData);

    await usersApi.assertUnauthorizedResponseCode(response);
  });
}
