docker run -it --rm \
    -p 5432:5432 \
    --name pg-fitdiary \
    -e POSTGRES_PASSWORD=Gbplslfvofc123 \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v $PWD/../server-pgdata/pgdata:/var/lib/postgresql/data \
    postgres:17
