export interface IJwtPayload {
  id: string;
}

export interface IJwtService {
  verifyToken(token: string): Promise<any>;
  signToken(payload: IJwtPayload, secret: string, expiresIn: string): string;
}
