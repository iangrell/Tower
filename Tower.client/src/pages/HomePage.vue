<template>
    <div class="container-fluid">
        <!-- SECTION Home page img -->
        <section class="row home-page align-items-center">
          <div class="col-3 text-light">
            <h4>Get ahead of the scalpers. Reserve your seat now with real events for real people.</h4>
          </div>
        </section>

        <!-- SECTION TowerEvents filter bar -->
        <section class="row justify-content-center p-3">
          <div class="col-12 bg-danger p-2 rounded">
            <div class="d-flex justify-content-evenly">
              <button class="btn btn-outline-light" @click="changeFilterType('')">All</button>
              <button class="btn btn-outline-light" @click="changeFilterType(t)" v-for="t in types">{{ t.toUpperCase() }}</button>
            </div>
          </div>
        </section>

        <!-- SECTION TowerEvents cards -->
        <section class="row justify-content-center p-3">
          <div class="col-md-3 p-3" v-for="t in towerEvents" :key="t.id">
            <TowerEventCard :towerEvent="t"/>
          </div>
        </section>
    </div>
  
</template>

<script>
import { onMounted, ref } from 'vue';
import { towerEventsService } from '../services/TowerEventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';

export default {
  setup() {

    const filterType = ref('')

    const types = ["concert", "sport", "convention", "digital"]

    async function getAllTowerEvents() {
      try {
        await towerEventsService.getAllTowerEvents()
      } catch (error) {
        logger.error(error.message)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getAllTowerEvents()
    })

    return {
      types,

      towerEvents: computed(() => {
        if(!filterType.value) {
          return AppState.towerEvents
        } else { return AppState.towerEvents.filter(t => t.type == filterType.value)}
      }),

      changeFilterType(type) {
        filterType.value = type
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.home-page {
  background-image: url("https://media.istockphoto.com/id/1440928369/photo/a-crowded-concert-hall-with-scene-stage-in-red-lights-rock-show-performance-with-people.jpg?b=1&s=170667a&w=0&k=20&c=bQW3W8KHGhlM89shSIbt13RJ732VI8Pq0-nnO03A7so=");
  height: 45vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
