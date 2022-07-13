import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    if (process.env?.NODE_ENV?.toLowerCase() === 'production') {
        await app.listen(parseInt(process.env.PORT, 10) || 443);
    } else {
        await app.listen(3000);
    }
}
bootstrap();
