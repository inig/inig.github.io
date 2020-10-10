<i18n>
{
  "en": {
    "address": "picture address",
    "choose": "choose picture",
    "type": "output type",
    "address-placeholder": "remote picture address",
    "size": "output size",
    "origin": "keep origin size",
    "custom": "custom size",
    "lock": "lock ratio",
    "convert": "convert",
    "output": "output",
    "tip": "",
    "picture-error": "preview error"
  },
  "cn": {
    "address": "图片地址",
    "choose": "选择图片",
    "type": "输出类型",
    "address-placeholder": "输入图片地址",
    "size": "输出尺寸",
    "origin": "保留原尺寸",
    "custom": "自定义尺寸",
    "lock": "锁定宽高",
    "convert": "转换",
    "output": "输出",
    "tip": "右键下载图片",
    "picture-error": "图片预览失败"
  }
}
</i18n>

<template>
  <Form :label-width="80"
        class="form_container"
        :style="converterCardStyles">
    <transition name="fade">
      <FormItem :label="$t('address')"
                key="http"
                v-if="type === 'http'">
        <Input v-model="formData.path"
               :placeholder="$t('address-placeholder')"></Input>
      </FormItem>
      <FormItem :label="$t('choose')"
                key="local"
                v-else>
        <div style="display: flex; flex-direction: row; align-items: flex-end;">
          <Upload style="width: 200px; height: 200px;"
                  :accept="accept"
                  :need-preview="true"
                  @change="changeFile"
                  :style="resultStyles"></Upload>
          <span v-if="formData.file"
                style="margin-left: 10px; line-height: 1; font-family: Consolas,Menlo,Courier,monospace"
                v-text="imageOriginSize.width + 'x' + imageOriginSize.height"></span>
        </div>
      </FormItem>
    </transition>

    <!-- <transition name="fade"
                delay="100"
                appear>
      <FormItem label="选择图片"
                v-if="type !== 'http'">
        <Upload style="width: 200px; height: 200px;"
                :accept="accept"
                :need-preview="true"
                :style="resultStyles"></Upload>
      </FormItem>
    </transition> -->

    <transition name="fade"
                :label-wdith="80"
                v-if="type === 'http' && formData.path && formData.path.trim()">
      <FormItem :label-width="80">
        <div style="display: flex; flex-direction: row; align-items: flex-end;">
          <div class="image_previewer"
               style="display: inline-flex;">
            <img :src="formData.path"
                 :alt="$t('picture-error')"
                 @load="imageLoaded"
                 @error="imageLoadError">
          </div>
          <span v-if="imageIsReady"
                style="margin-left: 10px; line-height: 1; font-family: Consolas,Menlo,Courier,monospace"
                v-text="imageOriginSize.width + 'x' + imageOriginSize.height"></span>
        </div>
      </FormItem>
    </transition>

    <FormItem :label="$t('type')">
      <Select filterable
              v-model="formData.imageType">
        <Option v-for="(item, index) in allImageTypes"
                :key="item.label"
                :value="item.label"
                :label="item.label"></Option>
      </Select>
    </FormItem>
    <FormItem :label="$t('size')">
      <Select v-model="formData.imageSize"
              style="width: 150px; float: left;"
              @on-change="changeImageSize">
        <Option v-for="(item, index) in allSize"
                :key="item.label"
                :value="item.value"
                :label="item.label"></Option>
      </Select>
      <div style="float: left; margin-left: 10px; display: inline-flex; flex-direction: row; align-items: center; justify-content: flex-start;">
        <transition name="fade">
          <Input v-model="formData.width"
                 style="width: 120px;"
                 :number="true"
                 @on-change="changeWidth"
                 v-if="formData.imageSize == -1">
          <span slot="prepend"
                v-text="$t('width')"></span>
          </Input>
        </transition>
        <transition name="fade">
          <Tooltip :content="$t('lock')"
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
                 style="width: 120px; margin-left: 10px;"
                 :number="true"
                 @on-change="changeHeight"
                 v-if="formData.imageSize == -1">
          <span slot="prepend"
                v-text="$t('height')"></span>
          </Input>
        </transition>
      </div>
    </FormItem>
    <FormItem :label-width="80">
      <Button type="primary"
              :disabled="!imageIsReady && !formData.file"
              @click="doConvert"
              v-text="$t('convert')"></Button>
    </FormItem>
    <transition name="fade">
      <div class="converter_result">
        <div class="converter_result_header">
          <div class="converter_result_header_bg"
               :style="resultStyles"></div>
          <div class="converter_result_header_content"
               :style="converterCardStyles"
               v-text="$t('output')"></div>
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
          <span class="converter_result_content_tip"
                v-text="$t('tip')"></span>
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
    Upload: () => import('../../../components/Upload'),
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
        path: '',
        accept: '',
        file: null,
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
    language () {
      return this.$store.state.language
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
    },
    accept () {
      return Array.from(new Set(this.allImageTypes.map(item => item.value))).join(',')
    }
  },
  mounted () {
    this.formData.accept = this.allImageTypes.map(item => item.label).join(';')
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
      let response
      if (this.type === 'http') {
        response = await this.$store.dispatch('moduleConverter/doConvertFromHttp', this.formData)
        if (response.status == 200 && response.data) {
          this.convertResponse = response.data
        } else {
          this.convertResponse = {
            status: 1001,
            message: '失败',
            data: null
          }
        }
      } else {
        response = await this.$store.dispatch('moduleConverter/doConvertFromLocal', this.formData)
        if (response.status == 200 && response.data) {
          this.convertResponse = response.data
        } else {
          this.convertResponse = {
            status: 1001,
            message: '失败',
            data: null
          }
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
    },
    changeFile (args) {
      this.formData.file = args.file
      let img = new Image()
      img.onload = () => {
        this.imageOriginSize = {
          width: img.width,
          height: img.height
        }
        this.formData.width = img.width
        this.formData.height = img.height
      }
      img.src = this.$getFileURL(args.file)
    }
  },
  watch: {
    'formData.path': {
      immediate: true,
      handler (val) {
        if (!val && !val.trim()) {
          this.imageIsReady = false
        }
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