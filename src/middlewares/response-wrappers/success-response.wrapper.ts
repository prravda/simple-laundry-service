export interface CreateSuccessResponseDto<T> {
  statusCode: number;
  message: string;
  data: T;
}

export function successResponseWrapper<T>(props: CreateSuccessResponseDto<T>) {
  return props;
}
