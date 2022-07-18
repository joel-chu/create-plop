<script lang="ts">
import AnywhereButton from '../AnywhereButton/AnywhereButton.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { AnywhereButton },
  props: {
    x: Number,
    y: Number
  },
  data() {
    return {
      count: 1,
      message: ''
    }
  },
  setup(props, ctx) {

  }
})
</script>

<template>
  <div>message: {{message}}</div>
  <div>x: {{x}}</div>
  <div>y: {{y}}</div>
  <div>{{count}}</div>
  <button @click="++count">ADD</button>
  <AnywhereButton v-on:anywhere-click="message='anywhere just clicked'" msg="just saying ..." />
</template>

<style scoped>

</style>
