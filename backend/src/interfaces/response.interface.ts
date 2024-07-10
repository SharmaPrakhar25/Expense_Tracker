enum Code {
  CREATED = 201,
  SUCCESS = 200,
  FAILED = 400,
  NOT_FOUND = 404,
}

export interface Response {
  status: string;
  code: Code;
  message?: string;
}
