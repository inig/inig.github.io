<template>
  <div class="home">
    <article class="markdown-body">
      <readme></readme>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src
import readme from '../assets/docs/enkel_cli.md'

export default {
  name: 'Home',
  components: {
    readme
  },
  data () {
    return {
      tps: ''
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.markdown-body {
  max-width: 888px;
  margin: 0 auto;
}
</style>
