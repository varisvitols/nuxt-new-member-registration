<template>
  <div class="modal">
    <div class="modal__content-wrapper">
      <div class="modal__content">

        <div class="page  page--personal">
          <h1 class="page__heading">Review Your Data</h1>
          
          <section class="page__content">
            <form class="data-form" action="">
              <div class="input-group">
                <label for="first_name">First name</label>
                <input type="text"
                  name="first_name" 
                  id="first_name" 
                  v-model="first_name"
                >
              </div>
              <div class="input-group">
                <label for="last_name">Last name</label>
                <input type="text"
                  name="last_name" 
                  id="last_name" 
                  v-model="last_name"
                >
              </div>
              <div class="input-group">
                <label for="email">Email</label>
                <input type="email"
                  name="email" 
                  id="email" 
                  v-model="email"
                >
              </div>

              <div class="radio-boxes">
                <label class="radio-container">Regular Membership
                  <input type="radio" name="radio" 
                    value="1" v-model="membership">
                  <span class="checkmark"></span>
                </label>
                <label class="radio-container">Premium Membership
                  <input type="radio" name="radio"
                    value="2" v-model="membership">
                  <span class="checkmark"></span>
                </label>
              </div>
              
              <div v-for="(title, value) in phoneTypesSelected" :key="value">
                <SimplePhoneInput
                  :selectedValue="value"
                  :selectedTitle="title"
                  :phoneTypesRemaining="phoneTypesRemaining"
                  @phoneNumberChanged="onPhoneNumberChange"
                />
              </div>
            </form>
          </section>

          <footer class="page__buttons">
            <button class="button" @click="closeEditModal">Update Data</button>
          </footer>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data () {
    return {}
  },
  computed: {
    first_name: {
      get (): string { return this.$accessor.first_name },
      set (newData) { this.$accessor.updateFirstName(newData) }
    },
    last_name: {
      get (): string { return this.$accessor.last_name },
      set (newData) { this.$accessor.updateLastName(newData) }
    },
    email: {
      get (): string { return this.$accessor.email },
      set (newData) { this.$accessor.updateEmail(newData) }
    },
    phone_work: {
      get (): string { return this.$accessor.phone_work },
      set (newData) { this.$accessor.updatePhoneWork(newData) }
    },
    phone_home: {
      get (): string { return this.$accessor.phone_home },
      set (newData) { this.$accessor.updatePhoneHome(newData) }
    },
    phone_mobile: {
      get (): string { return this.$accessor.phone_mobile },
      set (newData) { this.$accessor.updatePhoneMobile(newData) }
    },
    phone_main: { 
      get (): string { return this.$accessor.phone_main },
      set (newData) { this.$accessor.updatePhoneMain(newData) }
    },
    phone_other: {
      get (): string { return this.$accessor.phone_other },
      set (newData) { this.$accessor.updatePhoneOther(newData) }
    },
    phoneTypesRemaining: {
      get (): object { return this.$accessor.phoneTypesRemaining },
      set (newData) { this.$accessor.updatePhoneTypesRemaining(newData) }
    },
    phoneTypesSelected: {
      get (): object { return this.$accessor.phoneTypesSelected },
      set (newData) { this.$accessor.updatePhoneTypesSelected(newData) }
    },
    membership: {
      get (): string { return this.$accessor.membership },
      set (newData) { this.$accessor.updateMembership(newData) }
    }
  },
  methods: {
    onPhoneNumberChange: function(inputName: string, value: string) :void {
      this[inputName] = value
    },
    
    closeEditModal: function(): void {
      this.$nuxt.$emit('closeEditModal');
    }
  }
})
</script>