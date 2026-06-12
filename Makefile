.PHONY: install dev build lint format check test preview docker-up docker-down docker-build

install:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

format:
	npm run format

check:
	npm run check

test:
	npm run test

preview:
	npm run preview

docker-up:
	docker compose up

docker-down:
	docker compose down

docker-build:
	docker compose up --build