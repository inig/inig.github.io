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
    "audio-error": "preview failed",
    "audio-bit-rate": "bit rate",
    "audio-sample-rate": "sample rate",
    "audio-duration": "duration",
    "audio-size": "size",
    "audio-album": "album",
    "audio-title": "title",
    "audio-artist": "artist"
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
    "audio-error": "音频预览失败",
    "audio-bit-rate": "比特率",
    "audio-sample-rate": "采样率",
    "audio-duration": "时长",
    "audio-size": "大小",
    "audio-album": "专辑名",
    "audio-title": "标题",
    "audio-artist": "歌手"
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
          <div style="display: flex; flex-direction: row;">
            <Upload style="width: 200px; height: 200px;"
                    :accept="accept"
                    :need-preview="true"
                    source-type="audio"
                    :format="formData.accept.split(';')"
                    @change="changeFile"
                    :style="resultStyles"></Upload>

            <transition name="fade">
              <div class="extra_info"
                   v-if="formData.title">
                <div class="extra_info_item">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-title') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="formData.title"></div>
                </div>
                <div class="extra_info_item"
                     v-if="formData.album">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-album') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="formData.album"></div>
                </div>
                <div class="extra_info_item"
                     v-if="formData.artist">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-artist') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="formData.artist"></div>
                </div>
                <div class="extra_info_item"
                     v-if="formData.bitRate">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-bit-rate') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="formData.bitRate"></div>
                </div>
                <div class="extra_info_item"
                     v-if="formData.sampleRate">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-sample-rate') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="formData.sampleRate"></div>
                </div>
                <div class="extra_info_item"
                     v-if="formData.size">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-size') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="formData.size"></div>
                </div>
                <div class="extra_info_item"
                     v-if="formData.duration">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-duration') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="formData.duration"></div>
                </div>

                <div class="media_player"
                     @click="togglePlay">
                  <div class="media_player_icon">
                    <svg>
                      <use :xlink:href="playing ? '#icon-pause' : '#icon-play'"></use>
                    </svg>
                  </div>
                  <audio ref="medioPlayerBox"
                         style="width: 0; height: 0;"
                         preload="auto"
                         :src="formData.path"></audio>
                </div>
              </div>
            </transition>
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
  import { Form, FormItem, Input, Select, Option, Icon } from 'view-design'
  import { createNamespacedHelpers } from 'vuex'
  const { mapActions } = createNamespacedHelpers('../../../store/modules')
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
      allSampleRates: {
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
      Upload: () => import('../../../components/Upload'),
      Form, FormItem, Input, Select, Option, Icon
    },
    data () {
      return {
        coverAvailable: ['mp3', 'm4a'],
        playing: false,
        formData: {
          path: '', // 媒体地址
          cover: '',
          accept: '',
          file: null,
          audioType: 'mp3',
          bitRate: 0, // 比特率
          sampleRate: 0, // 采样率
          size: 0, // 文件容量
          duration: 0, // 音频时长
          album: '', // 专辑名
          title: '', // 音频标题
          artist: '' // 歌手
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
      ...mapActions([
        'moduleConverter'
      ]),
      changeFile (args) {
        this.playing = false
        if (!args.info || !args.info.streams || !args.info.format) return
        let s = args.info.streams[0]
        console.log('>>>>', JSON.stringify(args, null, 2))
        this.formData = {
          ...this.formData, ...{
            path: args.info.audio || '',
            cover: args.info.cover || `http://static.dei2.com/images/inig/audio_placeholder.jpg`,
            bitRate: parseFloat(args.info.format.bit_rate / 1000).toFixed(1) + ' kbps', // 比特率
            sampleRate: parseFloat(s.sample_rate / 1000).toFixed(1) + ' kHz', // 采样率
            size: this.$sizeFormat(args.info.format.size), // 文件容量
            duration: this.$durationFormat(s.duration), // 音频时长
            album: args.info.format.tags ? args.info.format.tags.album : (s.tags ? s.tags.album : ''), // 专辑名
            title: (args.info.format.tags ? args.info.format.tags.title : (s.tags ? s.tags.title : args.file.name)) || args.file.name, // 音频标题
            artist: args.info.format.tags ? args.info.format.tags.artist : (s.tags ? s.tags.artist : '') // 歌手
          }
        }
        this.$nextTick(() => {
          let medioPlayerBox = this.$refs.medioPlayerBox
          if (medioPlayerBox) {
            medioPlayerBox.removeEventListener('ended', this.musicStop);
            medioPlayerBox.addEventListener('ended', this.musicStop, false);
          }
        })
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
      },
      togglePlay () {
        this.playing = !this.playing
        let medioPlayerBox = this.$refs.medioPlayerBox
        if (this.playing) {
          medioPlayerBox && medioPlayerBox.play()
        } else {
          medioPlayerBox && medioPlayerBox.pause()
        }
      },
      musicStop () {
        this.playing = false
        let medioPlayerBox = this.$refs.medioPlayerBox
        medioPlayerBox && medioPlayerBox.pause()
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
  .extra_info {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 10px;
    width: 100%;
    flex: 1;
    font-family: Consolas, Menlo, Courier, monospace;
    &_item {
      width: 100%;
      line-height: 28px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      &_label {
        width: 110px;
        // height: 100%;
        color: rgba(0, 0, 0, 0.5);
        line-height: 1.4;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
      }
      &_value {
        // height: 100%;
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        line-height: 1.4;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
    .media_player {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 48px;
      height: 48px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &_icon {
        width: 48px;
        height: 48px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 2px 20px #fff;
        svg {
          width: 48px;
          height: 48px;
          fill: #4fc08d;
        }
      }
    }
  }
</style>