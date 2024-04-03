import { useMutation } from "@tanstack/react-query";
import { SigninBody } from "../schemas/authSchema";
import { apiClient } from "../services/api-client";
import { AxiosError } from "axios";

interface CustomErrorResponse {
  error: string; // Assuming error message is always a string
}

interface Response {
  message: string;
}

const useSignin = (onSignin: () => void) => {
  return useMutation({
    mutationFn: (signinBody: SigninBody) =>
      apiClient.post<Response>("/auth/signin", signinBody),
    onSuccess: () => onSignin(),
    onError: (error: AxiosError<CustomErrorResponse>) => {
      console.log(error.response?.data.error);
    },
  });
};

export default useSignin;
