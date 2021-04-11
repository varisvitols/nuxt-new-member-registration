<template>
  <div class="modal" v-show="displayModal">
    <div class="modal__content-wrapper">
      <div class="modal__content">

        <div class="page  page--personal">
          <h1 class="page__heading">Review Your Data</h1>
          
          <section class="page__content">
            <form class="data-form">
              <div class="input-group">
                <label for="first_name">First name</label>
                <input type="text"
                  name="first_name" 
                  id="first_name" 
                  v-model="personalInfo.first_name"
                  @blur="onInputBlur"
                >
              </div>
              <div class="input-group">
                <label for="last_name">Last name</label>
                <input type="text"
                  name="last_name" 
                  id="last_name" 
                  v-model="personalInfo.last_name"
                  @blur="onInputBlur"
                >
              </div>
              <div class="input-group">
                <label for="email">Email</label>
                <input type="email"
                  name="email" 
                  id="email" 
                  v-model="personalInfo.email"
                  @blur="onInputBlur"
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
                  :phoneInputValue="personalInfo[value]"
                  @phoneNumberChanged="onPhoneNumberChange"
                />
              </div>
            </form>
          </section>

          <footer class="page__buttons">
            <button class="button" @click="closeEditModal">Update</button>
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
    const displayModal: boolean = false;
    const personalInfo: { [property: string]: string } = {}

    return {
      displayModal,
      personalInfo
    }
  },

  computed: {
    getPersonalInfo(): string {
      if (!! this.$accessor.personalInfo){
        return JSON.parse(this.$accessor.personalInfo)
      } else {
         return ''
      }
    },
    phoneTypesRemaining(): object {
      return this.$accessor.phoneTypesRemaining
    },
    phoneTypesSelected(): object {
      return this.$accessor.phoneTypesSelected
    },
    membership: {
      get (): string { return this.$accessor.membership },
      set (newData: string) { this.$accessor.updateMembership(newData) }
    }
  },

  created(){
    this.personalInfo = { ...this.getPersonalInfo as {} }
  },
  
  mounted () {
    this.$nuxt.$on('openEditModal', () => {
      this.refreshPersonalInfo();
      this.displayModal = true;
      document.body.style.overflow = 'hidden';
    }),
    this.$nuxt.$on('closeEditModal', () => {
      this.displayModal = false;
      document.body.style.overflow = '';
    })
  },
  
  methods: {
    /**
     * Updates a Phone number of certain type.
     */
    onPhoneNumberChange(inputName: string, value: string): void {
      this.personalInfo[inputName] = value;
      this.storePersonalInfo()
    },

    onInputBlur(): void {
      this.storePersonalInfo()
    },

    /**
     * Save Personal Info data in the store
     */
    storePersonalInfo(): void {
      this.$accessor.updatePersonalInfo(JSON.stringify(this.personalInfo));
    },
    
    /**
     * Closes the modal where previously entered data was revised.
     */
    closeEditModal(): void {
      this.$nuxt.$emit('closeEditModal');
    },

    refreshPersonalInfo(): void {
      this.personalInfo = { ...this.getPersonalInfo as {} }
    }
  }
})
</script>