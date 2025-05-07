import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IBcryptService } from './bcrypt.types';

/**
 * Service class providing bcrypt hash and compare functionalities.
 */
@Injectable()
export class BcryptService implements IBcryptService {
  /** The number of salt rounds to use for hashing passwords. */
  saltRounds = 12;

  /**
   * Asynchronously generates a hash for the given plaintext password.
   * @param plainTextPassword The plaintext password to be hashed.
   * @returns A promise resolving to the generated hash.
   */
  async hash(plainTextPassword: string): Promise<string> {
    return await bcrypt.hash(plainTextPassword, this.saltRounds);
  }

  /**
   * Asynchronously compares a plaintext password with a hash password to check for a match.
   * @param plaintextPassword The plaintext password to compare.
   * @param hashPassword The hash password to compare against.
   * @returns A promise resolving to true if the passwords match, false otherwise.
   */
  async compare(
    plaintextPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plaintextPassword, hashPassword);
  }
}
