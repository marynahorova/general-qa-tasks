import { expect } from "@playwright/test";
import { AppPage } from "../abstract";

export class WaitConditionsPage extends AppPage {
  public pagePath: string = "/expected_conditions.html";

  //For Trigger
  private minWaitInput = this.page.locator("#min_wait");
  private maxWaitInput = this.page.locator("#max_wait");
  private showAlertBtn = this.page.getByText("Show Alert");
  private showPromptBtn = this.page.getByText("Show Prompt");
  private triggerVisibilityBtn = this.page.locator("#visibility_trigger");
  private triggerInvisibilityBtn = this.page.locator("#invisibility_trigger");
  private spinner = this.page.getByRole("status");
  private triggerEnabledBtn = this.page.locator("#enabled_trigger");
  private triggerPageTitleBtn = this.page.locator("#page_title_trigger");
  private triggerTextValueBtn = this.page.locator("#text_value_trigger");
  private inputText = this.page.getByPlaceholder("Creator of C");
  private triggerFrameBtn = this.page.locator("#wait_for_frame");

  //After Trigger
  private confirmedAlert = this.page.getByText("Alert handled");
  private confirmedPrompt = this.page.getByText("Confirm response: OK");
  private canceledPrompt = this.page.getByText("Confirm response: Cancelled");
  private shownHiddenBtn = this.page
    .locator("#visibility_target")
    .getByText("Click Me");
  private shownHiddenTxt = this.page.getByText("Can you see me?");
  private hiddenSpinnerTxt = this.page.getByText(
    "Thank God that spinner is gone!"
  );
  private enabledBtn = this.page.getByRole("button", {
    name: "Enabled Button",
  });
  private submitBtn = this.page.locator("#wait_for_text");
  private frameLocator = this.page.locator("#frm");
  private frame = this.page.frameLocator("#frm");
  private innerBtn = this.frame.getByText("Inner Button");
  private innerBtnClicked = this.frame.getByText("Clicked");

  async expectLoaded(): Promise<void> {
    await expect(this.minWaitInput).toBeVisible();
    await expect(this.maxWaitInput).toBeVisible();
  }

  async setMinMaxValues(min: number, max: number) {
    await this.minWaitInput.fill(min.toString());
    await this.maxWaitInput.fill(max.toString());
  }
  async getMinMaxValues() {
    await this.minWaitInput.waitFor();

    const minValue = await this.minWaitInput.inputValue();
    const maxValue = await this.maxWaitInput.inputValue();

    return { minValue, maxValue };
  }

  async triggerAlert() {
    await this.showAlertBtn.click();
  }

  async verifyAlert() {
    await expect(this.confirmedAlert).toBeVisible();
  }

  async triggerPrompt() {
    await this.showPromptBtn.click();
  }

  async verifySuccessPrompt() {
    await expect(this.confirmedPrompt).toBeVisible();
  }

  async verifyCanceledPrompt() {
    await expect(this.canceledPrompt).toBeVisible();
  }

  async triggerVisibleElement() {
    await this.triggerVisibilityBtn.click();
  }

  async verifyVisibleBtn() {
    await expect(this.shownHiddenBtn).toBeVisible();
  }

  async clickVisibleBtn() {
    await this.shownHiddenBtn.click();
  }

  async verifyPopup() {
    await this.shownHiddenTxt.waitFor();
  }

  async triggerInvisibleElement() {
    await this.triggerInvisibilityBtn.click();
  }

  async verifySpinnerHidden() {
    await this.spinner.waitFor({ state: "hidden" });
    await expect(this.hiddenSpinnerTxt).toBeVisible();
  }

  async triggerEnabledElement() {
    await this.triggerEnabledBtn.click();
  }

  async verifyElementEnabled() {
    await expect(this.enabledBtn).toBeEnabled();
    await expect(this.enabledBtn).toHaveAttribute("class", "btn btn-success");
  }

  async triggerNewPageTitle() {
    await this.triggerPageTitleBtn.click();
  }

  async verifyNewPageTitle() {
    await this.page.waitForFunction(() => document.title === "My New Title!", {
      timeout: 5000,
    });
    await expect(this.page).toHaveTitle("My New Title!");
  }

  async triggerTextInput() {
    await this.triggerTextValueBtn.click();
  }

  async getInputValue(expected: string): Promise<string> {
    await this.inputText.waitFor();
    await expect(this.inputText).toHaveValue(expected, { timeout: 5000 });
    return await this.inputText.inputValue();
  }

  async verifyBtnCaption() {
    await expect(this.submitBtn).toBeVisible();
  }

  async triggerFrame() {
    await this.triggerFrameBtn.click();
  }

  async verifyFrameAndBtn() {
    await expect(this.frameLocator).toBeVisible();
    await this.innerBtn.click();
    await expect(this.innerBtnClicked).toBeVisible();
  }
}
