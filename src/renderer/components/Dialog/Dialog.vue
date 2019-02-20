<template>
<div class="dialog-box">
    <div class="mask"></div>
</div>
</template>
<script>
export default {
}
</script>
<style lang="scss">
.dialog-box {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: rgba(0,0,0,.6);
  z-index: 100;
}
</style>

