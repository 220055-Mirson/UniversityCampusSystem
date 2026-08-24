# Convenções de API

- Base: `/api/v1`
- Sucesso: `{ "data": ..., "meta": { "correlationId": "..." } }`
- Erro: `{ "code": "...", "message": "...", "details": [], "correlationId": "..." }`
- Autenticação: `Authorization: Bearer <accessToken>`
- Header opcional: `x-correlation-id`
- Datas em ISO-8601
- Não devolver stack traces, passwords, tokens ou queries

Catálogo completo, criação e testes: [manual-apis-core.md](./manual-apis-core.md).  
Swagger: http://localhost:4100/api/docs

Alterações incompatíveis exigem nova versão ou nota de migração em `docs/decisions/`.
