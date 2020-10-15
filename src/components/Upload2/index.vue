<template>
  <div class="uploader">
    <input type="file"
           @change="uploadFile">
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('../../../store/modules')
export default {
  name: 'MediaUploader',
  methods: {
    ...mapActions([
      'moduleConverter'
    ]),
    uploadFile (e) {
      this.$store.dispatch('moduleConverter/getAudioInfoFromLocal', {
        accept: "mp3;zip",
        file: e.currentTarget.files[0]
      }).then(response => {
        console.log(response)
        if (response && response.status == 200 && response.data && response.data.status == 200 && response.data.data) {
          this.audioInfo = response.data.data
        } else {
          this.audioInfo = {
            status: 1001,
            message: '失败',
            data: null
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.uploader {
  width: 200px;
  height: 200px;
  background-color: lightblue;
}
</style>