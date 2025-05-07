export interface DatabaseError extends Error {
  code: string;
  detail: string;
}

export function isDatabaseError(error: any): error is DatabaseError {
  return error && typeof error.code === 'string';
}
