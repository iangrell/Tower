<template>
    <form action="" @submit.prevent="createComment()">
        <div class="m-2">
            <input class="form-control" type="text" name="body" id="body" placeholder="comment here..."
                v-model="editable.body">
        </div>
        <div class="text-end">
            <button class="btn btn-success" type="submit" data-bs-dismiss="modal">Submit</button>
        </div>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { commentsService } from '../services/CommentsService.js';
import { useRoute } from 'vue-router'

export default {
    setup() {
        const editable = ref({})
        const route = useRoute()

        return {
            editable,

            async createComment() {
                try {
                    const commentData = editable.value
                    commentData.eventId = route.params.towerEventId
                    await commentsService.createComment(commentData)
                } catch (error) {
                    logger.error(error.message)
                    Pop.error(error.message)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped></style>