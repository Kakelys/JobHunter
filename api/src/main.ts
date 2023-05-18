import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const fs = require('fs');
  const keyFile  = fs.readFileSync(__dirname + './../' + process.env.SSL_KEY);
  const certFile = fs.readFileSync(__dirname + './../' + process.env.SSL_CERT);

const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    }
  });

  app.enableCors({
    origin: [
      'https://localhost:4200',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  });

  const config = new DocumentBuilder()
    .setTitle('Work finder (swagger)')
    .setDescription('All enpoints(uncluding test part)')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(process.env.PORT);
}
bootstrap();
