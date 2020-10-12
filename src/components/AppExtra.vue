<i18n>
{
  "en": {
    "enkel": "Enkel - dev tools base on chrome extension"
  },
  "cn": {
    "enkel": "Enkel开发者工具-谷歌扩展"
  }
}
</i18n>
<template>
  <div class="app_extra">
    <div class="app_extra_item">
      <img src="@/assets/enkel_plugin2.png"
           :alt="$t('enkel')"
           :title="$t('enkel')">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppExtra'
}
</script>

<style lang="less" scoped>
.app_extra {
  width: 100%;
  height: 100%;
  background-color: transparent;
  &_item {
    width: 200px;
    height: 200px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    overflow: hidden;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>