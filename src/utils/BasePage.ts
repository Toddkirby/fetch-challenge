import { test, expect, Page } from "@playwright/test";

export class BasePage {
  constructor(public page: Page) {}

  //common locators shared across the app
  //common methods shared with the common locators

  async takeScreenshot() {
    await this.page.screenshot({ path: 'screenshot.png'});
  }
}
