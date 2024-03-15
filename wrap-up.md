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
You can checkout the frontend repository at `https://github.com/singiankay/advisors-excel-frontend.git`

I would love to refactor this code and add unit and integration tests.
I would also love to improve the jwt and headers implementation.
I would love to improve input sanitazion, I think those are not properly escaped right now aside from default typeORM has.
For the functionality, I would love to have a PIN number feature, a statement of account and a Loan functionality that isn't tied to
the credit limit. Maybe perhaps, a car loan application via Mean/Average deposit/withdrawals etc.

### If you have any other comments or info you'd like the reviewers to know, please add them below.

This is an ATM API written in NestJS.
I implemented a jwt token authorization for the correct account number.
