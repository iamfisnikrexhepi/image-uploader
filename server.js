// Call all required packages
const express = require('express')
const cors = require('cors');
const serverConfig = require('./server/config/server.config.json');
const path = require('path');

// Getting our routes
const routes = require('./server/routes/route-importer');


//CREATE EXPRESS APP
const app = express();

try {
  // Using MIDDLEWARE
  app.use(express.static(path.join(__dirname, 'client/dist/client')));

  // Cors allow usage of server from different origin only for development.
  app.use(cors());


  app.use('/api', routes);

  // Serve client views
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'))
  });

  // Start server, listen to specific port.
  const port = serverConfig.dev.PORT || '3000'
  app.listen(port, () => console.log(serverConfig.general.welcome_text));
}

catch (error) {
  console.error(error);
  console.log('Application could not be started !!!')
}