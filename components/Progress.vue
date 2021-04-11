<template>
  <header class="progress">
    <div class="progress__item"
      :class="firstItemClass">
      <div class="progress__item-number">1</div>
      <div class="progress__item-text">Personal info</div>
    </div>
    <div class="progress__item"
      :class="secondItemClass">
      <div class="progress__item-number">2</div>
      <div class="progress__item-text">Membership</div>
    </div>
    <div class="progress__item"
      :class="thirdItemClass">
      <div class="progress__item-number">3</div>
      <div class="progress__item-text">Overview</div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data () {
    const currentRouteName: string = 'index';
    const pathList: { [property: string]: number } = {
      'form-contact-info': 1,
      'form-membership': 2,
      'form-overview': 3
    }
    return {
      currentRouteName,
      pathList
    }
  },

  computed: {
    getCurrentRoute(): number {
      return this.pathList[this.currentRouteName]
    },
    // Could have made progress item as a component,
    // which would allow for automatic style generation for them,
    // but for application this simple that kind of approach would be overkill
    firstItemClass(): string {
      return this.getCurrentRoute > 1
        ? 'progress__item--done'
        : 'progress__item--active'
    },
    secondItemClass(): string {
      return this.getCurrentRoute > 2
        ? 'progress__item--done'
        : (this.getCurrentRoute == 2 ? 'progress__item--active' : '')
    },
    thirdItemClass(): string {
      return this.getCurrentRoute > 3
        ? 'progress__item--done'
        : (this.getCurrentRoute == 3 ? 'progress__item--active' : '')
    }
  },
  
  watch: {
    '$route.name': function(routeName){
      this.currentRouteName = routeName
    }
  }
})
</script>