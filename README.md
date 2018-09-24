# Grin Bluetooth API

Simple API to create/retrieve bluetooth devices. Accessed from: https://grin-bluetooth-api.herokuapp.com/

### Add a bluetooth device
```shell
POST /add HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
   "name":"device1",
   "address":"00:11:22:33:FF:EE",
   "strength":"-20db",
}
```

It will return the newly created device (or the existing if the `address` already exists)

``` json
 {
    "id":"123",
    "name":"device1",
    "address":"00:11:22:33:FF:EE",
    "strength":"-20db",
    "created_at":"2018-09-24T04:36:15.020Z"
 }
```

### List bluetooth devices
```
GET /devices
```

``` json
[
   {
      "_id":"123",
      "name":"device1",
      "address":"00:11:22:33:FF:EE",
      "strength":"-20db",
      "created_at":"2018-09-24T04:36:15.020Z"
   },
   {
      "_id":"456",
      "name":"device1",
      "address":"00:44:55:66:FF:EE",
      "strength":"-20db",
      "created_at":"2018-09-24T04:42:49.705Z"
   }
]
```
