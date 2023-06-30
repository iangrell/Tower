<template>
    <div class="container-fluid">
        <!-- SECTION EVENT DETAILS-->
        <section class="row m-2 text-light">
            <div class="col-12 justify-content-end">
                <button v-if="activeTowerEvent.creatorId == account.id && activeTowerEvent.isCanceled == false" class="btn btn-danger m-1" @click="cancelTowerEvent()">Cancel Event</button>

                

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
                        <button v-if="activeTowerEvent.isCanceled == false && activeTowerEvent.capacity > 0 && !ticketHolder && account.id" class="btn btn-outline-light" @click="createTicket()">Get Ticket</button>
                    </div>
                    <div v-if="activeTowerEvent.isCanceled == true" class="col-md-12 text-center bg-danger">
                        <h3>Tower Event Canceled</h3>
                    </div>
                    <div v-if="activeTowerEvent.capacity <= 0" class="col-md-12 text-center bg-warning">
                        <h3>Tower Event Sold Out</h3>
                    </div>

                </div>
            </div>
        </section>

        <!-- SECTION TICKET HOLDERS -->
        <section class="row m-2">
            <div>
                <h4 class="text-light">Attending:</h4>
            </div>
                <div class="col-md-2 bg-dark rounded p-1 text-center" v-for="t in tickets" :key="t.id">
                    <img class="img-fluid rounded-circle" :src="t.picture" :alt="t.name">
                    <p class="text-center text-light">{{ t.name }}</p>
                </div>
            </section>

        <!-- SECTION COMMENTS -->
        <section class="row m-2 justify-content-center">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-6 text-light">
                        <p>What are people saying</p>
                    </div>
                    <div class="col-6 text-end text-success">
                        <p>Join the conversation</p>
                    </div>
                    <div class="col-12 text-center">
                        <!-- <textarea name="createComment" id="createComment" cols="145" rows="4"></textarea>
                        <button class="btn btn-outline-success">post comment</button> -->
                        <button v-if="account.id" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#commentModal">Create Comment</button>
                    </div>
                    <!-- SECTION COMMENT CARD -->
                    <div class="col-12 my-3" v-for="c in comments" :key="c.id">
                        <CommentCard :comment="c"/>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <Modal id="commentModal">
    <template #header>
      <div>Create Comment</div>
    </template>

    <template #modalGuts>
      <CommentForm />
    </template>

  </Modal>
</template>

<!-- NOTE Edit button not required, I think, I hope , LINE-8 -->
                <!-- <button v-if="activeTowerEvent.creatorId == account.id && activeTowerEvent.isCanceled == false" class="btn btn-outline-light m-1">Edit Event</button> -->


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { commentsService } from '../services/CommentsService.js'
import { ticketsService } from '../services/TicketsService.js'

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

        async function getTicketsToEvent() {
            try {
                const towerEventId = route.params.towerEventId
                await ticketsService.getTicketsToEvent(towerEventId)
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }

        async function getComments() {
            try {
                const towerEventId = route.params.towerEventId
                logger.log('TOWER EVENT ID!!!',towerEventId)
                await commentsService.getComments(towerEventId)
            } catch (error) {
                logger.error(error.message)
                Pop.error(error,message)
            }
        }

        onMounted(() => {
            getTowerEventById()
            getComments()
            getTicketsToEvent()
        })

    return { 
        route,

        activeTowerEvent: computed(() => AppState.activeTowerEvent),
        comments: computed (() => AppState.comments),
        account: computed(() => AppState.account),
        tickets: computed(() => AppState.tickets),

        ticketHolder: computed(() => AppState.tickets.find(t => t.id == AppState.account.id)),

        async cancelTowerEvent() {
            try {
                if (await Pop.confirm('Do you want to cancel this Tower Event?')) {
                    await towerEventsService.cancelTowerEvent()
                }
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        },

        async createTicket() {
            try {
                await ticketsService.createTicket({eventId: route.params.towerEventId})
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }
    }
    },
    // components: { Modal },
};
</script>


<style lang="scss" scoped>

</style>