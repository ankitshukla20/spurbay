import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api-client";
import isHttpError from "../services/isHttpError";
import { Admin } from "../store";

const useGetAdmin = () => {
  return useQuery({
    queryKey: ["admin"],
    // queryFn: () => apiClient.get<User>("/admin/me").then((res) => res.data),
    queryFn: async () => {
      try {
        const response = await apiClient.get<Admin>("/admin/me");
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

export default useGetAdmin;
