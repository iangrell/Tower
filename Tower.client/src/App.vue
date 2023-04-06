<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>

  <Modal id="towerEventModal">
    <template #header>
      <div>Create Event</div>
    </template>

    <template #modalGuts>
      <TowerEventForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Modal from './components/Modal.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Modal },
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}

body {
  background-color: rgb(29, 27, 27);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
