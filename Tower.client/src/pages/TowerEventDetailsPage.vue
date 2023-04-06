<template>
    <div class="container-fluid">
        <!-- SECTION EVENT DETAILS-->
        <section class="row text-light">
            <div class="col-12 justify-content-end">
                <button v-if="activeTowerEvent.creatorId == account.id && activeTowerEvent.isCanceled == false" class="btn btn-outline-danger m-1" @click="cancelTowerEvent()">Cancel Event</button>

                <!-- NOTE Edit button not required, I think, I hope -->
                <!-- <button v-if="activeTowerEvent.creatorId == account.id && activeTowerEvent.isCanceled == false" class="btn btn-outline-light m-1">Edit Event</button> -->

            </div>
            <div class="col-md-4 p-3">
                <img class="img-fluid" :src="activeTowerEvent.coverImg" :alt="activeTowerEvent.name">
            </div>
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-6">
                        <h3>{{ activeTowerEvent.name }}</h3>
                        <h5>{{ activeTowerEvent.location }}</h5>
                    </div>
                    <div class="col-md-6">
                        <h5>{{ activeTowerEvent.startDate }}</h5>
                    </div>
                    <div class="col-12">
                        <p>{{ activeTowerEvent.description }}</p>
                    </div>
                    <div class="col-md-6">
                        <h6>{{ activeTowerEvent.capacity }} available tickets</h6>
                    </div>
                    <div class="col-md-6">
                        <button v-if="activeTowerEvent.isCanceled == false" class="btn btn-outline-light">Get Ticket</button>
                    </div>
                    <div v-if="activeTowerEvent.isCanceled == true" class="col-md-12 text-center bg-danger">
                        <h3>Tower Event Canceled</h3>
                    </div>

                </div>
            </div>
        </section>

        <!-- SECTION TICKET HOLDERS -->
        <section class="row"></section>

        <!-- SECTION COMMENTS -->
        <section class="row"></section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { commentsService } from '../services/CommentsService.js'

export default {
    setup(){
        const route = useRoute()

        async function getTowerEventById() {
            try {
                const towerEventId = route.params.towerEventId
                await towerEventsService.getTowerEventById(towerEventId)
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }

        async function getComments() {
            try {
                const towerEventId = route.params.towerEventId
                await commentsService.getComments(towerEventId)
            } catch (error) {
                logger.error(error.message)
                Pop.error(error,message)
            }
        }

        onMounted(() => {
            getTowerEventById()
            getComments()
        })

    return { 
        route,

        activeTowerEvent: computed(() => AppState.activeTowerEvent),
        comments: computed (() => AppState.comments),
        account: computed(() => AppState.account),

        async cancelTowerEvent() {
            try {
                if (await Pop.confirm('Do you want to cancel this Tower Event?')) {
                    await towerEventsService.cancelTowerEvent()
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

</style>