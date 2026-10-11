import { test as base } from '@playwright/test';
import { Logger } from '../../src/common/logger/Logger';
import * as allure from 'allure-js-commons';
import { parseTestTreeHierarchy } from '../../src/common/helpers/allureHelpers';

export const test = base.extend<
  {
    usersNumber: number;
    contextsNumber: number;
    infoTestLog: string;
    addAllureTestHierarchy: string;
  },
  {
    logger: Logger;
  }
>({
  logger: [
    async ({}, use) => {
      const logger = new Logger('error');

      await use(logger);
    },
    { scope: 'worker' },
  ],
  usersNumber: [1, { option: true }],
  contextsNumber: [1, { option: true }],
  infoTestLog: [
    async ({ logger }, use, testInfo) => {
      const normalizedFile = testInfo.file.replace(/\\/g, '/');
      const testsMarker = '/tests/';
      const idx = normalizedFile.indexOf(testsMarker);
      const fileName =
        idx >= 0 ? normalizedFile.substring(idx + testsMarker.length) : testInfo.file;

      logger.info(`Test started: ${fileName}`);

      await use('infoTestLog');

      logger.info(`Test completed: ${fileName}`);
    },
    { scope: 'test', auto: true },
  ],
  addAllureTestHierarchy: [
    async ({ logger }, use, testInfo) => {
      const fileName = testInfo.file;

      const [parentSuite, suite, subSuite] = parseTestTreeHierarchy(
        fileName,
        logger,
      );

      await allure.parentSuite(parentSuite);
      await allure.suite(suite);
      if (subSuite) {
        await allure.subSuite(subSuite);
      }

      await use('addAllureTestHierarhy');
    },
    { scope: 'test', auto: true },
  ],
});
