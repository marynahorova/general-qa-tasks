import { test as base } from "@playwright/test";
import { FormsPage } from "../pages/forms.page";
import { WaitConditionsPage } from "../pages/waitConditions.page";
import { VoteController } from "../../api/controllers/voteController";
import { LoginPage } from "../pages/login.page";

export const baseFixture = base.extend<{
  formsPage: FormsPage;
  waitConditionsPage: WaitConditionsPage;
  loginPage: LoginPage;
  voteController: VoteController;
}>({
  formsPage: async ({ page }, use) => {
    const formsPage = new FormsPage(page);
    await use(formsPage);
  },

  waitConditionsPage: async ({ page }, use) => {
    const waitConditionsPage = new WaitConditionsPage(page);
    await use(waitConditionsPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  voteController: async ({ request }, use) => {
    const voteController = new VoteController(request);
    await use(voteController);
  },
});
