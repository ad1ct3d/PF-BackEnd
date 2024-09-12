import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/logger.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { exec } from 'child_process';
import { stderr, stdout } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //middleware
  app.use(LoggerGlobalMiddleware);

  //swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('M4-ecommerce')
    .setDescription('Test para los endpoints del proyecto M4')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`we're live`);

  //PRELOAD
  exec('npm run preload', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Preload: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Preload script stderr: ${stderr}`);
      return;
    }
    console.log(`preload script output ${stdout}`);
  });
}
bootstrap();
