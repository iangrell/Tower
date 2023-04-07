import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"



class CommentsService {

    async getComments(towerEventId) {
        const res = await api.get(`api/events/${towerEventId}/comments`)
        logger.log('getting comments from api', res.data)
        AppState.comments = res.data.map(c => new Comment(c))
        logger.log('Comments from AppState', AppState.comments)
    }

    async createComment(commentData) {
        const res = await api.post('api/comments', commentData)
        logger.log('Creating Comment', res.data)
        AppState.comments.push(new Comment(res.data))
    }

    async deleteComment(commentId) {
        const res = await api.delete('api/comments', commentId)
        logger.log('Deleting comment', res.data)
    }

}

export const commentsService = new CommentsService()