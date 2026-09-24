import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonConfigModule } from './common/config.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CommonConfigModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
