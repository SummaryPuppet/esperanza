APP_NAME=esperanza 
APP_VERSION=0.1.0

dev:
	uv pip freeze > requirements.txt
	docker-compose up -d --build

build:
	npm run build

down:
	docker-compose down