import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";




export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createTicket)
        .delete('/:ticketId', this.deleteTicket)
    }

    async createTicket(req, res, next) {
        try {
            let ticketData = req.body
            ticketData.accountId = req.userInfo.id
            let ticket = await ticketsService.createTicket(ticketData)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(req, res, next) {
        try {
            let ticketId = req.params.id
            let userId = req.userInfo.id
            let message = await ticketsService.deleteTicket(ticketId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}