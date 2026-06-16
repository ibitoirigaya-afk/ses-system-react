.PHONY: up down build restart logs ps shell install test lint format check

COMPOSE=docker compose
SERVICE=react

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

ps:
	$(COMPOSE) ps

shell:
	$(COMPOSE) exec $(SERVICE) sh

install:
	$(COMPOSE) exec $(SERVICE) npm install

test:
	$(COMPOSE) exec $(SERVICE) npm run test

lint:
	$(COMPOSE) exec $(SERVICE) npm run lint

format:
	$(COMPOSE) exec $(SERVICE) npm run format

check:
	$(COMPOSE) exec $(SERVICE) npm run check