<template>
  <div class="about text-center text-light">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <section class="row justify-content-center p-3 text-light">
    <div class="col-md-12 text-center" v-if="account.id && eventTickets.length">
      <h3>My Tickets</h3>
      <div class="row">
        <div class="col-md-6" v-for="e in eventTickets" :key="e.id">
          <TicketCard :eventTicket="e"/>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { ticketsService } from '../services/TicketsService.js'
export default {
  setup() {

    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets()
      } catch (error) {
        logger.error(error.message)
        Pop.getVForSourceType(error.message)
      }
    }

    onMounted(() => {
      getMyTickets()
    })

    return {
      account: computed(() => AppState.account),
      eventTickets: computed(() => AppState.eventTickets),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
