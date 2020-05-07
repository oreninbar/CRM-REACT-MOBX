import { observable, action, computed } from 'mobx'
import { Customer } from './customer'
import { Owner } from './owner'
import { Connection } from './connection.js'

const axios = require('axios')

export class GeneralStore {
    @observable customersList = []
    @observable ownersList = []
    @observable connectionsList = []




    @action addCustomer = async (newCustomer) => {
        let customer = newCustomer
        try {
            await axios.post('http://localhost:4040/new_customer', customer)
            this.initCustomersList()
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    }

    @action initCustomersList = async () => {
        try {
            const response = await axios.get('http://localhost:4040/data/clientData')
            response.data.forEach(element => {
                this.customersList.push(new Customer(element.customer_id, element.first_name, element.last_name, element.firstContactDate, element.email, element.country, element.sold, element.owner_first_name + " " + element.owner_last_name))
            });
        } catch (error) {
            console.error(error);
        }
    }

    @action initOwnersLists = async () => {
        try {
            const response = await axios.get('http://localhost:4040/data/owner')
            response.data.forEach(element => {
                this.ownersList.push(new Owner(element.owner_id, element.owner_first_name, element.owner_last_name))
            });

        } catch (error) {
            console.log(error);
        }

    }
    @action initConnectionsLists = async () => {
        try {
            const response = await axios.get('http://localhost:4040/data/connection')
            response.data.forEach(element => {
                this.connectionsList.push(new Connection(element.connection_id, element.firstContactDate, element.firstContactTime, element.emailType, element.sold, element.customerId, element.ownerId))
            });
        } catch (error) {
            console.log(error);
        }

    }

    @action getClientById = (id) => {
        let customer = this.findCustomerById(id)
        return customer
    }

    @action updateClientByID = async (id, data) => {
        let customer = await this.findCustomerById(id)
        customer.first_name = data.name
        customer.last_name = data.surname
        customer.country = data.country
        try {
            const response = await axios.put(`http://localhost:4040/customer/data/${id}`, data)
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }


    @action findCustomerById(id) {
        let customer = this.customersList.find(i => i.customer_id === id)
        return customer
    }

    @action findOwnerByName(ownerName) {
        let customer = this.ownersList.find(i => i.customer_id === ownerName)
        return customer
    }




    @action updateClient = async(clientConnection) => {
        let customer = this.customersList.find(c => c.first_name === clientConnection.name.split(' ')[0] && c.last_name === clientConnection.name.split(' ')[1])
        let owner = this.ownersList.find(o => o.firstName === customer.owner.split(' ')[0] && o.lastName === customer.owner.split(' ')[1])
        
        clientConnection.updateOwner=this.ownersList.find(o => o.firstName === clientConnection.updateOwner.split(' ')[0] && o.lastName === clientConnection.updateOwner.split(' ')[1]).owner_id

        try {
            let response = await axios.put(`http://localhost:4040/update_customer_connection/?customer_id=${customer.customer_id}&owner_id=${owner.owner_id}`,clientConnection)
            console.log(response);
            this.initCustomersList()
        } catch (error) {
            console.log(error);
        }

    }

}

// http://localhost:4040/update_customer_connection/?customer_id=lyRfFh&owner_id=4
        // let connection = this.connectionsList.find(c => c.customerId === customer.customer_id && c.ownerId === owner.owner_id)
        // console.log(connection);
        // console.log(connection.connection_id);
        // connection.emailType = clientConnection.emailType
        // connection.sold = clientConnection.updateSold
        // connection.ownerId = owner.owner_id