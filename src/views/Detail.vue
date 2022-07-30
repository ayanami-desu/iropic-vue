<template>
  <div
    v-loading="pageLoading"
    class="page-con"
  >
    <div class="title-con">
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
      <div
        class="arrow-con"
        @click="prevOrNext('prev')"
      >
        <i class="el-icon-caret-left" />
      </div>
      <el-image
        :src="image_url + pid"
        fit="scale-down"
        class="the-image"
      />
      <div class="arrow-con">
        <i
          class="el-icon-caret-right"
          @click="prevOrNext('next')"
        />
      </div>
    </div>
    <div
      class="img-con"
      v-for="subPid in imageInfo.images_set"
      :key="subPid"
    >
      <el-image
        :src="image_url + subPid"
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
    <el-divider />
    <div class="tag-con">
      <el-tag
        v-for="tag in imageInfo.labels"
        :key="tag"
        effect="dark"
        closable
        @close="handleTagClose(tag)"
        class="tag-item"
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
      <div style="margin: 1em 0">
        <el-button @click="putImgLabel">
          增加
        </el-button>
      </div>
    </div>
    <el-divider />
    <keep-alive>
      <LabelCloud @addLabel="handleAddLabel" />
    </keep-alive>
  </div>
</template>
<script>
import { setAlbumCoverReq } from "@/api/album.js";
import { searchLabelReq } from "@/api/label.js";
import { getImgInfoReq, putImgLabelReq, delImgLabelReq } from "@/api/image.js";
import LabelCloud from "../components/LabelCloud.vue";

export default {
  name: "ImageDetail",
  components: {
    LabelCloud,
  },
  data() {
    return {
      image_url: this.MyEnv.image_url,
      pid: this.$route.params.pid,
      imageInfo: {
        belong_album: "",
        edit_time: "",
        labels: [],
      },
      pageLoading: true,
      imageSize: 1.004,
      remoteLabelList: [],
      selectedLables: [],
      searchLoading: false,
    };
  },
  watch: {
    // 监听参数变化，重新获取数据
    $route(to) {
      this.pid = to.params.pid;
      this.getImgInfo(this.pid);
    },
  },
  created: function () {
    this.getImgInfo(this.pid);
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
    getImage(fid) {
      return this.MyEnv.image_url + fid;
    },
    seeOriginImg() {
      let url = this.image_url + this.pid + "&fileType=origin";
      window.open(url, "_blank");
    },
    getImgInfo(pid) {
      getImgInfoReq({
        pid: pid,
      })
        .then((res) => {
          this.imageInfo = res.data;
          //this.imageSize = res.size / (1024 * 1024);
          this.pageLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
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
      let labelString = this.selectedLables.join(",");
      putImgLabelReq({
        labels: labelString,
        pid: this.pid,
      }).then((res) => {
        this.$message({
          type: "success",
          message: res.msg,
        });
        this.getImgInfo(this.pid);
        this.selectedLables = [];
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
            this.getImgInfo(this.pid);
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
    handleAddLabel(label) {
      if (this.selectedLables.indexOf(label) >= 0) {
        this.$message({
          type: "error",
          message: "标签重复啦",
        });
        return;
      }
      if (this.selectedLables.length >= 5) {
        this.$message({
          type: "error",
          message: "标签太多啦",
        });
        return;
      }
      this.selectedLables.push(label);
    },
    prevOrNext(direction) {
      let pidList = this.$store.state.pidList;
      let index = pidList.indexOf(parseInt(this.pid));
      if (index<0) return;
      if (direction === "prev") {
        if (index === 0) {
          this.$message('已经是第一张了')
          return;
        }
        this.pid = this.$store.state.pidList[index - 1];
      } else if (direction === "next") {
        if (index === pidList.length - 1) {
          this.$message('已经是最后一张了')
          return;
        }
        this.pid = this.$store.state.pidList[index + 1];
      }
      this.$router.push("/imageDetail/" + this.pid);
    },
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
}
.arrow-con {
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
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
  display: flex;
  align-items: center;
}
.tag-con {
  display: flex;
  width: 50vw;
}
.tag-item {
  margin: auto 8px;
}
.label-input {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>