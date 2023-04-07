import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors"




class TowerEventsService{
    
    
    
    
    async getAllTowerEvents() {
        const towerEvents = await dbContext.TowerEvents.find()
        .populate("creator", 'picture name')
        // TODO may need to populate for ticket count
        return towerEvents
    }

    async getTowerEventById(towerEventId) {
        const towerEvent = await dbContext.TowerEvents.findById(towerEventId)
        .populate("creator", 'picture name')
        if(towerEvent == null) {
            throw new BadRequest('This Tower Event does not exist')
        }
        return towerEvent
    }

    async createTowerEvent(towerEventData) {
        const towerEvent = await dbContext.TowerEvents.create(towerEventData)
        await towerEvent.populate("creator", 'picture name')
        return towerEvent
    }

    async editTowerEvent(towerEventId,  towerEventEdits, userId) {
        let towerEvent = await this.getTowerEventById(towerEventId)
        if(towerEvent.creatorId != userId) {
            throw new Forbidden('You do not have permission to edit this Tower Event')
        }
        if(towerEvent.isCanceled == true) {
            throw new BadRequest(`Tower Event: ${towerEvent.name} has been canceled.`)
        }
        towerEvent.name = towerEventEdits.name ? towerEventEdits.name : towerEvent.name
        towerEvent.description = towerEventEdits.description ? towerEventEdits.description : towerEvent.description
        towerEvent.coverImg = towerEventEdits.coverImg ? towerEventEdits.coverImg : towerEvent.coverImg
        towerEvent.location = towerEventEdits.location ? towerEventEdits.location : towerEvent.location
        towerEvent.capacity = towerEventEdits.capacity ? towerEventEdits.capacity : towerEvent.capacity
        towerEvent.startDate = towerEventEdits.startDate ? towerEventEdits.startDate : towerEvent.startDate
        towerEvent.type = towerEventEdits.type ? towerEventEdits.type : towerEvent.type
        
        await towerEvent.save()
        return towerEvent
    }

    async cancelTowerEvent(towerEventId, userId) {
        let towerEvent = await this.getTowerEventById(towerEventId)
        if(towerEvent.creatorId != userId) {
            throw new Forbidden(`You do not have permission to cancel this Tower Event: ${towerEvent.name}.`)
        }
        if(towerEvent.isCanceled == true) {
            throw new Forbidden(`Tower Event: ${towerEvent.name} has already been canceled.`)
        }
        towerEvent.isCanceled = true
        await towerEvent.save()
        return `Tower Event: ${towerEvent.name} has been successfully canceled.`
    }

    

}

export const towerEventsService = new TowerEventsService()