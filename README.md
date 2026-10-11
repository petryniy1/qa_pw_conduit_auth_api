# Conduit API testing

## Table of contents

- [Description](#description)
- [Preparation](#preparation)
- [Main Task](#main-task)
- [Task Reporting](#task-reporting)

## Description

In this task you need to create test cases for the [Conduit](https://conduit.mate.academy/) users and profile resources. The full list is described in the [documentation](https://documenter.getpostman.com/view/48909389/2sB3QFQXfE).

## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands:

    - `npm ci`
    - `npx playwright install`


## Main Task

1. Create positive and negative tests for the `Login user` operation. 
- *Successfull login for the previosuly regsitered user*
- *Login with not existing email*
- *Login with wrong formatted email*
- *Login with wrong password*
2. Create test for the `Update user` operation.
- *Update user with empty auth token*
- *Update not existing user*
3. Create test for the `Profile` operatons:
- *Read profile of not existing user*
- *Read profile of existing user with empty auth header*
4. Use the already created tests as examples.

## Task Reporting

1. Add and commit all your updates.
2. Push the code to the origin.
3. Create a PR for your changes.
4. Keep implementing suggestions from code review until your PR is approved.
