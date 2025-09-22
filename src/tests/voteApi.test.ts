import { test, expect } from "@playwright/test";
import { PartialVoteRequest } from "../api/controllers/types/voteController.type";
import { expectToThrow } from "../utils/testUtils";
import { baseFixture } from "../app/fixtures/baseFixture";

test.describe("Vote API tests", () => {
  const body = {
    image_id: "imageId",
    sub_id: `my-user-${Date.now()}`,
    value: 1,
  };

  baseFixture("check vote up", async ({ voteController }) => {
    const response = await voteController.addVote(body);
    expect(response).toMatchObject({ ...body, message: "SUCCESS" });
  });

  baseFixture("check vote down", async ({ voteController }) => {
    const response = await voteController.addVote({ ...body, value: -1 });
    expect(response).toMatchObject({ ...body, value: -1, message: "SUCCESS" });
  });

  baseFixture(
    "check that image_id is required in adding vote request",
    async ({ voteController }) => {
      const { image_id, ...bodyWithoutImage } = body;
      await expectToThrow(
        () => voteController.addVote(bodyWithoutImage),
        '"image_id" is required'
      );
    }
  );

  baseFixture(
    "check that value is required in adding vote request",
    async ({ voteController }) => {
      const { value, ...bodyWithoutValue } = body;
      await expectToThrow(
        () => voteController.addVote(bodyWithoutValue),
        '"value" is required'
      );
    }
  );

  baseFixture(
    "check that image_id can not be number",
    async ({ voteController }) => {
      const bodyWithWrongImageType: PartialVoteRequest = {
        ...body,
        image_id: 1 as any,
      };
      await expectToThrow(
        () => voteController.addVote(bodyWithWrongImageType),
        '"image_id" must be a string'
      );
    }
  );

  baseFixture(
    "check that image_id can not be boolean",
    async ({ voteController }) => {
      const bodyWithWrongImageType: PartialVoteRequest = {
        ...body,
        image_id: true as any,
      };
      await expectToThrow(
        () => voteController.addVote(bodyWithWrongImageType),
        '"image_id" must be a string'
      );
    }
  );

  baseFixture(
    "check that sub_id can not be number",
    async ({ voteController }) => {
      const bodyWithWrongSubIdType: PartialVoteRequest = {
        ...body,
        sub_id: 1 as any,
      };
      await expectToThrow(
        () => voteController.addVote(bodyWithWrongSubIdType),
        '"sub_id" must be a string'
      );
    }
  );

  baseFixture(
    "check that sub_id can not be boolean",
    async ({ voteController }) => {
      const bodyWithWrongSubIdType: PartialVoteRequest = {
        ...body,
        sub_id: false as any,
      };
      await expectToThrow(
        () => voteController.addVote(bodyWithWrongSubIdType),
        '"sub_id" must be a string'
      );
    }
  );

  baseFixture(
    "check creating and getting vote by sub_id",
    async ({ voteController }) => {
      await voteController.addVote(body);
      const response = await voteController.getVote(`my-user-${Date.now()}`);
      expect(response.every((res) => res.sub_id === body.sub_id)).toBeTruthy();
    }
  );

  baseFixture(
    "check creating and deleting vote",
    async ({ voteController }) => {
      const createdVote = await voteController.addVote(body);
      const voteId = createdVote.id;
      const deleteResponse = await voteController.deleteVote(voteId);
      expect(deleteResponse.message).toBe("SUCCESS");
    }
  );
});
