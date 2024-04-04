import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services/api-client";
import { useSetRecoilState } from "recoil";
import { userState } from "../store";
import { HttpError } from "../services/http-error";

interface Response {
  message: string;
}

const useUserLogout = () => {
  const queryClient = useQueryClient();
  const setUser = useSetRecoilState(userState);

  return useMutation({
    mutationFn: () =>
      apiClient.post<Response>("/auth/logout").then((res) => res.data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setUser(null);
      console.log(data.message);
    },

    onError: (error: HttpError) => {
      console.log(error.response?.data.error);
    },
  });
};

export default useUserLogout;
