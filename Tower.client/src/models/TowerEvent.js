import { Profile } from "./Account.js"



export class TowerEvent{
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.creator = data.creator ? new Profile(data.creator) : null
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate).toLocaleString()
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.ticketCount = data.ticketCount || 0
    }
}

export class EventTicket extends TowerEvent {
    constructor(data) {
        super(data.event)
        this.EventTicket = data.id
    }
}