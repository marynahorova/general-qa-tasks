import { test, expect } from "@playwright/test";
import { VoteController } from "../api/controllers/voteController";
import {
  CreateVoteResponse,
  PartialVoteRequest,
} from "../api/controllers/types/voteController.type";
import { expectToThrow } from "../utils/testUtils";

test.describe("Vote API tests", () => {
  let voteController: VoteController;
  const body = {
    image_id: "imageId",
    sub_id: `my-user-${Date.now()}`,
    value: 1,
  };

  test.beforeEach(async ({ request }) => {
    voteController = new VoteController(request);
  });

  test("check vote up", async () => {
    const response = await voteController.addVote(body);
    expect(response).toMatchObject({ ...body, message: "SUCCESS" });
  });

  test("check vote down", async () => {
    const response = await voteController.addVote({ ...body, value: -1 });
    expect(response).toMatchObject({ ...body, value: -1, message: "SUCCESS" });
  });

  test("check that image_id is required in adding vote request", async () => {
    const { image_id, ...bodyWithoutImage } = body;
    await expectToThrow(
      () => voteController.addVote(bodyWithoutImage as PartialVoteRequest),
      '"image_id" is required'
    );
  });

  test("check that value is required in adding vote request", async () => {
    const { value, ...bodyWithoutValue } = body;
    await expectToThrow(
      () => voteController.addVote(bodyWithoutValue as PartialVoteRequest),
      '"value" is required'
    );
  });

  test("check that image_id can not be number", async () => {
    const bodyWithWrongImageType: PartialVoteRequest = {
      ...body,
      image_id: 1 as any,
    };
    await expectToThrow(
      () => voteController.addVote(bodyWithWrongImageType),
      '"image_id" must be a string'
    );
  });

  test("check that image_id can not be boolean", async () => {
    const bodyWithWrongImageType: PartialVoteRequest = {
      ...body,
      image_id: true as any,
    };
    await expectToThrow(
      () => voteController.addVote(bodyWithWrongImageType),
      '"image_id" must be a string'
    );
  });

  test("check that sub_id can not be number", async () => {
    const bodyWithWrongSubIdType: PartialVoteRequest = {
      ...body,
      sub_id: 1 as any,
    };
    await expectToThrow(
      () => voteController.addVote(bodyWithWrongSubIdType),
      '"sub_id" must be a string'
    );
  });

  test("check that sub_id can not be boolean", async () => {
    const bodyWithWrongSubIdType: PartialVoteRequest = {
      ...body,
      sub_id: false as any,
    };
    await expectToThrow(
      () => voteController.addVote(bodyWithWrongSubIdType),
      '"sub_id" must be a string'
    );
  });

  test("check creating and getting vote by sub_id", async () => {
    await voteController.addVote(body);
    const response = (await voteController.getVote(
      `my-user-${Date.now()}`
    )) as CreateVoteResponse[];
    const filterResponse = response.map((obj) => obj.sub_id);
    expect(filterResponse.every((obj) => obj === body.sub_id)).toBeTruthy();
  });

  test("check creating and deleting vote", async () => {
    const createdVote = await voteController.addVote(body);
    const voteId = createdVote.id;
    const deleteResponse = await voteController.deleteVote(voteId);
    expect(deleteResponse.message).toBe("SUCCESS");
  });
});
