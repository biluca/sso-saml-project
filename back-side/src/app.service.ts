import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello! I am the Back Side of this Project!';
  }

  getWhoIsTalking(): any {
    const user = {
      name: 'vinicios.biluca',
      email: 'biluca@b8tech.io',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidmluaWNpb3MuYmlsdWNhIiwiZW1haWwiOiJiaWx1Y2FAYjh0ZWNoLmlvIiwidmVuZG9yX2lkIjo2Njc3OTksImlhdCI6MTUxNjIzOTAyMn0.OYyi77vGvEhhGjaER_-T_SnxmG3ZRjLzUsVLlT6jLGM',
    };

    return user;
  }
}
