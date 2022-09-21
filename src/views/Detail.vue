<template>
  <div
    v-loading="pageLoading"
    class="page-con"
  >
    <div class="title-con">
      <div
        class="arrow-con"
        @click="prevOrNext('prev')"
      >
        <i class="el-icon-caret-left" />
      </div>
      <div class="title-desc">
        <div>
          <span>下载于：</span>
          <time>{{ stamp2Date(imageInfo.lastModified) }}</time>
        </div>
        <div>
          <span>大小：</span>
          <span>{{ imageSize.toFixed(2) }} MB</span>
        </div>
      </div>
      <div class="arrow-con">
        <i
          class="el-icon-caret-right"
          @click="prevOrNext('next')"
        />
      </div>
    </div>
    <div class="img-con">
      <el-image
        :src="image_url + pid"
        fit="scale-down"
        class="the-image"
      />
    </div>
    <div v-if="this.subImgList.length !== 0">
      <div
        class="img-con"
        v-for="subPid in this.subImgList"
        :key="subPid"
      >
        <el-image
          :src="image_url + subPid"
          fit="scale-down"
          class="the-image"
        />
      </div>
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
        v-for="tag in imageInfo.label"
        :key="tag.id"
        effect="dark"
        closable
        @close="rmImgLabel(tag.id)"
        class="tag-item"
      >
        {{ tag.name }}
      </el-tag>
    </div>
    <div v-if="imageInfo.label">
      暂无标签
    </div>
    <el-divider />
    <div class="tag-con">
      <el-tag
        v-for="tag in preAddTagList"
        :key="tag.id"
        closable
        @close="rmPreAddTag(tag)"
        class="tag-item"
      >
        {{ tag.name }}
      </el-tag>
    </div>
    <div class="label-input">
      <el-select
        v-model="selectedLabelList"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入标签关键字"
        :remote-method="searchLabel"
        :loading="searchLoading"
      >
        <el-option
          v-for="item in remoteLabelList"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        >
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{
            item.imageNum
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
//import { setAlbumCoverReq } from "@/api/album.js";
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
        belongAlbum: "",
        lastModified: "",
        label: [],
      },
      subImgList: [],
      pageLoading: true,
      imageSize: 1.00,
      remoteLabelList: [],
      selectedLabelList: [],
      searchLoading: false,
      preAddTagList: []
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
      let m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      return Y + M + D + h + m;
    },
    getImage(fid) {
      return this.MyEnv.image_url + fid;
    },
    seeOriginImg() {
      let url = this.image_url + this.pid + "&t=origin";
      window.open(url, "_blank");
    },
    getImgInfo(pid) {
      getImgInfoReq({
        pid: pid,
      })
        .then((res) => {
          this.imageInfo = res.data;
          this.imageSize = res.data.size / (1024 * 1024);
          if (res.data.subImg.length !==0 ){
            this.subImgList = res.data.subImg.split(',')
          }else{
            this.subImgList = []
          }
          this.pageLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async setAlbumCover() {
      //let res = await setAlbumCoverReq(pid);
      //this.$message(res.msg);
      this.$message("暂不支持");
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
      if (this.selectedLabelList.length == 0 && this.preAddTagList.length == 0) return;
      let tmp = []
      for (let i=0;i<this.preAddTagList.length;i++){
        tmp.push(this.preAddTagList[i]["id"])
      }
      tmp.concat(this.selectedLabelList, )
      let labelString = tmp.join(",");
      putImgLabelReq({
        lidList: labelString,
        pid: this.pid,
      }).then((res) => {
        this.$message({
          type: "success",
          message: res.msg,
        });
        this.getImgInfo(this.pid);
        this.selectedLabelList = [];
        this.preAddTagList = []
      });
    },
    rmImgLabel(lid) {
      this.$confirm("此操作将移除此标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delImgLabelReq({
            pid: this.pid,
            lid: lid,
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
    handleAddLabel(tag) {
      if (this.preAddTagList.indexOf(tag) > -1 || this.selectedLabelList.indexOf(tag.id) > -1) {
        this.$message({
          type: "error",
          message: "标签重复啦",
        });
        return;
      }
      if (this.preAddTagList.length + this.selectedLabelList.length >= 5) {
        this.$message({
          type: "error",
          message: "标签太多啦",
        });
        return;
      }
      this.preAddTagList.push(tag);
    },
    rmPreAddTag(tag){
      this.preAddTagList.splice(this.preAddTagList.indexOf(tag), 1)
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
  align-items: center;
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
    justify-content: space-around;
    width: 100%;
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
  /* width: 50vw; */
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
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