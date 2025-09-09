import { expect } from "@playwright/test";

export async function expectToThrow(
  action: () => Promise<unknown>,
  expectedMessage: string
) {
  await expect(action()).rejects.toThrow(expectedMessage);
}
