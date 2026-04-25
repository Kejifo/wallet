#  Digital Wallet

Aplicación de billetera digital full-stack con backend en **ASP.NET Core 8** y frontend en **Angular 16**, containerizada con Docker.

##  Vista general

Permite consultar el saldo, registrar depósitos y retiros, y ver el historial completo de transacciones.

---

##  Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | Angular 16, TypeScript, Nginx |
| Backend | ASP.NET Core 8 (C#), .NET 8 |
| Infraestructura | Docker, Docker Compose |

---

##  Estructura del proyecto

```
DigitalWallet/
├── api/                        # Backend ASP.NET Core
│   ├── Controllers/
│   │   └── WalletController.cs
│   ├── Models/
│   │   └── WalletModels.cs
│   ├── Services/
│   │   ├── IWalletService.cs
│   │   └── WalletService.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── Dockerfile
├── client/                     # Frontend Angular
│   ├── src/
│   │   └── app/
│   │       ├── core/           # Servicios, modelos, interceptors
│   │       ├── features/       # Componentes de la wallet
│   │       └── shared/         # Pipes reutilizables
│   ├── nginx.conf
│   └── Dockerfile
└── docker-compose.yml
```

---

##  Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

>  **Windows**: si tu proyecto está en una carpeta de OneDrive, muévelo primero a una ruta local (ej. `C:\Projects\DigitalWallet`) para evitar problemas con Docker BuildKit.

---

##  Cómo ejecutar

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/digital-wallet.git
cd digital-wallet/DigitalWallet

# Levantar los contenedores
docker compose up --build
```

> **Windows**: si obtienes el error `invalid file request`, agrega un archivo `.env` en la carpeta `DigitalWallet/` con el siguiente contenido:
> ```
> DOCKER_BUILDKIT=0
> COMPOSE_DOCKER_CLI_BUILD=0
> ```

Una vez levantado:

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:4200 |
| API | http://localhost:5000 |

---

##  API Endpoints

### `GET /api/wallet/balance`
Devuelve el saldo actual y el historial de transacciones.

```json
{
  "success": true,
  "message": "Balance retrieved successfully",
  "data": {
    "currentBalance": 1000.00,
    "transactions": [],
    "lastUpdate": "2026-04-25T19:00:00Z"
  }
}
```

### `GET /api/wallet/transactions`
Devuelve la lista de todas las transacciones.

### `POST /api/wallet/transaction`
Registra un depósito o retiro.

**Body:**
```json
{
  "amount": 100.00,
  "type": "Deposit",
  "description": "Salario"
}
```

**Tipos válidos:** `Deposit` | `Withdrawal`

**Respuestas de error:**
- `400` — El monto debe ser mayor a cero
- `422` — Saldo insuficiente para el retiro

---

## ⚙️ Configuración

El CORS está configurado en `api/appsettings.json`. Para producción, actualiza la lista de orígenes permitidos:

```json
{
  "AllowedOrigins": ["https://tu-dominio.com"]
}
```

---

##  Notas

- **Persistencia**: los datos se almacenan en memoria. Al reiniciar el contenedor, el saldo vuelve a $1,000 y las transacciones se eliminan.
- **Balance inicial**: $1,000.00
- **Thread safety**: el servicio usa `lock` para operaciones concurrentes.

---

##  Mejoras futuras

- [ ] Persistencia con base de datos (PostgreSQL)
- [ ] Autenticación con JWT
- [ ] Tests unitarios e integración
- [ ] CI/CD con GitHub Actions
- [ ] Logging estructurado con Serilog
