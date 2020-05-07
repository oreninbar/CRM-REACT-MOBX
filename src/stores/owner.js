import { observable } from 'mobx'


export class Owner {
    @observable owner_id
    @observable firstName
    @observable lastName

    constructor(Id, firstName, lastName) {
        this.firstName = firstName
        this.lastName = lastName
        this.owner_id = Id
    }
}