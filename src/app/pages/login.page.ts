import { AppPage } from "../abstract";
import { expect } from "@playwright/test";

export class LoginPage extends AppPage {
  public pagePath: string = "/login.html";

  //Locators
  private userNameInput = this.page.locator("#user");
  private passwordInput = this.page.locator("#password");
  private loginBtn = this.page.locator("#login");

  //Methods
  async expectLoaded(): Promise<void> {
    await expect(this.userNameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async loginAsAdmin(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}
