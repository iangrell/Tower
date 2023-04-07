import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { EventTicket } from "../models/TowerEvent.js"
import Pop from "../utils/Pop.js"



class TicketsService {

    async getTicketsToEvent(towerEventId) {
        const res = await api.get(`api/events/${towerEventId}/tickets`)
        logger.log('getting tickets from api', res.data)
        AppState.tickets = res.data.map(t => new Ticket(t))
        logger.log('Tickets from AppState', AppState.tickets)
    }

    async createTicket(eventId) {
        const res = await api.post('api/tickets', eventId)
        logger.log('Creating Ticket', res.data)
        AppState.tickets.push(new Ticket(res.data))
        AppState.eventTickets.push(new EventTicket(res.data))

    }

    async getMyTickets() {
        try {
            const res = await api.get('account/tickets')
            logger.log('Getting My Tickets', res.data)
            AppState.eventTickets = res.data.map(e => new EventTicket(e))
            logger.log('My Tickets from AppState', AppState.eventTickets)
        } catch (error) {
            logger.error(error.message)
            Pop.error(error.message)
        }
    }

    async cancelTicket(ticketId) {
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log('Canceling Ticket', res.data)
        AppState.eventTickets = AppState.eventTickets.filter(t => t.EventTicket != ticketId )
    }

}

export const ticketsService = new TicketsService()