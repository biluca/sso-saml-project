import fs from 'fs';
import passport from 'passport';
import { Strategy } from 'passport-saml';
import config from './config';
import logging from './logging';


passport.serializeUser<any>((user, done) => {
  logging.info(user, 'Serialize User');
  done(null, user);
});

passport.deserializeUser<any>((user, done) => {
  logging.info(user, 'Deserialize User');

  done(null, user);
});

passport.use(
  new Strategy(
    {
      issuer: config.saml.issuer,
      protocol: 'http://',
      path: '/login/callback',
      entryPoint: config.saml.entryPoint,
      cert: fs.readFileSync(config.saml.cert, 'utf-8'),
    },
    (expressUser: any, done: any) => {
      if (!savedUsers.includes(expressUser)) {
        savedUsers.push(expressUser);
      }

      return done(null, expressUser);
    },
  ),
);
