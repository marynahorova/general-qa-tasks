import test from "@playwright/test";
import {
  cases,
  FORM_FIELDS,
  LANGUAGES,
  TEST_FILES,
} from "../app/constants/testData";
import { openFormsPage } from "../app/fixtures/testFixtures";

test.describe("Forms/Inputs tests", () => {
  openFormsPage("check setting years of experience", async ({ formsPage }) => {
    await formsPage.setExperience("1");
    await formsPage.verifyExperience("1");
  });

  openFormsPage("check disabled checkbox", async ({ formsPage }) => {
    await formsPage.verifyCheckBoxState(LANGUAGES.JAVA, { isEnabled: false });
  });

  openFormsPage(
    "check selecting only Python checkbox",
    async ({ formsPage }) => {
      await formsPage.checkLang(LANGUAGES.PYTHON);
      await formsPage.verifyLangUnchecked(LANGUAGES.JAVASCRIPT);
      await formsPage.verifyLangCheckedAndText(LANGUAGES.PYTHON);
    }
  );

  openFormsPage(
    "check selecting only JavaScript checkbox",
    async ({ formsPage }) => {
      await formsPage.checkLang(LANGUAGES.JAVASCRIPT);
      await formsPage.verifyLangUnchecked(LANGUAGES.PYTHON);
      await formsPage.verifyLangCheckedAndText(LANGUAGES.JAVASCRIPT);
    }
  );

  openFormsPage("check selecting two languages", async ({ formsPage }) => {
    await formsPage.checkLang(LANGUAGES.PYTHON);
    await formsPage.checkLang(LANGUAGES.JAVASCRIPT);
    await formsPage.verifyLangCheckedAndText(LANGUAGES.PYTHON);
    await formsPage.verifyLangCheckedAndText(LANGUAGES.JAVASCRIPT);
  });

  openFormsPage("check selecting radio btn", async ({ formsPage }) => {
    const radioBtns = ["Selenium", "Protractor"];
    for (const btn of radioBtns) {
      await formsPage.selectRadioBtn(btn);
      await formsPage.verifyRadioBtnChecked(btn);

      for (const anotherBtn of radioBtns.filter((b) => b !== btn)) {
        await formsPage.verifyRadioBtnUnchecked(anotherBtn);
      }
    }
  });

  openFormsPage("check selecting primary skill", async ({ formsPage }) => {
    for (const { skill, value } of cases) {
      await formsPage.selectPrimarySkill(skill);
      await formsPage.verifyPrimarySkillText(value);
    }
  });

  openFormsPage(
    "check selecting language in the listbox",
    async ({ formsPage }) => {
      for (const lang of Object.values(LANGUAGES)) {
        await formsPage.selectLanguage(lang);
        await formsPage.verifyLanguageText(lang);
      }
    }
  );

  openFormsPage("check filling text into textbox", async ({ formsPage }) => {
    await formsPage.fillText("test");
    await formsPage.verifyText("test");
  });

  openFormsPage("check readonly field", async ({ formsPage }) => {
    await formsPage.verifyReadonlyField();
  });

  openFormsPage("check speak german toggle", async ({ formsPage }) => {
    await formsPage.verifyToggleText("");
    await formsPage.clickToggle();
    await formsPage.verifyToggleText("true");
    await formsPage.clickToggle();
    await formsPage.verifyToggleText("false");
  });

  openFormsPage("check slider different values", async ({ formsPage }) => {
    for (let value = 0; value <= 5; value++) {
      await formsPage.setSliderText(value);
      await formsPage.verifySliderText(value);
    }
  });

  openFormsPage("check uploading CV", async ({ formsPage }) => {
    await formsPage.uploadCvFile(TEST_FILES.CV);
    await formsPage.verifyCvUpload(TEST_FILES.CV);
  });

  openFormsPage("check uploading multiple files", async ({ formsPage }) => {
    await formsPage.uploadMultipleFiles([
      TEST_FILES.CV,
      TEST_FILES.CERTIFICATE,
    ]);
    await formsPage.verifyFilesUpload(
      `${TEST_FILES.CV} ${TEST_FILES.CERTIFICATE}`
    );
  });

  openFormsPage("check file downloading", async ({ formsPage }) => {
    await formsPage.downloadFile("src/downloads");
    await formsPage.verifyDownloadFile("src/downloads");
    await formsPage.cleanDownloads("src/downloads");
  });

  openFormsPage("check disabled textbox", async ({ formsPage }) => {
    await formsPage.verifyTextboxState({ isEnabled: false });
  });

  openFormsPage(
    "check validation errors after submitting empty form",
    async ({ formsPage }) => {
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
    }
  );

  openFormsPage(
    "check submitting form with all fields",
    async ({ formsPage }) => {
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
    }
  );
});
