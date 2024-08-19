import { test as baseTest } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CommonMethods } from "./CommonMethods";
import { FetchPage } from "../pages/FetchPage";


interface PageObjects {
  basePage: BasePage;
  commonMethods: CommonMethods;
  fetchPage: FetchPage;
}

const test = baseTest.extend<PageObjects>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  commonMethods: async ({ page }, use) => {
    await use(new CommonMethods(page));
  },
  fetchPage: async ({page}, use) =>{
    await use(new FetchPage(page));
  }
});

export default test;
export const expect = test.expect;
