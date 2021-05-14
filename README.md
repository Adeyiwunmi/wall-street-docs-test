

This is a node js application that finds top matches between 
sentences sent to it and some predefined sentences in a local database.

The application makes use of worker threads to split the work
and not processes like pm2 because threads are more light weight
to work with.

 **Starting the application**
 - clone the repository.
 - run `npm install` to install dependencies.
 - run `npm start` to start the application on default port 8080,
  or set `PORT` to another value in your 
  terminal before running `npm start`.

**Testing the Application**

- Automated tests of the application can be run by running `npm test` on terminal in the root directory.
- You can test the endpoint in action by starting the application and 
making a request to `/extractions/matches` with a request body like
```{
     
     {"sentences": ["Furthermore, please confirm your organisation's contact details according to the instructions set out in the sheet attached hereto.", 
     
     "We acknowledge and agree to the matters set out in your Confidentiality Agreement dated PLACEHOLDER(of which this is a copy)."]

} 
 ```
 
**Improvements** 
- The application can be improved by adding a test 
strategy to confirm the endpoint use worker threads.
- It can also be improved by adding a documentation 
for the endpoint e.g using swagger-ui.
- Addition of test coverage reporter.


  
 
