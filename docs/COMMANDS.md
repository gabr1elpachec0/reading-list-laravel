# Comandos do Projeto — Library

## Subindo o ambiente

```bash
# 1. Subir o banco PostgreSQL (Docker)
docker compose up -d

# 2. Instalar dependências PHP
composer install

# 3. Instalar dependências Node
npm install

# 4. Gerar a chave da aplicação (só na primeira vez)
php artisan key:generate

# 5. Rodar as migrations
php artisan migrate
```

## Servidores de desenvolvimento

```bash
# Opção 1: tudo de uma vez (server + queue + logs + vite)
composer dev

# Opção 2: rodar manualmente em terminais separados
php artisan serve     # Laravel na porta 8000
npm run dev           # Vite na porta 5173
```

> Sempre acesse pelo `http://localhost:8000`. O Vite (porta 5173) roda nos bastidores.

## Banco de dados

```bash
# Rodar todas as migrations pendentes
php artisan migrate

# Reverter a última migration
php artisan migrate:rollback

# Reverter TUDO e rodar novamente
php artisan migrate:fresh

# Rodar migrations + seeders
php artisan migrate:fresh --seed

# Ver status das migrations
php artisan migrate:status
```

## Criando migrations

```bash
# Criar migration para nova tabela
php artisan make:migration create_livros_table

# Criar migration para alterar tabela existente
php artisan make:migration add_isbn_to_livros_table
```

## Criando models

```bash
# Criar model simples
php artisan make:model Livro

# Criar model + migration + factory + seeder
php artisan make:model Livro -mfs

# Criar model + migration + factory + seeder + controller com resource
php artisan make:model Livro -mfscr
```

## Criando controllers

```bash
# Controller simples
php artisan make:controller LivroController

# Controller com métodos CRUD (resource)
php artisan make:controller LivroController --resource
```

## Seeders (alimentar o banco)

```bash
# Criar um seeder
php artisan make:seeder LivroSeeder

# Rodar todos os seeders
php artisan db:seed

# Rodar um seeder específico
php artisan db:seed --class=LivroSeeder
```

## Factories (dados fictícios)

```bash
# Criar uma factory
php artisan make:factory LivroFactory
```

Exemplo de uso no seeder ou no Tinker:

```php
// Criar 50 livros fictícios
Livro::factory()->count(50)->create();
```

## Rotas

```bash
# Listar todas as rotas registradas
php artisan route:list

# Filtrar rotas por nome
php artisan route:list --name=livro
```

## Tinker (terminal interativo)

```bash
# Abrir o Tinker
php artisan tinker
```

Dentro do Tinker você pode testar qualquer código PHP/Laravel:

```php
// Buscar todos os usuários
User::all();

// Criar um registro
Livro::create(['titulo' => 'Dom Casmurro', 'autor' => 'Machado de Assis']);
```

## Cache e otimização

```bash
# Limpar cache geral
php artisan cache:clear

# Limpar cache de configuração
php artisan config:clear

# Limpar cache de rotas
php artisan route:clear

# Limpar tudo de uma vez
php artisan optimize:clear
```

## Testes

```bash
# Rodar todos os testes
php artisan test

# Rodar um teste específico
php artisan test --filter=NomeDoTeste
```

## Build para produção

```bash
# Build dos assets frontend
npm run build

# Build com SSR
npm run build:ssr
```

## Linting e formatação

```bash
# PHP — formatar com Pint
composer lint

# JS/TS — formatar com Prettier
npm run format

# JS/TS — verificar lint com ESLint
npm run lint
```
