import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.local', '.env'],
  }),
  JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonConfigModule {}
