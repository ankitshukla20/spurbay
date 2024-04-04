import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api-client";
import isHttpError from "../services/isHttpError";
import { User } from "../store";

const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    // queryFn: () => apiClient.get<User>("/me").then((res) => res.data),
    queryFn: async () => {
      try {
        const response = await apiClient.get<User>("/me");
        return response.data;
      } catch (error) {
        if (
          isHttpError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          // User is not logged in, return null value
          return null;
        }
        // If it's not a 401 error, rethrow the error
        throw error;
      }
    },
  });
};

export default useGetUser;
