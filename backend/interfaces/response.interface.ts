export enum Code {
  CREATED = 201,
  SUCCESS = 200,
  FAILED = 400,
  NOT_FOUND = 404,
  BAD_REQUEST = 500,
}

export interface IApiResponse {
  status: string;
  code: Code;
  message?: string;
  data?: object | unknown;
  error?: object | unknown;
}
