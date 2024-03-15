## Questions

n/a

### Please provide instructions on how to run your project in a bulleted list below.

- You should have the following installed:
  - Docker
  - NodeJS v16.16 or above
- Clone the repository `https://github.com/singiankay/advisors-excel-interview.git`
- cd to the root directory folder
- run `docker-compose up -d`
- run `npm install` to install the dependencies
- run `npm start` to start the app

### Were there any pieces of this project that you were not able to complete that you'd like to mention?

I did not finish adding history for the deposit, and withdrawal transactions. I would be able to compare the transaction dates
and have the limit of a given account to $400 in a single day. Similarly, I can do this via localStorage or cache to temporarily save the transactions

### If you were to continue building this out, what would you like to add next?

This is a backend application. I would like to complete the frontend application that I am making for this but at the current moment is still unfinished.
You can checkout the repository at `https://github.com/singiankay/advisors-excel-frontend.git`

I would love to refactor this code and add unit and integration tests.

### If you have any other comments or info you'd like the reviewers to know, please add them below.

This is an ATM API written in NestJS.
I implemented a jwt token authorization for the correct account number.
