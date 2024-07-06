const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("Fragrance App", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should open the app", async ({ page }) => {
    const locator = page.locator("text=scent sphere");
    await expect(locator).toBeVisible();
  });

  test("log in with valid credentials", async ({ page }) => {
    await page.getByRole("link", { name: "log in" }).nth(1).click();
    await page.getByTestId("username-input").fill("apaltemaa");
    await page.getByTestId("password-input").fill("password");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.getByText("Perfume Reviews")).toBeVisible();
  });
});

describe("when logged in", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.getByRole("link", { name: "log in" }).nth(1).click();
    await page.getByTestId("username-input").fill("apaltemaa");
    await page.getByTestId("password-input").fill("password");
    await page.getByRole("button", { name: "Login" }).click();
  });

  test.only("/fragrances endpoint can be opened", async ({ page }) => {
    await page.getByRole("button", { name: "Create Review" }).nth(1).click();
    await expect(page.url()).toBe("http://localhost:5173/fragrances");
  });
});
