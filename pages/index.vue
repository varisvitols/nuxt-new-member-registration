<template>
  <div class="page  page--personal">
    <h1 class="page__heading">Personal info</h1>
    <div class="page__content">

      <form class="data-form" action="">
        <div class="input-group">
          <label for="first_name">First name</label>
          <input type="text"
            name="first_name" 
            id="first_name" 
            v-model="data.first_name"
          >
        </div>
        <div class="input-group">
          <label for="last_name">Last name</label>
          <input type="text"
            name="last_name" 
            id="last_name" 
            v-model="data.last_name"
          >
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="text"
            name="email" 
            id="email" 
            v-model="data.email"
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

        <a class="add-phone" 
          v-if="phoneTypesRemainingCount > 0"
          @click="onAddNewPhoneClick">
          + Add phone
        </a>
      </form>

      <button class="button" @click="onContinueTap">Continue</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PhoneInput from '../components/PhoneInput.vue';

export interface FormData {
  first_name?: string,
  last_name?: string,
  email?: string,
  phone_home?: string,
  phone_work?: string,
  phone_mobile?: string,
  phone_main?: string,
  phone_other?: string,
}

export default Vue.extend({
  components: {
    PhoneInput
  },

  data () {
    const data: FormData = {}

    const allPhoneTypes: object = {
      phone_work: 'Work',
      phone_home: 'Home',
      phone_mobile: 'Mobile',
      phone_main: 'Main',
      phone_other: 'Other'
    }

    const phoneTypesRemaining: object = {
      phone_mobile: 'Mobile',
      phone_main: 'Main',
      phone_other: 'Other'
    }

    const phoneTypesSelected: object = {
      phone_work: 'Work',
      phone_home: 'Home'
    }

    return {
      data,
      allPhoneTypes,
      phoneTypesRemaining,
      phoneTypesSelected
    }
  },

  computed: {
    phoneTypesRemainingCount: function(): number {
      return Object.keys(this.phoneTypesRemaining).length
    }
  },

  methods: {
    onPhoneTypeChange: function(oldName: string, newName: string): void {
      this.rewritePhoneTypesRemaining(oldName, newName);
      this.rewritePhoneTypesSelected(oldName, newName);
    },

    onAddNewPhoneClick: function(): void {
      const newName: string = Object.keys(this.phoneTypesRemaining)[0];
      if (! newName){
        return;
      }

      this.rewritePhoneTypesRemaining(newName, null);
      this.rewritePhoneTypesSelected(null, newName);
    },

    rewritePhoneTypesRemaining: function(oldName: string, newName: string | null = null): void {
      const newListOfRemainingPhoneTypes: any = {};
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

    rewritePhoneTypesSelected: function(oldName: string | null = null, newName: string): void {
      const newListOfPhoneTypesSelected: object = {};
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

    onPhoneNumberChange: function(inputName: string, value: string) :void {
      this.data[inputName] = value;
      //console.log(this.data);
    },

    onContinueTap: function(): void {
      this.$nuxt.$emit('continueClicked', 'continue data');
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
      margin-bottom: 30px;
    }
  }
</style>
