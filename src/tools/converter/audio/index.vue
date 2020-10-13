<i18n>
{
  "en": {
    "tab1": "convert remote audio",
    "tab2": "convert local audio"
  },
  "cn": {
    "tab1": "转换网络音频",
    "tab2": "转换本地音频"
  }
}
</i18n>
<template>
  <div class="converter">
    <div class="converter_card"
         :style="converterCardStyles">
      <div class="converter_card_type">
        <ButtonGroup>
          <Button :type="sourceType == 'http' ? 'primary' : 'default'"
                  @click="sourceType = 'http'"
                  v-text="$t('tab1')"></Button>
          <Button :type="sourceType == 'local' ? 'primary' : 'default'"
                  @click="sourceType = 'local'"
                  v-text="$t('tab2')"></Button>
        </ButtonGroup>
      </div>
      <transition name="fade">
        <div class="converter_card_content"
             v-if="sourceType == 'http'">
          <AudioContent :type="sourceType"
                        :all-audio-types="allAudioTypes"></AudioContent>
        </div>
      </transition>
      <transition name="fade">
        <div class="converter_card_content"
             v-if="sourceType != 'http'">
          <AudioContent :type="sourceType"
                        :all-audio-types="allAudioTypes"></AudioContent>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ButtonGroup, Button } from 'view-design'
export default {
  name: 'ConverterAudio',
  components: {
    AudioContent: () => import('./AudioContent'),
    ButtonGroup, Button
  },
  data () {
    return {
      sourceType: 'http',
      allAudioTypes: [
        {
          label: 'mp3',
          value: 'audio/mpeg'
        },
        {
          label: 'wav',
          value: 'audio/x-wav'
        },
        {
          label: 'flac',
          value: 'audio/flac'
        },
        {
          label: 'ogg',
          value: 'audio/ogg'
        },
        {
          label: 'aac',
          value: 'audio/x-aac'
        },
        {
          label: 'm4a',
          value: 'audio/mp4'
        },
        {
          label: 'wma',
          value: 'audio/x-ms-wma'
        },
        // {
        //   label: 'mka',
        //   value: 'audio/x-matroska'
        // },
        {
          label: 'au',
          value: 'audio/basic'
        },
        {
          label: 'aiff',
          value: 'audio/x-aiff'
        },
        {
          label: 'opus',
          value: 'audio/ogg'
        },
        {
          label: 'ra',
          value: 'audio/x-pn-realaudio'
        },
        {
          label: 'amr',
          value: 'audio/AMR'
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
  }
}
</script>

<style lang="less" scoped>
.converter {
  // width: calc(100% - 420px);
  flex: 1;
  height: 100%;
  padding: 15px 0;
  box-sizing: border-box;
  // display: flex;
  // flex-direction: row;
  // justify-content: center;
  &_card {
    position: relative;
    width: calc(100% - 30px);
    // height: 100%;
    margin: 10px auto;
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
      // height: calc(100% - 64px);
      // left: 0;
      // top: 64px;
      // padding: 15px 30px;
      // box-sizing: border-box;
    }
  }
}
</style>