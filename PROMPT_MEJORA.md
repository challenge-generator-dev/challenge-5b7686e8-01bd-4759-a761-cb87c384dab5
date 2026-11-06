# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/docker-compose.yml` — El topic pide contenedores/orquestacion: este archivo es el ejercicio, no scaffolding.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB, MongoDB |
| `client` | `client/` | chapter, support | client | React | - |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB, MongoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /clients`
  - `GET /clients`
  - `GET /clients/:id`
  - `PUT /clients/:id`
  - `DELETE /clients/:id`

## Herramientas

- **IntelliJ IDEA Debugger**: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `api/src/application/services/client.service.ts` — `ClientRepository.findByEmail`: Se invoca `findByEmail` sobre `ClientRepository`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/sql/client-sql.repository.ts` — `ClientEntity.create`: Se invoca `create` sobre `ClientEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/sql/client-sql.repository.ts` — `ClientEntity.findMany`: Se invoca `findMany` sobre `ClientEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/sql/client-sql.repository.ts` — `ClientEntity.findUnique`: Se invoca `findUnique` sobre `ClientEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/sql/client-sql.repository.ts` — `ClientEntity.update`: Se invoca `update` sobre `ClientEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/repositories/sql/client-sql.repository.ts` — `ClientEntity.delete`: Se invoca `delete` sobre `ClientEntity`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/client.controller.ts` — `ClientService.createClient`: Se invoca `createClient` sobre `ClientService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/client.controller.ts` — `ClientService.getClients`: Se invoca `getClients` sobre `ClientService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/client.controller.ts` — `ClientService.getClientById`: Se invoca `getClientById` sobre `ClientService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/client.controller.ts` — `ClientService.updateClient`: Se invoca `updateClient` sobre `ClientService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/src/infrastructure/controllers/client.controller.ts` — `ClientService.deleteClient`: Se invoca `deleteClient` sobre `ClientService`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `api/package.json` — `typescript@5.7.0`: typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.
- `client/package.json` — `typescript@5.7.0`: typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML) (corrida e2e 20261106155039996), Construye operaciones básicas, como crear, obtener, actualizar y eliminar (CRUD), en bases de datos SQL o NoSQL utilizando definición y manipulación de datos (DDL y DML)

### Reto
- Tema: Construye operaciones CRUD en Bases de Datos SQL y NoSQL
- Seniority: trainee-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD en bases de datos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición de esquemas y tablas — objetivo: Definir los esquemas y tablas necesarios para almacenar información de clientes en bases de datos SQL y NoSQL. — entregable (NO resolver): Esquemas y tablas definidos para bases de datos SQL y NoSQL.
- Fase 2: Implementación de operaciones CRUD en base de datos SQL — objetivo: Implementar operaciones CRUD en la base de datos SQL. — entregable (NO resolver): Operaciones CRUD implementadas y verificadas en la base de datos SQL.
- Fase 3: Implementación de operaciones CRUD en base de datos NoSQL — objetivo: Implementar operaciones CRUD en la base de datos NoSQL. — entregable (NO resolver): Operaciones CRUD implementadas y verificadas en la base de datos NoSQL.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "pragma-fintech-api",
  "version": "1.0.0",
  "description": "API para gestión de clientes en bases de datos SQL y NoSQL",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "ts-node src/main.ts",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "@nestjs/swagger": "^7.4.0",
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "prisma": "^5.18.0",
    "@prisma/client": "^5.18.0",
    "mongoose": "^8.5.1",
    "@aws-sdk/client-dynamodb": "^3.577.0",
    "@aws-sdk/lib-dynamodb": "^3.577.0"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/node": "^20.14.12",
    "@types/jest": "^29.5.12",
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "jest": "^29.7.0",
    "prettier": "^3.3.3",
    "supertest": "^6.3.4",
    "ts-jest": "^29.1.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.0"
  },
  "jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "paths": {
      "@app/*": ["src/*"],
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"],
      "@config/*": ["src/config/*"],
      "@test/*": ["test/*"]
    }
  },
  "exclude": ["node_modules", "dist", "test", "**/*.spec.ts"]
}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('PragmaFintech API')
    .setDescription('API para gestión de clientes en bases de datos SQL y NoSQL')
    .setVersion('1.0')
    .addTag('clients')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api`);
}

bootstrap();

