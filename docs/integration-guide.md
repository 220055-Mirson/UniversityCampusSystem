# Guia de integração de módulos

## 1. Clonar e executar o Core

```bash
cp .env.example .env
npm install
docker compose up -d db
npm run db:generate
npm run db:migrate:dev
npm run db:seed
npm run dev
```

## 2. Branch de módulo

```bash
git checkout -b feature/<modulo>-<objectivo>
```

## 3. Consumir a API

Use `@smart-campus/api-client` ou `fetch` contra `/api/v1` com Bearer token.

## 4. Token de desenvolvimento

Faça login com as credenciais de demonstração do README.

## 5. Tipos partilhados

Importe de `@smart-campus/shared-types` e `@smart-campus/validation`.

## 6. Criar entidade + serviço + rota + teste

```text
apps/api/src/modules/<module-name>/
├── domain/
├── application/
├── infrastructure/
├── http/
├── schemas/
└── tests/
```

## 7. Migração

```bash
npx prisma migrate dev --name <descricao>
```

## 8. Documentar endpoint

Actualize `docs/openapi.yaml` e `docs/api-conventions.md`.

## 9. Dependências

Declare no `package.json` do workspace correcto. Não duplique Core.

## 10–13. PR, revisão, conflitos, frontend

Siga `CONTRIBUTING.md`. Actualize `campusModules` e rotas sem quebrar navegação existente.
Marque o estado do módulo (`available` | `partial` | `development`).
