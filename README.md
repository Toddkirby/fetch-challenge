Hi friends! 

Welcome to my repo for the Fetch challenge 🙂

My thought pattern for the solution will involve binary search:

-Take 4 'gold bars' and place them into one side and repeat for the other for a total of checking effectively all the bars.
    ex: if [0,1,2,3] = [4,5,6,7] then we know the 8th bar is the fake!

- For the side that weighs less compare the following 4 against each other and so on...
    ex: [0,1,2,3] < [4,5,6,7]
    ex: [0,1] < [2,3] (the resulting 4 follow the 'pointer'/less-than sign)
    ex: [0] > [1] (1 is the fake!)

This would result in a maximum of 3 weigh-ins vs the brute force path of up to 5 attempts.

Tool choice: To fit this into the automation, utilizing Playwright's runtime locator generator we can do the comparison noted above. 

Architecture: This small repo will utilize the Page Object Model with the fetchPage stemming from the basePage. While this is overkill for this small project, it is important to follow a build style.

Note:

I wrote the locators in such a way to have them scale if the app were to ever scale in size and thought a psuedo-recursion was a fun way to solve the shrinking array with the fake gold.

HOW TO USE:

Requirements: nodejs@22

Step by step from terminal:

1- git clone https://github.com/Toddkirby/fetch-challenge.git
    (clone the repo)

2- cd into fetch-challenge
    (enter the directory where the src code lives)

2- npm i
    (install dependencies)

3- npx playwright install
    (install playwright window binaries)

4- npx playwright test fetchGold --headed
    (tell node & playwright to launch the test file with a headed browser!)

final thoughts:

Handling the dialog for victory / loss was a bit wonky with the test runner but there is a listener for the popup for visual verification vs the screenshot like I was trying for.

This listener does break the test because it will attempt to close it 3 times despite being called once.

Lastly there are a few expects to verify the site prior to loading the next instruction.
