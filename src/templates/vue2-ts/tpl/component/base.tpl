<template>
  <div class="{{dashCase compName}}">
    <p>{{dcurly true}}msg{{dcurly}}</p>
  </div>
</template>

<script>
export default {
  name: "{{pascalCase compName}}",
  props: {
    msg: String
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
  @import "./{{createScssFileName compName}}.scss";
</style>
