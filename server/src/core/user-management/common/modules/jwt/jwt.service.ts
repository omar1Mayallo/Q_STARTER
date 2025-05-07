import { Injectable } from '@nestjs/common';
import { JwtService as JwtTokenService } from '@nestjs/jwt';
import { IJwtPayload, IJwtService } from './jwt.types';

/**
 * Service class providing JWT token verification and signing functionalities.
 */
@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtService: JwtTokenService) {}

  /**
   * Asynchronously verifies the given JWT token.
   * @param token The JWT token to be verified.
   * @returns A promise resolving to the decoded payload if the token is valid, otherwise rejects with an error.
   */
  async verifyToken(token: string): Promise<any> {
    return await this.jwtService.verify(token);
  }

  /**
   * Synchronously signs the provided payload into a JWT token using the specified secret and expiration time.
   * @param payload The payload to be signed into the token.
   * @param secret The secret key used for signing the token.
   * @param expiresIn The expiration time for the token (e.g., '1d' for 1 day).
   * @returns The signed JWT token.
   */
  signToken(payload: IJwtPayload, secret: string, expiresIn: string): string {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
}
