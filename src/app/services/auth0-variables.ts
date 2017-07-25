interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'Q0VquIM3AB5F3s61BOrinXkJ3SuZKV1g',
  domain: 'dgmz2.eu.auth0.com',
  callbackURL: 'http://localhost:4200/callback'
};
