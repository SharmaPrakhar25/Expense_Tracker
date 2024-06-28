export interface User {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

export interface UnitUser {
  id: string;
}

export type UserWithoutPassword = Omit<User, "password">;
export interface UserExpenseInterface {
  user_id: string;
  sharedAmount: number;
}

export type SharedUserExpenseInterface = UserExpenseInterface[];
export interface Users {
  [key: string]: User;
}
