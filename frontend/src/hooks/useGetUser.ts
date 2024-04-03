import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api-client";
import { User } from "../store";

const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () =>
      apiClient.get<User>("/me").then((res) => {
        console.log(res.data);
        return res.data;
      }),
  });
};

export default useGetUser;
