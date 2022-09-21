<template>
  <div class="con">
    <div class="form-con">
      <el-input
        v-model="inputLabel"
        placeholder="请输入标签，多个以英文逗号分隔"
      />
      <el-button
        style="margin-top: 1em"
        @click="submitNewLabel"
      >
        提交
      </el-button>
    </div>
    <div class="labels-con">
      <div
        v-for="label in labelList"
        :key="label.id"
        class="label-item"
      >
        <el-badge :value="label.imageNum">
          <el-tag
            @click="gotoTheLabel(label.name)"
            closable
            @close="handleRemoveLabel(label.id)"
          >
            # {{ label.name }}
          </el-tag>
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script>
import { getLabelListReq, newLabelReq, delLabelReq } from "@/api/label.js";

export default {
  name: "AllLabel",
  data() {
    return {
      labelList: [],
      inputLabel: "",
    };
  },
  methods: {
    gotoTheLabel(name) {
      this.$router.push("/tag/" + name);
    },
    async getLabelList() {
      let res = await getLabelListReq();
      this.labelList = res.data;
    },
    async submitNewLabel() {
      let res = await newLabelReq({
        labelStr: this.inputLabel,
      });
      this.getLabelList();
      this.$message(res.msg);
      this.inputLabel = "";
    },
    handleRemoveLabel(lid) {
      this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delLabelReq({
            lid: lid
          })
            .then((res) => {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getLabelList();
            })
            .catch((err) => {
              this.$message.error("出错了");
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created: function () {
    this.getLabelList();
  },
};
</script>

<style scoped>
.con {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.labels-con {
  /* max-width: 80%; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.label-item {
  padding: 0 0.5em;
  margin: 0.5em 0;
  box-sizing: border-box;
  cursor: pointer;
}
.form-con {
  width: 60%;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>