import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { towerEventsService } from "./TowerEventsService.js"




class CommentsService {
    
    async getComments(eventId) {
        const comments = await dbContext.Comments.find({eventId})
        .populate("creator", 'picture name')
        return comments
    }

    async createComment(commentData) {
        let towerEvent = await towerEventsService.getTowerEventById(commentData.eventId)
        if(towerEvent.isCanceled == true) {
            throw new Forbidden(`Tower Event ${towerEvent.name} has been canceled, you can not comment on it.`)
        }
        let comment = await dbContext.Comments.create(commentData)
        await comment.populate("creator", 'picture name')
        return comment
    }

    async deleteComment(commentId, userId) {
        let comment = await dbContext.Comments.findById(commentId)
        if(comment == null) {
            throw new BadRequest('This comment does not exist.')
        }
        if(userId != comment.creatorId) {
            throw new Forbidden('You do not have authority to delete this comment.')
        }
        await comment.remove()
        return `This comment has been deleted.`
        
    }

}

export const commentsService = new CommentsService()