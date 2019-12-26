# An experiment of testing Express.js with jest

This is an experimental project for me to learn how test Express.js project efficiently.

[![Build Status](https://dev.azure.com/dz-dev/express-jest/_apis/build/status/dzeyelid.express-jest-sample?branchName=master)](https://dev.azure.com/dz-dev/express-jest/_build/latest?definitionId=5&branchName=master)

## Base requirements

- This project provides simple APIs.
- Some APIs use a database like SQL Database or something.
- This project is created by [express-generator](https://github.com/expressjs/generator).

## Test requirements

- Compose with small components to test easily as unit test
- E2E test with supertest
- Mocking database in test

## How to run

```bash
npm install
node_modules/.bin/sequelize db:migrate
```

## Acknowledgments

Special thanks for [@Leko](https://github.com/Leko)-san !
