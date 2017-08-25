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
  host: 'ec2-184-72-243-166.compute-1.amazonaws.com',
  port: 5432,
  database: 'dec7p1t5slgkct',
  user: 'zaeyncyawhxlia',
  password: 'f89d1c496f5a840680c5d2a8e455364e148818ff5bc62118a24f76cd02e2f615',
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





// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})
