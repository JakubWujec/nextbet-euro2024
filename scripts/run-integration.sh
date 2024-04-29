#   Load in any environment variables from .env so you have access to the database URL.
#   Start your Docker container in detached mode.
#   Wait for the database server to become available.
#   Run a Prisma migration to apply your Prisma schema to the database.
#   Run your integration tests. As a bonus, you should also be able to run this file with a --ui flag to run Vitest's GUI interface.

#!/usr/bin/env bash
# scripts/run-integration.sh


DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh
docker-compose up -d
echo '🟡 - Waiting for database to be ready...'

$DIR/wait-for-it.sh "${DATABASE_URL}" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
if [ "$#" -eq  "0" ]
  then
    vitest -c ./vitest.config.integration.ts
else
    vitest -c ./vitest.config.integration.ts --ui
fi