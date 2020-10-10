<i18n>
{
  "en": {
    "label": "skin",
    "title": "change skin"
  },
  "cn": {
    "label": "换肤",
    "title": "换肤"
  }
}
</i18n>

<template>
  <div class="settings_skin">
    <Tooltip :content="$t('label')"
             placement="bottom">
      <svg :style="svgSkinStyles"
           @click="openSkinModal">
        <use xlink:href="#icon-skin"></use>
      </svg>
    </Tooltip>

    <Modal v-model="skinModal.shown"
           :ok-text="$t('ok')"
           :cancel-text="$t('cancel')"
           :title="$t('title')">
      <div class="colors">
        <div class="color_item"
             v-for="(item, index) in allColors"
             :key="item.value"
             @click="changeSkin(item.value)"
             :style="{backgroundColor: item.value}">
          <svg :style="svgCheckStyles"
               class="icon_check"
               v-show="bg == item.value">
            <use xlink:href="#icon-check"></use>
          </svg>
        </div>
        <!-- <div class="color_item_picker"
             :style="{backgroundColor: bgType == 'custom' && skinModal.formData.color ? skinModal.formData.color : 'transparent'}">
          <svg class="icon_color_picker"
               :style="svgColorPickerStyles">
            <use xlink:href="#icon-color-picker"></use>
          </svg>
          <ColorPicker class="color_picker"
                       v-model="skinModal.formData.color"
                       recommend
                       @on-change="changeColor" />
        </div> -->
        <div class="color_item_blank"
             v-for="itm in 5"></div>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as types from '../../store/mutation-types'
import { Tooltip, Modal, ColorPicker } from 'view-design'
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
    Tooltip, Modal, ColorPicker
  },
  data () {
    return {
      allColors: [
        {
          value: '#ffffff'
        },
        {
          value: '#fe6471'
        },
        {
          value: '#f4b2a6'
        },
        {
          value: '#ecccb3'
        },
        {
          value: '#F7EED6'
        },
        {
          value: '#bcefd0'
        },
        {
          value: '#a1e8e4'
        },
        {
          value: '#22c8b2'
        },
        {
          value: '#c3ecee'
        }
      ],
      skinModal: {
        shown: false,
        formData: {
          color: ''
        }
      }
    }
  },
  computed: {
    bgType () {
      return this.$store.state.bgType
    },
    bg () {
      return this.$store.state.bg
    },
    svgSkinStyles () {
      return {
        width: parseInt(this.size) + 'px',
        height: parseInt(this.size) + 'px',
        fill: this.color
      }
    },
    svgCheckStyles () {
      return {
        width: '20px',
        height: '20px',
        fill: '#333'
      }
    },
    svgColorPickerStyles () {
      if (this.bgType == 'custom' && this.skinModal.formData.color) {
        return {
          position: 'absolute',
          left: '5px',
          top: '5px',
          width: '20px',
          height: '20px',
          backgroundColor: '#fff'
        }
      } else {
        return {}
      }
    },
  },
  methods: {
    openSkinModal () {
      this.skinModal.shown = true
    },
    changeSkin (color) {
      this.$store.commit(types.SET_BG_TYPE, {
        bgType: 'color'
      })
      this.$store.commit(types.SET_BG, {
        bg: color
      })
    },
    changeColor (color) {
      this.$store.commit(types.SET_BG_TYPE, {
        bgType: 'custom'
      })
      this.$store.commit(types.SET_BG, {
        bg: color
      })
    }
  }
}
</script>

<style lang="less" scoped>
.settings_skin {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.7;
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