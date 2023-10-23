import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStore(): string {
    return 'Online store service!';
  }
}
