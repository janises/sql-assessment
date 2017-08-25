const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive');

const mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json())
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
massive({
  host: //host,
  port: //port,
  database: //database,
  user: //user,
  password: //password,
  ssl:true
}).then( db => {
  app.set('db', db);

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('Vehicle table init');
    })
  })

})


// ===== Build endpoints below ============


app.get('/api/users', (req, res)=> {
  app.get('db').getAllUsers().then(users=> {
    res.status(200).send(users);
  })
})

app.get('/api/vehicles', (req, res)=> {
  app.get('db').getAllVehicles().then(vehicles=> {
    res.status(200).send(vehicles);
  })
})


app.post('/api/users', (req, res)=> {
  app.get('db').addUser([req.body.name, req.body.email]).then(users => {
    res.status(200).send(users);
  })
})

app.post('/api/vehicles', (req, res)=> {
  app.get('db').addVehicle([req.body.make, req.body.model, req.body.year, req.body.owner_id]).then(vehicles=> {
    res.status(200).send(vehicles);
  })
})

app.get('/api/user/:userId/vehiclecount', (req, res)=> {
  app.get('db').countVehiclesByUser(req.params.userId).then(count => {
    res.status(200).send(count);
  })
})

app.get('/api/user/:userId/vehicle', (req, res)=> {
  app.get('db').findAllVehiclesByUserId(req.params.userId).then(vehicles=> {
    res.status(200).send(vehicles);
  })
})

app.get('/api/vehicle', (req, res)=> {
  if(req.query.userEmail){
    app.get('db').findAllVehiclesByUser(req.query.userEmail).then(vehicles=> {
      res.status(200).send(vehicles);
    })
  } else if(req.query.userFirstStart) {
    app.get('db').findVehiclesByUserName(req.query.userFirstStart + "%").then(vehicles => {
      res.status(200).send(vehicles);
    })
  }
  
})

app.get('/api/newervehiclesbyyear', (req, res)=> {
  app.get('db').getVehiclesByYear().then(vehicles=> {
    res.status(200).send(vehicles)
  })
})


app.put('/api/vehicle/:vehicleId/user/:userId', (req, res)=> {
  app.get('db').changeOwnership([req.params.vehicleId, req.params.userId]).then(vehicles=> {
    res.status(200).send(vehicles);
  })
})

app.delete('/api/user/:userId/vehicle/:vehicleId', (req, res)=> {
  app.get('db').deleteOwnership([req.params.userId, req.params.vehicleId]).then(vehicles=> {
    res.status(200).send(vehicles);
  })
})

app.delete('/api/vehicle/:vehicleId', (req, res)=> {
  app.get('db').deleteVehicle(req.params.vehicleId).then(vehicles=> {
    res.status(200).send(vehicles);
  })
})


// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})
