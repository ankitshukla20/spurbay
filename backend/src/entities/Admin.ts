export interface AdminSignupBody {
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

export interface AdminUpdateBody {
  firstname?: string;
  lastname?: string;
  email?: string;
}
export interface AdminUpdatePasswordBody {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
