export class BaseError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UserNotFoundError extends BaseError {
  constructor(message = 'User not found') {
    super(message, 404);
  }
}

export class InvalidCredentialsError extends BaseError {
  constructor(message = 'Invalid email or password') {
    super(message, 401);
  }
}

export class UserAlreadyExistsError extends BaseError {
  constructor(message = 'User already exists') {
    super(message, 409);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = 'Access forbidden') {
    super(message, 403);
  }
}