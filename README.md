# Reading List — Programação para Internet III

Projeto desenvolvido para a disciplina de **Programação para Internet III** do curso de graduação, com foco no estudo do framework **Laravel** e no ecossistema **PHP** para desenvolvimento web fullstack.

---

## Stack utilizada

| Camada | Tecnologia |
|---|---|
| Linguagem backend | PHP 8.2 |
| Framework backend | Laravel 12 |
| Gerenciador de dependências PHP | Composer |
| Integração frontend/backend | Inertia.js 2 |
| Framework frontend | React 19 |
| Linguagem frontend | TypeScript |
| Componentes de UI | Shadcn UI (Radix UI) |
| Estilização | Tailwind CSS 4 |
| Bundler | Vite |
| Banco de dados | MySQL (via XAMPP) |
| Autenticação | Laravel Fortify + Sanctum |

---

## Funcionalidades

- Cadastro e autenticação de usuários
- Upload de foto de perfil
- Gerenciamento de lista de leitura pessoal (livros)
- Paginação de registros

---

## Como rodar o projeto

### Pré-requisitos

Antes de começar, instale e configure:

1. **XAMPP** com PHP 8.2 — [https://www.apachefriends.org](https://www.apachefriends.org)
2. **Composer** para Windows — [https://getcomposer.org/download/](https://getcomposer.org/download/) (`Composer-Setup.exe`)
3. **Node.js 24 LTS** — [https://nodejs.org/en/download](https://nodejs.org/en/download) (`Windows Installer`)
4. Reinicie o PC para que o shell reconheça as instalações

Inicie o **MySQL** pelo painel do XAMPP antes de prosseguir.

---

### Instalação

Clone o repositório dentro da pasta `htdocs` do XAMPP e acesse o diretório:

```bash
cd C:/xampp/htdocs
git clone <url-do-repositorio> reading-list-laravel
cd reading-list-laravel
```

**1. Instalar dependências PHP**

```bash
composer install --no-dev --ignore-platform-reqs
```

**2. Configurar o ambiente**

Copie o arquivo de exemplo e edite as variáveis:

```bash
cp .env.example .env
```

No `.env`, ajuste as credenciais do banco de dados e a URL da aplicação:

```env
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=reading_list
DB_USERNAME=root
DB_PASSWORD=
```

**3. Gerar a chave da aplicação**

```bash
php artisan key:generate
```

**4. Executar as migrations**

```bash
php artisan migrate
```

**5. Instalar dependências Node**

```bash
npm install
```

**6. Compilar os assets frontend**

```bash
npm run build
```

**7. Popular o banco com dados iniciais**

```bash
php artisan db:seed
```

**8. Criar o link simbólico para o storage**

```bash
php artisan storage:link
```

**9. Iniciar o servidor**

```bash
php artisan serve
```

Acesse a aplicação em [http://localhost:8000](http://localhost:8000).

---

### Comandos úteis

| Comando | Descrição |
|---|---|
| `php artisan migrate:fresh --seed` | Recria o banco do zero e alimenta com seeds |
| `php artisan db:seed` | Executa apenas os seeders |
| `php artisan migrate` | Executa apenas as migrations pendentes |
