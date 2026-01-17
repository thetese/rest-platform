# Restaurant Management Platform

Production-ready Restaurant Management Platform (POS + Inventory + Finance + Analytics) built with Next.js, NestJS, Prisma, and PostgreSQL.

## Folder Structure
```
/apps/web
/apps/api
/prisma
/docker
/scripts
```

## Features
- POS orders with dine-in/takeaway/delivery
- Split bills, discounts, modifier support
- Payments with partials and idempotency keys
- Inventory movements and low stock alerts
- Purchasing and supplier tracking
- Profit reports and analytics
- Expenses and cashflow
- JWT auth + refresh tokens
- WebSocket kitchen display updates

## Setup (Local)
1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm --prefix apps/api install
   npm --prefix apps/web install
   ```
3. Generate Prisma client and migrate:
   ```bash
   npx prisma generate --schema prisma/schema.prisma
   npx prisma migrate dev --name init --schema prisma/schema.prisma
   ```
4. Seed data:
   ```bash
   npx ts-node prisma/seed.ts
   ```
5. Start API and Web:
   ```bash
   npm --prefix apps/api run start
   npm --prefix apps/web run dev
   ```

## Setup (Docker)
```bash
docker-compose up --build
```

## Demo Credentials
- Email: `admin@demo.com`
- Password: `password123`

## Example API Requests
1. Login
   ```bash
   curl -X POST http://localhost:4000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@demo.com","password":"password123"}'
   ```
   Response:
   ```json
   {"accessToken":"...","refreshToken":"...","user":{"id":"...","name":"Demo Admin","email":"admin@demo.com","role":"ADMIN"}}
   ```

2. Create Order
   ```bash
   curl -X POST http://localhost:4000/orders \
     -H "Content-Type: application/json" \
     -d '{"branchId":"demo-branch","type":"dine-in","tableNo":"4","items":[{"menuItemId":"demo-item","quantity":2}],"discount":1}'
   ```
   Response:
   ```json
   {"id":"...","status":"PENDING","total":18.98,"items":[{"name":"Classic Burger","quantity":2}]}
   ```

3. Record Payment
   ```bash
   curl -X POST http://localhost:4000/payments \
     -H "Content-Type: application/json" \
     -d '{"orderId":"ORDER_ID","method":"CASH","amount":10,"idempotencyKey":"offline-123"}'
   ```
   Response:
   ```json
   {"id":"...","amount":10,"method":"CASH"}
   ```

4. Inventory Movement
   ```bash
   curl -X POST http://localhost:4000/inventory/movements \
     -H "Content-Type: application/json" \
     -d '{"ingredientId":"INGREDIENT_ID","branchId":"demo-branch","type":"PURCHASE","quantity":10,"unitCost":4.5,"note":"Restock"}'
   ```
   Response:
   ```json
   {"id":"...","type":"PURCHASE","quantity":10}
   ```

5. Profit Summary
   ```bash
   curl http://localhost:4000/reports/profit?branchId=demo-branch
   ```
   Response:
   ```json
   {"revenue":0,"cogs":0,"grossProfit":0,"totalExpenses":0,"netProfit":0}
   ```

## Tests
- Backend: `npm --prefix apps/api run test`
- Frontend: `npm --prefix apps/web run test`
