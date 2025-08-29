export type CreateVoteRequest = {
  image_id: string; // I set it to not required to be able to miss it in test which checks the required field
  sub_id: string;
  value: any;
};

export type PartialVoteRequest = Partial<CreateVoteRequest>;

export type CreateVoteResponse = {
  message: string;
  id: number;
  image_id: string;
  sub_id: string;
  value: any;
  country_code: string;
};
