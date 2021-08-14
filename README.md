# next-fiveN1

The [fiven1-quick-look.vercel.app](https://fiven1-quick-look.vercel.app/) source code.

## Installation

```shell
$ npm install // pnpm install
```

## Usage

```shell
$ make dev
```

## Configuration

```shell
$ cp .env-example .env
```

For development, you need to provide `API_URL_DEV` as API URL, you can use [docker-fiveN1](https://github.com/neighborhood999/docker-fiveN1) running docker container in your localhost.

If you want to quick start, I create a [lambda](https://lambda-fiven1-jiepeng.vercel.app/api) API that you can make this as your `API_URL`.

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
