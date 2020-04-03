# next-fiveN1

The [fiven1-quick-look.now.sh](https://fiven1-quick-look.now.sh/) source code.

## Installation

```shell
$ yarn install
```

## Usage

```shell
$ yarn run dev
```

## Configuration

```shell
$ cp .env-example .env
```

For development, you need to provide `API_URL_DEV` as API URL, you can use [docker-fiveN1](https://github.com/neighborhood999/docker-fiveN1) running docker container in your localhost.

If you want to quick start, I create the [lambda-fiven1.now.sh](https://lambda-fiven1.now.sh/) lambda API, you can make this as your `API_URL`.

## Docker

> Make sure your have install [Docker](https://www.docker.com/).

Build Docker Image:
```shell
$ make
```

Running Docker Container:
```shell
$ make run
```

Open `http://localhost:3000` in your browser.

## LICENSE

MIT © [Peng Jie](https://github.com/neighborhood999)
