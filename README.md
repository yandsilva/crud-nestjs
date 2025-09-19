# 📚 NestJS CRUD com Prisma (SQLite)

Este projeto é um exemplo de **CRUD completo** utilizando [NestJS](https://nestjs.com/) como framework backend e [Prisma ORM](https://www.prisma.io/) para comunicação com banco de dados **SQLite**.

---

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt) para hashing de senhas

---

## 📂 Estrutura de Pastas

```bash
src/
├── prisma/
│   └── schema.prisma       # Definição do modelo User
├── user/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── user.module.ts
├── prisma.service.ts        # Serviço central para acessar o Prisma
├── app.module.ts
└── main.ts

npm install

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
}

npx prisma migrate dev --name init

npx prisma generate

npm run start:dev

```
