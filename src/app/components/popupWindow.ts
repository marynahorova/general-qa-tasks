import { expect } from "@playwright/test";
import { Component } from "../abstract";

export class PopupComponent extends Component {
  private openWindowBtn1 = this.page.locator("#window1");

  async expectLoaded(): Promise<void> {
    await expect(this.openWindowBtn1).toBeVisible();
  }

  async openWindowBtn1Click() {
    await this.openWindowBtn1.click();
  }
}
