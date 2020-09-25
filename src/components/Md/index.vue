<template>
  <article class="markdown-body">
    <component :is="component"></component>
  </article>
</template>

<script>
/**
 * 渲染 MarkDown
 * @important src: 路径以 @/ 开头，@/ 指向项目 src/
 */
export default {
  name: 'Markdown',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      component: ''
    }
  },
  beforeMount () {
    this.component = () => import(`../../${this.src.replace(/^@\//, '')}`)
  }
}
</script>