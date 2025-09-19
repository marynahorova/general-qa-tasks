import { expect } from "@playwright/test";
import { AppPage } from "../abstract";
import path from "path";
import fs from "fs";

export class OrderPage extends AppPage {
  public pagePath: "/order_submit.html";

  private title = this.page.getByText("Dinesh's Pizza House");

  async expectLoaded(): Promise<void> {
    await expect(this.title).toBeVisible();
  }

  async interceptImg(imgName: string) {
    const imgPath = path.join(process.cwd(), "src/test-data", imgName);
    const myImg = fs.readFileSync(imgPath);
    await this.page.route("**/*", async (route, request) => {
      if (request.resourceType() === "image") {
        await route.fulfill({
          status: 200,
          body: myImg,
        });
      } else {
        await route.continue();
      }
    });
  }
}
