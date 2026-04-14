# Library - Progresso do Frontend

## Stack utilizada

- **React 19** + **TypeScript**
- **Inertia.js** (navegação SPA sem API separada)
- **Tailwind CSS v4** (com variáveis CSS para tema claro/escuro)
- **shadcn/ui** (componentes Radix + CVA)
- **Lucide React** (ícones)
- **Wayfinder** (rotas Laravel tipadas no frontend)

---

## O que foi feito

### 1. Tipos TypeScript

**`resources/js/types/book.ts`**

- `ReadingStatus` — union type `'read' | 'reading' | 'want_to_read'`
- `Book` — tipo completo com pivot (status, timestamps)
- `BookPivot` — dados da tabela pivot `book_user`
- `SearchResult` — resultado da busca na OpenLibrary
- `STATUS_LABELS` — mapa de status para labels em português
- `STATUS_ALL` — array de opções para selects/botões
- `getCoverUrl()` — helper para montar URL de capa da OpenLibrary

**`resources/js/types/index.ts`** (atualizado)
- Exporta os tipos de `book.ts`

---

### 2. Componentes

**`resources/js/components/book-card.tsx`**

Card de livro com:
- Capa do livro (via OpenLibrary) ou placeholder
- Título, autor e ano de publicação
- Badge de status com cor e ícone por tipo (`Lendo` = azul, `Lido` = verde, `Quero Ler` = âmbar)
- Menu dropdown (hover) com ações:
  - Alterar status (3 opções)
  - Remover livro da lista
- Feedback visual de loading durante ações
- Usa `router.patch` / `router.delete` do Inertia com `preserveScroll`
- Usa rotas tipadas Wayfinder (`readingList.update.url()`, `readingList.destroy.url()`)

**`resources/js/components/book-search-dialog.tsx`**

Modal de busca com:
- Input com ícone de busca e debounce de 400ms
- Chamada `fetch` para `/books/search?query=` (rota web que retorna JSON)
- Lista de resultados com capa thumbnail, título, autor e ano
- Botões por status no desktop (`Lendo`, `Lido`, `Quero Ler`)
- Botão simplificado `Adicionar` no mobile
- Feedback de "Adicionado" (ícone check verde) após sucesso
- Estados: buscando (spinner), sem resultados, estado inicial
- Usa `router.post` do Inertia para adicionar livros
- Limpa estado ao fechar o modal

---

### 3. Páginas

**`resources/js/pages/ReadingList/Index.tsx`**

Página principal da lista de leitura:
- Header com título, subtítulo dinâmico (contagem de livros) e botão "Adicionar Livro"
- Filtro por status com 4 tabs: `Todos`, `Lendo`, `Lido`, `Quero Ler`
  - Cada tab mostra contagem quando no filtro "Todos"
  - Navegação via `router.get` com `preserveState` e `preserveScroll`
- Grid responsivo de `BookCard` (1 coluna mobile, 2 tablet, 3 desktop)
- Empty state com ilustração e CTA diferente para:
  - Lista vazia (convida a buscar livros)
  - Filtro sem resultados (sugere outro filtro)
- Recebe props `books` e `currentStatus` do `ReadingListController@index`

**`resources/js/pages/dashboard.tsx`** (reescrito)

Dashboard com contagens reais:
- Saudação personalizada (`Olá, {nome}!`)
- 4 stat cards clicáveis com contagem real vinda do backend:
  - Todos os livros (total)
  - Lendo (reading)
  - Lidos (read)
  - Quero Ler (want_to_read)
- Card "Descobrir Livros" — abre o `BookSearchDialog`
- Card "Sua Biblioteca" — link para a lista de leitura
- Cada stat card leva ao filtro correspondente na lista

---

### 4. Navegação

**`resources/js/components/app-sidebar.tsx`** (atualizado)

- Adicionado item "Minha Lista" no menu principal da sidebar
- Ícone `Library` do Lucide
- Link para `/reading-list` via rota tipada Wayfinder

---

### 5. Backend (ajustes)

**`app/Http/Controllers/DashboardController.php`** (novo)

- Controller invocável (`__invoke`)
- Query agregada única no PostgreSQL com `count(*) filter (where ...)`
- Retorna contagens por status via Inertia

**`app/Http/Controllers/ReadingListController.php`** (fix)

- Corrigido bug no filtro por status: `when()` + `wherePivot()` gerava SQL inválido (`"pivot" = status`)
- Extraída a query para variável, aplicando `wherePivot` diretamente na instância `BelongsToMany`

**`routes/web.php`** (atualizado)

- Dashboard agora usa `DashboardController` em vez de `Route::inertia()`

---

## Estrutura de arquivos criados/alterados

```
resources/js/
├── types/
│   ├── book.ts                          # NOVO
│   └── index.ts                         # ALTERADO
├── components/
│   ├── book-card.tsx                    # NOVO
│   ├── book-search-dialog.tsx           # NOVO
│   └── app-sidebar.tsx                  # ALTERADO
├── pages/
│   ├── dashboard.tsx                    # REESCRITO
│   └── ReadingList/
│       └── Index.tsx                    # NOVO

app/Http/Controllers/
├── DashboardController.php              # NOVO
└── ReadingListController.php            # ALTERADO (fix)

routes/
└── web.php                              # ALTERADO
```

---

## Componentes shadcn/ui utilizados

- `Button` (variantes: default, outline, ghost)
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`
- `Badge` (com cores customizadas por status)
- `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogTrigger`
- `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuTrigger`
- `Input`
- `Sidebar` (componentes de navegação)

---

## Próximos passos

- [ ] Paginação na lista de leitura (quando houver muitos livros)
- [ ] Busca/filtro por texto dentro da própria lista
- [ ] Ordenação (por título, autor, data de adição)
- [ ] Página de detalhes do livro
- [ ] Testes E2E das funcionalidades de busca e gerenciamento
