const express = require('express')
const app = express()
const api = require('./server/routes/api.js')
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.use('/', api)

const PORT = 4040

app.listen(process.env.PORT || PORT, () => {
    console.log(`Running on port ${PORT}`);
})


/*
const usersData = require('./dataUsers.json')

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



const loadData = async () => {
    for (let user of usersData) {
        let query1 = `INSERT INTO customer VALUES ('${user._id}', '${user.name.split(" ")[0]}', '${user.name.split(" ")[1]}','${user.email}','${user.country}')`
        let query2 = `SELECT * FROM owner WHERE owner_first_name='${user.owner.split(" ")[0]}' AND owner_last_name='${user.owner.split(" ")[1]}'`
        try {
            await sequelize.query(query1)
            let result = await sequelize.query(query2)
            if (!result[0][0]) {
                let query3 = `INSERT INTO owner VALUES (null, '${user.owner.split(" ")[0]}', '${user.owner.split(" ")[1]}')`
                await sequelize.query(query3)
            }
        } catch{
            console.log('inserting to owner and customer');
        }

        let query3 = `SELECT owner_id FROM owner WHERE owner_first_name='${user.owner.split(" ")[0]}' AND owner_last_name='${user.owner.split(" ")[1]}'`
        let query4 = `SELECT customer_id FROM customer WHERE first_name='${user.name.split(" ")[0]}' AND last_name='${user.name.split(" ")[1]}'`
        let result3 = await sequelize.query(query3)
        let result4 = await sequelize.query(query4)

        let o_id = result3[0][0].owner_id
        let c_id = result4[0][0].customer_id
        let contactDate = user.firstContact.split('T')[0]
        let contactTime = user.firstContact.split('T')[1].split('.')[0]
        let email = user.emailType
        let sold = user.sold

        try {
            let query = `INSERT INTO customer_owner_connection (connection_id,firstContactDate,firstContactTime,emailType,sold,customerId,ownerId) 
        VALUES (null,'${contactDate}','${contactTime}',' ${email}',${sold},'${c_id}','${o_id}')`
            result = await sequelize.query(query)
        } catch (result) {
            console.log('cant insert to the customer_owner_connection');
        }

    }
}

loadData()

*/
