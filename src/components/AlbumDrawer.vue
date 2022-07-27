<template>
  <el-drawer
    title="相册"
    :visible.sync="drawer"
    direction="rtl"
    :modal="false"
    :with-header="false"
    size="40%"
    @open="openDrawerHandler"
    @close="closeDrawerHandler"
  >
    <div class="drawer-con">
      <div class="drawer-header">
        <div>
          <span
            style="cursor: pointer; color: black"
            @click="gotoAlbumList"
          ><slot /></span>
          <i
            class="el-icon-circle-plus-outline drawer-icon"
            @click="expandForm1 = !expandForm1"
          />
        </div>
        <div @click="drawer = false">
          <i class="el-icon-close drawer-icon" />
        </div>
      </div>
      <el-form
        v-show="expandForm1"
        label-position="right"
        label-width="80px"
        :model="albumFormData1"
        class="album-form"
        ref="albumForm1"
      >
        <el-form-item label="相册名">
          <el-input v-model="albumFormData1.name" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="albumFormData1.desc" />
        </el-form-item>
        <el-form-item label="私密">
          <el-switch v-model="albumFormData1.isR18" />
        </el-form-item>
        <el-button
          type="primary"
          @click="submitAlbumData1"
        >
          创建相册
        </el-button>
      </el-form>
      <div class="albums-con">
        <div
          v-for="album in albumList"
          :key="album.id"
          class="album-item"
        >
          <span
            @click="gotoAlbum(album.id)"
            style="flex: 3"
          >{{
            album.name
          }}</span>

          <span style="flex: 1">
            {{ album.images_num }}
          </span>
          <span
            style="flex: 1"
            @click="editAlbum(album)"
          ><i
            class="el-icon-edit-outline"
          /></span>
          <span
            style="flex: 1"
            @click="deleteAlbum(album.id)"
          ><i
            class="el-icon-delete"
          /></span>
        </div>
        <el-form
          v-show="expandForm2"
          label-position="right"
          label-width="80px"
          :model="albumFormData2"
          class="album-form"
          ref="albumForm2"
        >
          <el-form-item label="相册名">
            <el-input v-model="albumFormData2.name" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="albumFormData2.desc" />
          </el-form-item>
          <el-form-item label="私密">
            <el-switch v-model="albumFormData2.isR18" />
          </el-form-item>
          <el-button
            type="primary"
            @click="submitAlbumData2"
          >
            确认修改
          </el-button>
        </el-form>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import {
  getAlbumListReq,
  newAlbumReq,
  deleteAlbumReq,
  editAlbumReq,
} from "@/api/album.js";
export default {
  name: "AlbumDrawer",
  props: {},
  data() {
    return {
      drawer: false,
      expandForm1: false,
      expandForm2: false,
      albumList: [],
      albumFormData1: {
        name: "",
        desc: "",
        isR18: false,
      },
      albumFormData2: {
        name: "",
        desc: "",
        isR18: false,
      },
    };
  },
  methods: {
    //打开抽屉时的回调函数，获取相册列表。
    openDrawerHandler() {
      this.getAlbumList();
    },
    closeDrawerHandler() {
      this.expandForm1 = false;
      this.expandForm2 = false;
      this.clearAlbumForm(1);
      // Object.assign(this.$data.albumFormData1, this.$options.data().albumFormData1)
    },
    clearAlbumForm(index) {
      let temp = {
        name: "",
        desc: "",
        isR18: false,
      };
      index === 1 ? (this.albumFormData1 = temp) : (this.albumFormData2 = temp);
    },
    gotoAlbumList() {
      this.$router.replace("/albums");
    },
    async getAlbumList() {
      let res = await getAlbumListReq();
      this.albumList = res.data;
    },
    gotoAlbum(data) {
      this.$router.push({
        path: "/album/" + data,
      });
    },
    submitAlbumData1() {
      newAlbumReq(this.albumFormData1)
        .then((res) => {
          this.$message(res.msg);
          this.clearAlbumForm(1);
          this.expandForm = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitAlbumData2() {
      editAlbumReq(this.albumFormData2)
        .then((res) => {
          this.$message(res.msg);
          this.expandForm = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteAlbum(albumId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAlbumReq({
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
    editAlbum(album) {
      this.expandForm2 = !this.expandForm2;
      if (!this.expandForm2) return;
      this.albumFormData2["albumId"] = album.id;
      this.albumFormData2["name"] = album.name;
      this.albumFormData2["desc"] = album.desc;
      this.albumFormData2["isR18"] = album.isR18;
    },
  },
};
</script>

<style scoped>
.album-form {
  display: flex;
  width: 90%;
  flex-direction: column;
  padding: 1em 0;
  border-bottom: 1px solid #e5e7eb;
}
.drawer-con {
  display: flex;
  width: 100%;
  padding-top: 60px;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
}
.drawer-header {
  display: flex;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
  font-size: 120%;
  font-weight: bold;
  border-bottom: 1px solid #e5e7eb;
}
.drawer-icon {
  color: #3b82f6;
  font-weight: bolder;
  cursor: pointer;
}
.albums-con {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
.album-item {
  display: flex;
  background: #edeef0;
  color: black;
  height: 30px;
  width: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  border-radius: 0.5em;
  align-items: center;
  margin: 1em 0;
}
.album-item span {
  text-align: center;
  cursor: pointer;
}
</style>>