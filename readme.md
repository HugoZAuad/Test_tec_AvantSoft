# test_avantsoft

## Descrição do Projeto

O **test_avantsoft** é uma API backend desenvolvida com NestJS, Prisma ORM e PostgreSQL para gerenciar produtos de forma estruturada. A aplicação implementa operações completas de CRUD, validação de dados com DTOs, interceptadores personalizados, autenticação via guard, e testes unitários e E2E. A arquitetura modular facilita o desenvolvimento escalável e manutenível.

---

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de APIs escaláveis com TypeScript.
- **Prisma ORM**: ORM para modelagem e consultas ao banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência de produtos.
- **Class-validator / Class-transformer**: Validação e transformação de dados via DTOs.
- **Jest + Supertest**: Frameworks para testes unitários e end-to-end.
- **Interceptors**: Validação de SKU e enriquecimento do retorno com letras ausentes.
- **Middleware**: Registro de requisições e tratamento de erros.
- **Guards**: Proteção de rotas com validação de token.

---

## Estrutura do Projeto

O projeto está organizado em módulos e camadas bem definidas:

- **ProductModule**: Gerencia criação, leitura, atualização e exclusão de produtos.
- **Interceptors**:
  - `MissingLetterInterceptor`: detecta a primeira letra ausente no nome do produto.
  - `UniqueSkuInterceptor`: valida SKU único na criação e atualização.
- **Middlewares**:
  - `LoggerMiddleware`: registra logs de requisição.
  - `ErrorHandlerMiddleware`: trata exceções não capturadas.
- **Guards**:
  - `AuthGuard`: bloqueia acesso à API sem token válido.
- **DTOs**:
  - `CreateProductDto` e `UpdateProductDto`: definem a estrutura e validação de entrada.

---

## Funcionamento do Sistema

1. **Autenticação com Guard**:
   - Requisições protegidas devem conter o header:
     ```http
     Authorization: Bearer mysecrettoken
     ```
2. **Criação de Produto (`POST /products`)**:
   - Valida campos obrigatórios: `name`, `price`, `sku`.
   - Verifica SKU único com o interceptor.
3. **Leitura de Produtos (`GET /products` e `GET /products/:id`)**:
   - Lista produtos ordenados por nome.
   - Retorna produto específico por ID.
4. **Atualização (`PUT /products/:id`)**:
   - Permite atualizar `name` e `price`.
   - Não permite alterar SKU.
5. **Exclusão (`DELETE /products/:id`)**:
   - Remove produto por ID.

---

## Banco de Dados

Utiliza PostgreSQL e Prisma para modelagem da entidade `Product`, com os seguintes campos:

- `id`: identificador único.
- `name`: nome do produto.
- `price`: valor numérico positivo.
- `sku`: string única por produto.
- `createdAt` / `updatedAt`: timestamps automáticos.

---

## Como Rodar o Projeto

1.  Clone o repositório.
2.  Configure as variáveis no `.env`:
    - `DATABASE_URL`: string de conexão PostgreSQL.
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Execute migrações e gere o cliente Prisma:
    ```bash
    npm run prisma:migrate
    npm run prisma:generate
    ```
5.  Inicie o servidor:

    ```bash
    npm run start:dev
    ```

6.  A API estará disponível em http://localhost:3000.

## 📡 Como Usar as Rotas da API

Abaixo estão exemplos práticos para cada operação disponível na API de produtos. As requisições podem ser feitas com Postman, Insomnia ou via `curl`.

### 🔐 Autenticação (Guard)

> Para acessar rotas protegidas, envie o cabeçalho:

```http
Authorization: Bearer mysecrettoken
```

## 📘 Criar Produto
**POST** /products

```
{
    "name": "Camiseta Básica",
    "price": 49.9,
    "sku": "CAM-001"
}

```
Headers:
```
Authorization: Bearer mysecrettoken
Content-Type: application/json
```

## 📚 Listar Todos os Produtos
**GET** /products
Headers:
```
Authorization: Bearer mysecrettoken
Content-Type: application/json
```

## 📄 Buscar Produto por ID
**GET** /products/:id
Headers:
```
Authorization: Bearer mysecrettoken
Content-Type: application/json
```

🖊️ Atualizar Produto
**PUT** /products/:id
```
{
  "name": "Camiseta Premium",
  "price": 59.9
}

```
Headers:
```
Authorization: Bearer mysecrettoken
Content-Type: application/json
```

## 🗑️ Remover Produto
**DELETE** /products/:id
Headers:
```
Authorization: Bearer mysecrettoken
Content-Type: application/json
```

## Testes

Localizados em \*.spec.ts dentro de tests/.
Simulam o comportamento do Prisma com jest.mock().

Para rodar:

```
npm run test           # Testes unitários
npm run test:cov       # Relatório de cobertura
```

## Validações

O campo sku é validado com UniqueSkuInterceptor.
O campo name é enriquecido com MissingLetterInterceptor.

Exemplo de retorno:

```
{
    "id": 1,
    "name": "Camisa",
    "price": 59.9,
    "sku": "CAMISA-01",
    "missingLetter": "b"
}
```

## Considerações Finais

Este projeto demonstra uma API modular e testável com NestJS e Prisma, ideal para gerenciamento de produtos com validação, interceptores inteligentes, segurança e cobertura completa de testes. Arquitetura limpa e boas práticas garantem escalabilidade e fácil manutenção.
