import { ZodIssue } from 'zod';

export class HttpException extends Error {
  public status: number;
  public override message: string;
  public errors?: ZodIssue[];

  constructor(status: number, message: string, errors?: string[]) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpException);
    }

    this.status = status;
    this.message = message;
    this.errors = errors as any;
  }
}
