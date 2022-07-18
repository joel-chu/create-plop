<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: String
  }
})

</script>

<template>
  <h3>{{msg}}</h3>
  <button @click="$emit('anywhere-click')">Emit anywhere-click</button>
</template>
