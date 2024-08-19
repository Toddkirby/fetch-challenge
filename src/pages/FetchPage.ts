import { expect, Page } from "@playwright/test";
import { BasePage } from "../utils/BasePage";

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
    let result = await this.resetBtn.textContent();
    return result?.trim();
  }
  async clickDesiredCoin(number:string){
    await this.page.getByRole('button',{name: number}).click()
  }
  async getAmountOfCoins(){
    let amount = await this.page.locator("//button[@class='square']").count();
    return amount;
  }
  async getHalfAmountOfCoins(amount: number){   
    await Math.floor(amount / 2);
  }
  async clickFinalCoinBasedOnResult(coins: number[]){
    if(coins.length == 2){
        if(this.getResultText.toString() == '>'){
            return await this.clickDesiredCoin(coins[1].toString());
        } else {
            return await this.clickDesiredCoin(coins[0].toString());
        }
    }
  }
  async enterLeftBowl(amount: number[]){
    let i = 0;
    let halfAmount = Math.floor(amount.length / 2)
    let newArray: number[] = new Array();
    while(i <= halfAmount){
        await this.leftBowlFirstSlot.fill(i.toString());
        newArray.push(amount[i]);
        i++;
        await this.page.keyboard.press('Tab');
    }
    return newArray;
  }
  async enterRightBowl(amount: number[]){
    let j = amount.length - 1;
    let halfAmount = Math.floor(amount.length / 2);
    let newArray: number[] = new Array();
    while(j > halfAmount){
        await this.rightBowlFirstSlot.fill(j.toString())
        newArray.unshift(amount[j]);
        j--;
        await this.page.keyboard.press('Tab');
    }
    return newArray;
  }

  async newArrayRecursion(amount: number[]){
    if(amount.length <=1 ){
        return;
    }
    let result = await this.getResultText();
    await this.clickReset();
        switch (result){
            case '<':
                console.log('fake in the left group')
                let leftArray:number[] = await this.enterLeftBowl(amount);
                await this.enterRightBowl(amount);
                await this.clickWeigh();
                await this.clickFinalCoinBasedOnResult(amount)
                await this.newArrayRecursion(leftArray);
                break;
            case '>':
                console.log('fake in the right group')
                let rightArray: number[]= await this.enterRightBowl(amount);
                await this.enterLeftBowl(amount);
                await this.clickWeigh();
                await this.clickFinalCoinBasedOnResult(amount)
                await this.newArrayRecursion(rightArray);
                break;
            case '=':
                console.log('fake is the middle number')
                await this.clickDesiredCoin(
                    await this.getHalfAmountOfCoins(
                        await this.getAmountOfCoins()
                    ).toString()
                )
                break;
            default:
                console.log('unexpected result');
                break;
          }
  }

}