// === ARCHIVO: api/src/domain/entities/client.entity.ts ===
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

// === ARCHIVO: api/src/domain/repositories/client.repository.ts ===
import { ClientEntity } from '../entities/client.entity';

export interface ClientRepository {
  create(client: ClientEntity): Promise<ClientEntity>;
  findAll(): Promise<ClientEntity[]>;
  findById(id: string): Promise<ClientEntity | null>;
  update(id: string, client: ClientEntity): Promise<ClientEntity | null>;
  delete(id: string): Promise<boolean>;
}

// === ARCHIVO: api/src/application/dtos/create-client.dto.ts ===
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

// === ARCHIVO: api/src/application/dtos/update-client.dto.ts ===
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

// === ARCHIVO: api/src/application/services/client.service.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/sql/client-sql.repository.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/client-nosql.repository.ts ===
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

// === ARCHIVO: api/src/infrastructure/repositories/nosql/client-preferences.repository.ts ===
import { Injectable, Logger } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { InjectModel, InjectConnection } from '@nestjs/common';

export interface ClientPreference {
  id?: string;
  clientId: string;
  preferences: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ClientPreferencesRepository {
  private readonly logger = new Logger(ClientPreferencesRepository.name);
  private preferenceModel: Model<ClientPreference>;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(ClientPreferencesRepository.name) private readonly prefModel: Model<ClientPreference>,
  ) {
    this.preferenceModel = prefModel;
    this.logger.log('ClientPreferencesRepository initialized');
  }

  async createPreference(clientId: string, preferences: Record<string, unknown>): Promise<ClientPreference> {
    try {
      const newPreference = new this.preferenceModel({
        clientId,
        preferences,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const saved = await newPreference.save();
      this.logger.log(`Preference created for client: ${clientId}`);
      return this.toPreference(saved);
    } catch (error) {
      this.logger.error(`Failed to create preference: ${error.message}`);
      throw error;
    }
  }

  async getPreferenceByClientId(clientId: string): Promise<ClientPreference | null> {
    try {
      const pref = await this.preferenceModel.findOne({ clientId }).exec();
      if (pref) {
        this.logger.log(`Preference retrieved for client: ${clientId}`);
        return this.toPreference(pref);
      }
      this.logger.warn(`No preference found for client: ${clientId}`);
      return null;
    } catch (error) {
      this.logger.error(`Failed to get preference: ${error.message}`);
      throw error;
    }
  }

  async updatePreference(clientId: string, preferences: Record<string, unknown>): Promise<ClientPreference | null> {
    try {
      const updated = await this.preferenceModel
        .findOneAndUpdate(
          { clientId },
          { preferences, updatedAt: new Date() },
          { new: true },
        )
        .exec();
      if (updated) {
        this.logger.log(`Preference updated for client: ${clientId}`);
        return this.toPreference(updated);
      }
      this.logger.warn(`No preference found to update for client: ${clientId}`);
      return null;
    } catch (error) {
      this.logger.error(`Failed to update preference: ${error.message}`);
      throw error;
    }
  }

  async deletePreference(clientId: string): Promise<boolean> {
    try {
      const result = await this.preferenceModel.findOneAndDelete({ clientId }).exec();
      if (result) {
        this.logger.log(`Preference deleted for client: ${clientId}`);
        return true;
      }
      this.logger.warn(`No preference found to delete for client: ${clientId}`);
      return false;
    } catch (error) {
      this.logger.error(`Failed to delete preference: ${error.message}`);
      throw error;
    }
  }

  private toPreference(doc: Record<string, unknown>): ClientPreference {
    return {
      id: doc._id?.toString(),
      clientId: doc.clientId as string,
      preferences: doc.preferences as Record<string, unknown>,
      createdAt: doc.createdAt as Date,
      updatedAt: doc.updatedAt as Date,
    };
  }

  async onModuleDestroy() {
    await this.connection.close();
    this.logger.log('MongoDB connection closed for preferences');
  }
}

// === ARCHIVO: api/src/infrastructure/controllers/client.controller.ts ===
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

// === ARCHIVO: api/src/app.module.ts ===
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

// === ARCHIVO: api/src/config/database.config.ts ===
import { Injectable } from '@nestjs/common';

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface NosqlConfig {
  uri: string;
  dbName: string;
}

export interface AwsConfig {
  region: string;
  endpoint?: string;
  tableName: string;
}

@Injectable()
export class DatabaseConfigService {
  getSqlConfig(): DatabaseConfig {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'pragma_fintech',
    };
  }

  getNosqlConfig(): NosqlConfig {
    return {
      uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
      dbName: process.env.MONGO_DB || 'pragma_fintech_nosql',
    };
  }

  getAwsConfig(): AwsConfig {
    return {
      region: process.env.AWS_REGION || 'us-east-1',
      endpoint: process.env.AWS_ENDPOINT,
      tableName: process.env.DYNAMO_TABLE || 'client_preferences',
    };
  }

  isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  getPort(): number {
    return parseInt(process.env.PORT || '3000', 10);
  }
}

// === ARCHIVO: api/test/client.service.spec.ts ===
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

// === ARCHIVO: api/docker-compose.yml ===
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: pragma-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: pragma_fintech
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 10s
      timeout: 5s
      retries: 5

