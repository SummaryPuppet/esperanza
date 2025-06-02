APP_NAME=esperanza 
APP_VERSION=0.1.0

dev:
	docker-compose up -d --build

build:
	npm run build

down:
	docker-compose down