import { Profile } from "./Account.js";




export class Ticket extends Profile {
    constructor(data) {
        super(data.profile)
        this.ticketId = data.id
    }
}