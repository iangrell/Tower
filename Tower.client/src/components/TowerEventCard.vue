<template>
    <router-link :to="{ name: 'TowerEventDetails', params: { towerEventId: towerEvent.id}}">
        <div class="elevation-3 rounded">
            <img class="img-fluid" :src="towerEvent.coverImg" :alt="towerEvent.name">
            <div class="p-2">
                <h5 class="text-warning">{{ towerEvent.name }}</h5>
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

    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

</style>