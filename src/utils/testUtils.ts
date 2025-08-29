import { expect } from "@playwright/test";

export async function expectToThrow(
  action: () => Promise<unknown>,
  expectedMessage: string
) {
  try {
    await action();
    throw new Error("Error is expected");
  } catch (err) {
    const error = err as Error;
    expect(error.message).toContain(expectedMessage);
  }
}
