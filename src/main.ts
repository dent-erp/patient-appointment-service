import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {LoggingExceptionFilter} from "./logger/logging-exception.filter";
import {LoggerModule} from "./logger/logger.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const loggingExceptionFilter = app.select(LoggerModule).get(LoggingExceptionFilter);

    app.enableCors({
        origin: '*',
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
    });

    app.setGlobalPrefix('api')

    const config = new DocumentBuilder()
        .setTitle('Dent ERP Backend API')
        .setDescription('API for patient and appointment management.')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document)

    app.useGlobalFilters(loggingExceptionFilter);

    await app.listen(3000);
}

bootstrap();
