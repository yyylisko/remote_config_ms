import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from "typeorm";

const ENV = process.env.NODE_ENV;

// Load env file
dotenv.config({ path: __dirname + `/../../.env.${ENV}` });

export const database_config = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'pass',
    database: 'remote_config',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
};

const migration_config = {
    ...database_config,
    "migrations": [
        "./src/migrations/**/*.ts"
    ]
}

const MigrationAppDataSource = new DataSource({
    ...database_config,
    ...migration_config} as DataSourceOptions);
    

export default MigrationAppDataSource;