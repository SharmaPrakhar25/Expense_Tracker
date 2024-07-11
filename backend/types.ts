export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  mobile: string;
}

export interface UserExpenseInterface {
  user_id: number;
  shared_amount: number;
}

export type SharedUserExpenseInterface = UserExpenseInterface[];

export interface Expense {
  id?: number;
  createdAt?: Date;
  shared: boolean;
  category: string;
  owner_user_id: number;
  total_amount: number;
  user_expense?: SharedUserExpenseInterface;
}

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

export interface FetchExpenseQuery {
  userId?: number;
  sortBy?: string;
  sortType?: string;
  category?: string;
  expenseId?: number;
  shared?: string;
}
