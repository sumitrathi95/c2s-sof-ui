FROM node:8.9.3
ARG PACKAGE_VERSION
ENV WORKDIR /usr/local/ocp
WORKDIR $WORKDIR
COPY docker/package.json $WORKDIR/package.json
COPY build $WORKDIR/build
COPY server $WORKDIR/server
RUN npm version --allow-same-version $PACKAGE_VERSION
RUN npm install
ENTRYPOINT npm start
