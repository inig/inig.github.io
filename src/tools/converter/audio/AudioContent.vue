<i18n>
{
  "en": {
    "address": "audio address",
    "choose": "choose audio",
    "cut": "cut",
    "volume": "volume",
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
    "audio-channels": "channels",
    "audio-duration": "duration",
    "audio-size": "size",
    "audio-album": "album",
    "audio-title": "title",
    "audio-artist": "artist",
    "select-placeholder": "select",
    "download": "download",
    "original": "Auto (No Change)"
  },
  "cn": {
    "address": "音频地址",
    "choose": "选择音频",
    "cut": "裁剪",
    "volume": "音量",
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
    "audio-channels": "声道",
    "audio-duration": "时长",
    "audio-size": "大小",
    "audio-album": "专辑名",
    "audio-title": "标题",
    "audio-artist": "歌手",
    "select-placeholder": "请选择",
    "download": "下载音频",
    "original": "自动（无更改）"
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
                   v-if="mediaInfo.title">
                <div class="extra_info_item">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-title') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="mediaInfo.title"></div>
                </div>
                <div class="extra_info_item"
                     v-if="mediaInfo.album">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-album') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="mediaInfo.album"></div>
                </div>
                <div class="extra_info_item"
                     v-if="mediaInfo.artist">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-artist') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="mediaInfo.artist"></div>
                </div>
                <div class="extra_info_item"
                     v-if="mediaInfo.bitRate">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-bit-rate') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="parseFloat(mediaInfo.bitRate / 1000) + ' kbps'"></div>
                </div>
                <div class="extra_info_item"
                     v-if="mediaInfo.sampleRate">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-sample-rate') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="$numberFormat(mediaInfo.sampleRate) + ' Hz'"></div>
                </div>
                <div class="extra_info_item"
                     v-if="mediaInfo.channels">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-channels') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="mediaInfo.channelsName != 'unknown' ? (mediaInfo.channelsName + '(' + mediaInfo.channels + ' channels)') : mediaInfo.channels + ' channels'"></div>
                </div>
                <div class="extra_info_item"
                     v-if="mediaInfo.size">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-size') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="mediaInfo.size"></div>
                </div>
                <div class="extra_info_item"
                     v-if="mediaInfo.duration">
                  <div class="extra_info_item_label"
                       v-text="$t('audio-duration') + ':'"></div>
                  <div class="extra_info_item_value"
                       v-text="mediaInfo.duration"></div>
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

      <transition name="fade">
        <FormItem :label="$t('type')"
                  v-if="formData.path || formData.file">
          <Select filterable
                  v-model="formData.audioType"
                  @on-change="changeAudioType"
                  :placeholder="$t('select-placeholder')">
            <Option v-for="(item, index) in allAudioTypes"
                    :key="item.label"
                    :value="item.label"
                    :label="item.label"></Option>
          </Select>
        </FormItem>
      </transition>

      <transition name="fade">
        <FormItem :label="$t('cut')"
                  v-if="formData.cut.length > 0 && (formData.path || formData.file)">
          <div class="media_cut_item">
            <Slider v-model="formData.cut"
                    style="flex: 1;"
                    :min="0"
                    :max="formData.totalDuration"
                    :tip-format="$durationFormat"
                    range></Slider>
            <span>{{$durationFormat(formData.cut[1] - formData.cut[0])}}</span>
          </div>
        </FormItem>
      </transition>

      <transition name="fade">
        <FormItem :label="$t('volume')"
                  v-if="formData.path || formData.file">
          <div class="media_cut_item">
            <Slider v-model="formData.volume"
                    style="flex: 1;"
                    :min="-30"
                    :max="30"></Slider>
            <span>{{formData.volume > 0 ? '+' + formData.volume : formData.volume}} dB</span>
          </div>
        </FormItem>
      </transition>

      <transition name="fade">
        <FormItem :label="$t('audio-channels')"
                  v-if="allChannels.length > 0 && (formData.path || formData.file)">
          <Select filterable
                  v-model="formData.channels"
                  :placeholder="$t('select-placeholder')">
            <Option v-for="(item, index) in allChannels"
                    :key="item.label"
                    :value="item.value"
                    :label="item.label"></Option>
          </Select>
        </FormItem>
      </transition>

      <transition name="fade">
        <FormItem :label="$t('audio-sample-rate')"
                  v-if="allSampleRates.length > 0 && (formData.path || formData.file)">
          <Select filterable
                  v-model="formData.sampleRate"
                  :placeholder="$t('select-placeholder')">
            <Option v-for="(item, index) in allSampleRates"
                    :key="item.label"
                    :value="item.value"
                    :label="item.label"></Option>
          </Select>
        </FormItem>
      </transition>

      <transition name="fade">
        <FormItem :label="$t('audio-bit-rate')"
                  v-if="allBitRates.length > 0 && (formData.path || formData.file)">
          <div class="bit_rate_select"
               v-if="allBitRates[0].value">
            <Select filterable
                    v-model="formData.bitRate"
                    :placeholder="$t('select-placeholder')">
              <Option v-for="(item, index) in allBitRates"
                      :key="item.label"
                      :value="item.value"
                      :label="item.label"></Option>
            </Select>
          </div>
          <div class="bit_rate_range media_cut_item"
               v-else>
            <Slider style="flex: 1;"
                    :min="allBitRates[0]"
                    :max="allBitRates[1]"
                    @on-input="value => formData.bitRate=value * 1000"
                    :value="allBitRates[2]"></Slider>
            <span v-if="formData.bitRate != '-1' && formData.bitRate != allBitRates[2]">{{formData.bitRate !== '0' ? parseFloat(formData.bitRate) /1000 : allBitRates[2]}} kbps</span>
            <span v-else
                  v-text="$t('original')"></span>
          </div>
        </FormItem>
      </transition>

      <transition name="fade">
        <FormItem v-if="formData.path || formData.file">
          <div class="converter_footer">
            <Button type="success"
                    :loading="converting"
                    :disabled="!formData.path && !formData.file"
                    @click="convert">
              <span v-if="!converting"
                    v-text="$t('convert')"></span>
              <span v-else>Loading...</span>
              <Icon type="ios-arrow-forward" />
            </Button>
          </div>
        </FormItem>
      </transition>
    </Form>

    <transition name="fade">
      <div class="converter_result"
           v-if="convertResponse.path">
        <div class="converter_result_header">
          <div class="converter_result_header_bg"
               :style="resultStyles"></div>
          <div class="converter_result_header_content"
               :style="converterCardStyles"
               v-text="$t('output')"></div>
        </div>

        <div class="converter_result_error"
             v-if="!convertResponse.path || !convertResponse.path.trim()">
          error
        </div>
        <div class="converter_result_content"
             v-else>
          <Tooltip placement="right"
                   :transfer="true"
                   always>
            <div class="converter_result_content_audio">
              <img :src="convertResponse.cover || 'http://static.dei2.com/images/inig/audio_placeholder.jpg'"
                   alt="预览失败">
              <div class="converter_result_content_audio_player"
                   @click="togglePlay2">
                <svg>
                  <use :xlink:href="playing2 ? '#icon-pause' : '#icon-play'"></use>
                </svg>
                <audio ref="medioPlayerBox2"
                       style="width: 0; height: 0;"
                       preload="auto"
                       :src="convertResponse.path"></audio>
              </div>
            </div>
            <div slot="content"
                 class="result_content">
              <div class="result_content_item"
                   v-if="convertResponse.format && convertResponse.format.tags">{{convertResponse.format.tags.title}}.{{convertResponse.format.format_name}}</div>
              <div class="result_content_item"
                   style="color: #ddd;"
                   v-if="convertResponse.format && convertResponse.format.tags">{{convertResponse.format.tags.artist}}</div>
              <div class="result_content_item"
                   style="color: #bbb;"
                   v-if="convertResponse.format">{{$durationFormat(convertResponse.format.duration) + ' - '}}{{$sizeFormat(convertResponse.format.size)}}</div>
              <div class="result_content_item"
                   style="color: #aaa;"
                   v-if="convertResponse.streams && convertResponse.streams[0] && convertResponse.streams[0].channels">{{convertResponse.streams[0].channels + ' Channels'}}</div>
            </div>
          </Tooltip>

          <!-- <span class="converter_result_content_tip"
                v-text="$t('tip')"></span> -->
          <Button type="success"
                  style="margin-top: 15px;"
                  @click="$downloadImage(convertResponse.path, (convertResponse.format && convertResponse.format.tags && convertResponse.format.tags.title) ? convertResponse.format.tags.title + '.' + convertResponse.format.format_name : '')"
                  v-text="$t('download')"></Button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Form, FormItem, Input, Select, Option, Icon, Slider, Button, Tooltip } from 'view-design'
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
    }
  },
  components: {
    Upload: () => import('../../../components/Upload'),
    Form, FormItem, Input, Select, Option, Icon, Slider, Button, Tooltip
  },
  data () {
    return {
      coverAvailable: ['mp3', 'm4a'],
      playing: false,
      playing2: false,
      converting: false, // 转换中
      mediaInfo: {
        path: '', // 媒体地址
        cover: '',
        accept: '',
        file: null,
        audioType: 'mp3',
        bitRate: '0', // 比特率
        sampleRate: '0', // 采样率
        size: 0, // 文件容量
        duration: 0, // 音频时长
        album: '', // 专辑名
        title: '', // 音频标题
        artist: '', // 歌手
        cut: [0, 100],
        totalDuration: 100, // 音频总时长 单位 s
        volume: 0, // 音量变化，-100 到 100
        br: 0, // 比特率，原始值
        sr: 0, // 采样率，原始值
      },
      formData: {
        bitRate: '',
        sampleRate: '',
        channels: '',
        channelsName: '',
        accept: '',
        type: 'mp3',
        cut: [],
        volume: 0,
        path: '',
        file: null
      },
      convertResponse: {}
      // convertResponse: { "status": 200, "message": "成功", "data": { "path": "http://127.0.0.1/20201014/INIG-audio-30cc376d-6fff-3c5a-f7bea9dbe439.aac" } }
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
    },
    allChannels () {
      // 音频声道
      let m = this.language == 'en' ? {
        mono: 'Mono',
        stereo: 'Stereo',
        quad: 'Quad',
        channels: 'channels',
        original: 'Auto (No Change)'
      } : {
          mono: '单声道',
          stereo: '立体声',
          quad: '四声道',
          channels: '声道',
          original: '自动（无更改）'
        }
      let out = []
      switch (this.formData.audioType) {
        case 'amr':
          out = [
            {
              lable: m.mono,
              value: '1'
            }
          ]
          break
        case 'mp3':
        case 'wma':
          out = [
            {
              label: m.mono,
              value: '1'
            },
            {
              label: m.stereo,
              value: '2'
            }
          ]
          break
        case 'au':
          out = [
            {
              label: `1 ${m.channels}`,
              value: '1'
            },
            {
              label: `2 ${m.channels}`,
              value: '2'
            },
            {
              label: `3 ${m.channels}`,
              value: '3'
            },
            {
              label: `4 ${m.channels}`,
              value: '4'
            },
            {
              label: `5 ${m.channels}`,
              value: '5'
            },
            {
              label: `6 ${m.channels}`,
              value: '6'
            },
            {
              label: `7 ${m.channels}`,
              value: '7'
            },
            {
              label: `8 ${m.channels}`,
              value: '8'
            }
          ]
          break
        case 'opus':
          out = [
            {
              label: m.mono,
              value: '1'
            },
            {
              label: m.stereo,
              value: '2'
            },
            {
              label: '5.0',
              value: '5'
            },
            {
              label: '5.1',
              value: '6'
            },
            {
              label: '6.1',
              value: '7'
            },
            {
              label: '7.1',
              value: '8'
            }
          ]
          break
        default:
          out = [
            {
              label: m.mono,
              value: '1'
            },
            {
              label: m.stereo,
              value: '2'
            },
            {
              label: '2.1',
              value: '3'
            },
            {
              label: m.quad,
              value: '4'
            },
            {
              label: '5.0',
              value: '5'
            },
            {
              label: '5.1',
              value: '6'
            },
            {
              label: '6.1',
              value: '7'
            },
            {
              label: '7.1',
              value: '8'
            },
          ]
          break
      }
      out.unshift({
        label: m.original,
        value: '-1'
      })
      return out
    },
    allBitRates () {
      let out = []
      switch (this.formData.audioType) {
        case 'amr':
          out = [
            {
              label: this.language == 'en' ? 'Auto (No Change)' : '自动（无更改）',
              value: '-1'
            },
            {
              label: '4.75 kbps',
              value: '4750'
            },
            {
              label: '2.15 kbps',
              value: '2150'
            },
            {
              label: '5.9 kbps',
              value: '5900'
            },
            {
              label: '6.7 kbps',
              value: '6700'
            },
            {
              label: '7.4 kbps',
              value: '7400'
            },
            {
              label: '7.95 kbps',
              value: '7950'
            },
            {
              label: '10.2 kbps',
              value: '1020'
            },
            {
              label: '12.2 kbps',
              value: '1220'
            },
          ]
          break
        case 'mp3':
        case 'wma':
          out = [8, 320, 168] // min, max, default
          break
        case 'wav':
        case 'flac':
        case 'ogg':
        case 'au':
        case 'aiff':
          out = []
          break
        case 'aac':
        case 'm4a':
          out = [4, 264, 134]
          break
        case 'opus':
          out = [3, 256, 130]
          break
        default:
          out = []
          break
      }
      return out
    },
    allSampleRates () {
      let m = this.language == 'en' ? {
        original: 'Auto (No Change)'
      } : {
          original: '自动（无更改）'
        }
      let out = []
      switch (this.formData.audioType) {
        case 'amr':
          out = [
            {
              label: '8000 Hz',
              value: '8000'
            }
          ]
          break
        case 'mp3':
          out = [
            {
              label: '8000 Hz',
              value: '8000'
            },
            {
              label: '11025 Hz',
              value: '11025'
            },
            {
              label: '12000 Hz',
              value: '12000'
            },
            {
              label: '16000 Hz',
              value: '16000'
            },
            {
              label: '22050 Hz',
              value: '22050'
            },
            {
              label: '24000 Hz',
              value: '24000'
            },
            {
              label: '32000 Hz',
              value: '32000'
            },
            {
              label: '44100 Hz',
              value: '44100'
            },
            {
              label: '48000 Hz',
              value: '48000'
            }
          ]
          break
        case 'opus':
          out = [
            {
              label: '8000 Hz',
              value: '8000'
            },
            {
              label: '12000 Hz',
              value: '12000'
            },
            {
              label: '16000 Hz',
              value: '16000'
            },
            {
              label: '24000 Hz',
              value: '24000'
            },
            {
              label: '48000 Hz',
              value: '48000'
            }
          ]
          break
        case 'wma':
          out = [
            {
              label: '7350 Hz',
              value: '7350'
            },
            {
              label: '8000 Hz',
              value: '8000'
            },
            {
              label: '11025 Hz',
              value: '11025'
            },
            {
              label: '12000 Hz',
              value: '12000'
            },
            {
              label: '16000 Hz',
              value: '16000'
            },
            {
              label: '22050 Hz',
              value: '22050'
            },
            {
              label: '24000 Hz',
              value: '24000'
            },
            {
              label: '32000 Hz',
              value: '32000'
            },
            {
              label: '44100 Hz',
              value: '44100'
            },
            {
              label: '48000 Hz',
              value: '48000'
            }
          ]
          break
        default:
          out = [
            {
              label: '1000 Hz',
              value: '1000'
            },
            {
              label: '2000 Hz',
              value: '2000'
            },
            {
              label: '4000 Hz',
              value: '4000'
            },
            {
              label: '6000 Hz',
              value: '6000'
            },
            {
              label: '7350 Hz',
              value: '7350'
            },
            {
              label: '8000 Hz',
              value: '8000'
            },
            {
              label: '11025 Hz',
              value: '11025'
            },
            {
              label: '12000 Hz',
              value: '12000'
            },
            {
              label: '16000 Hz',
              value: '16000'
            },
            {
              label: '22050 Hz',
              value: '22050'
            },
            {
              label: '24000 Hz',
              value: '24000'
            },
            {
              label: '32000 Hz',
              value: '32000'
            },
            {
              label: '44100 Hz',
              value: '44100'
            },
            {
              label: '48000 Hz',
              value: '48000'
            },
            {
              label: '64000 Hz',
              value: '64000'
            },
            {
              label: '88200 Hz',
              value: '88200'
            },
            {
              label: '96000 Hz',
              value: '96000'
            },
          ]
          break
      }
      out.unshift({
        label: m.original,
        value: '-1'
      })
      return out
    }
  },
  mounted () {
    this.formData.accept = this.allAudioTypes.map(item => item.label).join(';')
  },
  methods: {
    ...mapActions([
      'moduleConverter'
    ]),
    changeAudioType () {
      this.formData = {
        ...this.formData, ...{
          bitRate: '-1', // s.bit_rate != 'N/A' ? String(s.bit_rate) : String(args.info.format.bit_rate),
          sampleRate: '-1', // s.sample_rate != 'N/A' ? String(s.sample_rate) : String(args.info.format.sample_rate),
          channels: '-1'
        }
      }
    },
    changeFile (args) {
      this.playing = false
      this.playing2 = false
      if (!args.info || !args.info.streams || !args.info.format) return
      let s = args.info.streams[0]
      console.log('>>>>', JSON.stringify(args, null, 2))
      this.mediaInfo = {
        ...this.mediaInfo, ...{
          totalDuration: parseInt(s.duration),
          bitRate: (s.bit_rate && (s.bit_rate != 'N/A')) ? String(s.bit_rate) : String(args.info.format.bit_rate),
          sampleRate: s.sample_rate != 'N/A' ? String(s.sample_rate) : String(args.info.format.sample_rate),
          channels: String(s.channels),
          channelsName: String(s.channel_layout),
          cover: args.info.cover || `http://static.dei2.com/images/inig/audio_placeholder.jpg`,
          // bitRate: parseFloat(args.info.format.bit_rate / 1000).toFixed(1) + ' kbps', // 比特率
          // sampleRate: parseFloat(s.sample_rate / 1000).toFixed(1) + ' kHz', // 采样率
          size: this.$sizeFormat(args.info.format.size), // 文件容量
          duration: this.$durationFormat(s.duration), // 音频时长
          album: args.info.format.tags ? args.info.format.tags.album : (s.tags ? s.tags.album : ''), // 专辑名
          title: (args.info.format.tags ? args.info.format.tags.title : (s.tags ? s.tags.title : args.file.name)) || args.file.name, // 音频标题
          artist: args.info.format.tags ? args.info.format.tags.artist : (s.tags ? s.tags.artist : '') // 歌手
        }
      }
      this.formData = {
        ...this.formData, ...{
          file: args.file,
          path: args.info.audio || '',
          cut: [0, parseInt(s.duration)],
          bitRate: '-1', // s.bit_rate != 'N/A' ? String(s.bit_rate) : String(args.info.format.bit_rate),
          sampleRate: '-1', // s.sample_rate != 'N/A' ? String(s.sample_rate) : String(args.info.format.sample_rate),
          channels: '-1',
          type: 'mp3',
          audioType: 'mp3'
        }
      }
      this.$nextTick(() => {
        let medioPlayerBox = this.$refs.medioPlayerBox
        if (medioPlayerBox) {
          medioPlayerBox.removeEventListener('ended', this.musicStop);
          medioPlayerBox.addEventListener('ended', this.musicStop, false);
        }
        let medioPlayerBox2 = this.$refs.medioPlayerBox2
        if (medioPlayerBox2) {
          medioPlayerBox2.removeEventListener('ended', this.musicStop2);
          medioPlayerBox2.addEventListener('ended', this.musicStop2, false);
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
      this.musicStop2()
      if (this.playing) {
        this.musicStop()
      } else {
        this.musicStart()
      }
    },
    musicStart () {
      this.playing = true
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
    },
    togglePlay2 () {
      this.musicStop()
      if (this.playing2) {
        this.musicStop2()
      } else {
        this.musicStart2()
      }
    },
    musicStop2 () {
      this.playing2 = false
      let medioPlayerBox = this.$refs.medioPlayerBox2
      medioPlayerBox && medioPlayerBox.pause()
    },
    musicStart2 () {
      this.playing2 = true
      let medioPlayerBox = this.$refs.medioPlayerBox2
      if (this.playing2) {
        medioPlayerBox && medioPlayerBox.play()
      } else {
        medioPlayerBox && medioPlayerBox.pause()
      }
    },
    async convert () {
      this.converting = true
      console.log('【Convert】', JSON.stringify(this.formData, null, 2))
      let response = await this.$store.dispatch('moduleConverter/convertAudioFromLocal', this.formData)
      console.log('Response: ', JSON.stringify(response, null, 2))
      this.converting = false
      if (response.status == 200 && response.data && response.data.status === 200 && response.data.data) {
        this.convertResponse = response.data.data
        this.$Message.success({
          content: '转换成功'
        })
      } else {
        this.$Message.success({
          content: '转换失败'
        })
        this.convertResponse = {
          status: 1001,
          message: '失败',
          data: null
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.converter_content {
  width: 100%;
  // height: 400px;
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
      width: 120px;
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
.media_cut_item {
  padding: 0 0 0 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  span {
    white-space: nowrap;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 110px;
    padding: 0 10px 0 10px;
    font-family: Consolas, Menlo, Courier, monospace;
  }
}
.converter_footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
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
    &_audio {
      position: relative;
      width: 150px;
      height: 150px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img {
        max-width: 100%;
        max-height: 100%;
        pointer-events: none;
      }
      &_player {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 1;
        // transition: all 0.3s ease-in-out;
        // transition-delay: 20ms;
        // pointer-events: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        svg {
          width: 48px;
          height: 48px;
          fill: #19be6b;
        }
      }
      // &:hover {
      //   .converter_result_content_audio_player {
      //     pointer-events: auto;
      //     opacity: 1;
      //   }
      // }
    }
    &_tip {
      margin-top: 15px;
      color: #aaa;
    }
  }
}
.result_content {
  max-width: 250px;
  display: flex;
  flex-direction: column;
  &_item {
    width: 100%;
    word-break: break-all;
    white-space: pre-wrap;
    font-size: 14px;
    line-height: 1.5;
  }
}
</style>