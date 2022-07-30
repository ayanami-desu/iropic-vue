<template>
  <div class="con">
    <span><i class="el-icon-copy-document" /></span>
    <span>{{ num + 1 }}</span>
  </div>
</template>

<script>
export default {
    name: 'ImageNumBadge',
    props:{
        num:{
            type: Number,
            default: 0
        }
    }
}
</script>

<style scoped>
.con{
    background: rgba(0, 0, 0, 0.32);
    color: rgb(255, 255, 255);
    padding: 0px 6px;
    box-sizing: border-box;
    font-weight: bold;
    display: flex;
    position: absolute;
    top: 1em;
    left: 1em;
    height: 20px;
    min-width: 20px;
    border-radius: 10px;
    font-size: 10px;
    line-height: 10px;
    z-index: 2;
    justify-content: center;
    align-items: center;
}
</style>>