import { IsDate, IsEmail, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

export class ClientEntity {
  @IsUUID()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  name: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsDate()
  @Expose()
  dateOfBirth: Date;

  @IsString()
  @Expose()
  address?: string;

  @IsString()
  @Expose()
  phone?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    dateOfBirth: Date,
    address?: string,
    phone?: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
    this.phone = phone;
  }

  static createFromPartial(data: {
    name: string;
    email: string;
    dateOfBirth: Date;
    address?: string;
    phone?: string;
  }): ClientEntity {
    return new ClientEntity(
      crypto.randomUUID(),
      data.name,
      data.email,
      data.dateOfBirth,
      data.address,
      data.phone,
    );
  }

  updateFromPartial(data: {
    name?: string;
    email?: string;
    dateOfBirth?: Date;
    address?: string;
    phone?: string;
  }): ClientEntity {
    if (data.name !== undefined) this.name = data.name;
    if (data.email !== undefined) this.email = data.email;
    if (data.dateOfBirth !== undefined) this.dateOfBirth = data.dateOfBirth;
    if (data.address !== undefined) this.address = data.address;
    if (data.phone !== undefined) this.phone = data.phone;
    return this;
  }
}