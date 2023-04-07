import { commentsService } from "../services/CommentsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider";



export class TowerEventsController extends BaseController{
    constructor(){
        super('api/events')
        this.router
        .get('', this.getAllTowerEvents)
        .get('/:id', this.getTowerEventById)
        .get('/:id/comments', this.getComments)
        .get('/:id/tickets', this.getTicketsToEvent)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createTowerEvent)
        .put('/:id', this.editTowerEvent)
        .delete('/:id', this.cancelTowerEvent)
    }

    async getAllTowerEvents(req, res, next) {
        try {
            let towerEvents = await towerEventsService.getAllTowerEvents()
            return res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }

    async getTowerEventById(req, res, next) {
        try {
            let towerEventId = req.params.id
            let towerEvent = await towerEventsService.getTowerEventById(towerEventId)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async getComments(req, res, next) {
        try {
            let eventId = req.params.id
            let comments = await commentsService.getComments(eventId)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async createTowerEvent(req, res, next) {
        try {
            let towerEventData = req.body
            towerEventData.creatorId = req.userInfo.id
            let towerEvent= await towerEventsService.createTowerEvent(towerEventData)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async editTowerEvent(req, res, next) {
        try {
            let userId = req.userInfo.id
            let towerEventId = req.params.id
            let towerEventEdits = req.body
            let editedTowerEvent = await towerEventsService.editTowerEvent(towerEventId, towerEventEdits, userId)
            return res.send(editedTowerEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelTowerEvent(req, res, next) {
        try {
            let userId = req.userInfo.id
            let towerEventId = req.params.id
            let message = await towerEventsService.cancelTowerEvent(towerEventId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async getTicketsToEvent(req, res, next) {
        try {
            let eventId = req.params.id
            let tickets = await ticketsService.getTicketsToEvent(eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }
}