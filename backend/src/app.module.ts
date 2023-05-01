import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [AppController],
    providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
