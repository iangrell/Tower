<template>
    <form action="" @submit.prevent="createTowerEvent()">
        <div class="m-2">
            <input class="form-control" type="text" name="name" id="name" placeholder="Event Name" v-model="editable.name">
        </div>

        <div class="m-2">
            <input class="form-control" type="text" name="description" id="description" placeholder="Description" v-model="editable.description">
        </div>

        <div class="m-2">
            <input class="form-control" type="url" name="coverImg" id="coverImg" placeholder="Add an Event Image" v-model="editable.coverImg">
        </div>

        <div class="m-2">
            <input class="form-control" type="text" name="location" id="location" placeholder="Location" v-model="editable.location">
        </div>

        <div class="m-2">
            <input class="form-control" type="number" name="capacity" id="capacity" placeholder="Capacity" v-model="editable.capacity">
        </div>

        <div class="m-2">
            <input class="form-control" type="date" name="startDate" id="startDate" placeholder="Start Date" v-model="editable.startDate">
        </div>

        <div class="m-2">
            <label for="type">Select the Type of Event</label>
            <select class="form-select" name="type" id="type" v-model="editable.type">
                <option value="concert">Concert</option>
                <option value="sport">Sport</option>
                <option value="convention">Convention</option>
                <option value="digital">Digital</option>
            </select>
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
import { towerEventsService } from '../services/TowerEventsService.js';
import { useRouter } from 'vue-router';

export default {
    setup(){
        const editable = ref({})
        const router = useRouter()

        return { 
            editable,
            router,

            async createTowerEvent() {
                try {
                    const towerEventData = editable.value
                    const towerEvent = await towerEventsService.createTowerEvent(towerEventData)
                    router.push({name: 'TowerEventDetails', params: {towerEventId: towerEvent.id}})
                    editable.value = {}
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