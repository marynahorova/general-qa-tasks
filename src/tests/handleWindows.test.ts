import { test } from "@playwright/test";
import { WaitConditionsPage } from "../app/pages/waitConditions.page";
import { FrameComponent } from "../app/components/frame";

test("check opening multiple windows", async ({ page, context }) => {
  const waitConditions = new WaitConditionsPage(page);
  await waitConditions.openPopup();
  await waitConditions.verifyPopupOpened();
  const frame = await waitConditions.popup.openNewPage();
  await frame.expectLoaded();
  await frame.clickButton();
  await frame.verifyBtnTextAfterClick();
});
