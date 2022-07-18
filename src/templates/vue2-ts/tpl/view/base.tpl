<template>
  <div class="{{dashCase viewName}}">
    <p>{{dcurly true}}msg{{dcurly}}</p>
  </div>
</template>

<script>
export default {
  name: "{{pascalCase viewName}}",
  props: {
    msg: String
  },
  components: {

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
  @import "./{{createScssFileName viewName}}.scss";
</style>
