import { expect } from "@playwright/test";
import { Component } from "../abstract";

export class FrameComponent extends Component {
  private frameBtn = this.page.locator("#click_me_2");

  async expectLoaded(): Promise<void> {
    await expect(this.frameBtn).toBeVisible();
  }

  async clickButton() {
    await this.frameBtn.click();
  }

  async verifyBtnTextAfterClick() {
    await expect(this.frameBtn).toHaveText("Clicked");
  }
}
