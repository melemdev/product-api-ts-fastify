import 'dotenv/config';
import { fastify } from 'fastify';

import { config } from './config';
import { logger, setupLogger } from './shared/logger';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { errorHandler } from './shared/errors';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { routes } from './routes';

async function bootstrap() {
  try {
    const server = fastify({
      logger: config.log_level == 'verbose',
    });

    logger.debug('Logger Level: ' + config.log_level);

    // Set logger
    server.log = logger;

    // Set type provider
    server.withTypeProvider<ZodTypeProvider>();

    // Set validators
    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);

    // Set error handler
    server.setErrorHandler(errorHandler);

    // Setup HTTP request logging
    setupLogger(server);

    // Register plugins
    await server.register(fastifyCors, config.cors);

    await server.register(fastifySwagger, {
      openapi: {
        info: {
          title: config.swagger.title,
          version: config.swagger.version,
        },
      },
      transform: jsonSchemaTransform,
    });

    await server.register(fastifySwaggerUi, {
      routePrefix: '/docs',
    });

    // Register routes
    await server.register(routes, { prefix: '/api' });

    await server.listen({
      port: config.port,
      host: '0.0.0.0', // Allow external connections
    });

    logger.info(`Server running at http://localhost:${config.port}`);
  } catch (err) {
    logger.error('Failed to start server:', err);
    console.log(err);
    process.exit(1);
  }
}

bootstrap().catch(err => {
  logger.error('Unhandled error:', err);
  process.exit(1);
});
