help: ## View all make targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
	| sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

stop: ## Stop the container stack
	@echo "Stopping all containers..."
	docker compose stop && docker compose down

build: ## Build the container stack
	@echo "Building containers..."
	docker compose build

start: ## Start the container stack
	@echo "Starting up containers..."
	make build && docker compose up -d

start_debug: ## Start the container stack
	@echo "Starting up containers..."
	docker compose build --progress=plain && docker compose up

clean: ## Clean out unused docker(-compose) files
	@echo "Removing unused docker files..."
	docker system prune -af

update: ## Update repository to latest version
	@echo "Updating repository to latest version..."
	@echo "Warning: This will shutdown all containers."
	make stop && git fetch && git pull
