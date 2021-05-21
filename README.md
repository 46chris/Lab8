# Lab8_Starter
Name: Christopher Yoon
## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
   1. 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
    I probably would not use unit testing because a "message" feature probably contains many moving parts that'd need to interact with each other. Unit testing is most suited for testing individual components, not full on features. 

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
    I probably would use a unit test to test the "max message length" feature because it is a simple component within a "message" feature and unit testing is most suited for testing individual components. 

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
    If it was set to true, we would not see how the Puppeteer tests would drive our browser, we would only get the results of the tests. 

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?
```    
beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
    page.click('img');
}
```


