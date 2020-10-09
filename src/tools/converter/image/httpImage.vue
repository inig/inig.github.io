<template>
  <Form :label-width="80"
        class="form_container"
        :style="converterCardStyles">
    <FormItem label="图片地址">
      <Input v-model="formData.path"
             placeholder="输入图片地址"></Input>
    </FormItem>

    <transition name="fade"
                :label-wdith="80"
                v-if="formData.path && formData.path.trim()">
      <FormItem :label-width="80">
        <div style="display: flex; flex-direction: row; align-items: flex-end;">
          <div class="image_previewer"
               style="display: inline-flex;">
            <img :src="formData.path"
                 alt="图片预览失败"
                 @load="imageLoaded"
                 @error="imageLoadError">
          </div>
          <span v-if="imageIsReady"
                style="margin-left: 10px; line-height: 1; font-family: Consolas,Menlo,Courier,monospace"
                v-text="imageOriginSize.width + 'x' + imageOriginSize.height"></span>
        </div>
      </FormItem>
    </transition>

    <FormItem label="输出类型">
      <Select filterable
              v-model="formData.imageType">
        <Option v-for="(item, index) in allImageTypes"
                :key="item.label"
                :value="item.label"
                :label="item.label"></Option>
      </Select>
    </FormItem>
    <FormItem label="输出尺寸">
      <Select v-model="formData.imageSize"
              style="width: 120px; float: left;"
              @on-change="changeImageSize">
        <Option v-for="(item, index) in allSize"
                :key="item.label"
                :value="item.value"
                :label="item.label"></Option>
      </Select>
      <div style="float: left; margin-left: 10px; display: inline-flex; flex-direction: row; align-items: center; justify-content: flex-start;">
        <transition name="fade">
          <Input v-model="formData.width"
                 style="width: 100px;"
                 :number="true"
                 @on-change="changeWidth"
                 v-if="formData.imageSize == -1">
          <span slot="prepend">宽</span>
          </Input>
        </transition>
        <transition name="fade">
          <Tooltip content="锁定宽高"
                   placement="top"
                   style="width: 32px; height: 32px; margin-left: 10px;"
                   v-if="formData.imageSize == -1">
            <div class="size_lock"
                 @click="toggleLockSize">
              <svg>
                <use :xlink:href="'#' + (lockSize ? 'icon-lock' : 'icon-unlock')"></use>
              </svg>
            </div>
          </Tooltip>
        </transition>
        <transition name="fade">
          <Input v-model="formData.height"
                 style="width: 100px; margin-left: 10px;"
                 :number="true"
                 @on-change="changeHeight"
                 v-if="formData.imageSize == -1">
          <span slot="prepend">高</span>
          </Input>
        </transition>
      </div>
    </FormItem>
    <FormItem :label-width="80">
      <Button type="primary"
              :disabled="!imageIsReady"
              @click="doConvert">转换</Button>
    </FormItem>
    <transition name="fade">
      <div class="converter_result">
        <div class="converter_result_header">
          <div class="converter_result_header_bg"
               :style="resultStyles"></div>
          <div class="converter_result_header_content"
               :style="converterCardStyles">输出</div>
        </div>

        <div class="converter_result_error"
             v-if="convertResponse.status !== 200 || !convertResponse.data.path || !convertResponse.data.path.trim()">
          {{convertResponse.message}}
        </div>
        <div class="converter_result_content"
             v-else>
          <div class="converter_result_content_img">
            <img :src="convertResponse.data.path"
                 alt="预览失败">
          </div>
          <span class="converter_result_content_tip">右键下载图片</span>
        </div>
      </div>
    </transition>
  </Form>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('../../../store/modules')
import { Tabs, TabPane, ButtonGroup, Button, Form, FormItem, Input, Select, Option, Tooltip } from 'view-design'
export default {
  name: 'ConverterHttpImage',
  components: {
    Tabs, TabPane, ButtonGroup, Button, Form, FormItem, Input, Select, Option, Tooltip
  },
  props: {
    type: {
      type: String,
      default: 'http'
    },
    allImageTypes: {
      type: Array,
      default () {
        return []
      }
    },
    allSize: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      lockSize: true,
      convertResponse: {},
      imageOriginSize: {
        width: 0,
        height: 0
      },
      formData: {
        path: 'http://static.dei2.com/images/1.jpeg',
        imageType: 'png',
        width: 0,
        height: 0,
        imageSize: -2
      },
      imageIsReady: false,
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
    },
    resultStyles () {
      if (this.bgType != 'image' && this.bg) {
        return {
          backgroundColor: this.$lightenOrDarken(this.bg, -20)
        }
      } else {
        return {
          backgroundColor: '#fff'
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'moduleConverter'
    ]),
    changeImageSize (e) {
      if (Number(e) === -2) {
        this.formData.width = this.imageOriginSize.width
        this.formData.height = this.imageOriginSize.height
      } else if (Number(e) === -1) { } else {
        let size = this.allSize[Number(e) + 2]
        this.formData.width = size.size
        this.formData.height = size.size
      }
    },
    toggleLockSize () {
      this.lockSize = !this.lockSize
    },
    changeWidth () {
      if (this.lockSize) {
        this.formData.height = Math.floor(Number(this.formData.width) * Number(this.imageOriginSize.height) / Number(this.imageOriginSize.width))
      }
    },
    changeHeight () {
      if (this.lockSize) {
        this.formData.width = Math.floor(Number(this.formData.height) * Number(this.imageOriginSize.width) / Number(this.imageOriginSize.height))
      }
    },
    async doConvert () {
      let response = await this.$store.dispatch('moduleConverter/doConvertFromHttp', this.formData)
      if (response.status == 200 && response.data) {
        this.convertResponse = response.data
      } else {
        this.convertResponse = {
          status: 1001,
          message: '失败',
          data: null
        }
      }
    },
    imageLoaded (e) {
      this.imageOriginSize = {
        width: e.target.naturalWidth,
        height: e.target.naturalHeight
      }
      this.formData.width = this.imageOriginSize.width
      this.formData.height = this.imageOriginSize.height
      this.imageIsReady = true
    },
    imageLoadError (e) {
      this.imageIsReady = false
      this.imageOriginSize = {
        width: 0,
        height: 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form_container {
  padding: 15px 30px;
  box-sizing: border-box;
}
.converter_result {
  width: 80%;
  margin: 0 auto;
  &_header {
    position: relative;
    width: 100%;
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &_bg {
      width: 100%;
      height: 1px;
    }
    &_content {
      position: absolute;
      padding: 0 20px;
      box-sizing: border-box;
      height: 32px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
  }
  &_error {
    padding: 10px 0 0 0;
    box-sizing: border-box;
  }
  &_content {
    padding: 10px 0 0 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &_img {
      width: 150px;
      height: 150px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    &_tip {
      margin-top: 15px;
      color: #aaa;
    }
  }
}
.size_lock {
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  svg {
    width: 20px;
    height: 20px;
    fill: #515a6e;
  }
}
</style>