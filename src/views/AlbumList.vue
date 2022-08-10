<template>
  <div class="all-con">
    <div
      v-for="album in albumList"
      :key="album.id"
      class="cell-item"
    >
      <el-image
        @click="gotoAlbum(album.id)"
        lazy
        class="cell-img"
        :src="getAlbumCover(album.id)"
        alt="加载错误"
        fit="cover"
      >
        <div
          slot="error"
          class="image-slot"
        >
          <img
            src="../assets/gallery-line.svg"
            class="error-img"
          >
        </div>
      </el-image>
      <div class="item-body">
        <div class="item-desc">
          <span>{{ album.name }}</span>
        </div>
        <div
          class="item-desc"
          v-if="album.desc"
        >
          {{ album.desc }}
        </div>
        <div
          class="item-desc"
          v-else
        >
          给相册加个描述吧
        </div>
        <div class="item-desc">
          <span>包含{{ album.images_num }}张图片</span>
          <span
            class="action-icon"
            @click="editThisAlbum(album)"
          >
            <i
              class="el-icon-edit-outline"
            />
          </span>
          <span
            class="action-icon"
            @click="delThisAlbum(album.id)"
          >
            <i
              class="el-icon-delete"
            />
          </span>
        </div>
      </div>
    </div>
    <EditAlbumDialog ref="dialog" />
    <div
      class="add-btn"
      @click="createAlbum"
    >
      <i class="el-icon-circle-plus-outline" />
    </div>
  </div>
</template>
<script>
import { getAlbumListReq, delAlbumReq } from "@/api/album.js";
import EditAlbumDialog from "@/components/EditAlbumDialog.vue";
export default {
  name: "Album",
  data() {
    return {
      coverFit: "cover",
      albumList: [],
    };
  },
  components: {
    EditAlbumDialog,
  },
  created: function () {
    this.getAlbumList();
  },
  methods: {
    async getAlbumList() {
      let res = await getAlbumListReq();
      this.albumList = res.data;
    },
    gotoAlbum(data) {
      this.$router.push({
        path: "album/" + data,
      });
    },
    getAlbumCover(albumId) {
      return this.MyEnv.cover_url + albumId;
    },
    editThisAlbum(album) {
      this.$refs.dialog.action = "edit";
      this.$refs.dialog.temp = album;
      this.$refs.dialog.dialogVisible = true;
    },
    createAlbum() {
      this.$refs.dialog.action = "add";
      this.$refs.dialog.dialogVisible = true;
    },
    delThisAlbum(albumId) {
      this.$confirm("此操作将永久删除该相册, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delAlbumReq({
            albumId: albumId,
          }).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
            });
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
};
</script>

<style scoped>
.all-con {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  overflow-y: auto;
  width: 100%;
}
@media screen and (max-width: 600px) {
  .cell-item {
    width: 50%;
  }
}
@media screen and (min-width: 601px) {
  .cell-item {
    width: 25%;
  }
}
.cell-item {
  height: 300px;
  box-sizing: border-box;
  overflow: hidden;
  padding: 4px;
}
.cell-img {
  height: 80%;
  width: 100%;
  cursor: pointer;
  display: block;
}
.error-img {
  margin: auto;
  display: block;
  width: 80%;
}
.item-body {
  background: #c4c4c4;
  display: flex;
  flex-direction: column;
}
.item-desc {
  color: #333;
}
.action-icon {
  margin-left: 1em;
  user-select: none;
  cursor: pointer;
}
.add-btn {
  position: fixed;
  cursor: pointer;
  background: #1ec7b0;
  color: white;
  right: 1em;
  bottom: 1em;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>