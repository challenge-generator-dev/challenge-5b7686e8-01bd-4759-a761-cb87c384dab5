# Implementación de operaciones CRUD en bases de datos

La empresa PragmaFintech necesita un sistema para gestionar información de clientes en una base de datos. El sistema debe soportar operaciones CRUD (crear, leer, actualizar, eliminar) en bases de datos SQL y NoSQL. Los clientes tienen atributos como nombre, email y fecha de nacimiento. La base de datos SQL se utilizará para almacenar datos estructurados, mientras que la base de datos NoSQL se usará para datos no estructurados como preferencias del cliente. El sistema debe asegurar la integridad de los datos y manejar errores de forma adecuada.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construye operaciones CRUD en Bases de Datos SQL y NoSQL |
| **Nivel** | trainee-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición de esquemas y tablas

**Objetivo:** Definir los esquemas y tablas necesarios para almacenar información de clientes en bases de datos SQL y NoSQL.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Identifica los atributos necesarios para un cliente en la base de datos SQL y NoSQL.
- Crea los esquemas y tablas correspondientes utilizando DDL.
- Asegura que los esquemas soporten las operaciones CRUD.

**Entregable:** Esquemas y tablas definidos para bases de datos SQL y NoSQL.

<details>
<summary>Pistas de conocimiento</summary>

- Recuerda utilizar DDL para definir tus esquemas y tablas.
- Considera la integridad referencial en la base de datos SQL.

</details>

### Fase 2: Implementación de operaciones CRUD en base de datos SQL

**Objetivo:** Implementar operaciones CRUD en la base de datos SQL.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa las operaciones CRUD en la base de datos SQL utilizando DML.
- Asegura que las operaciones manejen errores de forma adecuada.
- Verifica que las operaciones funcionen correctamente utilizando pruebas unitarias.

**Entregable:** Operaciones CRUD implementadas y verificadas en la base de datos SQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza DML para implementar las operaciones CRUD.
- Considera el uso de transacciones para asegurar la integridad de los datos.

</details>

### Fase 3: Implementación de operaciones CRUD en base de datos NoSQL

**Objetivo:** Implementar operaciones CRUD en la base de datos NoSQL.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa las operaciones CRUD en la base de datos NoSQL utilizando las APIs proporcionadas por el motor de base de datos.
- Asegura que las operaciones manejen errores de forma adecuada.
- Verifica que las operaciones funcionen correctamente utilizando pruebas unitarias.

**Entregable:** Operaciones CRUD implementadas y verificadas en la base de datos NoSQL.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza las APIs proporcionadas por el motor de base de datos NoSQL para implementar las operaciones CRUD.
- Considera la gestión de índices para mejorar el rendimiento de las consultas.
- IntelliJ IDEA Debugger: Depura el componente con la run-config de IntelliJ IDEA (menu Run, carpeta .run/): pone breakpoints donde implementas el reto y arranca en modo debug.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y por qué son importantes en el manejo de bases de datos?
- **paraQueSirve**: ¿Para qué sirven los esquemas y tablas en una base de datos y cómo se relacionan con las operaciones CRUD?
- **comoSeUsa**: ¿Cómo se implementan las operaciones CRUD en bases de datos SQL y NoSQL?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en bases de datos y cómo se pueden manejar?

## Criterios de Evaluacion

- Definición correcta de esquemas y tablas en bases de datos SQL y NoSQL.
- Implementación correcta de operaciones CRUD en base de datos SQL.
- Implementación correcta de operaciones CRUD en base de datos NoSQL.
- Manejo adecuado de errores en las operaciones CRUD.
- Verificación de las operaciones CRUD utilizando pruebas unitarias.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
