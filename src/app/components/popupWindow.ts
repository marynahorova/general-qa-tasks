import { expect } from "@playwright/test";
import { Component } from "../abstract";

export class PopupComponent extends Component {
  private openPopupBtn = this.page.locator("#window1");

  async expectLoaded(): Promise<void> {
    await expect(this.openPopupBtn).toBeVisible();
  }

  async clickOpenPopupBtn() {
    await this.openPopupBtn.click();
  }
}
