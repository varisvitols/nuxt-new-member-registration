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
  methods: {
    proceedToNextPage: function(data): void {
      //alert(data);
      console.log(data);
      this.$router.push({
        path: '/page2'
      })
      // this.$nuxt.$options.router.push({
      //   path: '/page2'
      // })
    }
  },
  mounted () {
    this.$nuxt.$on('continueClicked', (data) => {
      this.proceedToNextPage(data)
    })
  }
})
</script>