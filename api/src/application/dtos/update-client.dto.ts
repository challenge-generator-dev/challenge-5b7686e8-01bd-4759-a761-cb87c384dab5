import { IsString, IsEmail, IsOptional, IsDateString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClientEntity } from '@domain/entities/client.entity';

export class UpdateClientDto {
  @ApiPropertyOptional({
    description: 'Nombre del cliente',
    example: 'Juan Pérez',
    minLength: 2,
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
  name?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico del cliente',
    example: 'juan.perez@ejemplo.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Fecha de nacimiento del cliente',
    example: '1990-05-15',
    type: String,
  })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida en formato ISO 8601' })
  birthDate?: string;

  constructor(data: Partial<UpdateClientDto>) {
    if (data) {
      this.name = data.name;
      this.email = data.email;
      this.birthDate = data.birthDate;
    }
  }

  toEntity(existingEntity?: ClientEntity): ClientEntity {
    const partialData = {
      name: this.name,
      email: this.email,
      birthDate: this.birthDate ? new Date(this.birthDate) : undefined,
    };

    if (existingEntity) {
      existingEntity.updateFromPartial(partialData);
      return existingEntity;
    }

    return ClientEntity.createFromPartial(partialData);
  }
}