import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RateLimitMiddleware } from './infrastructure/security/rateLimiter.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Enable rate limiting
  // const rateLimiter = new RateLimitMiddleware();
  // app.use(rateLimiter );
  // Enable global validation and transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transform DTOs to their declared types
      whitelist: true, // Strip out non-whitelisted properties
      forbidNonWhitelisted: true, // Throw an error if extra properties are provided
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Employee management API')
    .setDescription('API documentation for the EMS application')
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT Bearer token authentication in Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Swagger docs are available at: http://localhost:3000/api/docs`);
}
bootstrap();
