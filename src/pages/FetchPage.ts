import { expect, Page } from "@playwright/test";
import { BasePage } from "../utils/BasePage";
import exp from "constants";

export class FetchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  //locators
  leftBowlFirstSlot = this.page.locator('#left_0');
  rightBowlFirstSlot = this.page.locator('#right_0');
  weighBtn = this.page.getByRole('button', {name:'Weigh'});
  resetBtn = this.page.getByRole('button', {name: 'Reset'});
  gameDiv = this.page.locator("//div[@class='game']")
  resultBtn = this.page.locator("//div[@class='result']/button");

  //methods
  async clickWeigh(){
    await this.weighBtn.click();
  }
  async clickReset(){
    await this.resetBtn.click();
  }
  async getResultText(){
    let result = await this.resultBtn.textContent();
    return result?.trim();
  }
  async clickDesiredCoin(num:number){
    let coin = num.toString()
    console.log(coin)
    await this.page.getByRole('button',{name: coin}).click({force:true})
  }
  async getAmountOfCoins(){
    let amount = await this.page.locator("//button[@class='square']").count();
    return amount;
  }
  async checkWeighings(i:number){
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('listitem').nth(i).waitFor({state: 'attached'})
  }
  async handleDialogue(){
    this.page.once('dialog', async dialog => {
      
      await this.takeScreenshot();
      await dialog.dismiss()});
  }
  // async clickFinalCoinBasedOnResult(coins: number[]){
  //   if(coins.length == 2){
  //       if(this.getResultText.toString() == '>'){
  //           return await this.clickDesiredCoin(coins[1].toString());
  //       } else {
  //           return await this.clickDesiredCoin(coins[0].toString());
  //       }
  //   }
  // }
  async enterLeftBowl(amount: number[]){
    let i = 0;
    let largestCoin = amount.length
    let halfAmount = Math.floor(largestCoin / 2)
    let newArray: number[] = new Array();
    await this.leftBowlFirstSlot.click()
    while(i < halfAmount){
        newArray.push(amount[i]);
        await this.page.keyboard.press(amount[i].toString())
        await this.page.keyboard.press('Tab');
        ++i;
    }
    return newArray;
  }
  async enterRightBowl(amount: number[]){
    let j = amount.length -1;
    let largestCoin = amount.length -1
    let halfAmount = Math.floor(largestCoin / 2);
    let newArray: number[] = new Array();
    await this.rightBowlFirstSlot.click()
    while(j > halfAmount){
        newArray.unshift(amount[j]);
        await this.page.keyboard.press(amount[j].toString());
        await this.page.keyboard.press('Tab');
        --j;
    }
    return newArray;
  }

  async checkResult(left:number[], right:number[], result){
    switch (result){
                case '<':
                    console.log('fake in the left group')
                    if(left.length == 1){
                      await this.clickDesiredCoin(left[0]);
                      // await this.takeScreenshot();
                    } else {
                      await this.clickReset()
                    }
                    return left;
                    
                case '>':
                    console.log('fake in the right group')
                    if(right.length == 1){
                      await this.clickDesiredCoin(right[0]);
                      // await this.takeScreenshot();
                    } else {
                      await this.clickReset()
                    }
                    return right;
                case '=':
                    console.log('fake is the middle number')
                    await this.clickDesiredCoin(Math.floor(
                          await this.getAmountOfCoins() / 2
                        )
                      )
                    // await this.takeScreenshot();
                     
                      
                    return [];
                default:
                    console.log('unexpected result');
                    break;
              }
  }

  // async newArrayRecursion(amount: number[]){
  //   if(amount.length <=1 ){
  //       return;
  //   }
  //   let result = await this.getResultText();
  //   await this.clickReset();
  //       switch (result){
  //           case '<':
  //               console.log('fake in the left group')
  //               let leftArray:number[] = await this.enterLeftBowl(amount);
  //               await this.enterRightBowl(amount);
  //               await this.clickWeigh();
  //               await this.clickFinalCoinBasedOnResult(amount)
  //               await this.newArrayRecursion(leftArray);
  //               break;
  //           case '>':
  //               console.log('fake in the right group')
  //               let rightArray: number[]= await this.enterRightBowl(amount);
  //               await this.enterLeftBowl(amount);
  //               await this.clickWeigh();
  //               await this.clickFinalCoinBasedOnResult(amount)
  //               await this.newArrayRecursion(rightArray);
  //               break;
  //           case '=':
  //               console.log('fake is the middle number')
  //               await this.clickDesiredCoin(
  //                   await this.getHalfAmountOfCoins(
  //                       await this.getAmountOfCoins()
  //                   ).toString()
  //               )
  //               break;
  //           default:
  //               console.log('unexpected result');
  //               break;
  //         }
  // }

}
