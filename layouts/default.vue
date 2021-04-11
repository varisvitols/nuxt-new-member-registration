<template>
  <div>
    <Modal v-if="displayModal" />
    <div class="container">
      <Progress />
      <Nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    const displayModal: boolean = false;

    return {
      displayModal
    }
  },
  
  mounted () {
    this.$nuxt.$on('openEditModal', () => {
      this.displayModal = true;
      document.body.style.overflow = 'hidden';
    }),
    this.$nuxt.$on('closeEditModal', () => {
      this.displayModal = false;
      document.body.style.overflow = '';
    })
  }
})
</script>