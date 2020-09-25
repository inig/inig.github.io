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
             v-if="sourceType == 'http'">
          <Form :label-width="80">
            <FormItem label="图片地址">
              <Input v-model="formData.path"
                     placeholder="输入图片地址"></Input>
            </FormItem>
            <FormItem label="输出类型">
              <Select filterable
                      v-model="formData.imageType">
                <Option v-for="(item, index) in allImageTypes"
                        :key="item.label"
                        :value="item.value"
                        :label="item.label"></Option>
              </Select>
            </FormItem>
            <FormItem label="图片尺寸">
              <Select v-model="formData.imageSize"
                      style="width: 120px; float: left;">
                <Option v-for="(item, index) in allSize"
                        :key="item.label"
                        :value="item.value"
                        :label="item.label"></Option>
              </Select>
              <div style="float: left; margin-left: 10px; display: inline-flex; flex-direction: row; align-items: center; justify-content: flex-start;">
                <transition name="fade">
                  <Input v-model="formData.width"
                         style="width: 100px;"
                         v-if="formData.imageSize == -1">
                  <span slot="prepend">宽</span>
                  </Input>
                </transition>
                <transition name="fade">
                  <Input v-model="formData.height"
                         style="width: 100px; margin-left: 10px;"
                         v-if="formData.imageSize == -1">
                  <span slot="prepend">高</span>
                  </Input>
                </transition>
              </div>
            </FormItem>
          </Form>
        </div>
      </transition>
      <transition name="fade">
        <div class="converter_card_content"
             v-if="sourceType != 'http'"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import Md from '../../../components/Md/index'
import { Tabs, TabPane, ButtonGroup, Button, Form, FormItem, Input, Select, Option } from 'view-design'
export default {
  name: 'ImageConverter',
  components: {
    Md,
    Tabs, TabPane, ButtonGroup, Button, Form, FormItem, Input, Select, Option
  },
  data () {
    return {
      sourceType: 'http',
      formData: {
        path: '',
        imageType: '',
        width: 64,
        height: 64,
        imageSize: -2
      },
      allSize: [
        {
          label: '保留原尺寸',
          value: -2
        },
        {
          label: '自定义尺寸',
          value: -1
        },
        {
          label: '16x16',
          value: 0
        },
        {
          label: '32x32',
          value: 1
        },
        {
          label: '48x48',
          value: 2
        },
        {
          label: '64x64',
          value: 3
        },
        {
          label: '96x96',
          value: 4
        },
        {
          label: '128x128',
          value: 5
        },
        {
          label: '256x256',
          value: 6
        },
        {
          label: '512x512',
          value: 7
        }
      ],
      allImageTypes: [
        {
          label: 'bmp',
          value: 'image/bmp'
        },
        {
          label: 'cmx',
          value: 'image/x-cmx'
        },
        {
          label: 'cod',
          value: 'image/cis-cod'
        },
        {
          label: 'gif',
          value: 'image/gif'
        },
        {
          label: 'ico',
          value: 'image/x-icon'
        },
        {
          label: 'ief',
          value: 'image/ief'
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
          label: 'jpe',
          value: 'image/jpeg'
        },
        {
          label: 'jfif',
          value: 'image/jpeg'
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
          label: 'png',
          value: 'image/png'
        },
        {
          label: 'pnm',
          value: 'image/x-portable-anymap'
        },
        {
          label: 'ppm',
          value: 'image/x-portable-pixmap'
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
          label: 'svg',
          value: 'image/svg+xml'
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
          label: 'xbm',
          value: 'image/x-xbitmap'
        },
        {
          label: 'xpm',
          value: 'image/x-xpixmap'
        },
        {
          label: 'xwd',
          value: 'image/x-xwindowdump'
        },
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
    height: 300px;
    margin: 100px auto;
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
      left: 0;
      top: 64px;
      width: 100%;
      height: calc(100% - 64px);
      padding: 15px 30px;
      box-sizing: border-box;
    }
  }
}
</style>