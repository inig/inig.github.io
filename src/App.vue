<template>
  <div id="app"
       :style="appStyles">
    <router-view name="HomeRouter" />
    <all-svgs></all-svgs>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    AllSvgs: () => import('./Svgs.vue')
  },
  computed: {
    bgType () {
      return this.$store.state.bgType
    },
    bg () {
      return this.$store.state.bg
    },
    appStyles () {
      let outStyle = {}
      if (this.bgType === 'image') {
        outStyle.backgroundImage = `url(${this.bg})`
        outStyle.backgroundSize = '100% 100%'
      } else {
        outStyle.backgroundColor = this.bg
      }
      return outStyle
    }
  }
}
</script>

<style lang="less">
html,
body {
  outline: none;
  height: 100%;
  user-select: none;
}
#app {
  height: 100%;
  overflow-y: auto;
  // #66c18c
}

.hljs-name {
  color: #22863a;
}

.hljs-attr {
  color: #6f42c1;
}

.hljs-keyword {
  color: red;
}

.hljs-string {
  color: #032f62;
}

.color_item_picker {
  .ivu-color-picker {
    width: 100%;
    height: 100%;
    .ivu-input-wrapper {
      height: 100%;
    }
    .ivu-input-icon-normal + .ivu-input {
      height: 100%;
      padding: 0 !important;
    }
    .ivu-input-icon-normal {
      display: none;
    }
    .ivu-input {
      border: none;
      background-color: transparent;
    }
    .ivu-input:focus {
      border-color: transparent;
      box-shadow: none;
    }
    .ivu-color-picker-color {
      opacity: 0;
    }
    .ivu-select-dropdown {
      width: auto;
    }
  }
  .ivu-color-picker > div:first-child:hover .ivu-input {
    border-color: transparent;
    box-shadow: none;
  }
  .ivu-color-picker-focused {
    border-color: transparent;
    box-shadow: none;
  }
}
</style>
