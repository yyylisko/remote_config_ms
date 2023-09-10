import { Module } from '@nestjs/common';
import { RemoteConfigModule } from './remote/config.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, RemoteConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
