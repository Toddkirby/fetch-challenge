import { test } from "@playwright/test";

test.beforeEach(async ({}) => {
  console.log("beforeEach tests");
});

test.afterEach(async ({}) => {
  console.log("afterEach tests");
});
