import { APIRequestContext } from "@playwright/test";

export abstract class BaseAPI {
  constructor(protected request: APIRequestContext) {}
}
