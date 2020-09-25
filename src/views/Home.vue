<template>
  <div class="home">
    <AppHeader></AppHeader>
    <div class="main"
         :style="{maxWidth: (maxWidth + 200) + 'px'}">
      <AppSideMenu class="app_side_menu"></AppSideMenu>
      <router-view name="ContentRouter"
                   class="content_router"
                   :style="{maxWidth: maxWidth + 'px'}"></router-view>
    </div>

    <!-- <article class="markdown-body">
      <readme></readme>
    </article> -->
  </div>
</template>

<script>
// @ is an alias to /src
import readme from '../assets/docs/enkel_cli.md'
import AppHeader from '../components/AppHeader'
import AppSideMenu from '../components/AppSideMenu'
export default {
  name: 'Home',
  components: {
    readme,
    AppHeader,
    AppSideMenu
  },
  computed: {
    maxWidth () {
      return this.$store.state.maxWidth
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  // height: 100%;
}
.main {
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  .app_side_menu {
    position: sticky;
    left: 0;
    top: 70px;
    width: 200px;
    height: 100%;
  }
}

.content_router {
  // margin: 0 auto;
}
</style>
