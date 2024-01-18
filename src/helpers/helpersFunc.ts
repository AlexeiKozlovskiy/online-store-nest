import { createReadStream } from 'fs';
import { MessageStatus } from '../types/types';

export async function loadProducts(path: string) {
  try {
    const stream = createReadStream(path, 'utf-8');
    let data = '';
    for await (const chunk of stream) data += chunk;
    return JSON.parse(data);
  } catch (error) {
    throw new Error(MessageStatus.ERROR_JSON);
  }
}
