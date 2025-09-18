import { VoteController } from "../../api/controllers/voteController";
import { FormsPage } from "../pages/forms.page";
import { LoginPage } from "../pages/login.page";
import { WaitConditionsPage } from "../pages/waitConditions.page";
import { baseFixture } from "./baseFixture";

export const openFormsPage = baseFixture.extend<{
  formsPage: FormsPage;
}>({
  formsPage: async ({ formsPage }, use) => {
    await formsPage.open();
    await use(formsPage);
  },
});

export const openWaitConditionsPageAndSetValues = baseFixture.extend<{
  waitConditionsPage: WaitConditionsPage;
}>({
  waitConditionsPage: async ({ waitConditionsPage }, use) => {
    await waitConditionsPage.open();
    await waitConditionsPage.setMinMaxValues(2, 4);
    await use(waitConditionsPage);
  },
});

export const loginAsAdmin = baseFixture.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ loginPage }, use) => {
    await loginPage.open();
    await loginPage.loginAsAdmin("admin", "admin");
    await use(loginPage);
  },
});
