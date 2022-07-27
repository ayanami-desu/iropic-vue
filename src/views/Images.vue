<template>
  <div class="all-con">
    <div class="breadcrumb-con">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/' }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="albumId">
            相册：{{ albumName }}
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="tags">
            标签
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="num-con">
          <span>{{ totalPicNum }}</span>
        </div>
      </div>
      <div>
        <el-tag
          v-for="tag in selectedTags"
          :key="tag"
          closable
          @close="cancelSelectedTag(tag)"
        >
          {{ tag }}
        </el-tag>
      </div>
      <div class="top-tools-con">
        <div class="top-tool-item">
          <i class="el-icon-view" />
          <span>随机一张</span>
        </div>
        <div
          class="top-tool-item"
          @click="changeSortBy"
        >
          <i class="el-icon-sort" />
          <span>{{ sortBy?'最新':'最早' }}</span>
        </div>
      </div>
    </div>
    <HoverTool
      :selected-img-list="selectedImgList"
      @cancelSelect="cancelSelect"
    />
    <main
      v-viewer
      v-loading="pageLoading"
      class="main-con"
    >
      <ImageItem
        :image-data="image"
        :index="index"
        v-for="(image, index) in imageList"
        :key="image.id"
        ref="imageItem"
        @select="selectImg"
        @cancel="cancelSelectImg"
        @addTag="addSelectedTag"
      />
    </main>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalPicNum"
      :page-size="pageSize"
      @current-change="handlePageChange"
    />
  </div>
</template>
<script>
import { getImgListReq } from "@/api/image.js";
import HoverTool from "../components/HoverTool.vue";
import ImageItem from "../components/ImageItem.vue";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import Vue from "vue";
Vue.use(VueViewer, {
  defaultOptions: {
    title: false,
    transition: false,
  },
});

export default {
  name: "ImageArea",
  components: {
    HoverTool,
    ImageItem,
  },
  props: {},
  data() {
    return {
      albumId: this.$route.params.albumId,
      tags: this.$route.params.tags,
      pageSize: 4,
      sortBy: true,//true代表降序，down代表升序
      pageLoading: true,
      imageList: [],
      albumName: '',
      totalPicNum: 0,
      selectedTags: [],
      selectedImgList: [],
    };
  },
  computed: {},
  watch: {
    // 监听参数变化，重新获取数据
    $route(to) {
      this.albumId = to.params.albumId;
      this.tags = to.params.tags;
      this.loadImages(1);
    },
    selectedTags(newVal) {
      // let index = this.$route.path.lastIndexOf("/");
      // let path = this.$route.path.substr(0, index + 1) + newVal.join("+");
      // if (!this.$route.path.includes("/tag/")) {
      //   path = this.$route.path + "/tag/" + newVal.join("+");
      // }
      // else if (newVal.length === 0){
      //   path = this.albumId? '/album/' + this.albumId: ''
      //   console.log(path)
      // }
      // console.log(path)
      let path = this.albumId? '/album/' + this.albumId + '/': '/'
      if (newVal.length !== 0) {
        path = path + "tag/" + newVal.join("+");
      }
      this.$router.push(path);
    },
  },
  mounted: function () {
    this.loadImages(1);
  },
  methods: {
    selectImg(index) {
      this.imageList[index]['selected'] = true
      this.selectedImgList.push(this.imageList[index]['id']);
    },
    cancelSelectImg(index) {
      this.imageList[index]['selected'] = false
      let pid = this.imageList[index]['id']
      this.selectedImgList.splice(this.selectedImgList.indexOf(pid), 1);
    },
    cancelSelect(){
      for (let i=0;i<this.imageList.length;i++){
        if(this.imageList[i]['selected']) {
          this.imageList[i]['selected'] = false
        }
      }
      this.selectedImgList = []     
    },
    changeSortBy(){
      this.sortBy = !this.sortBy
      this.loadImages(1)
    },
    handlePageChange(nowPage){
      this.cancelSelect();
      this.loadImages(nowPage)
    },
    async loadImages(nowPage) {
      let data = {
        page: nowPage,
        num: this.pageSize,
        sortBy: this.sortBy?'down':'up'
      };
      if (this.tags) {
        data["tags"] = this.tags.replaceAll("+", ",");
      }
      if (this.albumId) {
        data["albumId"] = this.albumId;
      }
      let res = await getImgListReq(data);
      if (res.data.length == 0) {
        this.$message("没有图片！");
        return;
      }
      let temp = res.data;
      for (let i = 0; i < res.data.length; i++) {
        temp[i]["selected"] = false;
      }
      this.imageList = temp;
      this.totalPicNum = res.imageNum;
      if(this.albumId) this.albumName = temp[0]['belong_to_album']
      this.pageLoading = false
      if (nowPage === 1) {
        this.$notify.success({
          title: "Info",
          message: "发现" + res.imageNum + "张图片",
          position: "bottom-right",
          duration: 2000,
        });
      }
    },
    addSelectedTag(tag) {
      if (
        this.selectedTags.indexOf(tag) >= 0 ||
        this.selectedTags.length >= 3
      ) {
        return;
      }
      this.selectedTags.push(tag);
    },
    cancelSelectedTag(tag) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    },
  },
};
</script>
<style scoped>
.all-con {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
}
.breadcrumb-con {
  width: 100%;
  height: 30px;
  color: black;
  padding: 0 0 0 1em;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.breadcrumb{
  display: flex;
  align-items: center;;
}
.num-con {
  background-color: #777;
  color: #fff;
  margin-left: 2em;
  padding: 0 0.25em;
  text-align: center;
}
.top-tools-con{
  display: flex;
  padding-right: 1em;
}
.top-tool-item{
  margin-right: 0.75em;
  cursor: pointer;
}
.top-tool-item i{
  color:#0073b2;
  font-weight: bold;

}
.main-con {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  overflow-y: auto;
}
@media screen and (max-width: 600px) {
  /* 移动端 */
  .main-con {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    align-items: center;
  }
}
</style>