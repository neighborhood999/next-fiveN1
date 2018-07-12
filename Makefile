PORT := 3000

.PHONY: all
all: build clean

.PHONY: build
build:
	docker build -t next-fiven1 .

.PHONY: run
run:
	docker run --rm -it -p $(PORT):3000 next-fiven1

.PHONY: clean
clean:
	@echo "\033[0;32mDelete all untagged/dangling (<none>) images...\033[0m"
	docker rmi `docker images -q -f dangling=true`
