<template>
  <div
    class="tool-con"
    v-if="hasSelectedImg"
  >
    <el-collapse-transition>
      <div
        class="tool-items-con"
        v-show="expandTool"
      >
        <el-tooltip
          v-for="(tool, index) in toolList"
          :key="index"
          :content="tool.desc"
          placement="left-start"
        >
          <div
            :style="{ background: tool.bgColor }"
            class="tool-item"
            @click="startToolAction(tool.action)"
          >
            <i :class="tool.icon" />
          </div>
        </el-tooltip>
      </div>
    </el-collapse-transition>
    <transition name="el-fade-in-linear">
      <div
        class="tool-num"
        @click="expandTool = !expandTool"
      >
        <span>{{ selectedImgList.length }}</span>
      </div>
    </transition>
    <SelectAlbumDialog
      ref="albumDialog"
      @finish="moveImgToAlbum"
    />
  </div>
</template>

<script>
import { setImgR18Req, cancelImgR18Req, deleteImgReq } from "@/api/image.js";
import { moveImgToAlbumReq } from "@/api/album.js";
import SelectAlbumDialog from "./SelectAlbumDialog.vue";

export default {
  name: "HoverTool",
  props: {
    selectedImgList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    SelectAlbumDialog,
  },
  data() {
    return {
      toolList: [
        {
          icon: "el-icon-close",
          action: "cancelSelect",
          bgColor: "#5b5b5b",
          desc: "取消选择",
        },
        {
          icon: "el-icon-delete-solid",
          action: "deleteImgs",
          bgColor: "#e88383",
          desc: "删除",
        },
        {
          icon: "el-icon-lock",
          action: "setImgR18",
          bgColor: "#ffb51e",
          desc: "设置为R18",
        },
        {
          icon: "el-icon-unlock",
          action: "cancelImgR18",
          bgColor: "#ffb51e",
          desc: "取消R18",
        },
        {
          icon: "el-icon-folder-opened",
          action: "moveImgToAlbum",
          bgColor: "#1ec7b0",
          desc: "移动到相册",
        },
        {
          icon: "el-icon-download",
          action: "downloadImg",
          bgColor: "#1ec0d9",
          desc: "下载",
        },
        {
          icon: "el-icon-s-flag",
          action: "setLabel",
          bgColor: "#8c2817",
          desc: "设置标签",
        },
      ],
      expandTool: false,
    };
  },
  methods: {
    startToolAction(action) {
      switch (action) {
        case "cancelSelect":
          this.cancelSelect();
          break;
        case "deleteImgs":
          this.deleteImgs();
          break;
        case "setImgR18":
          this.setImgR18();
          break;
        case "cancelImgR18":
          this.cancelImgR18();
          break;
        case "moveImgToAlbum":
          this.$refs.albumDialog.dialogVisible = true;
          break;
        case "downloadImg":
          this.downloadImg();
          break;
        case "setLabel":
          this.setLabel();
          break;
      }
    },
    cancelSelect() {
      this.$emit("cancelSelect");
      this.expandTool = false;
    },
    deleteImgs() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteImgReq({
            pidList: this.selectedImgList,
          }).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.cancelSelect();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    setImgR18() {
      setImgR18Req({
        pidList: this.selectedImgList,
      }).then((res) => {
        this.$message(res.msg);
        this.cancelSelect();
      });
    },
    cancelImgR18() {
      cancelImgR18Req({
        pidList: this.selectedImgList,
      }).then((res) => {
        this.$message(res.msg);
        this.cancelSelect();
      });
    },
    moveImgToAlbum(albumId) {
      moveImgToAlbumReq({
        pidList: this.selectedImgList,
        albumId: albumId,
      })
        .then((res) => {
          this.$message(res.msg);
          this.cancelSelect();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    downloadImg(){
      this.$message({
        type: 'error',
        message: '暂不支持'
      })
    },
    setLabel(){
      this.$message('敬请期待')
    },
  },
  computed: {
    hasSelectedImg() {
      return this.selectedImgList.length !== 0;
    },
  },
};
</script>

<style scoped>
.tool-con {
  position: fixed;
  color: white;
  right: 1em;
  bottom: 0.5em;
  z-index: 13;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tool-num {
  background: #5b5b5b;
  margin: 0.5em 0;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.tool-item {
  margin: 0.5em 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>