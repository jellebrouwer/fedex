# Fedex

Demo app for FedEx.

## Start the app

Install the npm packages: `npm install`.

To start the development server run `npm start`. Open your browser and navigate to http://localhost:4200/.

## Running tasks

To run tasks of FedEx app: `npx nx test|lint|build fedex`.

To run e2e tests: `npx nx e2e fedex-e2e`. Or to open Cypress: `npx nx e2e fedex-e2e --watch`.

To run tasks for all projects: `npm run test|lint|build`.

## To deploy

Run `npx nx build fedex` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Additional FedEx assessment notes:

- NX has been used as it has powerful scalability features. Further, it comes with Cypress and Jest out of the box which was required for this assessment.
- If there were multiple environments of the API avaialble you would typically add environment files.
- For this assessment Cypress E2E tests have been used. When the app is growing it would be beneficial to use Cypress compoent testing, to benefit from partial testing. It also keeps the E2E tests close to the source code which improves the development experience.
- CSS has been done with minimal effort. Next step would be to create a styles folder to setup a CSS library to be used in the repo.
