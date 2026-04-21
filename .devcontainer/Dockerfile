FROM buildpack-deps:trixie-curl

ENV TZ=America/Sao_Paulo

ENV LANG=pt_BR.UTF-8
ENV LANGUAGE=pt_BR.UTF-8
ENV LC_ALL=pt_BR.UTF-8

RUN apt-get update -y && \
    apt-get install sudo git starship vim locales locales-all bash-completion -y && \
    rm -rf /var/lib/apt/lists/*

RUN groupadd -g 1000 dev && \
    useradd -m -u 1000 -s /bin/bash -g dev dev && \
    passwd -d dev

RUN echo "dev ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
