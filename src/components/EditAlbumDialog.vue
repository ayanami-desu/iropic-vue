<template>
  <el-dialog
    title="选择相册"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    :center="true"
    :destroy-on-close="true"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-form
      label-position="right"
      label-width="80px"
      :model="albumData"
      class="album-form"
      ref="albumForm"
    >
      <el-form-item label="相册名">
        <el-input v-model="albumData.name" />
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="albumData.desc" />
      </el-form-item>
      <el-form-item label="私密">
        <el-switch v-model="albumData.isR18" />
      </el-form-item>
      <el-button
        type="primary"
        @click="submitForm"
      >
        确定
      </el-button>
    </el-form>
  </el-dialog>
</template>

<script>
import { editAlbumReq, newAlbumReq } from "@/api/album.js";

export default {
  name: "EditAlbumDialog",
  data() {
    return {
      dialogVisible: false,
      action: null,
      temp: {
        name: "",
        desc: "",
        isR18: false,
        z: "abcac",
      },
      albumData: {
        name: "",
        desc: "",
        isR18: false,
        r: "abxic",
      },
    };
  },
  methods: {
    handleOpen() {
      //this.albumData["albumId"] = this.temp['id']
      if (this.action == 'add') return
      this.albumData["name"] = this.temp["name"];
      this.albumData["desc"] = this.temp["desc"];
      this.albumData["isR18"] = this.temp["isR18"];
    },
    handleClose() {
      this.albumData = {
        name: "",
        desc: "",
        isR18: false,
        r: 'xajnxi',
      }
    },
    submitForm() {
      if (this.action == "edit") {
        this.editAlbum();
      } else if (this.action == "add") {
        this.createAlbum();
      }
    },
    editAlbum() {
      this.albumData["albumId"] = this.temp["id"];
      editAlbumReq(this.albumData)
        .then((res) => {
          this.$message(res.msg);
        })
        .catch((err) => {
          this.$message.error("出错了");
          console.log(err);
        });
    },
    createAlbum() {
      newAlbumReq(this.albumData)
        .then((res) => {
          this.$message(res.msg);
        })
        .catch((err) => {
          this.$message.error("出错了");
          console.log(err);
        });
    },
  },
};
</script>