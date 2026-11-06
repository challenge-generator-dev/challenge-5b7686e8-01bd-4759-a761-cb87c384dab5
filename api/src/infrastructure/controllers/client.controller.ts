import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ClientService } from '../../application/services/client.service';
import { CreateClientDto } from '../../application/dtos/create-client.dto';
import { ClientEntity } from '../../domain/entities/client.entity';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente', type: ClientEntity })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async createClient(@Body() createClientDto: CreateClientDto): Promise<ClientEntity> {
    return this.clientService.createClient(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes', type: [ClientEntity] })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getClients(): Promise<ClientEntity[]> {
    return this.clientService.getClients();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: String })
  @ApiResponse({ status: 200, description: 'Cliente encontrado', type: ClientEntity })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getClientById(@Param('id', ParseUUIDPipe) id: string): Promise<ClientEntity | null> {
    return this.clientService.getClientById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: String })
  @ApiResponse({ status: 200, description: 'Cliente actualizado', type: ClientEntity })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async updateClient(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateData: Partial<ClientEntity>,
  ): Promise<ClientEntity | null> {
    return this.clientService.updateClient(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: String })
  @ApiResponse({ status: 204, description: 'Cliente eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async deleteClient(@Param('id', ParseUUIDPipe) id: string): Promise<boolean> {
    return this.clientService.deleteClient(id);
  }
}