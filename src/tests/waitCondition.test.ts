import { test, expect } from "@playwright/test";
import { openWaitConditionsPageAndSetValues } from "../app/fixtures/testFixtures";

test.describe("Wait Condition Tests", () => {
  openWaitConditionsPageAndSetValues(
    "check min/max values are set correctly",
    async ({ waitConditionsPage }) => {
      const minMaxValues = await waitConditionsPage.getMinMaxValues();
      expect(minMaxValues).toStrictEqual({ minValue: "2", maxValue: "4" });
    }
  );

  openWaitConditionsPageAndSetValues(
    "check triggering alert",
    async ({ page, waitConditionsPage }) => {
      await waitConditionsPage.triggerAlert();
      page.on("dialog", async (dialog) => {
        await dialog.accept();
      });
      await waitConditionsPage.verifyAlert();
    }
  );

  openWaitConditionsPageAndSetValues(
    "check triggering prompt and accepting it",
    async ({ page, waitConditionsPage }) => {
      await waitConditionsPage.triggerPrompt();
      page.on("dialog", async (dialog) => {
        await dialog.accept();
      });
      await waitConditionsPage.verifySuccessPrompt();
    }
  );

  openWaitConditionsPageAndSetValues(
    "check triggering prompt and canceling it",
    async ({ page, waitConditionsPage }) => {
      await waitConditionsPage.triggerPrompt();
      page.on("dialog", async (dialog) => {
        await dialog.dismiss();
      });
      await waitConditionsPage.verifyCanceledPrompt();
    }
  );

  openWaitConditionsPageAndSetValues(
    "check triggering button visibility and click on it",
    async ({ waitConditionsPage }) => {
      await waitConditionsPage.triggerVisibleElement();
      await waitConditionsPage.verifyVisibleBtn();
      await waitConditionsPage.clickVisibleBtn();
      await waitConditionsPage.verifyPopup();
    }
  );

  openWaitConditionsPageAndSetValues(
    "check triggering element invisibility",
    async ({ waitConditionsPage }) => {
      await waitConditionsPage.triggerInvisibleElement();
      await waitConditionsPage.verifySpinnerHidden();
    }
  );

  openWaitConditionsPageAndSetValues(
    "check triggering button enabling",
    async ({ waitConditionsPage }) => {
      await waitConditionsPage.triggerEnabledElement();
      await waitConditionsPage.verifyElementEnabled();
    }
  );

  openWaitConditionsPageAndSetValues(
    "check changing page title",
    async ({ waitConditionsPage }) => {
      await waitConditionsPage.triggerNewPageTitle();
      await waitConditionsPage.verifyNewPageTitle();
    }
  );

  openWaitConditionsPageAndSetValues(
    "check text/value to have specific values",
    async ({ waitConditionsPage }) => {
      await waitConditionsPage.triggerTextInput();
      const value = await waitConditionsPage.getInputValue("Dennis Ritchie");
      expect(value).toBe("Dennis Ritchie");
      await waitConditionsPage.verifyBtnCaption();
    }
  );
  openWaitConditionsPageAndSetValues(
    "check triggering frame",
    async ({ waitConditionsPage }) => {
      await waitConditionsPage.triggerFrame();
      await waitConditionsPage.verifyFrameAndBtn();
    }
  );
});
