import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api')

    const config = new DocumentBuilder()
        .setTitle('Dent ERP Backend API')
        .setDescription('API for patient and appointment management.')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document)

    await app.listen(3000);
}

bootstrap();
