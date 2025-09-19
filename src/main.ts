import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Filmes e series - StreamingAPI')
    .setDescription(
      'A present API tem como objetivo fornecer dados sobre filmes e séries de TV, incluindo detalhes como títulos, descrições, gêneros, classificações e outras informações relevantes. A API é projetada para ser fácil de usar e integrar em várias aplicações, permitindo que desenvolvedores acessem um vasto banco de dados de conteúdo audiovisual para criar experiências ricas e envolventes para os usuários.',
    )
    .setVersion('1.0')
    .addTag('usuarios')
    .addTag('filmes')
    .addTag('series')
    .addTag('eventos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
