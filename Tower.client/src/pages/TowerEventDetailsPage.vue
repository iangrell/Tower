<template>
    <div class="container-fluid">
        <!-- SECTION EVENT DETAILS-->
        <section class="row text-light">
            <div class="col-12 justify-content-end">
                <button class="btn btn-outline-light">Edit Event</button>
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
                        <button class="btn btn-outline-light">Get Ticket</button>
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

        onMounted(() => {
            getTowerEventById()
        })

    return { 
        activeTowerEvent: computed(() => AppState.activeTowerEvent)
     }
    }
};
</script>


<style lang="scss" scoped>

</style>