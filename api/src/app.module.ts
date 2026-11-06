import { Module } from '@nestjs/common';
import { ClientController } from './infrastructure/controllers/client.controller';
import { ClientService } from './application/services/client.service';
import { ClientRepository } from './domain/repositories/client.repository';
import { ClientSqlRepository } from './infrastructure/repositories/sql/client-sql.repository';
import { ClientNosqlRepository } from './infrastructure/repositories/nosql/client-nosql.repository';
import { ClientPreferencesRepositoryImpl } from './infrastructure/repositories/nosql/client-preferences.repository';
import { ClientPreferencesRepository } from './infrastructure/repositories/nosql/client-preferences.repository';

@Module({
  controllers: [ClientController],
  providers: [
    ClientService,
    {
      provide: ClientRepository,
      useClass: ClientSqlRepository,
    },
    ClientPreferencesRepositoryImpl,
    {
      provide: ClientPreferencesRepository,
      useExisting: ClientPreferencesRepositoryImpl,
    },
  ],
})
export class AppModule {}