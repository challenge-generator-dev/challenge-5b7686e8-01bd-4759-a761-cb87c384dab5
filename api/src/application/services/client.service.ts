import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, Logger } from '@nestjs/common';
import { ClientRepository } from '@domain/repositories/client.repository';
import { ClientEntity } from '@domain/entities/client.entity';
import { CreateClientDto } from '@application/dtos/create-client.dto';
import { UpdateClientDto } from '@application/dtos/update-client.dto';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);

  constructor(private readonly clientRepository: ClientRepository) {}

  async create(createClientDto: CreateClientDto): Promise<ClientEntity> {
    this.logger.log('Creating new client');

    const existingClient = await this.clientRepository.findByEmail(createClientDto.email);
    if (existingClient) {
      this.logger.warn(`Client with email ${createClientDto.email} already exists`);
      throw new ConflictException('Ya existe un cliente con el correo electrónico proporcionado');
    }

    const clientEntity = createClientDto.toEntity();

    try {
      const createdClient = await this.clientRepository.create(clientEntity);
      this.logger.log(`Client created successfully with id: ${createdClient.id}`);
      return createdClient;
    } catch (error) {
      this.logger.error(`Failed to create client: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al crear el cliente');
    }
  }

  async findAll(): Promise<ClientEntity[]> {
    this.logger.log('Retrieving all clients');

    try {
      const clients = await this.clientRepository.findAll();
      this.logger.log(`Retrieved ${clients.length} clients`);
      return clients;
    } catch (error) {
      this.logger.error(`Failed to retrieve clients: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al obtener los clientes');
    }
  }

  async findById(id: string): Promise<ClientEntity> {
    this.logger.log(`Retrieving client with id: ${id}`);

    if (!id || id.trim() === '') {
      throw new NotFoundException('El ID del cliente es requerido');
    }

    try {
      const client = await this.clientRepository.findById(id);

      if (!client) {
        this.logger.warn(`Client with id ${id} not found`);
        throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
      }

      this.logger.log(`Client retrieved successfully: ${id}`);
      return client;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to retrieve client: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al obtener el cliente');
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<ClientEntity> {
    this.logger.log(`Updating client with id: ${id}`);

    if (!id || id.trim() === '') {
      throw new NotFoundException('El ID del cliente es requerido');
    }

    const existingClient = await this.clientRepository.findById(id);
    if (!existingClient) {
      this.logger.warn(`Client with id ${id} not found for update`);
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    if (updateClientDto.email && updateClientDto.email !== existingClient.email) {
      const clientWithEmail = await this.clientRepository.findByEmail(updateClientDto.email);
      if (clientWithEmail && clientWithEmail.id !== id) {
        this.logger.warn(`Email ${updateClientDto.email} already in use`);
        throw new ConflictException('El correo electrónico ya está en uso por otro cliente');
      }
    }

    const updatedEntity = updateClientDto.toEntity(existingClient);

    try {
      const updatedClient = await this.clientRepository.update(id, updatedEntity);
      this.logger.log(`Client updated successfully: ${id}`);
      return updatedClient;
    } catch (error) {
      this.logger.error(`Failed to update client: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al actualizar el cliente');
    }
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`Deleting client with id: ${id}`);

    if (!id || id.trim() === '') {
      throw new NotFoundException('El ID del cliente es requerido');
    }

    const existingClient = await this.clientRepository.findById(id);
    if (!existingClient) {
      this.logger.warn(`Client with id ${id} not found for deletion`);
      throw new NotFoundException(`Cliente con ID ${id} no encontrado`);
    }

    try {
      const deleted = await this.clientRepository.delete(id);
      if (deleted) {
        this.logger.log(`Client deleted successfully: ${id}`);
      } else {
        this.logger.warn(`Failed to delete client: ${id}`);
      }
      return deleted;
    } catch (error) {
      this.logger.error(`Failed to delete client: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al eliminar el cliente');
    }
  }
}