export enum LANGUAGES {
  JAVA = "Java",
  JAVASCRIPT = "JavaScript",
  PYTHON = "Python",
  TYPESCRIPT = "TypeScript",
}
export const cases = [
  { skill: "Selenium", value: "sel" },
  { skill: "Protractor", value: "pro" },
  { skill: "Cypress", value: "cyp" },
] as const;
export enum TEST_FILES {
  CV = "cv.txt",
  CERTIFICATE = "certificate.pdf",
}

export enum FORM_FIELDS {
  CITY = "city",
  STATE = "state",
  ZIP = "zip",
  TERMS = "terms",
}
