import { test } from "@playwright/test";
import { WaitConditionsPage } from "../app/pages/waitConditions.page";

test.describe("Wait Condition Tests", () => {
  let waitConditions: WaitConditionsPage;

  test.beforeEach(async ({ page }) => {
    waitConditions = new WaitConditionsPage(page);
    await waitConditions.open();
    await waitConditions.setMinMaxValues(2, 4);
  });

  test("check triggering alert", async ({ page }) => {
    await waitConditions.triggerAlert();
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await waitConditions.verifyAlert();
  });

  test("check triggering prompt and accepting it", async ({ page }) => {
    await waitConditions.triggerPrompt();
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await waitConditions.verifySuccessPrompt();
  });

  test("check triggering prompt and canceling it", async ({ page }) => {
    await waitConditions.triggerPrompt();
    page.on("dialog", async (dialog) => {
      await dialog.dismiss();
    });
    await waitConditions.verifyCanceledPrompt();
  });

  test("check triggering button visibility and click on it", async () => {
    await waitConditions.triggerVisibleElement();
    await waitConditions.verifyVisibleBtn();
    await waitConditions.clickVisibleBtn();
    await waitConditions.verifyPopup();
  });

  test("check triggering element invisibility", async () => {
    await waitConditions.triggerInvisibleElement();
    await waitConditions.verifySpinnerHidden();
  });

  test("check triggering button enabling", async () => {
    await waitConditions.triggerEnabledElement();
    await waitConditions.verifyElementEnabled();
  });

  test("check changing page title", async () => {
    await waitConditions.triggerNewPageTitle();
    await waitConditions.verifyNewPageTitle();
  });

  test("check text/value to have specific values", async () => {
    await waitConditions.triggerTextInput();
    await waitConditions.verifyInputAndBtnCaption();
  });

  test("check triggering frame", async () => {
    await waitConditions.triggerFrame();
    await waitConditions.verifyFrameAndBtn();
  });
});
