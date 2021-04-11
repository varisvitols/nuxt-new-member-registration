<template>
  <div class="page  page--personal">
    <h1 class="page__heading">Personal info</h1>
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
        
        <div v-for="(title, value) in phoneTypesSelected" :key="value">
          <PhoneInput
            :selectedValue="value"
            :selectedTitle="title"
            :phoneTypesRemaining="phoneTypesRemaining"
            @phoneTypeChanged="onPhoneTypeChange"
            @phoneNumberChanged="onPhoneNumberChange"
          />
        </div>

        <a class="link" 
          v-if="phoneTypesRemainingCount > 0"
          @click="onAddNewPhoneClick">
          + Add phone
        </a>
      </form>
    </section>

    <footer class="page__buttons">
      <NuxtLink class="button  button--nuxtlink" to="/form/membership">Continue</NuxtLink>
      <!-- <button class="button" @click="$router.push({ path: '/page2' })">Continue</button> -->
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PhoneInput from '../../components/PhoneInput.vue';

export default Vue.extend({
  components: {
    PhoneInput
  },

  data () {
    const allPhoneTypes: { [property: string]: string } = {
      phone_work: 'Work',
      phone_home: 'Home',
      phone_mobile: 'Mobile',
      phone_main: 'Main',
      phone_other: 'Other'
    }

    return {
      allPhoneTypes
    }
  },

  computed: {
    phoneTypesRemainingCount(): number {
      return Object.keys(this.phoneTypesRemaining).length
    },
    first_name: {
      get (): string { return this.$accessor.first_name },
      set (newData: string) { this.$accessor.updateFirstName(newData) }
    },
    last_name: {
      get (): string { return this.$accessor.last_name },
      set (newData: string) { this.$accessor.updateLastName(newData) }
    },
    email: {
      get (): string { return this.$accessor.email },
      set (newData: string) { this.$accessor.updateEmail(newData) }
    },
    phone_work: {
      get (): string { return this.$accessor.phone_work },
      set (newData: string) { this.$accessor.updatePhoneWork(newData) }
    },
    phone_home: {
      get (): string { return this.$accessor.phone_home },
      set (newData: string) { this.$accessor.updatePhoneHome(newData) }
    },
    phone_mobile: {
      get (): string { return this.$accessor.phone_mobile },
      set (newData: string) { this.$accessor.updatePhoneMobile(newData) }
    },
    phone_main: { 
      get (): string { return this.$accessor.phone_main },
      set (newData: string) { this.$accessor.updatePhoneMain(newData) }
    },
    phone_other: {
      get (): string { return this.$accessor.phone_other },
      set (newData: string) { this.$accessor.updatePhoneOther(newData) }
    },
    phoneTypesRemaining: {
      get (): object { return this.$accessor.phoneTypesRemaining },
      set (newData: object) { this.$accessor.updatePhoneTypesRemaining(newData) }
    },
    phoneTypesSelected: {
      get (): object { return this.$accessor.phoneTypesSelected },
      set (newData: object) { this.$accessor.updatePhoneTypesSelected(newData) }
    }
  },

  methods: {
    /**
     * Executed when a different Phone type is selected 
     * from the select dropdown.
     */
    onPhoneTypeChange(oldName: string, newName: string): void {
      this.rewritePhoneTypesRemaining(oldName, newName);
      this.rewritePhoneTypesSelected(oldName, newName);
    },

    /**
     * Adds a new input for Phone number.
     */
    onAddNewPhoneClick(): void {
      const newName: string = Object.keys(this.phoneTypesRemaining)[0];
      if (! newName){
        return;
      }

      this.rewritePhoneTypesRemaining(newName, null);
      this.rewritePhoneTypesSelected(null, newName);
    },

    /**
     * Rewrites the list of available phone types shown in Phone Type select dropdowns.
     */
    rewritePhoneTypesRemaining(oldName: string, newName: string | null = null): void {
      const newListOfRemainingPhoneTypes: { [ property: string ]: string } = {};
      const phoneTypesRemainingKeys: Array<string> = Object.keys(this.phoneTypesRemaining);
      
      if (newName){
        // oldName goes away, takes newNames place
        const newNamePosition: number = phoneTypesRemainingKeys.indexOf(newName);
        phoneTypesRemainingKeys.splice(newNamePosition, 1, oldName);
      } else {
        phoneTypesRemainingKeys.splice(0, 1);
      }

      phoneTypesRemainingKeys.forEach(element => {
        newListOfRemainingPhoneTypes[element] = this.allPhoneTypes[element];
      });

      this.phoneTypesRemaining = newListOfRemainingPhoneTypes;
    },

    /**
     * Rewrites the list of Phone types already in use.
     */
    rewritePhoneTypesSelected(oldName: string | null = null, newName: string): void {
      const newListOfPhoneTypesSelected: { [ property: string ]: string } = {};
      const phoneTypesSelectedKeys: Array<string> = Object.keys(this.phoneTypesSelected);

      if (oldName){
        const oldNamePosition = phoneTypesSelectedKeys.indexOf(oldName);
        phoneTypesSelectedKeys.splice(oldNamePosition, 1, newName);
      } else {
        phoneTypesSelectedKeys.push(newName);
      }

      phoneTypesSelectedKeys.forEach(element => {
        newListOfPhoneTypesSelected[element] = this.allPhoneTypes[element];
      });

      this.phoneTypesSelected = newListOfPhoneTypesSelected;
    },

    /**
     * Updates a Phone number of certain type.
     */
    onPhoneNumberChange(inputName: string, value: string): void {
      this[inputName] = value
    }
  }
})
</script>

<style lang="scss">
  .page--personal {
    .page__heading {
      margin-bottom: 35px;
    }

    .add-phone {
      margin-bottom: -10px;
    }

    .data-form {
      margin-bottom: 10px;
    }
  }
</style>
