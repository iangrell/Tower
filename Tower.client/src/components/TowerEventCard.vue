<template>
    <router-link :to="{ name: 'TowerEventDetails', params: { towerEventId: towerEvent.id } }">
        <div class="elevation-3 rounded">
            <img class="img-fluid" :src="towerEvent.coverImg" :alt="towerEvent.name">
            <div class="row p-2 d-flex justify-content-between">
                <div><h5 class="text-light">{{ towerEvent.name }} </h5>
                </div>
                <div><b v-if="towerEvent.isCanceled == true"
                        class="bg-danger p-1 rounded">CANCELED</b>
                </div>
            </div>
        </div>
    </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { TowerEvent } from '../models/TowerEvent.js';
export default {

    props: {
        towerEvent: { type: TowerEvent, required: true }
    },

    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped></style>