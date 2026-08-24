# Decisões arquitecturais (ADR)

Registo de decisões importantes que afectam o Core ou vários módulos.

## Formato sugerido

Criar ficheiro `YYYYMMDD-<titulo-curto>.md`:

```markdown
# ADR: Título

## Estado
Proposto | Aceite | Substituído

## Contexto
...

## Decisão
...

## Consequências
...
```

## Quando criar ADR

- Alteração incompatível na API (`/api/v1`)
- Mudança de schema partilhado
- Nova dependência global
- Extracção de módulo para serviço externo (ex.: MQTT)
