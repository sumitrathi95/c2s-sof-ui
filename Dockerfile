FROM node:8-alpine
ARG PACKAGE_VERSION
ENV WORKDIR /usr/local/c2s-sof-app
ENV API_ENDPOINT=''
WORKDIR $WORKDIR
COPY docker/package.json $WORKDIR/package.json
COPY build $WORKDIR/build
COPY server $WORKDIR/server
RUN npm version --allow-same-version $PACKAGE_VERSION
RUN npm install
ENTRYPOINT API_ENDPOINT=$API_ENDPOINT npm start
