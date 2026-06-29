-include .env
export

COMPOSE  := docker compose
NGINX    := reverse_nginx
DOMAINS  := martvanderzalm.com,www.martvanderzalm.com,knight.martvanderzalm.com

.PHONY: help quick pull up down restart ps logs nginx-reload nginx-test ssl bootstrap remote-quick remote-sync

help:
	@echo "Targets:"
	@echo "  make quick          Pull images, start stack, reload nginx  (daily deploy)"
	@echo "  make remote-quick   Sync deploy/ to server and run quick"
	@echo "  make bootstrap      First-time server setup"
	@echo "  make ssl            Issue/expand Let's Encrypt certificate"
	@echo "  make ps             Show running containers"
	@echo "  make logs           Follow all service logs"

quick: pull up
	@echo "Deploy complete."

pull:
	$(COMPOSE) pull

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart

ps:
	$(COMPOSE) ps

logs:
	$(COMPOSE) logs -f

nginx-test:
	docker exec $(NGINX) nginx -t

nginx-reload: nginx-test
	docker exec $(NGINX) nginx -s reload

bootstrap:
	mkdir -p certbot/www letsencrypt nginx/conf.d
	@test -f .env || cp .env.example .env
	$(COMPOSE) pull
	$(COMPOSE) up -d
	@echo "Run 'make ssl' if this is a new server, then 'make quick' after images are pushed."

ssl:
	$(COMPOSE) run --rm certbot certonly --webroot \
		-w /var/www/certbot \
		-d martvanderzalm.com \
		-d www.martvanderzalm.com \
		-d knight.martvanderzalm.com \
		--email $${CERTBOT_EMAIL} \
		--agree-tos \
		--no-eff-email \
		--expand
	$(MAKE) nginx-reload

remote-sync:
	@test -n "$(DEPLOY_HOST)" || (echo "Set DEPLOY_HOST in .env"; exit 1)
	@test -n "$(DEPLOY_PATH)" || (echo "Set DEPLOY_PATH in .env"; exit 1)
	rsync -avz --delete \
		--exclude letsencrypt \
		--exclude certbot/www \
		--exclude .env \
		./ $(DEPLOY_HOST):$(DEPLOY_PATH)/

remote-quick: remote-sync
	ssh $(DEPLOY_HOST) 'cd $(DEPLOY_PATH) && make quick'
