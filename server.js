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
// Using MIDDLEWARE
app.use(express.static(path.join(__dirname, 'client/dist/client')));
app.use('/uploadfile', uploadImage);

// cors allow usage of server from different origin only for development
app.use(cors())


// Catch all other routes request and return it to the index.html
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'))
});


// Start server, listen to port 3000
const port = serverConfig.dev.PORT || '3000'
app.listen(port, () => console.log(serverConfig.general.welcome_text));
}

catch (error) {
  console.error(error);
  console.log('Application could not be started!!!')
}