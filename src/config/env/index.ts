import development from './development';
import test from './test';

export interface JwtSignature {
  issuer: string;
  subject: string;
  audience: string;
}

export const JwtSignOptions: JwtSignature = {
  issuer: 'Template',
  subject: 'Authentication Token',
  audience: 'https://template.com',
};

export default {
  development,
  test,
}[process.env.SWITCH_NODE_ENV || 'development'];
