FROM debian:13.2-slim

ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=24.11.1

SHELL ["/bin/bash", "-c"]

RUN apt update -y && \  
    apt install git sudo curl fish vim ca-certificates -y && \
    git config --global core.editor vim

RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc && \
    chmod a+r /etc/apt/keyrings/docker.asc

RUN tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/debian
Suites: $(. /etc/os-release && echo "$VERSION_CODENAME")
Components: stable
Signed-By: /etc/apt/keyrings/docker.asc
EOF

RUN apt update && \ 
    apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y


RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

RUN . $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION --latest-npm && \
    nvm alias default $NODE_VERSION && \
    nvm use default 

ENV NODE_PATH=$NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm i corepack@latest --global && \ 
    corepack enable pnpm && \
    corepack install pnpm@latest --global