## Project Description
This project has been created to illustrate the process of testing two different features, described in the following scenario files.
For both approaches, I have tried to follow similar code standards with some differences:

### cypress\integration\rateScenarios.ts

Since the nature of the tests and the data is about the API testing, the number of layers to distribute the code is quite plain.
Also, I have tried the tests to be data driven testing as much as possible. For this reason, the tests are created in real time by creating and describing two different scenarios (latest date and old date) since I believe the tests to be perform in both scenarios is similar.
Being the data different I was also able to test different situations per each.

As per implementation, I have tried to use two different ways of sending the requests using Cypress overloaded Request method.

### cypress\integration\snipCartScenarios.ts

These tests are quite more complex, in terms of structure and also code layers.
However, I have tried to drive the tests per the data. Also, I have tried to separate the responsibility of what to do per classes. Specially focused on the DRY and Single Responsibility principles.

I have just created only one Component Page with static methods, but it is something that I like doing since it allows to encapsulate the logic and not repeat unnecessary code. It is something that I could do that when it is required.

##### Notes and work arounds
There is one place where I had to use a explicit wait, since it fails when running headless (it works fine when running from the Cypress dashboard). I am not sure why the page does not load on headless way without that wait, but that's something I would need to investigate more perhaps with developers' help.

I only have added comments for code that needs specific explanation (apart of adding header comments for the methods). I have tried to use the fluent pattern so the code is auto-explanatory.

## How to run
- npm run cypress:run to run all the tests
- npm run cypress:open to open the cypress console