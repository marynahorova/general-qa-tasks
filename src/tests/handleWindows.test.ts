import { openWaitConditionsPageAndSetValues } from "../app/fixtures/testFixtures";

openWaitConditionsPageAndSetValues(
  "check opening multiple windows",
  async ({ waitConditionsPage }) => {
    await waitConditionsPage.openPopup();
    await waitConditionsPage.verifyPopupOpened();
    const frame = await waitConditionsPage.popup.openNewPage();
    await frame.expectLoaded();
    await frame.clickButton();
    await frame.verifyBtnTextAfterClick();
  }
);
