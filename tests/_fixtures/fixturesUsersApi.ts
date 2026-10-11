import { test as genericTest } from './fixturesGeneric';
import { UsersApi } from '../../src/api/endpoints/UsersApi';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';

type UserData = {
  username: string;
  email: string;
  password: string;
  token?: string;
  bio?: string;
  image?: string;
};

export const test = genericTest.extend<{
  usersApi: UsersApi;
  newUserData: UserData;
  updateUserData: UserData;
  registeredUser: UserData;
}>({
  usersApi: async ({ request }, use) => {
    const client = new UsersApi(request);

    await use(client);
  },
  newUserData: async ({ logger }, use) => {
    const userData = generateNewUserData(logger);

    await use(userData);
  },
  updateUserData: async ({ logger }, use) => {
    const userData = generateNewUserData(logger);

    await use(userData);
  },
  registeredUser: async ({ usersApi, newUserData }, use) => {
    const response = await usersApi.registerNewUser(newUserData);

    await usersApi.assertSuccessResponseCode(response);

    newUserData.token = await usersApi.parseTokenFromBody(response);

    await use(newUserData);
  },
});
