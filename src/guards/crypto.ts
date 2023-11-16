import { createCipheriv, createDecipheriv } from 'crypto';

const algorithm = process.env.ALGORITHM;
const key = process.env.CRYPTO_KEY;
const iv = process.env.CRYPTO_IV;

export function encrypt(value: string) {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(value, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(value: string) {
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(value, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
