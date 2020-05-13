import { observable, action, computed } from 'mobx'
import { Customer } from './customer'
import { Owner } from './owner'
import { Connection } from './connection.js'

const axios = require('axios')

export class GeneralStore {
    @observable customersList = []
    @observable ownersList = []
    @observable connectionsList = []
    @observable monthlyNewClients = 0
    @observable totalEmails = 0
    @observable vipClients = 0 //made sale
    @observable hottestCountry = ' ' //country with the most sales
    @observable month = " "
    @observable countriesList = { Malaysia: 0, Israel: 0, Greece: 0, Croatia: 0, France: 0, Turkey: 0, Malta: 0, Romania: 0 }

    @action initCRM = async () => {
        await this.initCustomersList()
        await this.initOwnersLists()
        await this.initConnectionsLists()
        this.getMonth()
        this.updateHeader()

    }


    updateHeader(){
        this.total_Emails()
        this.monthly_New_Clients()
        this.vip_Clients()
        this.hottest_Country()
    }

    @action addCustomer = async (newCustomer) => {
        let customer = newCustomer
        try {
            await axios.post('http://localhost:4040/new_customer', customer)
            this.initCustomersList()
            this.updateHeader()
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
            this.updateHeader()
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
            this.updateHeader()
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

    @action updateClient = async (clientConnection) => {
        let customer = this.customersList.find(c => c.first_name === clientConnection.name.split(' ')[0] && c.last_name === clientConnection.name.split(' ')[1])
        let owner = this.ownersList.find(o => o.firstName === customer.owner.split(' ')[0] && o.lastName === customer.owner.split(' ')[1])
        clientConnection.updateOwner = this.ownersList.find(o => o.firstName === clientConnection.updateOwner.split(' ')[0] && o.lastName === clientConnection.updateOwner.split(' ')[1]).owner_id
        try {
            let response = await axios.put(`http://localhost:4040/update_customer_connection/?customer_id=${customer.customer_id}&owner_id=${owner.owner_id}`, clientConnection)
            console.log(response);
            this.initCustomersList()
            this.updateHeader()
        } catch (error) {
            console.log(error);
        }

    }

    @action getMonth() {
        let tempMonth = new Date()
        switch (tempMonth.getMonth() + 1) {
            case 1:
                this.month = 'January'
                break;
            case 2:
                this.month = 'February'
                break;
            case 3:
                this.month = 'March'
                break;
            case 4:
                this.month = 'April'
                break;
            case 5:
                this.month = 'May'
                break;
            case 6:
                this.month = 'June'
                break;
            case 7:
                this.month = 'July'
                break;
            case 8:
                this.month = 'August'
                break;
            case 9:
                this.month = 'September'
                break;
            case 10:
                this.month = 'October'
                break;
            case 11:
                this.month = 'November'
                break;
            case 12:
                this.month = 'December'
                break;
            default:
                break;
        }
    }

    @action total_Emails() {
        let counter = 0
        this.customersList.forEach(c => {
            counter += c.email ? 1 : 0
        })
        this.totalEmails = counter
    }

    @action monthly_New_Clients() {
        let counter = 0
        let tempMonth = new Date()
        this.customersList.forEach(c => {
            counter += c.firstContact.split('-')[1] == (tempMonth.getMonth() + 1) ? 1 : 0
        })
        this.monthlyNewClients = counter
    }

    @action vip_Clients() {
        let counter = 0
        this.customersList.forEach(c => {
            counter += c.sold ? 1 : 0
        })
        this.vipClients = counter
    }

    @action hottest_Country() {
        let biggest = ' '
        let countBiggest = 0
        this.customersList.forEach(c => {
            this.countriesList[c.country] += c.sold ? 1 : 0
            if (this.countriesList[c.country] > countBiggest)
            {
                biggest = c.country
                countBiggest=this.countriesList[c.country] 
            }
        })
        this.hottestCountry = biggest
    }


    @computed get totEmails(){
        return this.totalEmails
    }

}

