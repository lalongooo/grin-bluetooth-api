const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Device = require('./models/device');
const port = process.env.PORT || 8080;

const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());



//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
var mongoDB = 'mongodb://grin:grin123@ds161391.mlab.com:61391/grin-db';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/devices', function(req, res) {
  var query =
  Device.find({}, "id name address strength updatedAt", function (err, devices) {
    if (err) {
      res.status(500).end();
    } else {
      res.json(devices.map(function(device){
        console.log(device);
        const resDevice = {
          "_id": device._id,
          "name": device.name,
          "address": device.address,
          "strength": device.strength,
          "created_at": device.updatedAt,
        }
        return resDevice;
      }));
    }
  });
});

app.post('/add', function(req, res) {
  // Construct Device object
  let device = new Device();
  device.name = req.body.name
  device.address = req.body.address
  device.strength = req.body.strength

  Device.findOneAndUpdate(
    { address: req.body.address },
    { "updatedAt": Date.now() },
    { new: true },
    function (err, foundDevice) {
      if(err){
        console.log(err)
        res.status(500).end();
        return;
      }
      if(foundDevice) {
        console.log(foundDevice);
        const resDevice = {
          "_id": foundDevice._id,
          "name": foundDevice.name,
          "address": foundDevice.address,
          "strength": foundDevice.strength,
          "created_at": foundDevice.updatedAt,
        }
        res.json(resDevice)
      } else {
        device.save(function(err,savedDevice){
          const resDevice = {
            "_id": savedDevice.id,
            "name": savedDevice.name,
            "address": savedDevice.address,
            "strength": savedDevice.strength,
            "created_at": savedDevice.updatedAt,
          }
          res.json(resDevice)
        });
      }
  });
});

app.listen(port, () => console.log(`Grin Bluetooth API app listening on port ${port}!`))
