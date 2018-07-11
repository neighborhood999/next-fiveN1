PORT := 3000

all: build clean
.PHONY: all

build:
	docker build -t next-fiven1 .
.PHONY: build

run:
	docker run --rm -it -p $(PORT):3000 next-fiven1
.PHONY: run

clean:
	@echo "\033[0;32mDelete all untagged/dangling (<none>) images...\033[0m"
	docker rmi `docker images -q -f dangling=true`
.PHONY: clean
