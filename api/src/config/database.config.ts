import { Injectable } from '@nestjs/common';

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface NosqlConfig {
  uri: string;
  dbName: string;
}

export interface AwsConfig {
  region: string;
  endpoint?: string;
  tableName: string;
}

@Injectable()
export class DatabaseConfigService {
  getSqlConfig(): DatabaseConfig {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'pragma_fintech',
    };
  }

  getNosqlConfig(): NosqlConfig {
    return {
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
      dbName: process.env.MONGO_DB || 'pragma_fintech_nosql',
    };
  }

  getAwsConfig(): AwsConfig {
    return {
      region: process.env.AWS_REGION || 'us-east-1',
      endpoint: process.env.AWS_ENDPOINT,
      tableName: process.env.DYNAMO_TABLE || 'client_preferences',
    };
  }

  isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  getPort(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }
}