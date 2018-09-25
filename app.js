const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


const Device = require('./models/device');


//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/my_database';
var mongoDB = 'mongodb://grin:grin123@ds161391.mlab.com:61391/grin-db';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/devices', function(req, res) {
  var query = Device.find({}, {"id":1, "name": 1, "address":1, "strength": 1, "created_at": 1});
  query.exec(function (err, devices) {
      if (err) {
        res.status(500).end();
      } else {
        res.json(devices)
      }
  });
});

app.post('/add', function(req, res) {
  // Construct Device object
  let device = new Device();
  device.name = req.body.name
  device.address = req.body.address
  device.strength = req.body.strength

  Device.findOneAndUpdate({ address: req.body.address }, { "updated_at": Date.now() },function (err, foundDevice) {
    if(err){
<<<<<<< HEAD
      console.log(err)
      res.status(500).end();
      return;
    }
    if(foundDevice) {
=======
      console.log(err);
      if(err.code === 11000){
        Device.findOne({ address: req.body.address }, function (err, device) {
          const resDevice = {
            "_id": device._id,
            "name": device.name,
            "address": device.address,
            "strength": device.strength,
            "created_at": device.created_at,
          }
          res.json(resDevice)
        });
      } else {
        res.status(500).end();
      }
    } else {
>>>>>>> 84d45bae72c31539eec08346d13529a8091fbfa9
      const resDevice = {
        "_id": foundDevice._id,
        "name": foundDevice.name,
        "address": foundDevice.address,
        "strength": foundDevice.strength,
        "created_at": foundDevice.updated_at,
      }
      res.json(resDevice)
    } else {
      device.save(function(err,savedDevice){
        const resDevice = {
          "id": savedDevice.id,
          "name": savedDevice.name,
          "address": savedDevice.address,
          "strength": savedDevice.strength,
          "created_at": savedDevice.updated_at,
        }
        res.json(resDevice)
      });
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
