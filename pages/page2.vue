<template>
  <div class="page  page--membership">
    <h1 class="page__heading">Membership</h1>
    <section class="page__content">

      <form class="data-form" action="">
        <div class="radio-boxes">
          <label class="radio-container">Regular
            <input type="radio" checked="checked" name="radio" 
              value="1" v-model="membership"
              @change="onMembershipChanged($event.target.value)">
            <span class="checkmark"></span>
          </label>
          <label class="radio-container">Premium
            <input type="radio" name="radio"
              value="2" v-model="membership"
              @change="onMembershipChanged($event.target.value)">
            <span class="checkmark"></span>
          </label>
        </div>
      </form>

      <div v-if="membership == 1" class="membership-description">
        <p><strong>Regular</strong> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,...</p>
      </div>

      <div v-if="membership == 2" class="membership-description">
        <p><strong>Regular 2</strong> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
      </div>
    </section>

    <footer class="page__buttons">
      <button class="button button--inverse" @click="$router.go(-1)">Back</button>
      <button class="button" @click="onContinueTap">Continue</button>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    const membership: number = 1

    return {
      membership
    }
  },
  methods: {
    onMembershipChanged: function(value: string): void {
      console.log('value', value);
    },

    onContinueTap: function(): void {
      this.$nuxt.$emit('continueClicked', 'continue data');
    }
  }
})
</script>

<style lang="scss">
  .page--membership {
    .page__heading {
      margin-bottom: 35px;
    }

    .radio-boxes {
      width: 40%;
    }

    .membership-description {
      font: normal normal normal 18px/24px Roboto;
    }
  }
</style>
