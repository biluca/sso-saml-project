import {
  Controller,
  Get,
  Post,
  Response,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response as Res, Request as Req } from 'express';
import { xml2json } from 'xml-js';

@Controller()
export class AppController {
  user = {
    logged: false,
    name: 'vinicios.biluca',
    email: 'biluca@b8tech.io',
    token: 'bazinga_token',
  };

  not_logged_user = {};

  @UseGuards(AuthGuard('saml'))
  @Get('login')
  async login(@Request() req, @Response() res) {
    console.log('LOGIN ENDPORINT', 'Using the SAML Auth Guard');
    return;
  }

  @Get('logout')
  async logout(@Request() req, @Response() res) {
    console.log('LOGOUT ENDPORINT', 'Cleaning User Data');
    this.user.logged = false;
    return res.send(200);
  }

  @Get('whostalking')
  getWhoIsTalking(@Request() req: Req, @Response() res: Res): any {
    console.log('WHO IS TALKING? ', 'Retrieving User');
    if (!this.user.logged) {
      return res.status(500).json(this.not_logged_user);
    }

    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Max-Age', '86400');
    res.header('Access-Control-Allow-Credentials', 'true');

    return res.status(200).json(this.user);
  }

  @Post('callback')
  postCallback(@Request() req: Req, @Response() res: Res): any {
    console.log('POST >> HEY!! I AM BACK FROM THE SSO INTEGRATION!');

    const xml_body = req.body;
    // console.log('XML >>', xml_body.SAMLResponse);

    const SAMLResponse = xml_body.SAMLResponse;
    const xml_SAML_response = atob(SAMLResponse);

    // console.log('=====================');
    const json_SAML_response = xml2json(xml_SAML_response);
    // console.log('json >>', json_SAML_response);
    // console.log('=====================');

    this.user.logged = true;
    return res.redirect('http://localhost:3000');
  }
}
