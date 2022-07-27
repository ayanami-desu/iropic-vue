<template>
  <el-drawer
    title="相册"
    :visible.sync="drawer"
    direction="ltr"
    :modal-append-to-body="false"
    :with-header="false"
    size="40%"
    @open="openDrawerHandler"
  >
    <div class="labels-container">
      <div
        v-for="label in labelList"
        :key="label.name"
        class="label-item"
      >
        <el-badge :value="label.images_num">
          <el-tag @click="gotoTheLabel(label.name)">
            # {{ label.name }}
          </el-tag>
        </el-badge>
      </div>
    </div>
    <div class="form-con">
      <el-input
        v-model="inputLabel"
        placeholder="请输入标签，多个以英文逗号分隔"
      />
      <el-button
        style="margin-top:1em;"
        @click="submitNewLabel"
      >
        提交
      </el-button>
    </div>
  </el-drawer>
</template>
<script>
import { getLabelListReq, newLabelReq } from "@/api/label.js";

export default {
  name: "LabelDrawer",
  data() {
    return {
      drawer: false,
      labelList: [],
      inputLabel: ''
    };
  },
  methods: {
    //打开抽屉时的回调函数，获取全部标签。
    openDrawerHandler() {
      if (this.labelList.length === 0){
        this.getLabelList();
      }
      
    },
    gotoTheLabel(name){
      this.$router.push('/tag/' + name)
    },
    async getLabelList() {
      let res = await getLabelListReq();
      this.labelList = res.data;
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
};
</script>
<style scoped>
.labels-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: 2em;
}
.label-item{
  padding: 0 1em;
  margin: 0.5em 0;
  width: 20%;
  box-sizing: border-box;
  cursor: pointer;
}
.form-con{
  width: 60%;
  margin: 1em auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>