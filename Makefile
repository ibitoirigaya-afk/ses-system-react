.PHONY: install up down build restart logs shell test lint format check preview clean

COMPOSE=docker compose
SERVICE=react

install:
	npm install

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

build:
	$(COMPOSE) up -d --build

restart:
	$(COMPOSE) down
	$(COMPOSE) up -d

logs:
	$(COMPOSE) logs -f

shell:
	$(COMPOSE) exec $(SERVICE) sh

test:
	$(COMPOSE) exec $(SERVICE) npm run test

lint:
	$(COMPOSE) exec $(SERVICE) npm run lint

format:
	$(COMPOSE) exec $(SERVICE) npm run format

check:
	$(COMPOSE) exec $(SERVICE) npm run check

preview:
	$(COMPOSE) exec $(SERVICE) npm run preview

clean:
	$(COMPOSE) down -v