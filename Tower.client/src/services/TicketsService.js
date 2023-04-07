import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"



class TicketsService {

    async getTicketsToEvent(towerEventId) {
        const res = await api.get(`api/events/${towerEventId}/tickets`)
        logger.log('getting tickets from api', res.data)
        AppState.tickets = res.data.map(t => new Ticket(t))
        logger.log('Tickets from AppState', AppState.tickets)
    }

}

export const ticketsService = new TicketsService()