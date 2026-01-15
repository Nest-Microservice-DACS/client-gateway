

## Client Gateway – Plataforma de Gestión Quirúrgica

Este módulo es un API REST desarrollado con NestJS para la gestión de agendas, cirugías, pacientes, personal, quirófanos y servicios en el contexto hospitalario (Solamente del area de quirófanos).

### Tabla de Contenidos
- [Descripción](#descripción)
- [Estado](#Estado)
- [Tech Stack del proyecto](#Tech-Stack-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Endpoints Principales](#endpoints-principales)
- [Configuración](#configuración)


---

# Documentación 

## Estado
Proyecto en **fase de desarrollo** - Funcionalidades core implementadas. Mejoras y optimizaciones en progreso.

## Descripción
Este gateway centraliza y orquesta las operaciones de los distintos microservicios hospitalarios, facilitando la integración y el acceso seguro a los recursos.

## Diagrama de clases simplificado
![Diagrama de clases](assets/diagrama.png)

## Tech Stack del proyecto
- Framework: NestJS v11 (API REST con TypeScript)
- Autenticación: Integracion con Keycloak + Passport.js (JWT con JWKS-RSA)
- Microservicios: @nestjs/microservices (comunicación entre servicios mediante RPC )
- Bases de datos: PostgreSQL (en microservicios)
- Validación: class-validator + class-transformer
- Configuración: dotenv + @nestjs/config
- Validación de esquemas: Joi
- Async: RxJS (Observables)
- Docker: Para levantar Keycloak localmente (ver docker-compose.yml) y bases de datos de los micro servicios (Ver en sus respectivos repositorios)
- Algunos patrones utilizados: 
  - Orchestrator Pattern: Cada módulo tiene un orquestador que coordina llamadas a otros microservicios
  - Client Pattern: Clientes dedicados para cada microservicio
  - DTO Pattern: Para validación de datos en entrada/salida
  - Singleton Pattern: Los servicios inyectados son singletons por defecto en NestJS
  - Strategy Pattern: Keycloak Strategy para autenticación JWT
  - Singleton Pattern: Los servicios inyectados son singletons por defecto en NestJS
  - Exception Handling Pattern: Usa RpcException para capturar y lanzar errores de microservicios


## Estructura del Proyecto

```
src/
  agenda/         # Gestión de turnos y agendas
  auth/           # Autenticación y autorización (Keycloak)
  cirugias/       # Gestión de cirugías
  common/         # Utilidades y excepciones comunes
  config/         # Configuración de entornos y servicios
  pacientes/      # Gestión de pacientes
  personal/       # Gestión de personal médico
  quirofanos/     # Gestión de quirófanos
  servicios/      # Gestión de servicios hospitalarios
```

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <repo-url>
   cd client-gateway
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```

## Ejecución

### Local
```bash
npm run start:dev
```

### Docker (Keycloak)
1. Tener Docker instalado.
2. Navegar a `src/auth/` y ejecutar:
   ```bash
   docker-compose up --build
   ```
   Esto levanta el servidor Keycloak en `http://localhost:8080`
   - Credenciales: admin / admin

## Endpoints Principales
Cada módulo expone endpoints RESTfull. Ejemplo:

- **Agenda:** `/agenda`
  - GET `/agenda` - Listar turnos
  - POST `/agenda` - Crear turno
  - PATCH `/agenda/:id` - Actualizar turno
  - DELETE `/agenda/:id` - Eliminar turno

- **Pacientes:** `/pacientes`
  - GET `/pacientes` - Listar pacientes
  - POST `/pacientes` - Crear paciente

- **Cirugías:** `/cirugias`
  - GET `/cirugias` - Listar cirugías
  - POST `/cirugias` - Crear cirugía

...y así para los demás módulos.

## Configuración
Variables de entorno principales (ver `src/config/envs.ts`):

- `PORT`: Puerto de la API
- `KEYCLOAK_URL`: URL del servidor Keycloak
- `KEYCLOAK_REALM`: Realm de autenticación
- `KEYCLOAK_CLIENT_ID`: ID del cliente
- `KEYCLOAK_SECRET`: Secreto del cliente