  mongodb:
    image: mongo:7.0
    container_name: pragma-mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: mongo
      MONGO_INITDB_ROOT_PASSWORD: mongo
      MONGO_INITDB_DATABASE: pragma_fintech
    ports:
      - '27017:27017'
    volumes:
      - mongodb_data:/data/db
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test --quiet
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  mongodb_data:

// === ARCHIVO: client/index.html ===
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Client Management</title>
    <script type="module" src="/src/main.tsx"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/main.scss";`,
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
});

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": [
      "DOM",
      "DOM.Iterable",
      "ESNext"
    ],
    "jsx": "react-jsx",
    "strict": true,
    "noImplicitAny": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules"
  ]
}


// === ARCHIVO: client/package.json ===
{
  "name": "client-management",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write src"
  },
  "dependencies": {
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0",
    "react-router-dom": "6.24.0",
    "@tanstack/react-query": "5.51.11",
    "axios": "1.7.2"
  },
  "devDependencies": {
    "typescript": "5.7.0",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "@vitejs/plugin-react": "4.3.1",
    "vite": "5.3.4",
    "sass": "1.77.8",
    "eslint": "8.57.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.6",
    "prettier": "3.3.3"
  }
}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './styles/main.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// === ARCHIVO: client/src/App.tsx ===
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClientList } from '@/features/clients/ClientList';
import { ClientForm } from '@/features/clients/ClientForm';
import { Suspense, lazy } from 'react';

const ClientCard = lazy(() => import('@/features/clients/ClientCard'));

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<ClientList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/:id/edit" element={<ClientForm />} />
            <Route path="/clients/:id" element={<ClientCard />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;

// === ARCHIVO: client/src/router.tsx ===
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { ClientList } from '@/features/clients/ClientList';
import { ClientForm } from '@/features/clients/ClientForm';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ClientList />,
      },
      {
        path: 'clients/new',
        element: <ClientForm />,
      },
      {
        path: 'clients/:id/edit',
        element: <ClientForm />,
      },
      {
        path: 'clients/:id',
        element: <ClientCard />,
      },
    ],
  },
]);

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default AppRouter;

// === ARCHIVO: client/src/features/clients/ClientList.tsx ===
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClientEntity } from '@/shared/types/client';
import { ApiClient } from '@/shared/services/api';
import { ClientCard } from './ClientCard';

const api = new ApiClient('http://localhost:3000');

