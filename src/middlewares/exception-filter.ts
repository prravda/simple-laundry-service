import { AbstractCustomError } from './abstract.custom.error';
import { NextFunction, Request, Response } from 'express';

export function exceptionFilter(
  err: AbstractCustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err);
  const errorProps = {
    errorName: err.name,
    timeStamp: new Date(),
    statusCode: err.statusCode,
    message: err.message,
    action: err.action,
    solution: err.solution,
  };
  res.status(err.statusCode).send(errorProps);
}
