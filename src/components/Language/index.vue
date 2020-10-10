<i18n>
{
  "en": {
    "label": "languages"
  },
  "cn": {
    "label": "语言切换"
  }
}
</i18n>

<template>
  <div class="settings_item">
    <Dropdown @on-click="setLanguage">
      <svg :style="svgStyles">
        <use xlink:href="#icon-language"></use>
      </svg>
      <DropdownMenu slot="list">
        <DropdownItem name="en">English</DropdownItem>
        <DropdownItem name="cn">简体中文</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import * as types from '../../store/mutation-types'
import { Dropdown, DropdownMenu, DropdownItem } from 'view-design'
export default {
  name: 'Skin',
  props: {
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: '#555'
    }
  },
  components: {
    Dropdown, DropdownMenu, DropdownItem
  },
  data () {
    return {
    }
  },
  computed: {
    bgType () {
      return this.$store.state.bgType
    },
    bg () {
      return this.$store.state.bg
    },
    svgStyles () {
      return {
        width: parseInt(this.size) + 'px',
        height: parseInt(this.size) + 'px',
        fill: this.color
      }
    },
  },
  methods: {
    setLanguage (language) {
      console.log('>>>>', language)
      this.$store.commit(types.SET_LANGUAGE, {
        language: language
      })
    }
  }
}
</script>

<style lang="less" scoped>
.settings_item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
    &:hover {
      opacity: 0.7;
    }
  }
}
.colors {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  .color_item {
    width: 80px;
    height: 80px;
    margin: 5px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .color_item_picker {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 5px;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    svg {
      width: 56px;
      height: 56px;
      z-index: 9;
      pointer-events: none;
    }
    .color_picker {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .color_item_blank {
    width: 80px;
    height: 0;
    margin: 5px;
  }
}
</style>