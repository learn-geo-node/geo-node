up-dev:
	docker-compose up

build-dev:
	docker-compose build

app-bash:
	docker-compose run --rm backend bash

down:
	docker-compose down

kill-all:
	docker rm $(docker stop $(docker ps -aq))

kill-containers:
	docker-compose down -v

recreate-db:
	docker-compose down -v