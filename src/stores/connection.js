import { observable } from 'mobx'


export class Connection {
    @observable connection_id
    @observable firstContactDate
    @observable firstContactTime
    @observable emailType
    @observable sold
    @observable customerId
    @observable ownerId


    constructor(connection_id, firstContactDate, firstContactTime, emailType, sold, customerId, ownerId) {
        this.connection_id = connection_id
        this.firstContactDate = firstContactDate
        this.firstContactTime = firstContactTime
        this.emailType = emailType
        this.sold = sold
        this.customerId = customerId
        this.ownerId = ownerId
    }
}