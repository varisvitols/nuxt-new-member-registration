<template>
  <div class="input-group">
    <label for="email">{{ selectedTitle }} Phone</label>
    <input type="text" 
      :name="selectedValue"
      :value="phoneInputValue"
      @blur="onInputBlur(selectedValue, $event.target.value)"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: [
    'selectedValue',
    'selectedTitle',
    'phoneTypesRemaining',
    'phoneInputValue'
  ],
  
  data () {
    return {}
  },

  methods: {
    onInputBlur(inputName: string, value: string): void {
      this.$emit('phoneNumberChanged', inputName, value);
    }
  }
})
</script>