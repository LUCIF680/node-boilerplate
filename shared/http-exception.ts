import locals from './locals';

export default class HttpException extends Error {
  status: number = 500;
  message: string = locals.error_internal_error;
  constructor(status: number = 500, message: string = locals.error_internal_error) {
    super();
    this.status = status;
    this.message = message;
  }
}

export function sanitize(error: HttpException) {
  switch (true) {
    case error.status === 404:
      return error;
    default:
      return new HttpException(500, error.message);
  }
}
