# Guia de contribuição — Smart Campus Core

> Repositório: https://github.com/armandocorreia/UniversityCampusSystem

## Para grupos de estudantes (PTP III)

**Guia principal (passo a passo completo):** **[guia-contribuicao-grupos.md](docs/guia-contribuicao-grupos.md)**

Leia também:

1. **[Guia de contribuição para grupos](docs/guia-contribuicao-grupos.md)** — fork, clone, setup na máquina, branch, PR  
2. **[Módulos por grupo](docs/modulos-por-grupo.md)** — qual módulo desenvolver  
3. **[Integração de módulos](docs/integration-guide.md)** — padrão técnico API/UI  
4. **[Colaboração GitHub](docs/colaboracao-github.md)** — regras e governança (detalhe)

### Resumo do fluxo

```bash
# 1. Fork no GitHub → clone do fork
git clone git@github.com:<SUA-CONTA>/UniversityCampusSystem.git
cd UniversityCampusSystem

# 2. Upstream
git remote add upstream git@github.com:armandocorreia/UniversityCampusSystem.git
git fetch upstream && git checkout main && git merge upstream/main

# 3. Branch do grupo
git checkout -b feature/grupo-academico-courses-crud

# 4. Desenvolver → testar → push → PR para upstream main
npm test && npm run build
git push -u origin feature/grupo-academico-courses-crud
```

**Nunca** fazer push directo para `main`.

---

## Git hooks (atribuição)

Configure uma vez por clone para evitar trailers `Co-authored-by: Cursor` nos commits:

```bash
git config core.hooksPath .githooks
chmod +x .githooks/commit-msg .githooks/prepare-commit-msg .scripts/check-no-cursor-attribution.sh
bash .scripts/check-no-cursor-attribution.sh
```

---

## Branches

```text
main                                    # Core estável (protegida)
feature/grupo-<area>-<modulo>-<obj>     # desenvolvimento de grupo
fix/grupo-<area>-<descricao>            # correcções
docs/grupo-<area>-<descricao>           # documentação
release/<versao>                        # coordenação
hotfix/<descricao>                      # coordenação
```

Ver [colaboracao-github.md](docs/colaboracao-github.md) para convenções completas.

---

## Commits

Convenção sugerida:

```text
feat(academic): adicionar CRUD de cursos
fix(iot): corrigir leitura MQTT duplicada
test(incidents): teste de transição de estado
docs(parking): actualizar manual LPR
refactor(auth): separar emissão de refresh token
```

---

## Pull Requests

Título recomendado:

```text
[Grupo Académico] feat: CRUD de cursos e listagem UI
```

Use o template em `.github/pull_request_template.md`.

Um PR deve incluir:

- objectivo, grupo e módulo
- alterações e escopo
- testes executados (`npm test`, `npm run build`)
- migrações Prisma (se existirem)
- OpenAPI / manual API actualizados (se endpoints novos)
- estado correcto em `campusModules`
- evidências (screenshots, curl)
- **CI verde**

---

## Definição de pronto

- código compila
- testes relevantes passam
- autorização no backend (RBAC)
- contrato documentado em OpenAPI
- módulo marcado com estado correcto no frontend
- sem segredos no repositório
- branch sincronizada com `main` antes do merge

---

## Migrações

```bash
npx prisma migrate dev --name <nome>
npm run db:generate
```

Alterações incompatíveis de API exigem ADR em `docs/decisions/`.

---

## Issues

| Template | Quando usar |
| --- | --- |
| Bug report | Problema no Core |
| Module proposal | Atribuir ou propor módulo de grupo |

---

## Referências técnicas

| Documento | Conteúdo |
| --- | --- |
| [manual-construcao-core.md](docs/manual-construcao-core.md) | Construir o Core |
| [manual-apis-core.md](docs/manual-apis-core.md) | APIs e testes |
| [architecture.md](docs/architecture.md) | Arquitectura |
| [api-conventions.md](docs/api-conventions.md) | Contratos REST |
