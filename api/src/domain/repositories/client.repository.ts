import { ClientEntity } from '../entities/client.entity';

export interface ClientRepository {
  create(client: ClientEntity): Promise<ClientEntity>;
  findAll(): Promise<ClientEntity[]>;
  findById(id: string): Promise<ClientEntity | null>;
  update(id: string, client: ClientEntity): Promise<ClientEntity | null>;
  delete(id: string): Promise<boolean>;
}