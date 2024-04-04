import { HttpError } from "./http-error";

export default function isHttpError(error: unknown): error is HttpError {
  return (error as HttpError).isAxiosError !== undefined;
}
