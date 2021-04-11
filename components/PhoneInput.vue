<template>
  <div class="input-group">
    <label for="email">Phone</label>
    <div class="select-wrapper">
      <select name="selected_phone_type"
        @change="onSelecboxValueChange($event.target.value)">
        <option :value="selectedValue" selected="selected">
          {{ selectedTitle }}
        </option>
        <option v-for="(title, value) in phoneTypesRemaining" 
          :key="value"
          :value="value"
        >
          {{ title }}
        </option>
      </select>
      <div class="select-wrapper__cover-up">
        {{ selectedTitle }}
      </div>
      <input type="text" 
        :name="selectedValue"
        :value="phoneInputValue"
        @blur="onInputBlur(selectedValue, $event.target.value)"
      >
    </div>
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
    onSelecboxValueChange(newName: string): void {
      this.$emit('phoneTypeChanged', this.selectedValue, newName);
    },

    onInputBlur(inputName: string, value: string): void {
      this.$emit('phoneNumberChanged', inputName, value);
    }
  }
})
</script>