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
      <NuxtLink class="button  button--nuxtlink  button--inverse" to="/form/membership">Back</NuxtLink>
      <button class="button" @click="onSubmitClick" :class="{ 'button--disabled': processing }">Submit</button>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data () {
    const processing: boolean = false;
    return {
      processing
    }
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
    postData(): object {
      const membership = this.$accessor.membership === '2' ? 'Premium' : 'Regular';
      return {
        first_name: this.$accessor.first_name,
        last_name: this.$accessor.last_name,
        email: this.$accessor.email,
        membership,
        phone_home: this.$accessor.phone_home,
        phone_work: this.$accessor.phone_work,
        phone_mobile: this.$accessor.phone_mobile,
        phone_main: this.$accessor.phone_main,
        phone_other: this.$accessor.phone_other,
      }
    }
  },

  methods: {
    openEditModal: function(): void {
      this.$nuxt.$emit('openEditModal');
    },
    async onSubmitClick(): Promise<void> {
      if (this.processing) {
        return;
      }

      this.processing = true;

      try {
        await this.$axios.$post('/api/record', this.postData);
        alert('Success!');
      } catch (error) {
        console.log(`Axios failed posting to the API with error: ${error}`);
        alert('Could not post form data right now. Please try again later.');
      } finally {
        this.processing = false;
      }
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
      margin-bottom: 20px;
    }

    .data-list__legend {
      min-width: 150px;
      font-weight: bold;
    }

    .edit-data{
      margin-top: -5px;
    }
  }
</style>