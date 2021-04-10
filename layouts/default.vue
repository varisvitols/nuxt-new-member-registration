<template>
  <div>
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
    return {}
  },
  // keeping to myself as a reference
  // mounted () {
  //   this.$nuxt.$on('continueClicked', (data) => {
  //     console.log(data)
  //   })
  // }
})
</script>