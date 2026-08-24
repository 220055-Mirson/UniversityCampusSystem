# Matriz de autorização

| Operação | STUDENT | TEACHER | TECHNICIAN | COORDINATOR | ADMIN |
| --- | --- | --- | --- | --- | --- |
| Consultar informação pública | Sim | Sim | Sim | Sim | Sim |
| Consultar perfil próprio | Sim | Sim | Sim | Sim | Sim |
| Criar ocorrência | Sim | Sim | Sim | Sim | Sim |
| Tratar ocorrência | Não | Não | Sim | Sim | Sim |
| Gerir salas | Não | Não | Parcial | Sim | Sim |
| Gerir utilizadores | Não | Não | Não | Parcial (listar) | Sim |
| Consultar auditoria | Não | Não | Não | Sim | Sim |

A autorização é aplicada no backend (`authenticate` + `authorize`).
