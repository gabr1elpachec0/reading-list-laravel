# Library - Progresso do Backend

## Objetivo

Aplicação de lista de leitura usando Laravel 12, onde o usuário pesquisa livros na API da OpenLibrary e os adiciona à sua lista com um status de leitura.

---

## O que foi feito

### 1. Enum de Status

**`app/Enums/ReadingStatus.php`**

Enum PHP nativo com os 3 status possíveis:
- `read` — Lido
- `reading` — Lendo
- `want_to_read` — Quero ler

---

### 2. Models

**`app/Models/Book.php`**
- Campos fillable: `title`, `author`, `publish_year`, `cover_id`
- Relacionamento `belongsToMany` com User via pivot `BookUser`

**`app/Models/BookUser.php`**
- Pivot model (extende `Pivot`, não `Model`)
- Cast do campo `status` para o enum `ReadingStatus`
- Relacionamentos `belongsTo` para User e Book

**`app/Models/User.php`** (atualizado)
- Adicionado trait `HasApiTokens` (Sanctum)
- Adicionado relacionamento `books()` como `belongsToMany`

---

### 3. Migrations

**`2026_03_16_192407_create_books_table.php`**
- `id`, `title`, `author`, `publish_year` (smallint, nullable), `cover_id` (nullable), `timestamps`

**`2026_03_16_192408_create_book_user_table.php`**
- `id`, `user_id`, `book_id` (foreign keys com `cascadeOnDelete`), `status` (default: `want_to_read`), `timestamps`
- Constraint `unique` em `[user_id, book_id]`

---

### 4. Controllers

**`app/Http/Controllers/BookController.php`**
- `search` — Busca livros na API da OpenLibrary (`https://openlibrary.org/search.json`), retorna JSON com título, autor, ano e cover_id

**`app/Http/Controllers/ReadingListController.php`**
- `index` — Lista livros do usuário (filtro opcional por `?status=`). Retorna JSON via API ou Inertia via web
- `store` — Adiciona livro à lista. Usa `firstOrCreate` no Book (evita duplicatas) e `syncWithoutDetaching` no pivot
- `update` — Atualiza o status de um livro na lista
- `destroy` — Remove um livro da lista (detach no pivot)

---

### 5. Rotas

Organizadas em subpastas por escopo:

```
routes/
├── api.php                  # Middleware: auth:sanctum
├── api/
│   ├── books.php            # GET /api/books/search?query=
│   └── reading-list.php     # CRUD /api/reading-list
├── web.php                  # Middleware: auth, verified
├── web/
│   ├── books.php            # GET /books/search?query=
│   └── reading-list.php     # CRUD /reading-list
├── settings.php
└── console.php
```

#### Rotas API (`/api/...`)

| Método   | URI                        | Descrição                    |
|----------|----------------------------|------------------------------|
| `GET`    | `/api/user`                | Retorna usuário autenticado  |
| `GET`    | `/api/books/search?query=` | Busca livros na OpenLibrary  |
| `GET`    | `/api/reading-list`        | Lista livros do usuário      |
| `POST`   | `/api/reading-list`        | Adiciona livro à lista       |
| `PATCH`  | `/api/reading-list/{book}` | Atualiza status do livro     |
| `DELETE` | `/api/reading-list/{book}` | Remove livro da lista        |

---

### 6. Autenticação API (Sanctum)

- Instalado `laravel/sanctum` v4.3
- Trait `HasApiTokens` adicionado ao model User
- Para gerar um token via tinker:

```php
$user = User::first();
echo $user->createToken('postman')->plainTextToken;
```

- Usar no Postman com os headers:

```
Accept: application/json
Authorization: Bearer {token}
```

---

## Próximos passos

- [ ] Desenvolver o frontend (Inertia + Vue/React)
- [ ] Página de busca de livros (consumir `books/search`)
- [ ] Página da lista de leitura com filtros por status
- [ ] Ações de adicionar, atualizar status e remover livros
