import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"



class CommentsService {

    async getComments(towerEventId) {
        const res = await api.get(`api/events/${towerEventId}/comments`)
        logger.log('getting comments from api', res.data)
        AppState.comments = res.data.map(c => new Comment(c))
        logger.log('Comments from AppState', AppState.comments)
    }

}

export const commentsService = new CommentsService()