import { test, expect } from "@playwright/test";

test("Lost Pet Profile", async ({ page }) => {
  await page.goto("https://mypettag-5970e.web.app/tag/77Svwv/profile");
  await page
    .getByText(
      "If you have found this pet please consider sharing your location, or find a near"
    )
    .click();
  await page
    .locator("#pet-information-container")
    .getByRole("button", { name: "Share Location" })
    .click();
  await page
    .locator("#pet-information-container")
    .getByRole("button", { name: "Find Emergency Vet" })
    .click();
  await page.locator("#pet-information-container path").nth(1).click();
  await page.locator("#health-title-container").click();
  await page.getByText("Vaccines:").click();
  await page.getByText("Health Conditions:").click();
  await page.getByText("Medications:").click();
  await page.getByText("Allergies:").click();
  await page.getByText("Additional Information:").click();
  await page.locator("#health-title-container").click();
  await page.locator("#behavior-title-container").click();
  await page.getByText("Aggressions:").click();
  await page.getByText("Good With...").click();
  await page.getByText("Additional Information").click();
  await page.locator("#behavior-title-container").click();
  await page.locator("#vet-title-container").click();
  await page.getByText("Clinic Name:").click();
  await page.getByText("Clinic Address:").click();
  await page.getByText("Clinic Phone:").click();
  await page.getByText("Veterinarian :").click();
  await page.getByText("Microchip ID:").click();
  await page.locator("#vet-title-container").click();
  await page.getByRole("button", { name: "Share Location" }).click();
  await page.getByRole("button", { name: "Find Emergency Vet" }).click();
});

// Going to need to write pet profile create test once final release is created.
// zvunur : code for pet creation to be used.

test("Edit Pet Profile", async ({ page }) => {
  await page.goto("https://mypettag-5970e.web.app/");
  await page.goto("https://mypettag-5970e.web.app/login");
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill("mbelafonte@gmail.com");
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill("Abcd123!");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "Mia" }).getByRole("link").click();
  await page.getByRole("heading", { name: "Editing Mia" }).click();
  await page.locator("#form-contacts-container path").click();
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("Dad");
  await page.getByPlaceholder("Phone Number").click();
  await page.getByPlaceholder("Phone Number").fill("8011111111");
  await page.getByRole("heading", { name: "Vet Information" }).click();
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByRole("link", { name: "Mia" }).click();
  await page.locator("#navbar-container div").first().click();
  await page.getByRole("link", { name: "Account" }).click();
  await page.locator("#navbar-container div").first().click();
  await page.getByRole("link", { name: "Logout" }).click();
});
