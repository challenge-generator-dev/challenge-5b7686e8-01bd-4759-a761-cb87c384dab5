import { IsDateString, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ description: 'Nombre completo del cliente', example: 'Juan Pérez' })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Correo electrónico del cliente', example: 'juan.perez@example.com' })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({ description: 'Fecha de nacimiento del cliente', example: '1990-01-01' })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ description: 'Dirección del cliente', example: 'Calle Falsa 123', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  address?: string;

  @ApiProperty({ description: 'Teléfono del cliente', example: '+573001234567', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  constructor(
    name: string,
    email: string,
    dateOfBirth: string,
    address?: string,
    phone?: string,
  ) {
    this.name = name;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
    this.phone = phone;
  }

  toEntity(): { name: string; email: string; dateOfBirth: Date; address?: string; phone?: string } {
    return {
      name: this.name,
      email: this.email,
      dateOfBirth: new Date(this.dateOfBirth),
      address: this.address,
      phone: this.phone,
    };
  }
}