import { atom } from "recoil";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: Date;
}

export interface Admin {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const adminState = atom<Admin | null>({
  key: "adminState",
  default: null,
});
