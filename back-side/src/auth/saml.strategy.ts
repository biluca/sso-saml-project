import { Strategy } from 'passport-saml';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SAMLStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const saml_options = {
      path: '/callback',
      entryPoint:
        'https://dev-4bisapwpt1mkaqj1.us.auth0.com/samlp/CXGtnsZ3bIQNmqKHJM1cick3fEVrWtSI',
      issuer: 'auth0',
      cert: 'fake cert',
    };

    super(saml_options);
  }
}
