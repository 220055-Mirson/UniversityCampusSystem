# Exemplos rápidos de API (curl)

> Guia completo (criação + Swagger + Postman + fluxos): **[manual-apis-core.md](./manual-apis-core.md)**  
> Spec OpenAPI / Swagger UI: http://localhost:4100/api/docs

Base: `http://localhost:4100/api/v1`

## Health

```bash
curl -s http://localhost:4100/health
```

## Login

```bash
curl -s http://localhost:4100/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@smartcampus.demo","password":"Admin123!"}'
```

Resposta (resumo):

```json
{
  "data": {
    "user": { "email": "admin@smartcampus.demo", "role": "ADMIN" },
    "tokens": { "accessToken": "...", "refreshToken": "...", "expiresIn": "15m" }
  },
  "meta": { "correlationId": "sc-..." }
}
```

## Pedido autenticado

```bash
export TOKEN='<accessToken>'
curl -s http://localhost:4100/api/v1/me \
  -H "Authorization: Bearer $TOKEN"
```

## Erro

```json
{
  "code": "ROOM_NOT_FOUND",
  "message": "Sala não encontrada",
  "details": [],
  "correlationId": "sc-..."
}
```

## Fluxo transversal (resumo)

```bash
# 1 login → 2 /me → 3 /rooms → 4 POST /incidents → 5 PATCH status → 6 /audit-events
```

Ver comandos completos em [manual-apis-core.md §8](./manual-apis-core.md#8-testar-com-curl).
