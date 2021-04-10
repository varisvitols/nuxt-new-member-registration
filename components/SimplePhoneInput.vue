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
      const value = this.$accessor[this.selectedValue];
      return value
    },
  },
  methods: {
    onInputKeyUp: function(inputName: string, value: string): void {
      this.$emit('phoneNumberChanged', inputName, value);
    }
  }
})
</script>