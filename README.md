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

I wrote the locators in such a way to have them scale if the app were to ever scale in size and thought recursion was a fun way to solve the shrinking array with the fake gold.