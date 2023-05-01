import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';

@Module({
    imports: [AuthModule, ConfigModule.forRoot()],
    controllers: [AppController],
    providers: [AppService, PrismaService, UserService, AuthService],
})
export class AppModule {}
