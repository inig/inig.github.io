<i18n>
{
  "en": {
    "tab1": "convert remote video",
    "tab2": "convert local video"
  },
  "cn": {
    "tab1": "转换网络视频",
    "tab2": "转换本地视频"
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
        </div>
      </transition>
      <transition name="fade">
        <div class="converter_card_content"
             v-if="sourceType != 'http'">
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ButtonGroup, Button } from 'view-design'
export default {
  name: 'ConverterVideo',
  components: {
    ButtonGroup, Button
  },
  data () {
    return {
      sourceType: 'http'
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