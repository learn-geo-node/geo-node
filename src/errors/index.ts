export enum HttpErrorMessages {
  BAD_REQUEST = 'Bad Request',
  FORBIDDEN = 'Forbidden',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  NOT_FOUND = 'Not Found',
  UNAUTHORIZED = 'Unauthorized',
  CONFLICT = 'Conflict',
}

export class HttpError extends Error {
  status: number
}

export class BadRequestError extends Error {
  status = 400;
  constructor(message: string = HttpErrorMessages.BAD_REQUEST) {
      super();
      this.name = 'BadRequestError';
      this.message = message;
  }
}

export class UnauthorizedError extends Error {
  status = 401;
  constructor(message: string = HttpErrorMessages.UNAUTHORIZED) {
      super();
      this.name = 'UnauthorizedError';
      this.message = message;
  }
}

export class ForbiddenError extends Error {
  status = 403;
  constructor(message: string = HttpErrorMessages.FORBIDDEN) {
      super();
      this.name = 'ForbiddenError';
      this.message = message;
  }
}

export class NotFoundError extends Error {
  status = 404;
  constructor(message: string = HttpErrorMessages.NOT_FOUND) {
      super();
      this.name = 'NotFoundError';
      this.message = message;
  }
}

export class Conflict extends Error {
  status = 409;
  constructor(message: string = HttpErrorMessages.CONFLICT) {
    super()
    this.name = 'Conflict';
    this.message = message;
  }
}

export class InternalServerError extends Error {
  status = 500;
  constructor(message: string = HttpErrorMessages.INTERNAL_SERVER_ERROR) {
      super()
      this.name = 'InternalServerError';
      this.message = message;
  }
}
