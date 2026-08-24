# ADR-001 — Stack do Core

## Contexto

PTP III precisa de uma fundação única, pedagógica e profissional.

## Decisão

- Backend: Node.js + TypeScript + Express
- ORM: Prisma + PostgreSQL
- Auth: JWT access + refresh (bcrypt)
- Frontend: React + Vite + Tailwind
- Validação: Zod
- Testes: Vitest + Supertest

## Consequências

Contratos estáveis em `/api/v1`, módulos extensíveis sem duplicar autenticação.
