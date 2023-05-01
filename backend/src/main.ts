import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: process.env.UI_URL });
    await app.listen(3000);
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
}
bootstrap();
