const express = require('express')
const router = express.Router()
const axios = require('axios')
const Sequelize = require('sequelize')
const sequelize = new Sequelize("mysql://root:password@localhost/crm_db");

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })


//insert new customer to the dataBase
router.post('/new_customer', async (req, res) => {
  let ownerID
  let customerID
  let query = `Insert Into customer Values ('${req.body.customer_id}', '${req.body.first_name}', '${req.body.last_name}','${req.body.email}','${req.body.country}')`
  let result = await sequelize.query(query)
  try {
    ownerID = await axios.get(`http://localhost:4040/owner/${req.body.owner}`)
    customerID = await axios.get(`http://localhost:4040/customer/${req.body.first_name} ${req.body.last_name}`)
    let today = new Date()
    await axios.post(`http://localhost:4040/add_connection`, { connection_id: null, firstContactDate: getTodayDate(today), firstContactTime: getNowTime(today), emailType: 'A', sold: 0, customerID: customerID.data.customer_id, ownerID: ownerID.data.owner_id })
  } catch (e) {
    console.log(e);
    console.log('cant get owner');
  }

  if (result) {
    res.send(result[0][0])
  }
  else res.send('cant insert the customer')
})

//gets today date
function getTodayDate(today) {
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today
}

function getNowTime(today) {
  let h = today.getHours()
  let m = today.getMinutes()
  let s = today.getSeconds()
  let time = h + ':' + m + ':' + s;
  return time
}

//insert new owner to the dataBase
router.post('/owner', async (req, res) => {
  let query = `INSERT INTO owner VALUES (null, '${req.body.first_name}', '${req.body.last_name}')`
  let result = await sequelize.query(query)
  if (result) {
    res.send(result[0][0])
  }
  else res.send('cant insert the customer')
})

//add customer_owner_connection to the DB 
router.post('/add_connection', async (req, res) => {
  let query = `INSERT INTO customer_owner_connection VALUES (null, '${req.body.firstContactDate}', '${req.body.firstContactTime}','${req.body.emailType}',${req.body.sold},'${req.body.customerID}',${req.body.ownerID})`
  let result = await sequelize.query(query)
  if (result) {
    res.send(result[0][0])
  }
  else res.send('cant insert the customer')
})

//---------------------------------------------------------PUT-----------------------------------------------------

//upDates the customers value (name,surname,country)
router.put('/customer/data/:id', async (req, res) => {
  let { id } = req.params
  console.log(req.body.name);
  console.log(req.body.surename);
  console.log(req.body.country);
  query = `UPDATE customer 
  SET first_name='${req.body.name}',last_name='${req.body.surename}',country='${req.body.country}'
  WHERE customer_id='${id}'`
  let result = await sequelize.query(query)
  if (result) {
    res.send(result[0][0])
  }
  else res.send('cant insert the customer')
})

router.put('/update_customer_connection', async (req, res) => {
  let { customer_id, owner_id } = req.querya
  let query = `UPDATE customer_owner_connection
             SET emailType='${req.body.emailType}',sold='${req.body.updateSold}', ownerId='${req.body.updateOwner}'
             WHERE customerId='${customer_id}' AND ownerId=${owner_id}`
  try {
    let result = await sequelize.query(query)
    if (result) {
      res.send(result[0][0])
    }
  } catch (error) {
    console.log(error);
  }

})


//---------------------------------------------------------GET-----------------------------------------------------
//find owner by name
router.get('/owner/:name', async (req, res) => {
  let query = `SELECT owner_id FROM owner WHERE owner_first_name='${req.params.name}'`
  let result = await sequelize.query(query)
  if (result) {
    res.send(result[0][0])
  }
  else res.send('cant insert the customer')
})

//finds the customer by name
router.get('/customer/:name', async (req, res) => {
  let { name } = req.params
  let query = `SELECT customer_id FROM customer WHERE first_name='${name.split(" ")[0]}' AND last_name='${name.split(" ")[1]}'`
  let result = await sequelize.query(query)
  if (result) {
    res.send(result[0][0])
  }
  else res.send('cant find the customer')
})

//gets data by table name
router.get('/data/:tableName', async (req, res) => {
  let { tableName } = req.params
  let query
  switch (tableName) {
    case 'customer':
      query = `SELECT * FROM customer`
      break;
    case 'owner':
      query = `SELECT * FROM owner`
      break;
    case 'connection':
      query = `SELECT * FROM customer_owner_connection`
      break;
    case 'clientData':
      query = `SELECT customer.customer_id,customer.first_name,customer.last_name,customer.email,customer.country,customer_owner_connection.firstContactDate,customer_owner_connection.sold,owner.owner_first_name,owner.owner_last_name
      FROM customer_owner_connection
      JOIN customer
      ON customer_owner_connection.customerId=customer.customer_id
              JOIN owner
              ON customer_owner_connection.ownerId=owner.owner_id
              `
      break;
    default:
      console.log('cant find the what you looking for');
  }
  try {
    let result = await sequelize.query(query)
    if (result) {
      res.send(result[0])
    }
    else res.send('cant find the owner')
  } catch (error) {
    console.log(error);
  }
})


module.exports = router



// router.get('/data/filter/:name', async (req, res) => {
  //   query = `SELECT customer.customer_id,customer.first_name,
  //     customer.last_name,customer.email,customer.country,
  //     customer_owner_connection.firstContactDate,customer_owner_connection.sold,
  //     owner.owner_first_name,owner.owner_last_name
  //     FROM customer_owner_connection
  //     JOIN customer
  //     ON customer_owner_connection.customerId=customer.customer_id
  //     JOIN owner
//     ON customer_owner_connection.ownerId=owner.owner_id
//     LIMIT 20 AND ownerId=`
//   let result = await sequelize.query(query)
//   if (result) {
//     res.send(result[0][0])
//   }
//   else res.send('cant find the customer')
// })