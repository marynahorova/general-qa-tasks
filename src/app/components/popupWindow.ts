import { expect } from "@playwright/test";
import { Component } from "../abstract";
import { FrameComponent } from "./frame";

export class PopupComponent extends Component {
  private openPopupBtn = this.page.locator("#window1");

  async expectLoaded(): Promise<void> {
    await expect(this.openPopupBtn).toBeVisible();
  }

  async clickOpenPopupBtn() {
    await this.openPopupBtn.click();
  }

  async openNewPage() {
    const pagePromise = this.page.waitForEvent("popup");
    await this.clickOpenPopupBtn();
    return new FrameComponent(await pagePromise);
  }
}
