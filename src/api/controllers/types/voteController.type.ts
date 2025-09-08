export type CreateVoteRequest = {
  image_id: string;
  sub_id: string;
  value: number | string | boolean;
};

export type PartialVoteRequest = Partial<CreateVoteRequest>;

export type CreateVoteResponse = {
  message: string;
  id: number;
  image_id: string;
  sub_id: string;
  value: any;
  country_code: number;
};
