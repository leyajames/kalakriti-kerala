const localtunnel = require('C:/Users/hrishikesh t m/AppData/Local/npm-cache/_npx/75ac80b86e83d4a2/node_modules/localtunnel');

(async () => {
  try {
    const tunnel = await localtunnel({ 
      port: 3000, 
      local_host: '127.0.0.1',
      subdomain: 'kalakriti-thrissur-live' 
    });
    console.log('PUBLIC_URL:' + tunnel.url);
    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
    });
    setInterval(() => {}, 10000);
  } catch (err) {
    console.error('Error starting tunnel:', err);
  }
})();
