import { Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { configProviders } from './config.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ConfigController],
  providers: [ConfigService, ...configProviders],
})
export class RemoteConfigModule {}
