import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.local', '.env'],
  })],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonConfigModule {}
