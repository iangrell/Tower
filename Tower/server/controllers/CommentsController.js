import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";




export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        .delete('/:commentId', this.deleteComment)
    }

    async createComment(req, res, next) {
        try {
            let commentData = req.body
            commentData.creatorId = req.userInfo.id
            let comment = await commentsService.createComment(commentData)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(req, res, next) {
        try {
            let userId = req.userInfo.id
            let commentId = req.params.commentId
            let message = await commentsService.deleteComment(commentId, userId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }
}