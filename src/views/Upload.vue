<template>
  <div class="upload">
    <div class="to-album">
      <div>上传到相册</div>
      <el-select
        v-model="selectedAlbum"
        value-key="selectedAlbum"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="item in albumList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
    <div>
      <el-button
        type="text"
        @click="startUpload"
      >
        让我们开始涩涩吧
      </el-button>
    </div>
    <el-upload
      ref="upload"
      class="main-area"
      drag
      :data="uploadData"
      :action="uploadUrl"
      multiple
      accept="image/jpg, image/jpeg, image/png"
      :before-upload="beforeUploadHandler"
      :auto-upload="false"
      :headers="uploadHeaders"
      :on-error="onErrorHandler"
    >
      <i class="el-icon-upload" />
      <div>点击上方文字上传全部已选择文件</div>
      <template #tip>
        <div class="el-upload__tip">
          <span>登录后才能上传，一次最多5张</span>
        </div>
      </template>
    </el-upload>
    <div>
      <el-button
        type="text"
        @click="$router.push('/')"
      >
        回首页
      </el-button>
      <el-button
        type="text"
        @click="$refs.upload.clearFiles()"
      >
        清空文件列表
      </el-button>
    </div>
  </div>
</template>

<script>
import { getAlbumListReq } from "@/api/album.js";

export default {
  name: "Upload",
  data() {
    return {
      uploadUrl: this.MyEnv.api_url + "image/upload",
      uploadData: {},
      selectedAlbum: null,
      value: null,
      albumList: [],
    };
  },
  created: function () {
    this.getAlbumList();
  },
  computed: {
    uploadHeaders: function () {
      let token = localStorage.getItem("token");
      return { Authorization: "Bearer " + token };
    },
  },
  methods: {
    beforeUploadHandler(file) {
      this.uploadData["name"] = file.name;
      this.uploadData["size"] = file.size;
      this.uploadData["lastModified"] = file.lastModified;
      this.uploadData["fileType"] = file.type;
      if (this.selectedAlbum) this.uploadData["aid"] = this.selectedAlbum;
    },
    onErrorHandler(err) {
      switch (err.status) {
        case 400:
          this.$message.error("参数有误");
          break;
        case 402:
          this.$message.error("不支持的文件类型");
          break;
        case 403:
          this.$router.push("/login");
          break;
        case 404:
          this.$message.error("未检测到文件");
          break;
        case 500:
          this.$message.error("上传失败，可能上传了相同图片");
          break;
      }
    },
    // uploadImg(params){
    //   let form = new FormData()
    //   let config = {
    //      headers: {'Content-Type': 'multipart/form-data'}
    //   }
    //   form.append('file', params.file)
    //   for(let key in params.data){
    //     form.append(key,params.data[key])
    //   }
    //   uploadImgReq(form,config).then(() => {

    //   }).catch((err) => {
    //     console.log(err)
    //   })
    // },
    startUpload() {
      this.$refs.upload.submit();
    },
    async getAlbumList() {
      let res = await getAlbumListReq();
      this.albumList = res.data;
    },
  },
};
</script>

<style scoped>
.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
  width: 100%;
}
.main-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.to-album {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
}
</style>