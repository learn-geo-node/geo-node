import { HttpError, InternalServerError } from "@errors";

export const handleError = (err: unknown): never => {
  if (err instanceof HttpError) {
      throw err;
  }
  const message = err instanceof Error ? err.message : String(err);
  throw new InternalServerError(message);
}