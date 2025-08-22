import { FormsPage } from "../app/pages/forms.page";
import { test } from "@playwright/test";

test.describe("Forms/Inputs tests", () => {
  let formsPage: FormsPage;

  test.beforeEach(async ({ page }) => {
    formsPage = new FormsPage(page);
    await formsPage.open();
  });

  test("check setting years of experience", async () => {
    await formsPage.setExperience("1");
    await formsPage.verifyExperience("1");
  });

  test("check disabled checkbox", async () => {
    await formsPage.verifyDisabledCheckBox("Java");
  });

  test("check selecting only Python checkbox", async () => {
    await formsPage.checkLang("Python");
    await formsPage.verifyLangUnchecked("JavaScript");
    await formsPage.verifyLangChecked("Python");
  });

  test("check selecting only JavaScript checkbox", async () => {
    await formsPage.checkLang("JavaScript");
    await formsPage.verifyLangUnchecked("Python");
    await formsPage.verifyLangChecked("JavaScript");
  });

  test("check selecting two languages", async () => {
    await formsPage.checkLang("Python");
    await formsPage.checkLang("JavaScript");
    await formsPage.verifyLangChecked("Python");
    await formsPage.verifyLangChecked("JavaScript");
  });

  test("check selecting radio btn", async () => {
    const radioBtns = ["Selenium", "Protractor"];
    for (const btn of radioBtns) {
      await formsPage.selectRadioBtn(btn);
      await formsPage.verifyRadioBtnChecked(btn);

      for (const anotherBtn of radioBtns.filter((b) => b !== btn)) {
        await formsPage.verifyRadioBtnUnchecked(anotherBtn);
      }
    }
  });

  test("check selecting primary skill", async () => {
    const cases = [
      { skill: "Selenium", value: "sel" },
      { skill: "Protractor", value: "pro" },
      { skill: "Cypress", value: "cyp" },
    ];

    for (const { skill, value } of cases) {
      await formsPage.selectPrimarySkill(skill);
      await formsPage.verifyPrimarySkill(value);
    }
  });

  test("check selecting language in the listbox", async () => {
    const variants = ["Java", "Python", "JavaScript", "TypeScript"];
    for (const langVar of variants) {
      await formsPage.selectLanguage(langVar);
      await formsPage.verifyLanguage(langVar);
    }
  });

  test("check filling text into textbox", async () => {
    await formsPage.fillText("test");
    await formsPage.verifyText("test");
  });

  test("check readonly field", async () => {
    await formsPage.verifyReadonlyField();
  });

  test("check speak german toggle", async () => {
    await formsPage.verifyToggle("");
    await formsPage.clickToggle();
    await formsPage.verifyToggle("true");
    await formsPage.clickToggle();
    await formsPage.verifyToggle("false");
  });

  test("check slider different values", async () => {
    for (let value = 0; value <= 5; value++) {
      await formsPage.setSliderValue(value);
      await formsPage.verifySliderValue(value);
    }
  });

  test("check uploading CV", async () => {
    await formsPage.uploadCvFile("cv.txt");
    await formsPage.verifyCvUpload("cv.txt");
  });

  test("check uploading multiple files", async () => {
    await formsPage.uploadMultipleFiles(["cv.txt", "certificate.pdf"]);
    await formsPage.verifyFilesUpload("cv.txt certificate.pdf");
  });

  test("check file downloading", async () => {
    await formsPage.downloadFile("src/downloads");
    await formsPage.verifyDownloadFile("src/downloads");
    await formsPage.cleanDownloads("src/downloads");
  });

  test("check disabled textbox", async () => {
    await formsPage.verifyDisabledTextbox();
  });

  test("check validation errors after submitting empty form", async () => {
    await formsPage.submitClick();
    await formsPage.verifyValidationErrors("city");
    await formsPage.verifyValidationErrors("state");
    await formsPage.verifyValidationErrors("zip");
    await formsPage.verifyValidationErrors("terms");
  });

  test("check submitting form with all fields", async () => {
    await formsPage.fillCity("City");
    await formsPage.fillState("State");
    await formsPage.fillZip(123);
    await formsPage.agreeTerms();
    await formsPage.submitClick();
    await formsPage.verifyNoValidationErrors("city");
    await formsPage.verifyNoValidationErrors("state");
    await formsPage.verifyNoValidationErrors("zip");
    await formsPage.verifyNoValidationErrors("terms");
  });
});
