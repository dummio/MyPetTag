import { test, expect } from "@playwright/test";

test("Register Account Page Form Test", async ({ page }) => {
  await page.goto("https://mypettag-5970e.web.app/");
  await page.goto("https://mypettag-5970e.web.app/login");
  await page.getByRole("link", { name: "Register" }).click();
  await page.locator('input[name="firstname"]').click();
  await page.locator('input[name="firstname"]').fill("test");
  await page.locator('input[name="lastname"]').click();
  await page.locator('input[name="lastname"]').fill("test");
  await page.locator('input[name="phone"]').click();
  await page.locator('input[name="phone"]').fill("801");
  await page.locator('input[name="email"]').click();
  await page.getByText("Enter a valid phone number.").click();
  await page.locator('input[name="phone"]').click();
  await page.locator('input[name="phone"]').fill("801-111-1111");
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill("test@test.");
  await page.locator('input[name="emailConfirm"]').click();
  await page.getByText("Enter a valid email address.").click();
  await page.getByText("Emails do not match.").click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill("test@test.com");
  await page.locator('input[name="emailConfirm"]').click();
  await page.locator('input[name="emailConfirm"]').fill("test@test.com");
  await page.locator("svg").click();
  await page.getByRole("heading", { name: "Password Requirements" }).click();
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill("test123!");
  await page.getByText("Password does not meet requirements.").click();
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill("Abcd123!");
  await page.getByText("Passwords do not match.").click();
  await page.locator('input[name="passwordConfirm"]').click();
  await page.locator('input[name="passwordConfirm"]').fill("Abcd123!");
  await page.getByRole("checkbox").check();
  await page.locator('input[name="passwordConfirm"]').click();
  await page.locator('input[name="passwordConfirm"]').click();
  await page.locator('input[name="passwordConfirm"]').fill("");
  await page.getByRole("link", { name: "Login here" }).click();
  await page.close();
});