export function ClientList() {
  const [clients, setClients] = useState<ClientEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState<ClientEntity[]>([]);

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredClients(clients);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = clients.filter(
        (client) =>
          client.name.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query) ||
          (client.preferences?.language?.toLowerCase().includes(query) ?? false)
      );
      setFilteredClients(filtered);
    }
  }, [searchQuery, clients]);

  async function loadClients() {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getClients();
      setClients(data);
      setFilteredClients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este cliente?');
    if (!confirmed) return;

    try {
      await api.deleteClient(id);
      setClients((prev) => prev.filter((client) => client.id !== id));
      setFilteredClients((prev) => prev.filter((client) => client.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar cliente');
    }
  }

  if (loading) {
    return (
      <div className="client-list__loading">
        <div className="spinner" aria-label="Cargando clientes"></div>
        <p>Cargando clientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="client-list__error">
        <p role="alert">Error: {error}</p>
        <button onClick={loadClients} className="btn btn--primary">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="client-list">
      <header className="client-list__header">
        <h1 className="client-list__title">Gestión de Clientes</h1>
        <Link to="/clients/new" className="btn btn--primary">
          Crear Nuevo Cliente
        </Link>
      </header>

      <div className="client-list__search">
        <label htmlFor="search" className="sr-only">Buscar clientes</label>
        <input
          id="search"
          type="search"
          placeholder="Buscar por nombre, email o idioma..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input--search"
          aria-label="Buscar clientes"
        />
      </div>

      {filteredClients.length === 0 ? (
        <div className="client-list__empty">
          <p>No se encontraron clientes.</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="btn btn--secondary"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <ul className="client-list__grid" role="list">
          {filteredClients.map((client) => (
            <li key={client.id} className="client-list__item">
              <ClientCard
                client={client}
                onEdit={`/clients/${client.id}/edit`}
                onDelete={() => handleDelete(client.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// === ARCHIVO: client/src/features/clients/ClientForm.tsx ===
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientEntity, CreateClientDto, UpdateClientDto } from '@/shared/types/client';
import { ApiClient } from '@/shared/services/api';

const api = new ApiClient('http://localhost:3000');

interface ClientFormProps {
  isEditMode?: boolean;
}

export function ClientForm({ isEditMode = false }: ClientFormProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateClientDto>({
    name: '',
    email: '',
    birthDate: '',
    preferences: {
      language: 'es',
      notifications: true,
      theme: 'light',
    },
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && id) {
      loadClient(id);
    }
  }, [isEditMode, id]);

  async function loadClient(clientId: string) {
    try {
      setFetching(true);
      const client = await api.getClientById(clientId);
      setFormData({
        name: client.name,
        email: client.email,
        birthDate: client.birthDate,
        preferences: client.preferences || {
          language: 'es',
          notifications: true,
          theme: 'light',
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar cliente');
    } finally {
      setFetching(false);
    }
  }

  function validateForm(): boolean {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }

    if (!formData.birthDate) {
      errors.birthDate = 'La fecha de nacimiento es obligatoria';
    } else {
      const birth = new Date(formData.birthDate);
      const today = new Date();
      if (birth >= today) {
        errors.birthDate = 'La fecha de nacimiento debe ser anterior a hoy';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      if (isEditMode && id) {
        const updateData: UpdateClientDto = {
          name: formData.name.trim(),
          email: formData.email.trim(),
          birthDate: formData.birthDate,
          preferences: formData.preferences,
        };
        await api.updateClient(id, updateData);
      } else {
        await api.createClient(formData);
      }

      navigate('/clients');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar cliente');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.currentTarget;

    if (name.startsWith('preferences.')) {
      const prefKey = name.replace('preferences.', '');
      setFormData((prev) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefKey]: type === 'checkbox' ? (e.currentTarget as HTMLInputElement).checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  if (fetching) {
    return (
      <div className="client-form__loading">
        <div className="spinner" aria-label="Cargando cliente"></div>
        <p>Cargando datos del cliente...</p>
      </div>
    );
  }

  return (
    <div className="client-form">
      <header className="client-form__header">
        <h1 className="client-form__title">
          {isEditMode ? 'Editar Cliente' : 'Crear Nuevo Cliente'}
        </h1>
      </header>

      {error && (
        <div className="client-form__error" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="client-form__form" noValidate>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Nombre completo <span className="required">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${fieldErrors.name ? 'form-input--error' : ''}`}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            disabled={loading}
          />
          {fieldErrors.name && (
            <span id="name-error" className="form-error" role="alert">
              {fieldErrors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Correo electrónico <span className="required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-input ${fieldErrors.email ? 'form-input--error' : ''}`}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            disabled={loading}
          />
          {fieldErrors.email && (
            <span id="email-error" className="form-error" role="alert">
              {fieldErrors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="birthDate" className="form-label">
            Fecha de nacimiento <span className="required">*</span>
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            className={`form-input ${fieldErrors.birthDate ? 'form-input--error' : ''}`}
            aria-invalid={!!fieldErrors.birthDate}
            aria-describedby={fieldErrors.birthDate ? 'birthDate-error' : undefined}
            disabled={loading}
          />
          {fieldErrors.birthDate && (
            <span id="birthDate-error" className="form-error" role="alert">
              {fieldErrors.birthDate}
            </span>
          )}
        </div>

        <fieldset className="form-fieldset">
          <legend className="form-legend">Preferencias</legend>

          <div className="form-group">
            <label htmlFor="preferences.language" className="form-label">
              Idioma preferido
            </label>
            <select
              id="preferences.language"
              name="preferences.language"
              value={formData.preferences?.language || 'es'}
              onChange={handleChange}
              className="form-select"
              disabled={loading}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div className="form-group form-group--inline">
            <label htmlFor="preferences.notifications" className="form-checkbox-label">
              <input
                id="preferences.notifications"
                name="preferences.notifications"
                type="checkbox"
                checked={formData.preferences?.notifications ?? true}
                onChange={handleChange}
                disabled={loading}
                className="form-checkbox"
              />
              Recibir notificaciones
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="preferences.theme" className="form-label">
              Tema de interfaz
            </label>
            <select
              id="preferences.theme"
              name="preferences.theme"
              value={formData.preferences?.theme || 'light'}
              onChange={handleChange}
              className="form-select"
              disabled={loading}
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="auto">Automático</option>
            </select>
          </div>
        </fieldset>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/clients')}
            className="btn btn--secondary"
            disabled={loading}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn--primary" disabled={loading}>
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

// === ARCHIVO: client/src/features/clients/ClientCard.tsx ===
import { Link } from 'react-router-dom';
import { ClientEntity } from '@/shared/types/client';

interface ClientCardProps {
  client: ClientEntity;
  onEdit: string;
  onDelete: () => void;
}

export function ClientCard({ client, onEdit, onDelete }: ClientCardProps) {
  function formatDate(dateString: string | undefined): string {
    if (!dateString) return 'No disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  function calculateAge(birthDate: string | undefined): number | null {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  const age = calculateAge(client.birthDate);

  return (
    <article className="client-card" aria-labelledby={`client-${client.id}-name`}>
      <header className="client-card__header">
        <div
          className="client-card__avatar"
          aria-hidden="true"
        >
          {getInitials(client.name)}
        </div>
        <div className="client-card__info">
          <h2
            id={`client-${client.id}-name`}
            className="client-card__name"
          >
            {client.name}
          </h2>
          <a
            href={`mailto:${client.email}`}
            className="client-card__email"
            aria-label={`Enviar email a ${client.email}`}
          >
            {client.email}
          </a>
        </div>
      </header>

      <dl className="client-card__details">
        <div className="client-card__detail">
          <dt className="client-card__label">Fecha de nacimiento</dt>
          <dd className="client-card__value">{formatDate(client.birthDate)}</dd>
        </div>
        {age !== null && (
          <div className="client-card__detail">
            <dt className="client-card__label">Edad</dt>
            <dd className="client-card__value">{age} años</dd>
          </div>
        )}
        {client.preferences && (
          <>
            <div className="client-card__detail">
              <dt className="client-card__label">Idioma</dt>
              <dd className="client-card__value">
                {client.preferences.language === 'es' && 'Español'}
                {client.preferences.language === 'en' && 'Inglés'}
                {client.preferences.language === 'fr' && 'Francés'}
                {client.preferences.language === 'de' && 'Alemán'}
              </dd>
            </div>
            <div className="client-card__detail">
              <dt className="client-card__label">Notificaciones</dt>
              <dd className="client-card__value">
                {client.preferences.notifications ? 'Activadas' : 'Desactivadas'}
              </dd>
            </div>
            <div className="client-card__detail">
              <dt className="client-card__label">Tema</dt>
              <dd className="client-card__value">
                {client.preferences.theme === 'light' && 'Claro'}
                {client.preferences.theme === 'dark' && 'Oscuro'}
                {client.preferences.theme === 'auto' && 'Automático'}
              </dd>
            </div>
          </>
        )}
      </dl>

      <footer className="client-card__actions">
        <Link
          to={onEdit}
          className="btn btn--secondary btn--small"
          aria-label={`Editar cliente ${client.name}`}
        >
          Editar
        </Link>
        <button
          onClick={onDelete}
          className="btn btn--danger btn--small"
          aria-label={`Eliminar cliente ${client.name}`}
        >
          Eliminar
        </button>
      </footer>
    </article>
  );
}

// === ARCHIVO: client/src/shared/types/client.ts ===
export interface ClientEntity {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  preferences?: ClientPreferences;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientPreferences {
  notifications: boolean;
  marketingEmails: boolean;
  language: string;
  theme: 'light' | 'dark';
  additionalData?: Record<string, unknown>;
}

export interface CreateClientDto {
  name: string;
  email: string;
  birthDate: string;
  preferences?: Partial<ClientPreferences>;
}

export interface UpdateClientDto {
  name?: string;
  email?: string;
  birthDate?: string;
  preferences?: Partial<ClientPreferences>;
}

export interface ClientListResponse {
  clients: ClientEntity[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export type ClientFormData = Omit<ClientEntity, 'id' | 'createdAt' | 'updatedAt'>;

// === ARCHIVO: client/src/shared/services/api.ts ===
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  ClientEntity,
  CreateClientDto,
  UpdateClientDto,
  ClientListResponse
} from '../types/client';

const API_BASE_URL = 'http://localhost:3000';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
    throw new Error('An unexpected error occurred');
  }

  async createClient(data: CreateClientDto): Promise<ClientEntity> {
    try {
      const response = await this.client.post<ClientEntity>('/clients', data);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getClients(params?: Record<string, unknown>): Promise<ClientEntity[]> {
    try {
      const config: AxiosRequestConfig = {};
      if (params) {
        config.params = params;
      }
      const response = await this.client.get<ClientEntity[]>('/clients', config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getClientById(id: string): Promise<ClientEntity> {
    try {
      const response = await this.client.get<ClientEntity>(`/clients/${id}`);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateClient(id: string, data: UpdateClientDto): Promise<ClientEntity> {
    try {
      const response = await this.client.put<ClientEntity>(`/clients/${id}`, data);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteClient(id: string): Promise<void> {
    try {
      await this.client.delete(`/clients/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getClientsPaginated(
    page: number,
    limit: number
  ): Promise<ClientListResponse> {
    try {
      const response = await this.client.get<ClientListResponse>('/clients', {
        params: { page, limit }
      });
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async searchClients(query: string): Promise<ClientEntity[]> {
    try {
      const response = await this.client.get<ClientEntity[]>('/clients', {
        params: { search: query }
      });
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;

// === ARCHIVO: client/src/styles/main.scss ===
$primary-color: #2563eb;
$secondary-color: #64748b;
$success-color: #10b981;
$warning-color: #f59e0b;
$danger-color: #ef4444;
$background-color: #f8fafc;
$surface-color: #ffffff;
$text-primary: #1e293b;
$text-secondary: #64748b;
$border-color: #e2e8f0;
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
$spacing-xs: 0.25rem;
$spacing-sm: 0.5rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;
$border-radius: 0.5rem;
$transition-fast: 150ms ease-in-out;
$transition-normal: 250ms ease-in-out;

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: $background-color;
  color: $text-primary;
  min-height: 100vh;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: $primary-color;
  text-decoration: none;
  transition: color $transition-fast;

  &:hover {
    color: darken($primary-color, 10%);
  }

  &:focus {
    outline: 2px solid $primary-color;
    outline-offset: 2px;
  }
}

button {
  cursor: pointer;
  font-family: inherit;
  border: none;
  background: none;
}

input,
textarea,
select {
  font-family: inherit;
  font-size: 1rem;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-md;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-sm $spacing-md;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: $border-radius;
  transition: all $transition-fast;
  gap: $spacing-xs;

  &-primary {
    background-color: $primary-color;
    color: white;

    &:hover {
      background-color: darken($primary-color, 8%);
    }

    &:active {
      transform: translateY(1px);
    }
  }

  &-secondary {
    background-color: $surface-color;
    color: $text-primary;
    border: 1px solid $border-color;

    &:hover {
      background-color: $background-color;
    }
  }

  &-danger {
    background-color: $danger-color;
    color: white;

    &:hover {
      background-color: darken($danger-color, 8%);
    }
  }

  &-success {
    background-color: $success-color;
    color: white;

    &:hover {
      background-color: darken($success-color, 8%);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.form-group {
  margin-bottom: $spacing-md;

  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: $text-primary;
    margin-bottom: $spacing-xs;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: $spacing-sm $spacing-md;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    background-color: $surface-color;
    transition: border-color $transition-fast, box-shadow $transition-fast;

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
    }

    &::placeholder {
      color: $text-secondary;
    }

    &:disabled {
      background-color: $background-color;
      cursor: not-allowed;
    }

    &.error {
      border-color: $danger-color;
    }
  }

  .error-message {
    color: $danger-color;
    font-size: 0.75rem;
    margin-top: $spacing-xs;
  }
}

.card {
  background-color: $surface-color;
  border-radius: $border-radius;
  box-shadow: $shadow-sm;
  border: 1px solid $border-color;
  padding: $spacing-lg;
  transition: box-shadow $transition-normal;

  &:hover {
    box-shadow: $shadow-md;
  }

  &-header {
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-md;
    border-bottom: 1px solid $border-color;
  }

  &-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: $text-primary;
  }

  &-body {
    color: $text-secondary;
  }

  &-footer {
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1px solid $border-color;
    display: flex;
    justify-content: flex-end;
    gap: $spacing-sm;
  }
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: $surface-color;
  border-radius: $border-radius;
  overflow: hidden;
  box-shadow: $shadow-sm;

  th,
  td {
    padding: $spacing-md;
    text-align: left;
    border-bottom: 1px solid $border-color;
  }

  th {
    background-color: $background-color;
    font-weight: 600;
    font-size: 0.875rem;
    color: $text-primary;
  }

  tr:hover td {
    background-color: rgba($primary-color, 0.02);
  }

  tr:last-child td {
    border-bottom: none;
  }
}

.alert {
  padding: $spacing-md;
  border-radius: $border-radius;
  margin-bottom: $spacing-md;
  display: flex;
  align-items: center;
  gap: $spacing-sm;

  &-info {
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;
    border: 1px solid rgba($primary-color, 0.2);
  }

  &-success {
    background-color: rgba($success-color, 0.1);
    color: $success-color;
    border: 1px solid rgba($success-color, 0.2);
  }

  &-warning {
    background-color: rgba($warning-color, 0.1);
    color: $warning-color;
    border: 1px solid rgba($warning-color, 0.2);
  }

  &-error {
    background-color: rgba($danger-color, 0.1);
    color: $danger-color;
    border: 1px solid rgba($danger-color, 0.2);
  }
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid $border-color;
  border-radius: 50%;
  border-top-color: $primary-color;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-in {
  animation: fadeIn $transition-normal forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.mt-sm { margin-top: $spacing-sm; }
.mt-md { margin-top: $spacing-md; }
.mt-lg { margin-top: $spacing-lg; }
.mb-sm { margin-bottom: $spacing-sm; }
.mb-md { margin-bottom: $spacing-md; }
.mb-lg { margin-bottom: $spacing-lg; }

.d-flex { display: flex; }
.justify-between { justify-content: space-between; }
.align-center { align-items: center; }
.gap-sm { gap: $spacing-sm; }
.gap-md { gap: $spacing-md; }

// === ARCHIVO: .run/api.run.xml ===
<component name="ProjectRunConfigurationManager">
  <configuration default="false" name="api" type="js.build_tools.npm" nameIsGenerated="false">
    <package-json value="$PROJECT_DIR$/api/package.json" />
    <command value="run" />
    <scripts>
      <script value="start" />
    </scripts>
    <node-interpreter value="project" />
    <envs>
      <env name="DYNAMODB_ENDPOINT" value="http://localhost:8000" />
      <env name="AWS_REGION" value="us-east-1" />
      <env name="AWS_ACCESS_KEY_ID" value="local" />
      <env name="AWS_SECRET_ACCESS_KEY" value="local" />
      <env name="MONGODB_URI" value="mongodb://localhost:27017/app" />
    </envs>
    <method v="2" />
  </configuration>
</component>


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s
  mongo:
    image: "mongo:7.0.14"
    ports:
      - "127.0.0.1:27017:27017"
    environment:
      MONGO_INITDB_DATABASE: "app"
    volumes:
      - "./infra-local/mongo/init.js:/docker-entrypoint-initdb.d/init.js:ro"
    healthcheck:
      test: ["CMD","mongosh","--quiet","--eval","db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 10s
      retries: 10
      start_period: 20s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |
| MongoDB | `mongo:7.0.14` | 27017 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"


// === ARCHIVO: infra-local/mongo/init.js ===
// Se ejecuta una sola vez al crear el volumen de MongoDB (docker-entrypoint-initdb.d).
db = db.getSiblingDB('app');
db.createCollection('items');
db.items.createIndex({ name: 1 });

```
