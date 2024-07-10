export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  mobile: string;
}

export type UnitUser = Pick<User, "id">;
export interface Users {
  [key: string]: User;
}
export interface UserExpenseInterface {
  user_id: string;
  sharedAmount: number;
}

export type UserWithoutPassword = Omit<User, "password">;

export type SharedUserExpenseInterface = UserExpenseInterface[];
