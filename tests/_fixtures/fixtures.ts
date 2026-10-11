import { mergeTests } from '@playwright/test';
import { test as usersApiTest } from './fixturesUsersApi';
import { test as profilesApiTest } from './fixturesProfilesApi';

export const test = mergeTests(usersApiTest, profilesApiTest);
