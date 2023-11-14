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

test("Create Basic Pet Profile", async ({ page }) => {
  await page.goto("https://mypettag-5970e.web.app/");
  await page.goto("https://mypettag-5970e.web.app/login");
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill("mbelafonte@gmail.com");
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill("Abcd123!");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(3000);
  await page.locator("#navbar-container div").first().click();
  await page.getByRole("link", { name: "Create Pet" }).click();
  await page.getByRole("heading", { name: "Create New Pet" }).click();
  await page.getByRole("textbox").click();
  await page.getByRole("textbox").fill("zvunur");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("heading", { name: "Add New Pet" }).click();
  await page.getByRole("textbox").first().click();
  await page.getByRole("textbox").first().fill("James");
  await page.locator(".css-19bb58m").first().click();
  await page.getByRole("option", { name: "Dog" }).click();
  await page
    .locator(".css-aj8ygy-control > .css-hlgwow > .css-19bb58m")
    .first()
    .click();
  await page.locator("#react-select-3-input").fill("au");
  await page
    .getByRole("option", { name: "australian shepherd", exact: true })
    .click();
  await page
    .getByPlaceholder("Provide a brief introduction about your pet")
    .click();
  await page
    .getByPlaceholder("Provide a brief introduction about your pet")
    .fill("He is a good boy, he loves to play fetch");
  await page.locator('input[type="date"]').fill("2023-01-01");
  await page.getByRole("spinbutton").click();
  await page.getByRole("spinbutton").fill("39");
  await page
    .locator(
      "div:nth-child(22) > .css-aj8ygy-control > .css-hlgwow > .css-19bb58m"
    )
    .click();
  await page.getByRole("option", { name: "Neutered Male" }).click();
  await page.locator("#form-contacts-container svg").click();
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("Dad");
  await page.getByPlaceholder("Phone Number").click();
  await page.getByPlaceholder("Phone Number").fill("1111111111");
  await page.getByPlaceholder("1234 Park Ave, City, TX 12345").click();
  await page
    .getByPlaceholder("1234 Park Ave, City, TX 12345")
    .fill("1234 James Way");
  await page.getByRole("button", { name: "Create Pet" }).click();
  await page.getByRole("link", { name: "James" }).click();
  await page.getByText("James", { exact: true }).click();
  await page.getByText("australian shepherd").click();
  await page.getByText("Dad").click();
  await page.getByText("1234 James Way").click();
  await page.locator("#navbar-container div").first().click();
  await page.getByRole("link", { name: "Account" }).click();
  await page.getByRole("heading", { name: "Welcome" }).click();
  await page.locator("#pet-container-icons svg").nth(1).click();
  await page.getByRole("link", { name: "James" }).getByRole("link").click();
  await page.getByText("Are you sure you want to delete James?").click();
  await page
    .getByText(
      "Warning: This will unassign the tag associated with your account."
    )
    .click();
  await page.getByRole("button", { name: "Yes" }).click();
  await page.locator("#navbar-container div").first().click();
  await page.goto("https://mypettag-5970e.web.app/logout");
  await page.goto("https://mypettag-5970e.web.app/");
  await page.goto("https://mypettag-5970e.web.app/login");
  await page.close();
});

// zvunur : code for pet creation to be used.

// TODO: create detailed pet profile to be done at final release

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
