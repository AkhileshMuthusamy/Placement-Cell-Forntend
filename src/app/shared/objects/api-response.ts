export interface APIResponse<T> {
  data: T;
  error: boolean;
  message: string;
  notification: {type: string, message: string}
}
