# Smart Campus Core

Plataforma integrada **Smart Campus** para a unidade curricular **Prática Técnico-Profissional III (PTP III)** da **Universidade Joaquim Alberto Chissano (UJAC)**.

O repositório fornece o **Core comum**: autenticação, utilizadores/roles, API versionada, auditoria, salas, ocorrências, dashboard e navegação para todos os módulos (funcionais, parciais ou em desenvolvimento).

## Pré-requisitos

- Node.js 20+ (recomendado 22)
- npm 10+
- Docker / Docker Compose (PostgreSQL)

## Instalação rápida

```bash
cp .env.example .env
npm install
docker compose up -d db
npm run db:generate
npm run db:migrate:dev -- --name init
npm run db:seed
npm run build -w @smart-campus/shared-types
npm run build -w @smart-campus/validation
npm run build -w @smart-campus/api-client
npm run dev
```

- Frontend: http://localhost:5173
- Home pós-login: `/ops` (Centro de Operações)
- Dashboard clássico: `/dashboard`
- API: http://localhost:4100
- Health: http://localhost:4100/health
- Swagger: http://localhost:4100/api/docs

## Credenciais de demonstração (apenas desenvolvimento)

| Role | Email | Password |
| --- | --- | --- |
| ADMIN | admin@smartcampus.demo | Admin123! |
| COORDINATOR | coordenador@smartcampus.demo | Coord123! |
| TEACHER | docente@smartcampus.demo | Docente123! |
| TECHNICIAN | tecnico@smartcampus.demo | Tecnico123! |
| STUDENT | estudante@smartcampus.demo | Estudante123! |

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | API + Web |
| `npm run db:migrate:dev` | Migrações em desenvolvimento |
| `npm run db:seed` | Dados fictícios |
| `npm test` | Testes |
| `npm run build` | Build de todos os workspaces |

## Docker completo

```bash
cp .env.example .env
docker compose up --build
```

## Documentação

- [**Manual de construção do Core**](docs/manual-construcao-core.md) — passo a passo completo (arquitectura → infraestrutura → validação)
- [**Manual das APIs do Core**](docs/manual-apis-core.md) — todas as APIs, criação e testes (Swagger, Postman, curl)
- [Arquitectura](docs/architecture.md)
- [Convenções de API](docs/api-conventions.md)
- [Exemplos curl](docs/api-examples.md)
- [Matriz de roles](docs/authorization-matrix.md)
- [Guia de integração](docs/integration-guide.md)
- [Contribuição](CONTRIBUTING.md)

## Fluxo transversal

1. Login com utilizador demo
2. Consultar perfil (`/api/v1/me`)
3. Consultar salas
4. Criar ocorrência
5. Alterar estado (técnico/coordenador/admin)
6. Ver auditoria

## Limitações actuais

- Módulos académicos/IoT/relatórios estão parcialmente preparados (placeholders + schema)
- MQTT ainda não está ligado (estrutura e dados demo apenas)
- Notificações UI marcadas como preparadas

## Colaboração no GitHub (grupos PTP III)

Repositório oficial: **https://github.com/armandocorreia/UniversityCampusSystem**

| Guia | Descrição |
| --- | --- |
| [Colaboração GitHub](docs/colaboracao-github.md) | Forks, branches, PRs, protecção de `main` |
| [Módulos por grupo](docs/modulos-por-grupo.md) | Mapa de módulos e branches sugeridas |
| [Contribuição](CONTRIBUTING.md) | Commits, PRs, definição de pronto |

### Início rápido para um grupo

```bash
# Fork no GitHub, depois:
git clone git@github.com:<SUA-CONTA>/UniversityCampusSystem.git
cd UniversityCampusSystem
git remote add upstream git@github.com:armandocorreia/UniversityCampusSystem.git
git fetch upstream && git checkout main && git merge upstream/main
git checkout -b feature/grupo-academico-<modulo>-<objectivo>
```
