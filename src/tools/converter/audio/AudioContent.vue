<i18n>
{
  "en": {
    "address": "audio address",
    "choose": "choose audio",
    "type": "output type",
    "address-placeholder": "remote audio address",
    "size": "output size",
    "origin": "keep origin size",
    "custom": "custom size",
    "lock": "lock aspect ratio",
    "convert": "convert",
    "output": "output",
    "tip": "right click to download the audio",
    "audio-error": "preview failed"
  },
  "cn": {
    "address": "音频地址",
    "choose": "选择音频",
    "type": "输出类型",
    "address-placeholder": "输入音频地址",
    "size": "输出尺寸",
    "origin": "保留原尺寸",
    "custom": "自定义尺寸",
    "lock": "锁定宽高",
    "convert": "转换",
    "output": "输出",
    "tip": "右键下载音频",
    "audio-error": "音频预览失败"
  }
}
</i18n>

<template>
  <div class="converter_content"
       :style="converterCardStyles">
    <Form :label-width="80">
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
            <!-- <span v-if="formData.file"
                  style="margin-left: 10px; line-height: 1; font-family: Consolas,Menlo,Courier,monospace"
                  v-text="imageOriginSize.width + 'x' + imageOriginSize.height"></span> -->
          </div>
        </FormItem>
      </transition>

      <FormItem :label="$t('type')">
        <Select filterable
                v-model="formData.audioType">
          <Option v-for="(item, index) in allAudioTypes"
                  :key="item.label"
                  :value="item.label"
                  :label="item.label"></Option>
        </Select>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Select, Option } from 'view-design'
export default {
  name: 'AudioContent',
  props: {
    type: {
      type: String,
      default: 'http'
    },
    allAudioTypes: {
      type: Array,
      default () {
        return []
      }
    },
  },
  components: {
    Upload: () => import('../../../components/Upload'),
    Form, FormItem, Input, Select, Option
  },
  data () {
    return {
      formData: {
        path: '',
        accept: '',
        file: null,
        audioType: 'mp3',
        width: 0,
        height: 0,
        imageSize: -2
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
      return Array.from(new Set(this.allAudioTypes.map(item => item.value))).join(',')
    }
  },
  mounted () {
    this.formData.accept = this.allAudioTypes.map(item => item.label).join(';')
  },
  methods: {
    changeFile (args) {
      this.formData.file = args.file
      console.log(this.formData.file)
      // let img = new Image()
      // img.onload = () => {
      //   this.imageOriginSize = {
      //     width: img.width,
      //     height: img.height
      //   }
      //   this.formData.width = img.width
      //   this.formData.height = img.height
      // }
      // img.src = this.$getFileURL(args.file)
    }
  }
}
</script>

<style lang="less" scoped>
.converter_content {
  width: 100%;
  height: 400px;
  padding: 15px 30px;
  box-sizing: border-box;
}
</style>