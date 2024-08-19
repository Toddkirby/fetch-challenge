import test, { expect } from "../utils/Fixtures"

      test('Find the fools gold', async ({ fetchPage, page }) => {
        await test.step('Navigate to sdet challenge page', async () => {
          // Navigate to fetch sdet challenge page
          await page.goto('http://sdetchallenge.fetch.com/');
          await expect(fetchPage.gameDiv).toBeVisible();
        });

        await test.step('Add gold to bowls and check', async () => {
          // add bottom half to left and top half to right and repeat until solution
          let amount = new Array(await fetchPage.getAmountOfCoins());
          await fetchPage.newArrayRecursion(amount)
        });
  
        await test.step('Check Result and react', async () => {
          // Verify popup notification
          console.log('fingers cross notification pops up')

        });
    });

  