docker run -it --rm \
    -p 5432:5432 \
    --name pg-fitdiary \
    -e POSTGRES_PASSWORD=p9X#mK2$qL7@vF3nR8 \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v $PWD/../server-pgdata/pgdata:/var/lib/postgresql/data \
    postgres:17
