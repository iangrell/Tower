import { AppState } from "../AppState.js"
import { TowerEvent } from "../models/TowerEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"




class TowerEventsService {

    async getAllTowerEvents() {
        const res = await api.get('api/events')
        logger.log('getting TowerEvents from api', res.data)
        AppState.towerEvents = res.data.map(t => new TowerEvent(t))
        logger.log('TowerEvents from appstate', AppState.towerEvents)
    }

    async getTowerEventById(towerEventId) {
        const res = await api.get(`api/events/${towerEventId}`)
        logger.log('getting TowerEvent by id', res.data)
        AppState.activeTowerEvent = new TowerEvent(res.data)
    }

}

export const towerEventsService = new TowerEventsService()