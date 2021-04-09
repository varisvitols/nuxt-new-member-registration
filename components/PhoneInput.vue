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
        @keyup="onInputKeyUp(selectedValue, $event.target.value)"
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
    'phoneTypesRemaining'
  ],
  data () {
    return {}
  },
  methods: {
    onSelecboxValueChange: function(newName: string): void {
      const oldName = this.selectedValue;
      this.$emit('phoneTypeChanged', oldName, newName);
    },

    onInputKeyUp: function(inputName: string, value: string): void {
      //console.log(inputName, value);
      this.$emit('phoneNumberChanged', inputName, value);
    }
  }
})
</script>