import { BaseAPI } from "../abstract";
import {
  CreateVoteResponse,
  CreateVoteRequest,
  PartialVoteRequest,
} from "./types/voteController.type";

export class VoteController extends BaseAPI {
  private baseUrl = "https://api.thecatapi.com/v1";

  private headers() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not defined");
    }
    return {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
    };
  }

  async addVote(
    data: CreateVoteRequest | PartialVoteRequest
  ): Promise<CreateVoteResponse> {
    const response = await this.request.post(`${this.baseUrl}/votes`, {
      data,
      headers: this.headers(),
    });
    if (!response.ok()) {
      const errorMessage = await response.text();
      throw new Error(`${errorMessage}`);
    }
    return (await response.json()) as CreateVoteResponse;
  }

  async getVote(sub_id?: string): Promise<CreateVoteResponse[]> {
    const params = new URLSearchParams();
    if (sub_id) params.append("sub_id", sub_id);

    const response = await this.request.get(
      `${this.baseUrl}/votes?sub_id=${sub_id}`,
      {
        headers: this.headers(),
      }
    );
    if (!response.ok()) {
      const errorMessage = await response.text();
      throw new Error(`${errorMessage}`);
    }
    return (await response.json()) as CreateVoteResponse[];
  }

  async deleteVote(id: number): Promise<{ message: string }> {
    const response = await this.request.delete(`${this.baseUrl}/votes/${id}`, {
      headers: this.headers(),
    });
    if (!response.ok()) {
      const errorMessage = await response.text();
      throw new Error(`${errorMessage}`);
    }
    return (await response.json()) as { message: string };
  }
}
