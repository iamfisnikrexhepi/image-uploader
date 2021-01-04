// Call all required packages
const express = require('express')
const cors = require('cors');
const path = require('path')
const serverConfig = require('./server/config/server.config.json');

// Getting our UploadImage route;
const uploadImage = require('./server/routes/upload.image.route');


//CREATE EXPRESS APP
const app = express();

try {
  // Cors allow usage of server from different origin only for development.
  app.use(cors());

  // Using MIDDLEWARE
  app.use(express.static(path.join(__dirname, 'client/dist/client')));
  app.use('/uploadfile', uploadImage);

  // Catch all routes that has slash, to surve in this case the uploaded image.
  app.get('/*', function (req, res) {
    const imageParam = req.params[0];
    res.sendFile(path.join( `${process.env.HOME || process.env.USERPROFILE}/downloads/${imageParam}`))
  });

  // Catch all other routes request and return it to the index.html.
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'))
  });


  // Handle 404 - Keep this as a last route
app.use(function(req, res, next) {
  res.status(500);
  res.send('404: File Not Found');
});

  // Start server, listen to specific port.
  const port = serverConfig.dev.PORT || '3000'
  app.listen(port, () => console.log(serverConfig.general.welcome_text));
}

catch (error) {
  console.error(error);
  console.log('Application could not be started !!!')
}