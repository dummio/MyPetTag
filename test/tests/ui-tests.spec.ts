import { test, expect } from "@playwright/test";

test("Failed Login", async ({ page }) => {
  await page.goto("https://mypettag-5970e.web.app/");
  await page.goto("https://mypettag-5970e.web.app/login");
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill("mbelafonte@gmail.com");
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill("Abcd123");
  await page.getByRole("button", { name: "Login" }).click();
  let errorText = await page.getByText("Email or Password is Incorrect!");
  await expect(errorText !== undefined).toBeTruthy();
  await page.close();
});

test("Sucessful Login", async ({ page }) => {
  await page.goto("https://mypettag-5970e.web.app/");
  await page.goto("https://mypettag-5970e.web.app/login");
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill("mbelafonte@gmail.com");
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill("Abcd123!");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByText("Name: Maria Belafonte").click();
  await page.getByText("Email: mbelafonte@gmail.com").click();
  await page.getByText("Phone: 801-855-9595").click();
  await page.locator("#navbar-container div").first().click();
  await page.getByRole("link", { name: "Logout" }).click();
  await page.close();
});

test("Login Look at Pet Profile", async ({ page }) => {
  await page.goto("https://mypettag-5970e.web.app/");
  await page.goto("https://mypettag-5970e.web.app/login");
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill("mbelafonte@gmail.com");
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill("Abcd123!");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "Mia" }).click();
  await page.getByText("Mia").click();
  await page.getByText("Domestic Shorthair Mix").click();
  await page.locator("#health-title-container").click();
  await page.getByText("Rabies").click();
  await page.getByText("Hepatitis").click();
  await page.locator("#health-title-container").click();
  await page.locator("#behavior-title-container").click();
  await page.getByText("Men", { exact: true }).click();
  await page.getByText("Women").click();
  await page.getByText("Children").click();
  await page.getByText("Cats").click();
  await page.getByText("Dogs").click();
  await page.locator("#behavior-title-container").click();
  await page.locator("#vet-title-container").click();
  await page.getByText("Veterinarian :").click();
  await page.getByText("Dr Mike").click();
  await page.locator("#vet-title-container").click();
  await page.locator("#navbar-container div").first().click();
  await page.getByRole("link", { name: "Account" }).click();
  await page.getByText("Name: Maria Belafonte").click();
  await page.getByText("Email: mbelafonte@gmail.com").click();
  await page.getByText("Phone: 801-855-9595").click();
});
