import test, { expect } from "@playwright/test";
import { loginAsAdmin, openFormsPage } from "../app/fixtures/testFixtures";
import { OrderPage } from "../app/pages/order.page";
import { TEST_FILES } from "../app/constants/testData";

test.describe("Request routing tests", () => {
  openFormsPage(
    "Add and check 'myHeader': `myValue` header to all outcome requests on a page",
    async ({ formsPage }) => {
      await formsPage.addCustomHeader();
      await formsPage.verifyCustomHeaderAdded();
    }
  );

  loginAsAdmin(
    "Login and replace pizza image with my image",
    async ({ loginPage, page }) => {
      const orderPage = new OrderPage(page);
      await orderPage.interceptImg(TEST_FILES.IMAGE);
      await page.screenshot({
        path: "screenshots/screenshot1.png",
        fullPage: true,
      });
    }
  );

  // A dedicated Page Object was not created for this test, since the URL differs from the project's baseURL and is used only here.
  test("Modify the request body and sent it to server back", async ({
    page,
  }) => {
    const URL = "https://the-internet.herokuapp.com/add_remove_elements/";
    await page.goto(URL);
    await page.route(URL, async (route) => {
      const response = await route.fetch();
      let body = await response.text();
      body = body.replace(
        "<h3>Add/Remove Elements</h3>",
        "<h3>IT IS GONE!</h3>"
      );
      await route.fulfill({ body });
    });
    await page.reload();
    await expect(page.locator("h3")).toHaveText("IT IS GONE!");
    await page.screenshot({
      path: "screenshots/screenshot2.png",
      fullPage: true,
    });
  });

  openFormsPage("Emulate 404 error", async ({ formsPage }) => {
    await formsPage.emulate404Error();
    await formsPage.verifyEmulatedError();
  });
});
