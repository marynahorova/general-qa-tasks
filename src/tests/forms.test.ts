import {
  cases,
  FORM_FIELDS,
  LANGUAGES,
  TEST_FILES,
} from "../app/constants/testData";
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
    await formsPage.verifyCheckBoxState(LANGUAGES.JAVA, { isEnabled: false });
  });

  test("check selecting only Python checkbox", async () => {
    await formsPage.checkLang(LANGUAGES.PYTHON);
    await formsPage.verifyLangUnchecked(LANGUAGES.JAVASCRIPT);
    await formsPage.verifyLangCheckedAndText(LANGUAGES.PYTHON);
  });

  test("check selecting only JavaScript checkbox", async () => {
    await formsPage.checkLang(LANGUAGES.JAVASCRIPT);
    await formsPage.verifyLangUnchecked(LANGUAGES.PYTHON);
    await formsPage.verifyLangCheckedAndText(LANGUAGES.JAVASCRIPT);
  });

  test("check selecting two languages", async () => {
    await formsPage.checkLang(LANGUAGES.PYTHON);
    await formsPage.checkLang(LANGUAGES.JAVASCRIPT);
    await formsPage.verifyLangCheckedAndText(LANGUAGES.PYTHON);
    await formsPage.verifyLangCheckedAndText(LANGUAGES.JAVASCRIPT);
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
    for (const { skill, value } of cases) {
      await formsPage.selectPrimarySkill(skill);
      await formsPage.verifyPrimarySkillText(value);
    }
  });

  test("check selecting language in the listbox", async () => {
    for (const lang of Object.values(LANGUAGES)) {
      await formsPage.selectLanguage(lang);
      await formsPage.verifyLanguage(lang);
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
    await formsPage.verifyToggleText("");
    await formsPage.clickToggle();
    await formsPage.verifyToggleText("true");
    await formsPage.clickToggle();
    await formsPage.verifyToggleText("false");
  });

  test("check slider different values", async () => {
    for (let value = 0; value <= 5; value++) {
      await formsPage.setSliderText(value);
      await formsPage.verifySliderValue(value);
    }
  });

  test("check uploading CV", async () => {
    await formsPage.uploadCvFile(TEST_FILES.CV);
    await formsPage.verifyCvUpload(TEST_FILES.CV);
  });

  test("check uploading multiple files", async () => {
    await formsPage.uploadMultipleFiles([
      TEST_FILES.CV,
      TEST_FILES.CERTIFICATE,
    ]);
    await formsPage.verifyFilesUpload(
      `${TEST_FILES.CV} ${TEST_FILES.CERTIFICATE}`
    );
  });

  test("check file downloading", async () => {
    await formsPage.downloadFile("src/downloads");
    await formsPage.verifyDownloadFile("src/downloads");
    await formsPage.cleanDownloads("src/downloads");
  });

  test("check disabled textbox", async () => {
    await formsPage.verifyTextboxState({ isEnabled: false });
  });

  test("check validation errors after submitting empty form", async () => {
    await formsPage.submitClick();
    await formsPage.verifyValidationErrors(FORM_FIELDS.CITY, {
      isVisible: true,
    });
    await formsPage.verifyValidationErrors(FORM_FIELDS.STATE, {
      isVisible: true,
    });
    await formsPage.verifyValidationErrors(FORM_FIELDS.ZIP, {
      isVisible: true,
    });
    await formsPage.verifyValidationErrors(FORM_FIELDS.TERMS, {
      isVisible: true,
    });
  });

  test("check submitting form with all fields", async () => {
    await formsPage.fillCity("City");
    await formsPage.fillState("State");
    await formsPage.fillZip(123);
    await formsPage.agreeTerms();
    await formsPage.submitClick();
    await formsPage.verifyValidationErrors(FORM_FIELDS.CITY, {
      isVisible: false,
    });
    await formsPage.verifyValidationErrors(FORM_FIELDS.STATE, {
      isVisible: false,
    });
    await formsPage.verifyValidationErrors(FORM_FIELDS.ZIP, {
      isVisible: false,
    });
    await formsPage.verifyValidationErrors(FORM_FIELDS.TERMS, {
      isVisible: false,
    });
  });
});
