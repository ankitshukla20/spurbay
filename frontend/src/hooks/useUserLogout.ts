import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services/api-client";
import { useSetRecoilState } from "recoil";
import { userState } from "../store";
import { HttpError } from "../services/http-error";

export interface LogoutResponse {
  message: string;
}

const useUserLogout = () => {
  const queryClient = useQueryClient();
  const setUser = useSetRecoilState(userState);

  return useMutation({
    mutationFn: () =>
      apiClient.post<LogoutResponse>("/auth/logout").then((res) => res.data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setUser(null);
      console.log(response.message);
    },

    onError: (error: HttpError) => {
      console.log(error.response?.data.error);
    },
  });
};

export default useUserLogout;
