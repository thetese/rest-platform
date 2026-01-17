#!/usr/bin/env bash
set -euo pipefail

npm --prefix apps/api install
npm --prefix apps/web install
npx prisma generate --schema prisma/schema.prisma
npx prisma migrate dev --name init --schema prisma/schema.prisma
npx ts-node prisma/seed.ts
