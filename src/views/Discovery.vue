<template>
  <div>
    <span @click="getPidList()"><i class="el-icon-refresh" />换一批</span>
    <el-input-number
      v-model="imageNum"
      :min="1"
      :max="10"
      label="数量"
    />
    <el-image
      lazy
      :src="getImage(pid)"
      v-for="pid in pidList"
      :key="pid"
    />
  </div>
</template>

<script>
import { getRandomImgReq } from "@/api/image.js";
export default {
  name: "Discovery",
  
  data() {
    return {
      pidList: [],
      imageNum: 8,
    };
  },
  methods: {
    async getPidList() {
      let res = await getRandomImgReq({
        field: "pidList",
        num: this.imageNum,
      });
      this.pidList = res.pidList;
    },
    getImage(pid) {
      return this.MyEnv.image_url + pid;
    },
  },
  created: function () {
    this.getPidList();
  },
};
</script>

<style scoped>
</style>