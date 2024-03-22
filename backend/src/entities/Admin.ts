export interface Admin {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface AdminSigninBody {
  email: string;
  password: string;
}
