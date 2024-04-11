import { useMutation } from "@tanstack/react-query";
import { SigninBody } from "../schemas/authSchema";
import { apiClient } from "../services/api-client";
import { HttpError } from "../services/http-error";

interface Response {
  message: string;
}

const useAdminSignin = (onSignin: () => void) => {
  const adminMutation = useMutation({
    mutationFn: (signinBody: SigninBody) =>
      apiClient
        .post<Response>("/auth/admin/signin", signinBody)
        .then((res) => res.data),

    onSuccess: (response) => {
      onSignin();
      console.log(response.message);
    },

    onError: (error: HttpError) => {
      console.log(error.response?.data.error);
    },
  });

  return adminMutation;
};

export default useAdminSignin;
