import { database_config } from '../config/migration.config';
import { DataSource, DataSourceOptions } from 'typeorm';

const AppDataSource = new DataSource(
  database_config as DataSourceOptions);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return AppDataSource.initialize();
    },
  },
];
