import { HttpError, HttpErrorMessages, NotFoundError } from '@/errors';
import { HttpMiddlewareI } from '@/interfaces';

interface AnyErrorHandler extends HttpMiddlewareI {
  err: HttpError;
}

export function handleAnyError({ res, next, err }: AnyErrorHandler) {
  if (res.headersSent) {
    return next(err);
  }

  if (process.env.NODE_ENV === 'production') {
    return res.status(err.status).json({
      message: err.message,
      stack: err.stack,
    });
  }

  return res.status(err.status).json({ message: err.message });
}

export function notFoundHandler({ next }: HttpMiddlewareI) {
  const err = new NotFoundError(HttpErrorMessages.NOT_FOUND);
  next(err);
}
