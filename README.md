# 2025 Jan Technical Assessment
 
## Running the Project

### Initial Setup

Run the following commands to install dependencies, and build the front end when first setting up the project
```
npm i 
npm run build:frontend
```
### Running the Server

For subsequent runs, just start the application with:
```
npm start
```

### Running Tests

The tests are dependent on the setup, including `npm run build:frontend` since E2E tests with Playwright are included in the test suite. To run the tests, use the command:
```
npm test
```

Note that when first running the test suite, `npx playwright install` will execute to ensure Playwright can run, and the installation process might take a few seconds.
