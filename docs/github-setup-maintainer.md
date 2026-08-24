# Configuração recomendada do repositório GitHub

> Para a coordenação / maintainer: **armandocorreia/UniversityCampusSystem**

## 1. Descrição e topics

**Description:** Smart Campus Core — plataforma integrada UJAC / PTP III (monólito modular)

**Topics sugeridos:**

```text
smart-campus, ujac, ptp3, typescript, react, express, prisma, postgresql, monorepo, education
```

## 2. Branch protection — `main`

**Settings → Branches → Add rule → Branch name pattern: `main`**

| Opção | Recomendação |
| --- | --- |
| Require a pull request before merging | ✅ |
| Require approvals | 1 (docente/coordenação) |
| Dismiss stale pull request approvals | ✅ |
| Require status checks to pass | ✅ CI / `build-test` |
| Require branches to be up to date | ✅ |
| Do not allow bypassing | ✅ (excepto admins se necessário) |
| Restrict who can push | Maintainers only |
| Allow force pushes | ❌ |
| Allow deletions | ❌ |

## 3. Permissões de fork

**Settings → General → Pull Requests**

- ✅ Allow merge commits (ou squash — preferência da coordenação)
- ✅ Automatically delete head branches (opcional, após merge)
- ✅ Allow edits from maintainers (facilita rebase no PR)

**Settings → Actions → Fork pull request workflows**

- Habilitar workflows em PRs de forks (para CI correr nos PRs dos grupos)

## 4. Colaboradores vs forks

| Modelo | Quando usar |
| --- | --- |
| **Fork + PR** (recomendado) | Vários grupos, contas GitHub individuais |
| **Collaborator directo** | Grupo pequeno com acesso ao repo oficial |

Ambos seguem [colaboracao-github.md](../docs/colaboracao-github.md).

## 5. Teams GitHub (opcional, organização)

Se existir organização GitHub UJAC:

```text
@ujac/grupo-academico
@ujac/grupo-infra
@ujac/grupo-iot
@ujac/grupo-manutencao
@ujac/grupo-relatorios
```

Actualizar `.github/CODEOWNERS` com `@ujac/grupo-academico` nos paths do módulo.

## 6. Labels sugeridas

| Label | Cor | Uso |
| --- | --- | --- |
| `module` | azul | Propostas de módulo |
| `ptp3` | verde | Trabalho curricular |
| `grupo-academico` | | PR do grupo |
| `grupo-iot` | | PR do grupo |
| `grupo-infra` | | PR do grupo |
| `core` | vermelho | Alteração ao Core |
| `needs-review` | amarelo | Aguarda docente |
| `blocked` | cinza | Dependência externa |

## 7. Primeiro push (já feito pelo maintainer)

```bash
git remote add origin git@github.com:armandocorreia/UniversityCampusSystem.git
git push -u origin main
```

## 8. Comunicar aos grupos

Partilhar:

1. URL do repositório  
2. Link [colaboracao-github.md](../docs/colaboracao-github.md)  
3. Link [modulos-por-grupo.md](../docs/modulos-por-grupo.md)  
4. Credenciais demo do README (apenas dev)  
5. Prazo e módulo atribuído por grupo  
