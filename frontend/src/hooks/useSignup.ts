import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../services/api-client";
import { SignupBody } from "../schemas/authSchema";
import { HttpError } from "../services/http-error";

interface Response {
  message: string;
}

const useSignup = (onSignup: () => void) => {
  return useMutation({
    mutationFn: (signupBody: SignupBody) =>
      apiClient.post<Response>("/auth/signup", signupBody),

    onSuccess: () => {
      onSignup();
    },

    onError: (error: HttpError) => {
      console.log(error.response?.data.error);
    },
  });
};

export default useSignup;
