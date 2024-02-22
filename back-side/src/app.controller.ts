import { Controller, Get, Response, Request } from '@nestjs/common';
import { Response as Res, Request as Req } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('whostalking')
  getWhoIsTalking(@Request() req: Req, @Response() res: Res): any {
    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Credentials', 'true');

    console.log(res);

    return res.status(500).json(this.appService.getWhoIsTalking());
  }

  @Get('login')
  getLogin(@Request() req: Req, @Response() res: Res): any {
    // Here Should Call The SAML Authentication Process!
    return { login: 'I am trying to login!' };
  }

  @Get('callback')
  getCallback(@Request() req: Req, @Response() res: Res): any {
    return res.redirect('http://localhost:3000');
  }
}
