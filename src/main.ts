import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

import { useContainer } from 'class-validator';

import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // class validator auto validate
  app.useGlobalPipes(new ValidationPipe());

  // enable DI for class-validator
  // this is an important step
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // region swagger setup
  const config = new DocumentBuilder()
    .setTitle('Elasticsearch example')
    .setDescription('The elasticsearch example API description')
    .setVersion('1.0')
    .addTag('elasticsearch')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // endregion

  await app.listen(3000);
}
bootstrap();
