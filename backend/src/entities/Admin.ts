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
export interface AdminForgotPasswordBody {
  email: string;
}

export interface AdminResetPasswordBody {
  password: string;
  confirmPassword: string;
}
