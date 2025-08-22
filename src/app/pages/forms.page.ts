import path from "path";
import { AppPage } from "../abstract";
import { expect } from "@playwright/test";
import fs from "fs";

export class FormsPage extends AppPage {
  public pagePath: string = "/forms.html";

  //Here I provided locators using different methods like getByRole, CSS selector, getByPlaceholder, getByText
  private headerBasicForms = this.page.getByRole("heading", {
    name: "Basic Form Controls",
  });
  private headerFormsWithValidations = this.page.getByRole("heading", {
    name: "Form with Validations",
  });
  private experienceInput = this.page.locator("#exp");
  private experienceText = this.page.locator("#exp_help");
  private langCheckbox = (lang) =>
    this.page.getByRole("checkbox", { name: lang, exact: true }); // I used property "exact" because to differentiate Java and Javascript
  private langText = this.page.locator("#check_validate");
  private radioBtn = (tool) => this.page.getByRole("radio", { name: tool });
  private radioText = this.page.locator("#rad_validate");
  private primarySkill = this.page.getByRole("combobox");
  private primarySkillText = this.page.locator("#select_tool_validate");
  private selectLang = (language) =>
    this.page.getByRole("option", { name: language, exact: true }); // I used property "exact" because to differentiate Java and Javascript
  private langValidate = this.page.locator("#select_lang_validate");
  private textBox = this.page.getByRole("textbox", { name: "Notes" });
  private textValidate = this.page.locator("#area_notes_validate");
  private readonlyInput = this.page.getByPlaceholder("Common Sense");
  private speaksGermanToggle = this.page.locator("label[for='german']");
  private speaksGermanValidate = this.page.locator("#german_validate");
  private slider = this.page.locator("#fluency");
  private sliderValidate = this.page.locator("#fluency_validate");
  private uploadCV = this.page.locator("#upload_cv");
  private uploadCvValidate = this.page.locator("#validate_cv");
  private uploadFiles = this.page.locator("#upload_files");
  private uploadFilesValidate = this.page.locator("#validate_files");
  private downloadBtn = this.page.getByText("Click here to Download");
  private disabledTextbox = this.page.locator("#salary");
  private cityInput = this.page.getByPlaceholder("City");
  private stateInput = this.page.getByPlaceholder("State");
  private zipInput = this.page.getByPlaceholder("Zip");
  private termsCheck = this.page.locator("#invalidCheck");
  private submitBtn = this.page.getByText("Submit Form");
  private errorTooltip = (input) => this.page.locator(`#invalid_${input}`);

  //Here I provided methods for interacting with elements on the Forms page:
  async expectLoaded(): Promise<void> {
    await expect(this.headerBasicForms).toBeVisible();
    await expect(this.headerFormsWithValidations).toBeVisible();
  }

  async setExperience(experience: string | number) {
    await this.experienceInput.pressSequentially(String(experience)); // Needs real typing to trigger validation, `fill` doesn’t trigger it. So I used `pressSequently` method
  }

  async verifyExperience(text: string) {
    await expect(this.experienceText).toHaveText(String(text));
  }

  async verifyDisabledCheckBox(lang: string) {
    await expect(this.langCheckbox(lang)).toBeVisible();
    await expect(this.langCheckbox(lang)).toBeDisabled();
  }

  async checkLang(lang: string) {
    await this.langCheckbox(lang).check();
  }

  async verifyLangChecked(lang: string) {
    await expect(this.langCheckbox(lang)).toBeChecked();
    await expect(this.langText).toContainText(lang, { ignoreCase: true });
  }

  async verifyLangUnchecked(lang: string) {
    await expect(this.langCheckbox(lang)).not.toBeChecked();
  }

  async selectRadioBtn(tool: string) {
    await this.radioBtn(tool).check();
  }

  async verifyRadioBtnChecked(tool: string) {
    await expect(this.radioBtn(tool)).toBeChecked();
    await expect(this.radioText).toContainText(tool, { ignoreCase: true });
  }

  async verifyRadioBtnUnchecked(tool: string) {
    await expect(this.radioBtn(tool)).not.toBeChecked();
  }

  async selectPrimarySkill(skill: string) {
    await this.primarySkill.click();
    await this.primarySkill.selectOption(skill);
  }

  async verifyPrimarySkill(skill: string) {
    await expect(this.primarySkillText).toContainText(skill, {
      ignoreCase: true,
    });
  }

  async selectLanguage(language: string) {
    await this.selectLang(language).click();
  }

  async verifyLanguage(language: string) {
    await expect(this.langValidate).toContainText(language, {
      ignoreCase: true,
    });
  }

  async fillText(text: string) {
    await this.textBox.pressSequentially(text); // Needs real typing to trigger validation, `fill` doesn’t trigger it. So I used `pressSequently` method
  }

  async verifyText(text: string) {
    await expect(this.textValidate).toContainText(text);
  }

  async verifyReadonlyField() {
    await expect(this.readonlyInput).toBeVisible();
    await expect(this.readonlyInput).toHaveAttribute("readonly");
  }

  async clickToggle() {
    await this.speaksGermanToggle.click();
  }

  async verifyToggle(text: string) {
    await expect(this.speaksGermanValidate).toHaveText(text);
  }

  async setSliderValue(value: number | string) {
    await this.slider.fill(String(value));
  }

  async verifySliderValue(value: number | string) {
    await expect(this.sliderValidate).toHaveText(String(value));
  }

  async uploadCvFile(fileName: string) {
    await this.uploadCV.setInputFiles(
      path.join(process.cwd(), "src/test-data", fileName)
    );
  }

  async verifyCvUpload(fileName: string) {
    await expect(this.uploadCvValidate).toHaveText(fileName);
  }

  async uploadMultipleFiles(fileNames: string[]) {
    const filePaths = fileNames.map((name) =>
      path.join(process.cwd(), "src/test-data", name)
    );
    await this.uploadFiles.setInputFiles(filePaths);
  }

  async verifyFilesUpload(filesNames: string) {
    await expect(this.uploadFilesValidate).toHaveText(filesNames);
  }

  async downloadFile(downloadPath: string) {
    const downloadPromise = this.page.waitForEvent("download");
    await this.downloadBtn.click();
    const download = await downloadPromise;
    const filePath = path.join(
      process.cwd(),
      downloadPath,
      download.suggestedFilename()
    );
    await download.saveAs(filePath);
  }

  async verifyDownloadFile(downloadPath: string) {
    expect(fs.existsSync(downloadPath)).toBeTruthy();
  }

  async cleanDownloads(downloadPath: string) {
    const dir = path.join(process.cwd(), downloadPath);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
  }

  async verifyDisabledTextbox() {
    await expect(this.disabledTextbox).toBeVisible();
    await expect(this.disabledTextbox).toBeDisabled();
  }

  async submitClick() {
    await this.submitBtn.click();
  }

  async verifyValidationErrors(input: string) {
    await expect(this.errorTooltip(input)).toBeVisible();
  }
  async verifyNoValidationErrors(input: string) {
    await expect(this.errorTooltip(input)).not.toBeVisible();
  }

  async fillCity(city: string) {
    await this.cityInput.fill(city);
  }
  async fillState(state: string) {
    await this.stateInput.fill(state);
  }
  async fillZip(zip: string | number) {
    await this.zipInput.fill(String(zip));
  }
  async agreeTerms() {
    await this.termsCheck.click();
  }
}
