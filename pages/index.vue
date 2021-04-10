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

        <a class="add-phone" 
          v-if="phoneTypesRemainingCount > 0"
          @click="onAddNewPhoneClick">
          + Add phone
        </a>
      </form>
    </section>

    <footer class="page__buttons">
      <NuxtLink class="button  button--nuxtlink" to="/page2">Continue</NuxtLink>
      <!-- <button class="button" @click="$router.push({ path: '/page2' })">Continue</button> -->
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PhoneInput from '../components/PhoneInput.vue';
//import { FormData } from '../store';

export default Vue.extend({
  components: {
    PhoneInput
  },

  data () {
    //const data: FormData = {}

    const allPhoneTypes: object = {
      phone_work: 'Work',
      phone_home: 'Home',
      phone_mobile: 'Mobile',
      phone_main: 'Main',
      phone_other: 'Other'
    }

    // const phoneTypesRemaining: object = {
    //   phone_mobile: 'Mobile',
    //   phone_main: 'Main',
    //   phone_other: 'Other'
    // }

    // const phoneTypesSelected: object = {
    //   phone_work: 'Work',
    //   phone_home: 'Home'
    // }

    return {
      //data,
      allPhoneTypes,
      // phoneTypesRemaining,
      // phoneTypesSelected
    }
  },

  computed: {
    phoneTypesRemainingCount: function(): number {
      return Object.keys(this.phoneTypesRemaining).length
    },
    // dataFromStore: function(){
    //   console.log('getting data from store....');
    //   // console.log('this.$accessor.FormData', this.$accessor.FormData)
    //   return this.$accessor.formData
    //   // get () {
    //   //   return this.$accessor.formData
    //   // },
    //   // set (newData) {
    //   //   this.$accessor.setFormData(newData)
    //   // }
    // },
    first_name: {
      get () { return this.$accessor.first_name },
      set (newData) { this.$accessor.updateFirstName(newData) }
    },
    last_name: {
      get () { return this.$accessor.last_name },
      set (newData) { this.$accessor.updateLastName(newData) }
    },
    email: {
      get () { return this.$accessor.email },
      set (newData) { this.$accessor.updateEmail(newData) }
    },
    phone_work: {
      get () { return this.$accessor.phone_work },
      set (newData) { this.$accessor.updatePhoneWork(newData) }
    },
    phone_home: {
      get () { return this.$accessor.phone_home },
      set (newData) { this.$accessor.updatePhoneHome(newData) }
    },
    phone_mobile: {
      get () { return this.$accessor.phone_mobile },
      set (newData) { this.$accessor.updatePhoneMobile(newData) }
    },
    phone_main: { 
      get () { return this.$accessor.phone_main },
      set (newData) { this.$accessor.updatePhoneMain(newData) }
    },
    phone_other: {
      get () { return this.$accessor.phone_other },
      set (newData) { this.$accessor.updatePhoneOther(newData) }
    },
    phoneTypesRemaining: {
      get () { return this.$accessor.phoneTypesRemaining },
      set (newData) { this.$accessor.updatePhoneTypesRemaining(newData) }
    },
    phoneTypesSelected: {
      get () { return this.$accessor.phoneTypesSelected },
      set (newData) { this.$accessor.updatePhoneTypesSelected(newData) }
    }
  },

  // watch: {
  //   data: function(newData, oldData) {
  //     console.log('data changed!')
  //   }
  // },

  methods: {
    // setData(newData) {
    //   this.$accessor.setFormData(newData)
    // },

    // onInputUpdate(){

    // },

    // onInputBlur(){
    //   this.setData(this.data);
    // },

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
      this[inputName] = value
    }

    // keeping to myself as a reference
    // onContinueTap: function(): void {
    //   this.$nuxt.$emit('continueClicked', 'continue data');
    // }
  },
  mounted: function(){
    console.log('mounted');
    //window.alert('mounted');
    // console.log('data from store, ', this.dataFromStore);
    // this.data = { ...this.dataFromStore }
  },
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
