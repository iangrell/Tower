



export class Comment {
    constructor(data) {
        this.id = data.id
        this.creatorId = data.creatorId
        this.creator = data.creator ? new Profile(data.creator) : null
        this.towerEventId = data.eventId
        this.body = data.body
        this.isAttending = data.isAttending
    }
}