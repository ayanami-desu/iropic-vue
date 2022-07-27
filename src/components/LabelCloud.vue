<template>
  <div>
    <div class="all-tags-con">
      <div
        v-for="label in labelList"
        :key="label.name"
        class="label-item"
        @click="addLabel(label.name)"
      >
        # <span :style="labelFontSize(label.images_num)">{{ label.name }}</span>
      </div>
    </div>
    <div class="form-con">
      <el-input
        v-model="inputLabel"
        placeholder="请输入标签，多个以英文逗号分隔"
      />
      <el-button
        style="margin:1em 0;"
        @click="submitNewLabel"
      >
        提交
      </el-button>
    </div>
  </div>
</template>

<script>
import { getLabelListReq, newLabelReq } from "@/api/label.js";
export default {
  name: "LabelCloud",
  data() {
    return {
      labelList: [],
      inputLabel: '',
    };
  },
  methods: {
    async getLabelList() {
      let res = await getLabelListReq();
      this.labelList = res.data;
    },
    labelFontSize(num) {
      let big = Math.ceil(num / 50) + 16;
      return "font-size:" + big + "px";
    },
    addLabel(label) {
      this.$emit("addLabel", label);
    },
    async submitNewLabel(){
      let res = await newLabelReq({
        labels: this.inputLabel
      })
      this.getLabelList()
      this.$message(res.msg)
      this.inputLabel = ''
    },
  },
  created: function () {
    this.getLabelList();
  },
};
</script>

<style scoped>
.all-tags-con {
  max-width: 80%;
  margin: 1em auto;
  padding: 1em 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.label-item {
  user-select: none;
  cursor: pointer;
  margin: auto 8px;
  padding: 2px;
}
.form-con{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>