import { AxiosError } from "axios";

interface CustomErrorResponse {
  error: string;
}

export type HttpError = AxiosError<CustomErrorResponse>;
