<template>
  <div class="converter">
    <!-- <Md src="@/assets/docs/enkel_cli.md"></Md> -->
    <!-- <Tabs v-model="sourceType"
          type="line">
      <TabPane label="远程图片"
               name="http">标签一的内容</TabPane>
      <TabPane label="本地图片"
               name="local">标签二的内容</TabPane>
    </Tabs> -->
    <div class="converter_card"
         :style="converterCardStyles">
      <div class="converter_card_type">
        <ButtonGroup>
          <Button :type="sourceType == 'http' ? 'primary' : 'default'"
                  @click="sourceType = 'http'">转换网络图片</Button>
          <Button :type="sourceType == 'local' ? 'primary' : 'default'"
                  @click="sourceType = 'local'">转换本地图片</Button>
        </ButtonGroup>
      </div>
      <transition name="fade">
        <div class="converter_card_content"
             v-show="sourceType == 'http'">
          <http-image :type="sourceType"
                      :all-image-types="allImageTypes"
                      :all-size="allSize"></http-image>
        </div>
      </transition>
      <transition name="fade">
        <div class="converter_card_content"
             v-show="sourceType != 'http'">
          <http-image :type="sourceType"
                      :all-image-types="allImageTypes"
                      :all-size="allSize"></http-image>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Md from '../../../components/Md/index'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('../../../store/modules')
import { Tabs, TabPane, ButtonGroup, Button, Form, FormItem, Input, Select, Option, Tooltip } from 'view-design'
export default {
  name: 'ImageConverter',
  components: {
    Md,
    HttpImage: () => import('./httpImage'),
    Tabs, TabPane, ButtonGroup, Button, Form, FormItem, Input, Select, Option, Tooltip
  },
  data () {
    return {
      sourceType: 'http',
      allSize: [
        {
          label: '保留原尺寸',
          value: -2,
          size: 0
        },
        {
          label: '自定义尺寸',
          value: -1,
          size: 64
        },
        {
          label: '32x32',
          value: 0,
          size: 32
        },
        {
          label: '48x48',
          value: 1,
          size: 48
        },
        {
          label: '64x64',
          value: 2,
          size: 64
        },
        {
          label: '96x96',
          value: 3,
          size: 96
        },
        {
          label: '128x128',
          value: 4,
          size: 128
        },
        {
          label: '192x192',
          value: 5,
          size: 128
        },
        {
          label: '256x256',
          value: 6,
          size: 256
        }
      ],
      allImageTypes: [
        {
          label: 'png',
          value: 'image/png'
        },
        {
          label: 'jpeg',
          value: 'image/jpeg'
        },
        {
          label: 'jpg',
          value: 'image/jpeg'
        },
        {
          label: 'ico',
          value: 'image/x-icon'
        },
        {
          label: 'gif',
          value: 'image/gif'
        },
        {
          label: 'bmp',
          value: 'image/bmp'
        },
        {
          label: 'pbm',
          value: 'image/x-portable-bitmap'
        },
        {
          label: 'pgm',
          value: 'image/x-portable-graymap'
        },
        {
          label: 'ppm',
          value: 'image/x-portable-pixmap'
        },
        {
          label: 'tif',
          value: 'image/tiff'
        },
        {
          label: 'tiff',
          value: 'image/tiff'
        },
        {
          label: 'ras',
          value: 'image/x-cmu-raster'
        },
        {
          label: 'rgb',
          value: 'image/x-rgb'
        },
        {
          label: 'xwd',
          value: 'image/x-xwindowdump'
        },
        {
          label: 'xbm',
          value: 'image/x-xbitmap'
        }
      ]
    }
  },
  computed: {
    bgType () {
      return this.$store.state.bgType
    },
    bg () {
      return this.$store.state.bg
    },
    converterCardStyles () {
      if (this.bgType != 'image' && this.bg) {
        return {
          backgroundColor: this.$lightenOrDarken(this.bg, -10)
        }
      } else {
        return {
          backgroundColor: '#fff'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.converter {
  width: 100%;
  height: 100%;
  padding: 15px 0;
  box-sizing: border-box;
  // display: flex;
  // flex-direction: row;
  // justify-content: center;
  &_card {
    position: relative;
    width: 600px;
    // height: 300px;
    margin: 64px auto;
    // background-color: #f5f5f5;
    border-radius: 5px;
    &_type {
      width: 100%;
      height: 64px;
      padding: 0 15px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
    &_content {
      position: absolute;
      width: 100%;
      height: calc(100% - 64px);
      // left: 0;
      // top: 64px;
      // padding: 15px 30px;
      // box-sizing: border-box;
    }
  }
}
</style>