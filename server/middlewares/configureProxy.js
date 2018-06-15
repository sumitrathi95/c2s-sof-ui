const proxy = require('express-http-proxy');
const chalk = require('chalk');

module.exports = (app) => {
  // Configure proxy
  const check = '✓';
  const cross = '✗';
  // Defaults
  const DEFAULT_API_ENDPOINT = 'http://localhost:8450';
  // Todo: Change to c2s api url
  const routes = [
    { route: '/c2s-sof-ui-api', url: 'http://localhost:8444' },
    { route: '/c2s-sof-api', url: process.env.API_ENDPOINT || DEFAULT_API_ENDPOINT },
  ];
  if (proxy) {
    console.log('proxy setup:');
    routes.forEach(({ route, url }) => {
      app.use(route, proxy(url));
      console.log(`\t ${route} -> ${url} ${(chalk && chalk.green(check)) || check}`);
    });
  } else {
    routes.forEach(({ route, url }) => {
      console.log(`\t ${route} -> ${url} ${(chalk && chalk.green(cross)) || cross}`);
    });
  }
};
