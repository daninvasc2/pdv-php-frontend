export type DefaultResponse<T> = {
  data: T;
  success: boolean;
  message: string;
}
|
{
  success: boolean;
  message: string;
}
