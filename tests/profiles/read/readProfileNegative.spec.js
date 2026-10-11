import { test } from '../../_fixtures/fixtures';

test('Read profile of not existing user', async ({ profilesApi }) => {
  const response = await profilesApi.getProfile('nonexistentuser');

  await profilesApi.assertNotFoundResponseCode(response);
});

test('Read profile of existing user with empty auth header', async ({
  registeredUser,
  profilesApi,
}) => {
  const response = await profilesApi.getProfile(registeredUser.username, '');

  await profilesApi.assertSuccessResponseCode(response);
  await profilesApi.assertFollowingHasValueFalse(response);
});
