build-dev:
	docker-compose build

start-dev:
	docker-compose up

stop-dev:
	docker-compose down

enter-dev-bash:
	docker-compose run --rm backend bash

recreate-db:
	docker-compose down -v

kill-containers:
	docker rm $(docker stop $(docker ps -aq))

unsafe-docker-cleaning:
	docker system prune --all --force


