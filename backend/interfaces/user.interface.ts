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
