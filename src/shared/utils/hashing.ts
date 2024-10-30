import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/env';

export interface HashingService {
  getHash(text: string): Promise<string>;
  verifyHash(text: string, hashedText: string): Promise<boolean>;
  decodeToken(token: string): object | string;
}

export class HashingServiceImpl implements HashingService {

  /**
   * Static method that generates and returns a hashed text
   * @param {string} text text to be hashed.
   * @returns {Promise<string>} hashed text
   */
  public async getHash(text: string): Promise<string> {
    try {
      const saltRounds = Number(config?.SALT_ROUND);
      const hash = await bcrypt.hash(text, saltRounds);

      return hash;
    } catch (err) {
      throw new Error(
        'An error occurred. Please try again or contact support.'
      );
    }
  }

  /**
   * Verify token and return token doc (or throw an error if it is not valid)
   * @param {string} text text to compare with hash
   * @param {string} hashedText hashed text
   * @returns {Promise<boolean>} Whether the text matches the hashed text
   */
  public async verifyHash(text: string, hashedText: string): Promise<boolean> {
    try {
      return await bcrypt.compare(text, hashedText);
    } catch (error) {
      throw new Error('Could not hash text.');
    }
  }

  /**
   * Decode token and return token doc (or throw an error if it is not valid)
   * @param {string} token JWT token to decode
   * @returns {object | string} Decoded token payload or error message
   */
  public decodeToken(token: string): object | string {
    try {
      return jwt.verify(token, String(config?.JWT_SECRET));
    } catch (error) {
      return error;
    }
  }
}

const hashingService: HashingService = new HashingServiceImpl();

export default hashingService;
