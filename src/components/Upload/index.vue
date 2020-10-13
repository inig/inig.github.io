<i18n>
{
  "en": {
    "tip": "drag or choose file",
    "download-cover": "download audio cover"
  },
  "cn": {
    "tip": "拖拽或点击上传",
    "download-cover": "下载音频封面"
  }
}
</i18n>
<template>
  <div class="upload-plugin-container">
    <Upload type="drag"
            action="/"
            :accept="accept"
            :max-size="formData.maxSize"
            :show-upload-list="false"
            :format="formData.format"
            :on-exceeded-size="handleMaxSize"
            :on-format-error="handleFormatError"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadFail"
            :style="containerStyles">
      <div class="upload-plugin-area">
        <Icon type="ios-cloud-upload"
              color="#888"
              size="30"></Icon>
        <span style="color: #888;"
              v-text="$t('tip')"></span>
        <transition name="fade">
          <div class="image_previewer"
               :style="[containerStyles, resultStyles]"
               v-if="sourceType =='image' && needPreview && cachedFile">
            <img :src="fileUrl"
                 alt="">
          </div>
        </transition>
        <transition name="fade">
          <div class="image_previewer"
               :style="[containerStyles, resultStyles]"
               v-if="sourceType =='audio' && cachedFile">
            <img :src="audioInfo.cover || `http://static.dei2.com/images/inig/audio_placeholder.jpg`"
                 alt="">

            <div @click="downloadCover"
                 v-if="audioInfo.cover"
                 class="cover_downloader">
              <Tooltip :content="$t('download-cover')"
                       placement="bottom"
                       :transfer="true"
                       style="wdith: 32px; height: 32px;">
                <Icon type="md-download"
                      color="#fff"
                      style="margin-top: 5px;"
                      size="24" />
              </Tooltip>
            </div>
          </div>
        </transition>
      </div>
    </Upload>
  </div>
</template>
<style lang="less" scoped>
.ml10 {
  margin-left: 10px;
}

.image_previewer {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
  }
}
.cover_downloader {
  position: absolute;
  right: 8px;
  top: 8px;
  width: 32px;
  height: 32px;
  pointer-events: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('../../../store/modules')
import { Upload, Icon, Tooltip } from 'view-design'
export default {
  name: 'UploadPlugin',
  props: {
    sourceType: { // 媒体类型，image/audio/video
      type: String,
      default: 'image'
    },
    width: {
      type: [String, Number],
      default: '200px'
    },
    height: {
      type: [String, Number],
      default: '200px'
    },
    accept: {
      type: String,
      default: ''
    },
    format: {
      type: Array,
      default () {
        return []
      }
    },
    needPreview: {
      type: Boolean,
      default: false
    },
    cover: {
      type: String,
      default: ''
    }
  },
  components: {
    Upload, Icon, Tooltip
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
    },
    containerStyles () {
      return {
        width: isNaN(this.width) ? this.width : (this.width + 'px'),
        height: isNaN(this.height) ? this.height : (this.height + 'px')
      }
    }
  },
  data () {
    return {
      formData: {
        maxSize: 200 * 1024,
        format: ['jpg', 'png', 'jpeg', 'gif']
      },
      currentPlugin: '',
      currentFileName: '',
      cachedFile: null,
      fileUrl: '',
      audioInfo: {}
    }
  },
  watch: {
    format: {
      immediate: true,
      handler (val) {
        this.formData.format = val
      }
    }
  },
  methods: {
    ...mapActions([
      'moduleConverter'
    ]),
    async beforeUpload (file) {
      this.cachedFile = file
      if (this.sourceType === 'image') {
        this.fileUrl = this.$getFileURL(file)
        this.$emit('change', {
          sourceType: this.sourceType,
          file: this.cachedFile
        })
      } else if (this.sourceType === 'audio') {
        let response = await this.$store.dispatch('moduleConverter/getAudioInfoFromLocal', {
          file: file
        })
        if (response && response.status == 200 && response.data && response.data.status == 200 && response.data.data) {
          this.audioInfo = response.data.data
        } else {
          this.audioInfo = {
            status: 1001,
            message: '失败',
            data: null
          }
        }
        this.$emit('change', {
          sourceType: this.sourceType,
          info: this.audioInfo,
          file: file
        })
      }
      return false
    },
    uploadSuccess (event, file, fileList) {
      if (event.status !== 200) {
        // this.$Message.destroy()
        // this.$Message.error(event.message)
      } else {
        this.$emit('success', {
          filename: file.name,
          path: event.data.path,
          file: this.cachedFile
        })
      }
    },
    uploadFail (event, file, fileList) {
      this.$emit('fail', {
        filename: file.name,
        message: event.message
      })
    },
    handleMaxSize (file) {
      this.$emit('fail', {
        filename: file.name,
        message: '文件不能超过' + (this.formData.maxSize / 1024) + 'M'
      })
    },
    handleFormatError (file) {
      // console.log('请上传' + (this.formData.format.join(';')) + '格式的文件')
      // this.$emit('fail', {
      //   filename: file.name,
      //   message: '请上传' + (this.formData.format.join(';')) + '格式的文件'
      // })
      this.$Notice.error({
        title: '格式错误',
        desc: '请上传' + (this.formData.format.join('; ')) + '格式的文件'
      })
    },
    downloadCover (e) {
      e.stopPropagation()
      this.$downloadImage(this.audioInfo.cover)
    }
  }
}
</script>
