import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV || 'development',
  port: parseInt(process.env.APP_PORT || '3001', 10),
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  platformDomain: process.env.PLATFORM_DOMAIN || 'admin.memsyst.com',
  platformDomainLocal: process.env.PLATFORM_DOMAIN_LOCAL || 'admin.localhost:3001',
}));
