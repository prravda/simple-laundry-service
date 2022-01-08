export interface CreateCustomError {
  name: string;
  message: string;
  statusCode: number;
  action: string;
  solution: string;
}

export abstract class AbstractCustomError extends Error {
  abstract get name(): string;
  abstract get message(): string;
  abstract get statusCode(): number;
  abstract get action(): string;
  abstract get solution(): string;
}
