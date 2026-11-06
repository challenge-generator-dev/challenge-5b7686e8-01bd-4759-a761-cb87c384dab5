import { Injectable, Logger } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { ClientEntity } from '@domain/entities/client.entity';
import { ClientRepository } from '@domain/repositories/client.repository';

@Injectable()
export class ClientNosqlRepository implements ClientRepository {
  private readonly logger = new Logger(ClientNosqlRepository.name);
  private clientModel: Model<ClientEntity>;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(ClientEntity.name) private readonly clientEntityModel: Model<ClientEntity>,
  ) {
    this.clientModel = clientEntityModel;
    this.logger.log('ClientNosqlRepository initialized with MongoDB connection');
  }

  async create(client: ClientEntity): Promise<ClientEntity> {
    try {
      const createdClient = new this.clientModel(this.toDocument(client));
      const savedClient = await createdClient.save();
      this.logger.log(`Client created with ID: ${savedClient._id}`);
      return this.toEntity(savedClient);
    } catch (error) {
      this.logger.error(`Failed to create client: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<ClientEntity[]> {
    try {
      const clients = await this.clientModel.find().exec();
      this.logger.log(`Retrieved ${clients.length} clients from NoSQL database`);
      return clients.map((doc) => this.toEntity(doc));
    } catch (error) {
      this.logger.error(`Failed to retrieve clients: ${error.message}`);
      throw error;
    }
  }

  async findById(id: string): Promise<ClientEntity | null> {
    try {
      const client = await this.clientModel.findById(id).exec();
      if (client) {
        this.logger.log(`Client found with ID: ${id}`);
        return this.toEntity(client);
      }
      this.logger.warn(`Client not found with ID: ${id}`);
      return null;
    } catch (error) {
      this.logger.error(`Failed to find client by ID: ${error.message}`);
      throw error;
    }
  }

  async update(id: string, client: ClientEntity): Promise<ClientEntity | null> {
    try {
      const updatedClient = await this.clientModel
        .findByIdAndUpdate(id, this.toDocument(client), { new: true })
        .exec();
      if (updatedClient) {
        this.logger.log(`Client updated with ID: ${id}`);
        return this.toEntity(updatedClient);
      }
      this.logger.warn(`Client not found for update with ID: ${id}`);
      return null;
    } catch (error) {
      this.logger.error(`Failed to update client: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.clientModel.findByIdAndDelete(id).exec();
      if (result) {
        this.logger.log(`Client deleted with ID: ${id}`);
        return true;
      }
      this.logger.warn(`Client not found for deletion with ID: ${id}`);
      return false;
    } catch (error) {
      this.logger.error(`Failed to delete client: ${error.message}`);
      throw error;
    }
  }

  private toDocument(client: ClientEntity): Record<string, unknown> {
    return {
      name: client.name,
      email: client.email,
      birthDate: client.birthDate,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }

  private toEntity(doc: Record<string, unknown>): ClientEntity {
    const entity = new ClientEntity();
    entity.id = doc._id?.toString() || '';
    entity.name = doc.name as string;
    entity.email = doc.email as string;
    entity.birthDate = doc.birthDate as Date;
    entity.createdAt = doc.createdAt as Date;
    entity.updatedAt = doc.updatedAt as Date;
    return entity;
  }

  async onModuleDestroy() {
    await this.connection.close();
    this.logger.log('MongoDB connection closed');
  }
}