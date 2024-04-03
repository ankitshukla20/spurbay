import { atom } from "recoil";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: Date;
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
