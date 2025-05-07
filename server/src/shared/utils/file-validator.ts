import { Request } from 'express';
import { FileFilterCallback } from 'multer';
import { BadRequestException } from '@nestjs/common';

/**
 * Utility class for validating file uploads.
 */
export class FileValidator {
  /**
   * The maximum allowed size for an avatar file in bytes.
   */
  static avatarSize = 1000000; // 1MB

  /**
   * Creates a file filter function for validating image file extensions.
   * @param {RegExp} imgExtRegex - Regular expression for allowed image file extensions.
   * @param {string} error - Error message to be thrown if the file extension is not allowed.
   * @returns {Function} A file filter function that can be used with multer.
   */
  static fileFilter = (imgExtRegex: RegExp, error: string) => {
    return (
      req: Request,
      file: Express.Multer.File,
      callback: FileFilterCallback,
    ) => {
      if (!file.originalname.match(imgExtRegex)) {
        return callback(new BadRequestException(error));
      }
      callback(null, true);
    };
  };
}
