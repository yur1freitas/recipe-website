FROM node:24.12.0-trixie-slim

ENV TZ=America/Sao_Paulo

ENV LANG=pt_BR.UTF-8
ENV LANGUAGE=pt_BR.UTF-8
ENV LC_ALL=pt_BR.UTF-8

SHELL ["/bin/bash", "-c"]

RUN apt-get update -y && \
    apt-get install git fish vim locales locales-all -y && \
    rm -rf /var/lib/apt/lists/*

RUN npm i corepack@latest --global && \
    corepack enable pnpm && \
    corepack install pnpm@10.28.0 --global
