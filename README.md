# Testing Checklist

GET Endpoint
Positive Scenarios
 - Valid Expression Without Precision
 - Valid Expression With Precision
 - Boundary Values for Precision ("preciosion" <= 0 or "preciosion" >= 100)
 - Testing mathematical operations

Negative Scenarios
 - Missing Mandatory expr Parameter 
 - Invalid expr Parameter (e.g division by 0)
 - Invalid Precision Value (e.g text)

POST Endpoint
Positive Scenarios
 - Single Valid Expression Without Precision
 - Single Valid Expression With Precision
 - Array of Valid Expressions
 - Testing mathematical operations

Negative Scenarios
 - Invalid Expression in Array(e.g division by 0)
 - Invalid Expression input (empty expr field)
 - Invalid Precision Format ("precision": "abc" )

# api-task with Postman
In the `./postman` folder required API tests can be found. As well as pre-configured .csv collections to support data-driven testing. 

Test Colletion includes 3 sets of tests

GET Endpoint (Positive and Negative scenarios)
- Endpoint parameters are set as variables 
- Tests are designed to be run from .csv file input (please find attached inside Postman folder under corresponding name)

POST Endpoint 
Please note that POST endpoint coverage in Postman includes only positive scenarios, however with Axios, both positive and negatives are covered.
- Base url is set as variable
- Tests arer designed to be run from .csv file input (please find attached inside Postman folder under corresponding name)

Scope
The focus of this testing effort was not on validating the correctness of mathematical operations themselves but on ensuring proper handling of input validation and basic operation handling. 

# api-task with Axios 
In the `./tests/api-tests` directory, you will find a replicated set of test cases that were initially created in Postman. Due to Postman's limitations and time constraints, the decision was made to move tests in Axios for more flexibility and faster execution.

Axios is used as HTTP client and Playwright as a test runner

## How to Run API Tests

1. Install Dependencies
`npm install`

2. Test Configuration
Test configuration for API tests is in `playwright-api.config.ts`

3. Run API Tests
`npm run test:api`

Note on Test Behavior
Please be aware that the tested API endpoints sometimes return unconventional error responses. For instance, instead of returning a 400 Bad Request for division by zero, the endpoint returns 200. API tests are designed to validate more conventional behavior, so certain tests may fail intentionally to highlight discrepancies.

# ui-task with Playwright 

## How to Run

1. Install Dependencies
`npm install`

2. Test Configuration
Test configuration for UI tests is in `playwright.config.ts`

3. Run UI Tests
`npm run test`

4. CSV Output
Downloaded CSV will is saved in the `tests/artifacts` directory. CSV parsing helper can be found in the `demo-central/src` folder. This helper is used to process the downloaded CSV files. 