<template>
  <div class="home"
       id="home">
    <AppHeader></AppHeader>

    <div class="main"
         :style="{maxWidth: (maxWidth + 220 + 40) + 'px'}">
      <AppSideMenu class="app_side_menu"
                   :style="borderStyles"></AppSideMenu>
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
    bgType () {
      return this.$store.state.bgType
    },
    bg () {
      return this.$store.state.bg
    },
    borderStyles () {
      if (this.bgType != 'image' && this.bg) {
        return {
          borderColor: this.$lightenOrDarken(this.bg, -10)
        }
      } else {
        return {
          borderColor: '#fff'
        }
      }
    },
    maxWidth () {
      return this.$store.state.maxWidth
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  position: relative;
  height: 100%;
  overflow-y: auto;
  min-width: 1100px;
}
.main {
  position: relative;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  // justify-content: flex-end;
}
.app_side_menu {
  position: sticky;
  display: inline-block;
  left: 0;
  top: 88px;
  border-width: 1px;
  border-style: solid;
  width: 220px;
  // height: 100%;
}
.content_router {
  // margin: 0 auto;
}
</style>
