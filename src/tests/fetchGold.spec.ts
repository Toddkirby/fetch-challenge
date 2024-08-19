import test, { expect } from "../utils/Fixtures"

      test('Find the fools gold', async ({ fetchPage, page }) => {
        await test.step('Navigate to sdet challenge page', async () => {
          // Navigate to fetch sdet challenge page
          await page.goto('https://sdetchallenge.fetch.com/');
          await expect(fetchPage.gameDiv).toBeVisible();
        });
        let length = await fetchPage.getAmountOfCoins();
        let i = 0;
        let coinArray:any = Array.from({ length }, (_, index) => index);
        while(coinArray.length >= 2){
          await test.step(`Add gold to bowls and check ${i}`, async () => {
            // add bottom half to left and top half to right and repeat until solution
            
            let result;
            await fetchPage.handleDialogue()
            let leftArray = await fetchPage.enterLeftBowl(coinArray)
            let rightArray = await fetchPage.enterRightBowl(coinArray)
            await fetchPage.clickWeigh()
            await fetchPage.checkWeighings(i)
            result = await fetchPage.getResultText()
            coinArray = await fetchPage.checkResult(leftArray,rightArray,result)
            i++;
          });
        }
        
    });

  