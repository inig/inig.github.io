<i18n>
{
  "en": {
    "tip": "drag or choose file"
  },
  "cn": {
    "tip": "拖拽或点击上传"
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
        <slot></slot>
        <Icon type="ios-cloud-upload"
              color="#888"
              size="30"></Icon>
        <span style="color: #888;"
              v-text="$t('tip')"></span>
        <transition name="fade">
          <div class="image_previewer"
               :style="[containerStyles, resultStyles]"
               v-if="needPreview && cachedFile">
            <img :src="fileUrl"
                 alt="">
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
  }
}
</style>
<script>
import { Upload, Icon } from 'view-design'
export default {
  name: 'UploadPlugin',
  props: {
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
    needPreview: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Upload, Icon
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
        maxSize: 2 * 1024,
        format: ['jpg', 'png', 'jpeg', 'gif']
      },
      currentPlugin: '',
      currentFileName: '',
      cachedFile: null,
      fileUrl: ''
    }
  },
  methods: {
    beforeUpload (file) {
      // this.$Message.loading({
      //   content: '头像上传中...',
      //   duration: 0
      // })
      this.cachedFile = file
      this.fileUrl = this.$getFileURL(file)
      this.$emit('change', {
        file: this.cachedFile
      })
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
      // this.$Notice.error({
      //   title: '文件上传失败',
      //   desc: file.name + '上传失败：' + event.message
      // })
      this.$emit('fail', {
        filename: file.name,
        message: event.message
      })
    },
    handleMaxSize (file) {
      // this.$Notice.warning({
      //   title: '文件太大了',
      //   desc: '文件' + file.name + '太大，请不要超过' + (this.formData.maxSize / 1024) + 'M'
      // })
      this.$emit('fail', {
        filename: file.name,
        message: '文件不能超过' + (this.formData.maxSize / 1024) + 'M'
      })
    },
    handleFormatError (file) {
      // this.$Notice.warning({
      //   title: '文件格式不正确',
      //   desc: file.name + '格式不正确，请上传' + (this.formData.format.join(';')) + '格式的文件'
      // })
      this.$emit('fail', {
        filename: file.name,
        message: '请上传' + (this.formData.format.join(';')) + '格式的文件'
      })
    }
  }
}
</script>
