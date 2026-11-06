import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ClientRepository } from '@domain/repositories/client.repository';
import { ClientEntity } from '@domain/entities/client.entity';

@Injectable()
export class ClientSqlRepository implements ClientRepository {
  private readonly logger = new Logger(ClientSqlRepository.name);
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    this.logger.log('ClientSqlRepository initialized with Prisma');
  }

  async create(client: ClientEntity): Promise<ClientEntity> {
    try {
      this.logger.debug(`Creating client with email: ${client.email}`);
      
      const created = await this.prisma.client.create({
        data: {
          id: client.id,
          name: client.name,
          email: client.email,
          phone: client.phone,
          address: client.address,
          createdAt: client.createdAt,
          updatedAt: client.updatedAt,
        },
      });

      this.logger.log(`Client created successfully with id: ${created.id}`);
      return this.mapToEntity(created);
    } catch (error) {
      this.logger.error(`Failed to create client: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to create client in database');
    }
  }

  async findAll(): Promise<ClientEntity[]> {
    try {
      this.logger.debug('Fetching all clients from SQL database');
      
      const clients = await this.prisma.client.findMany({
        orderBy: { createdAt: 'desc' },
      });

      this.logger.log(`Retrieved ${clients.length} clients from database`);
      return clients.map(this.mapToEntity);
    } catch (error) {
      this.logger.error(`Failed to fetch clients: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch clients from database');
    }
  }

  async findById(id: string): Promise<ClientEntity | null> {
    try {
      this.logger.debug(`Fetching client with id: ${id}`);
      
      const client = await this.prisma.client.findUnique({
        where: { id },
      });

      if (!client) {
        this.logger.warn(`Client not found with id: ${id}`);
        return null;
      }

      this.logger.log(`Client found with id: ${id}`);
      return this.mapToEntity(client);
    } catch (error) {
      this.logger.error(`Failed to fetch client: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch client from database');
    }
  }

  async update(id: string, client: ClientEntity): Promise<ClientEntity | null> {
    try {
      this.logger.debug(`Updating client with id: ${id}`);
      
      const existing = await this.prisma.client.findUnique({ where: { id } });
      if (!existing) {
        this.logger.warn(`Cannot update - client not found with id: ${id}`);
        return null;
      }

      const updated = await this.prisma.client.update({
        where: { id },
        data: {
          name: client.name,
          email: client.email,
          phone: client.phone,
          address: client.address,
          updatedAt: new Date(),
        },
      });

      this.logger.log(`Client updated successfully with id: ${id}`);
      return this.mapToEntity(updated);
    } catch (error) {
      this.logger.error(`Failed to update client: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to update client in database');
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      this.logger.debug(`Deleting client with id: ${id}`);
      
      const existing = await this.prisma.client.findUnique({ where: { id } });
      if (!existing) {
        this.logger.warn(`Cannot delete - client not found with id: ${id}`);
        return false;
      }

      await this.prisma.client.delete({
        where: { id },
      });

      this.logger.log(`Client deleted successfully with id: ${id}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to delete client: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to delete client from database');
    }
  }

  private mapToEntity(data: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): ClientEntity {
    return new ClientEntity(
      data.id,
      data.name,
      data.email,
      data.phone || undefined,
      data.address || undefined,
      data.createdAt,
      data.updatedAt,
    );
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
    this.logger.log('Prisma connection closed');
  }
}