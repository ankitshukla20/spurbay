import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { apiClient } from "../services/api-client";
import { HttpError } from "../services/http-error";
import { adminState } from "../store";

export interface LogoutResponse {
  message: string;
}

const useAdminLogout = () => {
  const queryClient = useQueryClient();
  const setAdmin = useSetRecoilState(adminState);

  return useMutation({
    mutationFn: () =>
      apiClient
        .post<LogoutResponse>("/auth/admin/logout")
        .then((res) => res.data),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      setAdmin(null);
      console.log(response.message);
    },

    onError: (error: HttpError) => {
      console.log(error.response?.data.error);
    },
  });
};

export default useAdminLogout;
