<template>
  <div class="input-group">
    <label for="email">{{ selectedTitle }} Phone</label>
    <input type="text" 
      :name="selectedValue"
      :value="phoneInputValue"
      @keyup="onInputKeyUp(selectedValue, $event.target.value)"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: [
    'selectedValue',
    'selectedTitle',
    'phoneTypesRemaining'
  ],
  
  data () {
    return {}
  },

  computed: {
    phoneInputValue(){
      return this.$accessor[this.selectedValue];
    },
  },

  methods: {
    onInputKeyUp(inputName: string, value: string): void {
      this.$emit('phoneNumberChanged', inputName, value);
    }
  }
})
</script>