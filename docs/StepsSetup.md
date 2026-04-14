# Setup no XAMPP

É totalmente viável. O projeto é Laravel + React/Inertia — tudo PHP puro no backend, sem nada que impeça rodar no XAMPP.

---

## O que o XAMPP já fornece

- **Apache** — serve os arquivos PHP
- **MySQL** — substitui o SQLite atual
- **PHP** — precisa ser **8.2+** (verifique sua versão do XAMPP)

## O que precisa instalar separado

- **Composer** — gerenciador de dependências PHP (não vem no XAMPP)
- **Node.js** — só para buildar o frontend uma vez (não precisa ficar rodando)

---

## Passo a passo

### 1. Verificar PHP do XAMPP

No painel do XAMPP, confirme que a versão do PHP é **8.2 ou superior**. Este projeto exige `"php": "^8.2"`.

### 2. Copiar o projeto

Coloque a pasta do projeto dentro de `htdocs/` do XAMPP:

```
C:\xampp\htdocs\library\
```

### 3. Configurar o Virtual Host

Laravel precisa que o Apache aponte para a pasta `public/`, não para a raiz do projeto. Edite `C:\xampp\apache\conf\extra\httpd-vhosts.conf` e adicione:

```apache
<VirtualHost *:80>
    ServerName library.local
    DocumentRoot "C:/xampp/htdocs/library/public"
    <Directory "C:/xampp/htdocs/library/public">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Adicione também a linha abaixo no arquivo `C:\Windows\System32\drivers\etc\hosts`:

```
127.0.0.1 library.local
```

Certifique-se também que o `mod_rewrite` está ativo no Apache — no `httpd.conf`, descomente a linha:

```
LoadModule rewrite_module modules/mod_rewrite.so
```

### 4. Instalar dependências PHP

```bash
composer install
cp .env.example .env
php artisan key:generate
```

### 5. Configurar `.env` para MySQL

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=library
DB_USERNAME=root
DB_PASSWORD=
```

> Crie o banco `library` no phpMyAdmin antes de rodar as migrations.

### 6. Rodar as migrations

```bash
php artisan migrate
```

### 7. Buildar o frontend

```bash
npm install
npm run build
```

Os assets estáticos são gerados em `public/build/` e servidos diretamente pelo Apache. Node.js não precisa ficar rodando.

---

## Resumo do que muda no dia a dia

| Antes (Artisan serve) | Com XAMPP |
|---|---|
| `php artisan serve` inicia o servidor | Apache do XAMPP já serve automaticamente |
| `npm run dev` para hot reload | `npm run build` uma vez (sem hot reload) |
| SQLite | MySQL via phpMyAdmin |

> O único ponto de atenção é que sem `npm run dev` você perde o hot reload — a cada mudança no frontend precisa rodar `npm run build` novamente. Para entregar ao professor isso não é problema.
