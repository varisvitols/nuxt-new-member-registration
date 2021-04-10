<template>
  <div class="page  page--overview">
    <h1 class="page__heading">Overview:</h1>

    <section class="page__content">
      <div class="data-list">
        <div v-for="item in dataList" :key="item.legend">
          <div v-if="!! item.data" class="data-list__row">
            <div class="data-list__legend">{{ item.legend }}</div>
            <div class="data-list__data">{{ item.data }}</div>
          </div>
        </div>
      </div>

      <a class="edit-data link" @click="openEditModal">Edit</a>
    </section>

    <footer class="page__buttons">
      <!-- <button class="button button--inverse" @click="$router.go(-1)">Back</button> -->
      <NuxtLink class="button  button--nuxtlink  button--inverse" to="/page2">Back</NuxtLink>
      <button class="button" >Submit</button>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data () {
    return {}
  },
  computed: {
    dataList(): object {
      const membership = this.$accessor.membership === '2' ? 'Premium' : 'Regular';
      return [
        { legend: 'First name:', data: this.$accessor.first_name },
        { legend: 'Last name:', data: this.$accessor.last_name },
        { legend: 'Email:', data: this.$accessor.email },
        { legend: 'Membership:', data: membership },
        { legend: 'Home Phone:', data: this.$accessor.phone_home },
        { legend: 'Work Phone:', data: this.$accessor.phone_work },
        { legend: 'Mobile Phone:', data: this.$accessor.phone_mobile },
        { legend: 'Main Phone:', data: this.$accessor.phone_main },
        { legend: 'Other Phone:', data: this.$accessor.phone_other }
      ]
    },
  },
  methods: {
    openEditModal: function(): void {
      this.$nuxt.$emit('openEditModal');
    }
  }
})
</script>

<style lang="scss">
  .page--overview {
    .page__heading {
      margin-bottom: 35px;
    }

    .data-list__row {
      display: flex;
      flex-direction: row;
      font: normal normal normal 18px/24px Roboto;
      margin-bottom: 20px;
    }

    .data-list__legend {
      width: 150px;
      font-weight: bold;
    }

    .edit-data{
      margin-top: -5px;
    }
  }
</style>
