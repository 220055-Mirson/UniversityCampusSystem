export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode = 400,
    public readonly details: unknown[] = [],
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function notFound(code: string, message: string) {
  return new AppError(code, message, 404);
}

export function unauthorized(message = 'Não autenticado', code = 'UNAUTHORIZED') {
  return new AppError(code, message, 401);
}

export function forbidden(message = 'Sem permissão', code = 'FORBIDDEN') {
  return new AppError(code, message, 403);
}

export function conflict(code: string, message: string) {
  return new AppError(code, message, 409);
}
