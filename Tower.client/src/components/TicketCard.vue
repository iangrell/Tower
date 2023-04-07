<template>
    <div class="row my-2">
        <div class="col-2">
            <img class="ticket-img" :src="eventTicket.coverImg" :alt="eventTicket.name">
        </div>
        <div class="col-6 text-start bg-black">
            <div>{{ eventTicket.name }}</div>
            <div>{{ eventTicket.startDate }}</div>
            <div>{{ eventTicket.location }}</div>
        </div>
        <div class="col-4 bg-black d-flex align-items-center justify-content-center">
            <button class="btn btn-danger" @click="cancelTicket(eventTicket.EventTicket)">cancel ticket</button>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { EventTicket, TowerEvent } from '../models/TowerEvent.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { ticketsService } from '../services/TicketsService.js';
export default {

    props: {
        eventTicket: { type: EventTicket, required: true}
    },

    setup(){
    return { 

        async cancelTicket(ticketId) {
            try {
                logger.log(ticketId)
                if (await Pop.confirm('Are you sure you want to cancel your ticket?')) {
                    await ticketsService.cancelTicket(ticketId)
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

.ticket-img {
    height: 10vh;
    width: 10vh;
}

</style>