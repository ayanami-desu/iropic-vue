<template>
  <div
    v-loading="pageLoading"
    class="page-con"
  >
    <div class="title-con">
      <div>
        <span>画师：</span>
        <span>{{ imageInfo.author }}</span>
      </div>
      <div>
        <span>下载于：</span>
        <time>{{ stamp2Date(imageInfo.edit_time) }}</time>
      </div>
      <div>
        <span>大小：</span>
        <span>{{ imageSize.toFixed(2) }} MB</span>
      </div>
    </div>
    <div class="img-con">
      <el-image
        :src="image_url + pid"
        fit="scale-down"
        class="the-image"
      />
    </div>
    <div>
      <el-button @click="seeOriginImg">
        查看原图
      </el-button>
      <el-button @click="setAlbumCover(pid)">
        设为相册封面
      </el-button>
    </div>
    <div class="tag-con">
      <el-tag
        v-for="tag in imageInfo.labels"
        :key="tag"
        effect="dark"
        closable
        @close="handleTagClose(tag)"
      >
        {{ tag }}
      </el-tag>
    </div>
    <div v-if="imageInfo.labels.length == 0">
      暂无标签
    </div>
    <div class="label-input">
      <el-select
        v-model="selectedLables"
        value-key="selectedLables"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入标签"
        :remote-method="searchLabel"
        :loading="searchLoading"
      >
        <el-option
          v-for="item in remoteLabelList"
          :key="item.name"
          :value="item.name"
        >
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{
            item.images_num
          }}</span>
        </el-option>
      </el-select>
      <div>
        <el-button @click="putImgLabel">
          增加
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { setAlbumCoverReq } from "@/api/album.js";
import { searchLabelReq } from "@/api/label.js";
import { getImgInfoReq, putImgLabelReq, delImgLabelReq } from "@/api/image.js";

export default {
  name: "ImageDetail",
  data() {
    return {
      image_url: this.MyEnv.image_url,
      pid: this.$route.query.pid,
      imageInfo: {
        belong_to_album: "",
        edit_time: "",
        labels: [],
        origin_filename: "",
        author: "",
      },
      pageLoading: true,
      imageSize: 0,
      remoteLabelList: [],
      selectedLables: [],
      searchLoading: false,
    };
  },
  methods: {
    stamp2Date(stamp) {
      let date = new Date(parseInt(stamp));
      let Y = date.getFullYear() + "-";
      let M = date.getMonth() + 1 + "-";
      let D = date.getDate() + " ";
      let h = date.getHours() + ":";
      let m = date.getMinutes();
      return Y + M + D + h + m;
    },
    seeOriginImg() {
      let url = this.image_url + this.pid + "&fileType=origin";
      window.open(url, "_blank");
    },
    async getImgInfo(params) {
      let res = await getImgInfoReq(params);
      this.imageInfo = res.data;
      this.imageSize = res.size / (1024 * 1024);
      this.pageLoading = false;
    },
    async setAlbumCover(pid) {
      let res = await setAlbumCoverReq(pid);
      this.$message(res.msg);
    },
    searchLabel(query) {
      let that = this;
      if (query !== "") {
        this.searchLoading = true;
        setTimeout(() => {
          this.searchLoading = false;
          searchLabelReq(query).then((res) => {
            that.remoteLabelList = res.data;
          });
        }, 500);
      } else {
        this.remoteLabelList = [];
      }
    },
    putImgLabel() {
      if (this.selectedLables.length == 0) return;
      let that = this;
      let labelString = this.selectedLables.join(",");
      putImgLabelReq({
        labels: labelString,
        pid: this.pid,
      }).then((res) => {
        console.log(res);
        that.getImgInfo({
          pid: that.pid,
        });
      });
    },
    handleTagClose(tag) {
      console.log(tag);
      this.$confirm("此操作将移除此标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delImgLabelReq({
            pid: this.pid,
            label: tag,
          }).then(() => {
            this.getImgInfo({
              pid: this.pid,
            });
          });
          this.$message({
            type: "success",
            message: "删除成功!",
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
    this.getImgInfo({
      pid: this.pid,
    });
  },
};
</script>
<style scoped>
.title-con {
  display: flex;
}
.page-con {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: 100vh; */
}

@media screen and (max-width: 600px) {
  /* 移动端 */
  .title-con {
    flex-wrap: nowrap;
    flex-direction: column;
  }
  .the-image {
    width: 100%;
  }
  .img-con {
    width: 90vw;
  }
}
@media screen and (min-width: 601px) {
  /* 桌面端 */
  .title-con {
    width: 50vw;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .the-image {
    height: 100%;
  }
  .img-con {
    height: calc(100vh - 2em);
  }
}
.img-con {
  margin-bottom: 1em;
}
.tag-con {
  display: flex;
  width: 50vw;
}
.label-input {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}
</style>