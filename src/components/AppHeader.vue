<template>
  <div class="app_header"
       :style="{boxShadow: (scrollTop > 40) ? '0 2px 10px 0 rgba(0, 0, 0, 0.1)' : 'none', backgroundColor: (scrollTop > 10) ? (bgType !== 'image' ? bg : '#fff') : 'transparent'}">
    <div class="app_header_content"
         :style="{maxWidth: (maxWidth + 200) + 'px'}">
      <div class="app_logo">
        <img src="@/assets/logo2.png"
             alt="">
      </div>
    </div>
    <div class="app_header_append">
      <SettingsSkin></SettingsSkin>
    </div>
    <div class="app_header_append">
      <SettingsLanguage></SettingsLanguage>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  components: {
    SettingsSkin: () => import('./Skin/index'),
    SettingsLanguage: () => import('./Language/index'),
  },
  computed: {
    maxWidth () {
      return this.$store.state.maxWidth
    },
    bgType () {
      return this.$store.state.bgType
    },
    bg () {
      return this.$store.state.bg
    }
  },
  data () {
    return {
      showBoxShadow: false,
      scrollTop: 0, // window.pageYOffset,
      appEle: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.appEle = document.querySelector('#app')
      this.scrollTop = this.appEle.scrollTop
      this.appEle.addEventListener('scroll', this.initScroller)
    })
  },
  methods: {
    initScroller (e) {
      this.scrollTop = this.appEle.scrollTop
    }
  }
}
</script>

<style lang="less" scoped>
.app_header {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 999;
  // background-color: #ffffff;
  // border-bottom: 1px solid #f5f5f58;
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  &_content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .app_logo {
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      img {
        max-height: 100%;
      }
    }
  }
  &_append {
    height: 100%;
    margin-left: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>