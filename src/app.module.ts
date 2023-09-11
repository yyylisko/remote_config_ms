import { Module } from '@nestjs/common';
import { RemoteConfigModule } from './remote/config.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [ConfigModule.forRoot({envFilePath: !ENV ? '.env' : `.env.${ENV}`,}), DatabaseModule, RemoteConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
