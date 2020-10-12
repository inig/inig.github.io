<template>
  <div class="side_menu">
    <Menu :theme="'light'"
          style="width: 220px;"
          :active-name="$route.name"
          @on-select="goto">
      <Submenu name="1"
               v-for="(item, index) in routes"
               :key="item.name">
        <template slot="title">
          <Icon type="ios-paper" />
          {{language === 'cn' ? item.label : item.enLabel}}
        </template>
        <MenuItem v-for="(itm, idx) in item.children"
                  :key="itm.name"
                  :name="itm.name">{{language === 'cn' ? itm.label : itm.enLabel}}</MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
import { routerConverter } from '../router/converterRoutes'
import { Menu, Submenu, MenuGroup, MenuItem, Icon } from 'view-design'
export default {
  name: 'AppSideMenu',
  components: {
    Menu, Submenu, MenuGroup, MenuItem, Icon
  },
  data () {
    return {
      routes: [routerConverter]
    }
  },
  computed: {
    bgType () {
      return this.$store.state.bgType
    },
    bg () {
      return this.$store.state.bg
    },
    language () {
      return this.$store.state.language
    },
  },
  mounted () {
    console.log(this.$route)
  },
  methods: {
    goto (name) {
      this.$router.replace({
        name: name
      })
    }
  }
}
</script>

<style lang="less" scoped>
.side_menu {
  width: 100%;
  // height: 100%;
  // padding-top: 64px;
  padding: 10px 0;
  box-sizing: border-box;
}
</style>