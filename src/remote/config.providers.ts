import { DataSource } from 'typeorm';
import { Config } from './config.entity';

export const configProviders = [
  {
    provide: 'CONFIG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Config),
    inject: ['DATA_SOURCE'],
  },
];
