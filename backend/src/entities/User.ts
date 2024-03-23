export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserSigninBody {
  email: string;
  password: string;
}

export interface UserForgotPasswordBody {
  email: string;
}

export interface UserResetPasswordBody {
  password: string;
  confirmPassword: string;
}

export interface UserUpdateBody {
  firstname?: string;
  lastname?: string;
  email?: string;
}
export interface UserUpdatePasswordBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
