import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"



class TicketsService {
    
    async deleteTicket(ticketId, userId) {
        let ticket = await dbContext.Tickets.findById(ticketId)

        if (ticket == null) {
            throw new BadRequest('This ticket does not exist.')
        }

        if (userId != ticket.accountId) {
            throw new Forbidden('You can not delete this ticket.')
        }

        await ticket.remove()
        return 'Your ticket has been deleted.'
    }

    async getTicketsToEvent(eventId) {
        let tickets = await dbContext.Tickets.find({eventId})
        .populate("profile", 'name picture')
        return tickets
    }

    async createTicket(ticketData) {
        const towerEvent = await towerEventsService.getTowerEventById(ticketData.eventId)

        if (towerEvent.isCanceled == true) {
            throw new BadRequest('This event has been canceled.')
        }

        let ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate({
            path: "towerEvent",
            populate: {
                path: "creator ticketCount"
            }
        })
        await ticket.populate("profile")
        return ticket
    }

}

export const ticketsService = new TicketsService()