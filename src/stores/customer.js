import { observable } from 'mobx'


export class Customer {
    @observable customer_id
    @observable first_name
    @observable last_name
    @observable email
    @observable country
    @observable firstContact
    @observable sold
    @observable owner


    constructor(id, firstName, lastName, firstContact, email, country, sold, owner) {
        this.customer_id = id ? id : this.generatId()
        this.first_name = firstName
        this.last_name = lastName
        this.email = email
        this.country = country
        this.sold = sold
        this.owner = owner
        this.firstContact = firstContact
    }

    generatId() {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }


}