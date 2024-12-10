export interface ApiError extends Error {
  message: string;
  stack?: string;
}
