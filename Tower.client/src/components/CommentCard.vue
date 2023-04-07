<template>
    <div class="row">
        <div class="col-2">
            <img class="comment-img" :src="comment?.creator?.picture" :alt="comment?.creator?.name">
        </div>
        <div class="col-8 bg-white">
            <h5>{{ comment?.creator?.name }}</h5>
            <p>{{ comment?.body }}</p>
        </div>
        <div class="col-2">
            <button v-if="comment.creatorId == account.id" class="btn btn-danger" @click="deleteComment(comment.id)">delete comment</button>
        </div>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';
import { useRoute } from 'vue-router';
export default {
    props: {
        comment:{ type: Comment, required: true}
    },

    setup(){
        const route = useRoute()

    return { 

        comments: computed(() => AppState.comments),
        account: computed(() => AppState.account),

        async deleteComment(commentId) {
            try {
                if (await Pop.confirm('Do you want to delete this comment?')) {
                    // TODO not sure how to grab this comment
                    // const commentId = route.params.commentId
                    await commentsService.deleteComment(commentId)
                }
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }
        
     }
    }
};
</script>


<style lang="scss" scoped>

.comment-img {
    height: 7vh;
    widows: 7vh;
    border-radius: 50%;
}

</style>