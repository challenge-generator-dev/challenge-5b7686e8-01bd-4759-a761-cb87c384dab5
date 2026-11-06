import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from '../src/application/services/client.service';
import { ClientRepository } from '../src/domain/repositories/client.repository';
import { ClientEntity } from '../src/domain/entities/client.entity';
import { CreateClientDto } from '../src/application/dtos/create-client.dto';
import { UpdateClientDto } from '../src/application/dtos/update-client.dto';

describe('ClientService', () => {
  let service: ClientService;
  let repository: jest.Mocked<ClientRepository>;

  const mockClient: ClientEntity = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Juan Perez',
    email: 'juan.perez@example.com',
    birthDate: new Date('1990-05-15'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockClients: ClientEntity[] = [
    mockClient,
    {
      ...mockClient,
      id: '223e4567-e89b-12d3-a456-426614174001',
      name: 'Maria Garcia',
      email: 'maria.garcia@example.com',
    },
  ];

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: ClientRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get(ClientRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debe crear un cliente exitosamente', async () => {
      const createDto: CreateClientDto = {
        name: 'Juan Perez',
        email: 'juan.perez@example.com',
        birthDate: new Date('1990-05-15'),
      };

      repository.create.mockResolvedValue(mockClient);

      const result = await service.create(createDto);

      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith(expect.any(ClientEntity));
      expect(result).toEqual(mockClient);
    });

    it('debe propagar error cuando el repositorio falla', async () => {
      const createDto: CreateClientDto = {
        name: 'Juan Perez',
        email: 'juan.perez@example.com',
        birthDate: new Date('1990-05-15'),
      };

      repository.create.mockRejectedValue(new Error('Database error'));

      await expect(service.create(createDto)).rejects.toThrow('Database error');
    });
  });

  describe('findAll', () => {
    it('debe retornar todos los clientes', async () => {
      repository.findAll.mockResolvedValue(mockClients);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockClients);
      expect(result).toHaveLength(2);
    });

    it('debe retornar array vacío cuando no hay clientes', async () => {
      repository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('debe retornar un cliente por su id', async () => {
      repository.findById.mockResolvedValue(mockClient);

      const result = await service.findById(mockClient.id);

      expect(repository.findById).toHaveBeenCalledTimes(1);
      expect(repository.findById).toHaveBeenCalledWith(mockClient.id);
      expect(result).toEqual(mockClient);
    });

    it('debe retornar null cuando el cliente no existe', async () => {
      const nonExistentId = 'non-existent-id';
      repository.findById.mockResolvedValue(null);

      const result = await service.findById(nonExistentId);

      expect(repository.findById).toHaveBeenCalledTimes(1);
      expect(repository.findById).toHaveBeenCalledWith(nonExistentId);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('debe actualizar un cliente exitosamente', async () => {
      const updateDto: UpdateClientDto = {
        name: 'Juan Actualizado',
      };
      const updatedClient = { ...mockClient, name: 'Juan Actualizado' };

      repository.update.mockResolvedValue(updatedClient);

      const result = await service.update(mockClient.id, updateDto);

      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith(mockClient.id, expect.any(ClientEntity));
      expect(result).toEqual(updatedClient);
    });

    it('debe retornar null cuando el cliente a actualizar no existe', async () => {
      const nonExistentId = 'non-existent-id';
      const updateDto: UpdateClientDto = {
        name: 'Juan Actualizado',
      };

      repository.update.mockResolvedValue(null);

      const result = await service.update(nonExistentId, updateDto);

      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith(nonExistentId, expect.any(ClientEntity));
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('debe eliminar un cliente exitosamente', async () => {
      repository.delete.mockResolvedValue(true);

      const result = await service.delete(mockClient.id);

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(mockClient.id);
      expect(result).toBe(true);
    });

    it('debe retornar false cuando el cliente a eliminar no existe', async () => {
      const nonExistentId = 'non-existent-id';

      repository.delete.mockResolvedValue(false);

      const result = await service.delete(nonExistentId);

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(nonExistentId);
      expect(result).toBe(false);
    });
  });
});