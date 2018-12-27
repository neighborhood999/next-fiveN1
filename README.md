# next-fiveN1
![next.js](https://flat.badgen.net/badge/zeit/next.js/black)
![hosted on now](https://flat.badgen.net/badge/hosted%20on/now/black)
![docker](https://flat.badgen.net/badge//docker?icon=docker)

The [fiven1-quick-look.now.sh](https://fiven1-quick-look.now.sh/) source code.

## Installation

```shell
$ yarn install
```

## Configuration

```shell
$ cp .env-example .env
```

For development, you need to provide `API_URL_DEV` as API URL, you can use [docker-fiveN1](https://github.com/neighborhood999/docker-fiveN1) running docker container in your localhost.

If you want to quick start, I create the lambda API [lambda-fiven1.now.sh](https://lambda-fiven1.now.sh/), you can make this as your `API_URL_DEV`.

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
